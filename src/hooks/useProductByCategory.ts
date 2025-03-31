import { useQuery } from "@tanstack/react-query";
import productService from "../services/product.service";

const useProductsByCategoryId = (
  categoryId: string | undefined,
  page: number,
  pageSize: number,
  sortBy: string,
  sortOrder: "asc" | "desc"
) => {
  const query = useQuery({
    queryKey: [
      "productsByCategoryId",
      page,
      pageSize,
      sortBy,
      sortOrder,
      categoryId,
    ],
    queryFn: () =>
      productService.getProductsByCategory(
        categoryId!,
        page,
        pageSize,
        sortBy,
        sortOrder
      ),
    enabled: !!categoryId, // Only fetch when categoryId is truthy
  });

  const refreshProducts = () => {
    query.refetch();
  };

  return { ...query, refreshProducts };
};

export default useProductsByCategoryId;
