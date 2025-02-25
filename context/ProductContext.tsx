"use client";

import {createContext, useState, ReactNode, useContext} from "react";

export interface Product {
  id: string;
  sku: string;
  product_id: string;
  product_name: string;
  classification: string;
  product_image_url: string;
  description: string;
  description_2: string;
  full_description: string;
  color: string[];
  product_fint_info: string[];
  product_fit: string;
  poduct_qyt: number;
  product_price: number;
  ai_description: string;
}

interface ProductContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  imageSearch: string | null;
  setImageSearch: (imageSearch: string | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: {children: ReactNode}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageSearch, setImageSearch] = useState<string | null>(null);

  return (
    <ProductContext.Provider
      value={{selectedProduct, setSelectedProduct, imageSearch, setImageSearch}}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
