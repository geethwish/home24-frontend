export interface CategoryFormProps {
  name: string;
  description: string;
  parent_id?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  description?: string;
}
