export interface CategoryFormProps {
  name: string;
  description: string;
  parent_id?: number;
}

export interface Category {
  id: string;
  parent_id: string | null;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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

export interface UserDetails {
  id: string;
  email: string;
  name: string;
}
export interface UserToken {
  user: UserDetails;
  iat: number;
  exp: number;
}

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface UserRegisterForm {
  name: string;
  email: string;
  password: string;
}

export type ResponseError = Error | { message: string; code?: number };

export interface CategoryForm {
  name: string;
  description: string;
  parent_id?: number;
}
