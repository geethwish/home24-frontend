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
  id: string;
  name: string;
  category_id: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
  description?: string;
}

export interface ProductDetails {
  currentPage: number;
  pageSize: number;
  products: Product[];
  total: number;
  totalPages: number;
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

export interface ProductTableProps {
  products: ProductDetails;
  isLoading: boolean;
  error: ResponseError | null;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
  onDeleteProduct: (id: string) => void;
  total: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface WidgetProps {
  latestProduct: Product;
  recentlyAddedProducts: Product;
  totalCategoriesCount: 20;
  totalProductCount: number;
}
