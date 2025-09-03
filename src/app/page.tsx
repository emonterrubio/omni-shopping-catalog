import { ITStorefront } from "../components/ITStorefront";
import { categories, quickActions, eligibilityData, hardwareData } from "../data/eaProductData";

export default function Home() {
  return (
    <ITStorefront
      categories={categories}
      products={hardwareData as any}
      quickActions={quickActions}
      eligibilityData={eligibilityData}
    />
  );
} 