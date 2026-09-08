const API_URL =
  "https://naik-foods-server.onrender.com/api/products";

export const getProducts = async ({
  search = "",
  category = "",
  page = 1,
  limit = 6,
} = {}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category) params.append("category", category);

  params.append("page", page);
  params.append("limit", limit);

  const response = await fetch(
    `${API_URL}?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch products"
    );
  }

  return data;
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/${slug}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch product"
    );
  }

  return data;
};