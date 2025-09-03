"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { ShoppingCart } from "@/components/checkout/ShoppingCart";
import { CartContext } from "@/components/CartContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function CartPage() {
  const { cartItems, clearCart, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const handleEdit = () => {
    router.push("/catalog");
  };

  const handleCheckout = (costCenter?: string, shippingMethod?: 'free' | 'express') => {
    const shippingCost = shippingMethod === 'express' ? 14 : 0;
    
    // Save checkout data to localStorage for the checkout page
    const checkoutData = {
      items: cartItems,
      costCenter,
      shippingCost,
      shippingMethod
    };
    localStorage.setItem("cartCheckout", JSON.stringify(checkoutData));
    
    // Navigate to checkout
    router.push("/checkout");
  };

  const handleRemove = (model: string) => {
    // Remove the item from cart using CartContext
    removeFromCart(model);
  };

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Shopping Cart", isActive: true }
        ]}
        className="mb-6"
      />

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-6">
            <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet. Start shopping to see products here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/catalog")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Catalog
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        /* Cart with Items */
        <ShoppingCart
          selectedItems={cartItems.map(item => ({
            ...item,
            recommended: item.recommended ?? false
          }))}
          onEdit={handleEdit}
          onCheckout={handleCheckout}
          onRemove={handleRemove}
        />
      )}
    </PageLayout>
  );
}
