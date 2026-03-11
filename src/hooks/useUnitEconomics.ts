import { useState } from 'react';

export interface ProductEconomics {
  id: string;
  sku: string;
  name: string;
  imageUrl: string;
  price: number;
  cogs: number;
  logistics: number;
  commissionPercent: number;
  taxPercent: number;
}

export function useUnitEconomics(initialData: ProductEconomics[]) {
  const [products, setProducts] = useState<ProductEconomics[]>(initialData);

  const updateProduct = (id: string, field: keyof ProductEconomics, value: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const calculateMetrics = (product: ProductEconomics) => {
    const commission = product.price * (product.commissionPercent / 100);
    const tax = product.price * (product.taxPercent / 100);
    const netProfit = product.price - product.cogs - product.logistics - commission - tax;
    const roi = product.cogs > 0 ? (netProfit / product.cogs) * 100 : 0;
    
    let abcTag = 'C';
    if (roi > 30) abcTag = 'A';
    else if (roi >= 10) abcTag = 'B';

    return { commission, tax, netProfit, roi, abcTag };
  };

  return { products, updateProduct, calculateMetrics };
}
