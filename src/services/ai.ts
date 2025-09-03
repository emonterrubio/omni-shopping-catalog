import OpenAI from 'openai';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Initialize OpenAI client (singleton)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Core specs summary (shortened to reduce token usage)
const CORE_SPECS = {
  processors: ['Intel i9', 'AMD Ryzen 9', 'Apple M3 Pro'],
  memory: ['16GB', '32GB', '64GB'],
  storage: ['512GB SSD', '1TB SSD'],
  graphics: ['NVIDIA RTX', 'AMD Radeon'],
  display: ['13" Retina', '14" 4K', '16" Retina'],
};

// ========================
// TypeScript Interfaces
// ========================
export interface Product {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  specs: {
    processor?: string;
    memory?: string;
    storage?: string;
    graphics?: string;
    display?: string;
    [key: string]: any;
  };
  priceInUsd?: number;
}

// ========================
// Zod Schemas for Validation
// ========================
const FeatureSchema = z.object({
  name: z.string(),
  value: z.string().nullable().optional(),
  priority: z.enum(['high', 'medium', 'low']),
});

const SearchIntentSchema = z.object({
  type: z.enum(['brand_specific', 'best_of', 'use_case', 'feature_specific', 'general']),
  category: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  features: z.array(FeatureSchema),
  context: z.object({
    useCase: z.string().nullable().optional(),
    priceRange: z.string().nullable().optional(),
    performanceLevel: z.enum(['high', 'medium', 'low']).nullable().optional(),
  }),
});

export type SearchIntent = z.infer<typeof SearchIntentSchema>;

const MatchedFeatureSchema = z.object({
  feature: z.string(),
  matchQuality: z.number(),
  importance: z.number(),
});

const ProductScoreSchema = z.object({
  score: z.number(),
  reasoning: z.string(),
  matchedFeatures: z.array(MatchedFeatureSchema),
});

export type ProductScore = z.infer<typeof ProductScoreSchema>;

// ========================
// Prompt Constants
// ========================
const INTENT_ANALYSIS_PROMPT = `
You are an intent‐analyzer for an IT hardware store. 
Given the user's search query, return exactly one JSON object with fields:
{
  "type": (string, one of ["brand_specific","best_of","use_case","feature_specific","general"]),
  "category": (string|null),
  "brand": (string|null),
  "features": [
    { "name": (string), "value": (string|null), "priority": (string) }
  ],
  "context": {
    "useCase": (string|null),
    "priceRange": (string|null),
    "performanceLevel": (string|null)
  }
}
Only output the JSON—no additional commentary.
Consider these core specs:
- Processors: ${CORE_SPECS.processors.join(', ')}
- Memory: ${CORE_SPECS.memory.join(', ')}
- Storage: ${CORE_SPECS.storage.join(', ')}
- Graphics: ${CORE_SPECS.graphics.join(', ')}
- Display: ${CORE_SPECS.display.join(', ')}
`;

const PRODUCT_SCORING_PROMPT = `
You are a hardware product scoring system. Score the product based on the search intent.
Return exactly one JSON object with fields:
{
  "score": (number 0-100),
  "reasoning": (string),
  "matchedFeatures": [
    { "feature": (string), "matchQuality": (number 0-1), "importance": (number 0-1) }
  ]
}
Only output the JSON—no additional commentary.
`;

const SUGGESTIONS_PROMPT = `
Generate relevant search suggestions based on the search intent and available products.
Return exactly one JSON array of 3-5 suggestion strings. Only output the JSON—no additional text.
`;

// ========================
// Helper Functions
// ========================
/**
 * Safely parse a JSON string returned from OpenAI into type T,
 * throwing an error if parsing fails.
 */
function parseOpenAIJSON<T>(content: string | null | undefined, schemaName?: string): T {
  if (!content?.trim()) {
    throw new Error(`[${schemaName}] OpenAI returned empty content`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    throw new Error(`[${schemaName}] Response was not valid JSON: ${content}`);
  }
  return parsed as T;
}

/**
 * General helper to call OpenAI Chat Completions, log latency and raw output,
 * then parse JSON into type T (with optional Zod validation downstream).
 */
async function callAndParse<T>(
  messages: Array<{ role: 'system' | 'user'; content: string }>,
  maxTokens: number,
  schemaName: string
): Promise<T> {
  const requestId = uuidv4();
  console.info(`[${requestId}] Starting OpenAI call for ${schemaName}`);
  const startTs = Date.now();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.0,
    max_tokens: maxTokens,
    messages,
  });

  const latencyMs = Date.now() - startTs;
  console.info(`[${requestId}] OpenAI API call for ${schemaName} took ${latencyMs}ms`);

  const raw = response.choices?.[0]?.message?.content;
  console.debug(`[${requestId}] Raw output for ${schemaName}: ${raw}`);

  return parseOpenAIJSON<T>(raw, schemaName);
}

// ========================
// Main Service Functions
// ========================
export async function analyzeSearchQuery(query: string): Promise<SearchIntent> {
  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    { role: 'system', content: INTENT_ANALYSIS_PROMPT },
    { role: 'user', content: query },
  ];

  const rawIntent = await callAndParse<unknown>(messages, 150, 'analyzeSearchQuery');
  try {
    return SearchIntentSchema.parse(rawIntent);
  } catch (error) {
    console.error('[analyzeSearchQuery] Validation failed:', error);
    throw new Error('Invalid SearchIntent format received from OpenAI');
  }
}

export async function scoreProductByIntent(
  product: Product,
  intent: SearchIntent
): Promise<ProductScore> {
  const payload = {
    product,
    intent,
    hardwareSpecs: CORE_SPECS,
  };

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    { role: 'system', content: PRODUCT_SCORING_PROMPT },
    { role: 'user', content: JSON.stringify(payload) },
  ];

  const rawScore = await callAndParse<unknown>(messages, 200, 'scoreProductByIntent');
  try {
    return ProductScoreSchema.parse(rawScore);
  } catch (error) {
    console.error('[scoreProductByIntent] Validation failed:', error);
    return {
      score: 0,
      reasoning: 'Error parsing ProductScore from OpenAI response',
      matchedFeatures: [],
    };
  }
}

export async function generateSuggestions(
  intent: SearchIntent,
  products: Product[]
): Promise<string[]> {
  const payload = {
    intent,
    products: products.slice(0, 5),
    hardwareSpecs: CORE_SPECS,
  };

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    { role: 'system', content: SUGGESTIONS_PROMPT },
    { role: 'user', content: JSON.stringify(payload) },
  ];

  const rawSuggestions = await callAndParse<unknown>(messages, 150, 'generateSuggestions');
  try {
    const suggestions = z.array(z.string()).parse(rawSuggestions);
    return suggestions;
  } catch (error) {
    console.error('[generateSuggestions] Validation failed:', error);
    return [];
  }
}