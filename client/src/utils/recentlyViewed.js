const STORAGE_KEY = "recentlyViewedProducts";
const MAX_PRODUCTS = 4;

export const addRecentlyViewed = (product) => {
    if (!product) return;

    const existingProducts = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    // Remove duplicate if product already exists
    const updatedProducts = existingProducts.filter(
        (item) => item._id !== product._id
    );

    // Add current product at beginning
    updatedProducts.unshift(product);

    // Keep only latest 4 products
    const recentProducts = updatedProducts.slice(
        0,
        MAX_PRODUCTS
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(recentProducts)
    );
};

export const getRecentlyViewed = () => {
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );
};