import api from "./api";

const productService = {
  getAllProducts: (
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ) =>
    api.get(
      `/products?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    ),
  getProductsByCategory: (
    categoryId: string,
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: "asc" | "desc"
  ) =>
    api.get(
      `/products/categories/${categoryId}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    ),
};

export default productService;
