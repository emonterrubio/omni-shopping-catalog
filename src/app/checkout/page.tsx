"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface CheckoutData {
  items: any[];
  costCenter?: string;
  shippingCost: number;
}

export default function CheckoutPageWrapper() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const savedCheckoutData = localStorage.getItem("cartCheckout");
    if (savedCheckoutData) {
      try {
        const parsed = JSON.parse(savedCheckoutData);
        setCheckoutData(parsed);
      } catch (error) {
        console.error("Error loading checkout data:", error);
        router.push("/cart");
      }
    } else {
      router.push("/cart");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/cart");
  };

  if (!checkoutData) {
    return (
      <PageLayout>
        <div className="text-center text-gray-500 text-xl mt-12">Loading checkout...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Shopping Cart", href: "/cart" },
          { label: "Checkout", isActive: true }
        ]}
        className="mb-6"
      />
      
      <CheckoutPage
        items={checkoutData.items}
        shippingCost={checkoutData.shippingCost}
        costCenter={checkoutData.costCenter}
        onBack={handleBack}
      />
    </PageLayout>
  );
} 