import { useQuery } from "@tanstack/react-query";
import productService from "../services/product.service";

const useProducts = (
  page: number,
  pageSize: number,
  sortBy: string,
  sortOrder: "asc" | "desc"
) => {
  const query = useQuery({
    queryKey: ["products", page, pageSize, sortBy, sortOrder],
    queryFn: () =>
      productService.getAllProducts(page, pageSize, sortBy, sortOrder),
  });

  const refreshProducts = () => {
    query.refetch();
  };

  return { ...query, refreshProducts };
};

export default useProducts;
