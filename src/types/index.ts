export interface CategoryFormProps {
  name: string;
  description: string;
  parent_id?: number;
}

export interface Category {
  id: number;
  name: string;
}
