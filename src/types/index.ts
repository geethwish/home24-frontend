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
