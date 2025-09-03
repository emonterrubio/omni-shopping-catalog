import { ITStorefront } from "../components/ITStorefront";
import { categories, quickActions, eligibilityData, hardwareData } from "../data/eaProductData";

export default function Home() {
  return (
    <ITStorefront
      categories={categories}
      products={hardwareData}
      quickActions={quickActions}
      eligibilityData={eligibilityData}
    />
  );
} 