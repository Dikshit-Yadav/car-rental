export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (
  pageInput?: string,
  limitInput?: string
): PaginationParams => {
  const page = Math.max(Number(pageInput) || 1, 1);

  const limit = Math.min(
    Math.max(Number(limitInput) || 10, 1),
    100
  );

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};