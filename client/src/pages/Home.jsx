import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productApi";

import ProductCard from "../components/ProductCard";
import ProductShimmer from "../components/ProductShimmer";
import Filters from "../components/Filters";
import RecentlyViewed from "../components/RecentlyViewed";

const Home = ({ compareProducts, setCompareProducts }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const initialFilters = {
        search: "",
        category: "",
        tags: [],
        maxPrice: 1000,
        weight: "",
        inStock: false,
        featured: false,
        sort: "default",
    };

    const [filters, setFilters] = useState(initialFilters);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                // Check cache first
                const cachedProducts = sessionStorage.getItem("allProducts");

                if (cachedProducts) {
                    const products = JSON.parse(cachedProducts);

                    setAllProducts(products);
                    setFilteredProducts(products);

                    setLoading(false);
                    return;
                }

                // API call only if cache does not exist
                const data = await getProducts({
                    limit: 100,
                });

                // Save products in cache
                sessionStorage.setItem(
                    "allProducts",
                    JSON.stringify(data.products)
                );

                setAllProducts(data.products);
                setFilteredProducts(data.products);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Apply filters instantly on frontend
    useEffect(() => {
        let result = [...allProducts];

        // Live partial search
        if (filters.search.trim()) {
            const searchTerm = filters.search.toLowerCase();

            result = result.filter((product) => {
                return (
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.tags?.some((tag) =>
                        tag.toLowerCase().includes(searchTerm)
                    )
                );
            });
        }

        // Category filter
        if (filters.category) {
            result = result.filter(
                (product) => product.category === filters.category
            );
        }

        // Tags filter
        if (filters.tags.length > 0) {
            result = result.filter((product) =>
                filters.tags.every((selectedTag) =>
                    product.tags?.includes(selectedTag)
                )
            );
        }

        // Price filter
        result = result.filter(
            (product) => product.price <= filters.maxPrice
        );

        // Stock filter
        if (filters.inStock) {
            result = result.filter(
                (product) => product.stock > 0
            );
        }

        // Featured filter
        if (filters.featured) {
            result = result.filter(
                (product) => product.isFeatured
            );
        }

        // Weight filter
        if (filters.weight) {
            result = result.filter((product) => {
                const weight = parseInt(product.weight);

                if (filters.weight === "under-200") {
                    return weight < 200;
                }

                if (filters.weight === "200-300") {
                    return weight >= 200 && weight <= 300;
                }

                if (filters.weight === "above-300") {
                    return weight > 300;
                }

                return true;
            });
        }

        // Sorting
        switch (filters.sort) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "name-asc":
                result.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            case "name-desc":
                result.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
                break;

            default:
                break;
        }

        setFilteredProducts(result);
    }, [filters, allProducts]);

    // Handle filter changes
    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Clear filters
    const handleClearFilters = () => {
        setFilters(initialFilters);
    };

    // Handle product comparison
    const handleCompare = (product) => {
        const alreadySelected = compareProducts.some(
            (item) => item._id === product._id
        );

        // Remove selected product
        if (alreadySelected) {
            setCompareProducts((prev) =>
                prev.filter((item) => item._id !== product._id)
            );
            return;
        }

        // Maximum 3 products
        if (compareProducts.length >= 3) {
            alert("You can compare up to 3 products only");
            return;
        }

        // Add product
        setCompareProducts((prev) => [...prev, product]);
    };

    // Unique categories
    const categories = [
        ...new Set(
            allProducts.map((product) => product.category)
        ),
    ];

    // Unique tags
    const tags = [
        ...new Set(
            allProducts.flatMap(
                (product) => product.tags || []
            )
        ),
    ];

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">

            {/* Page Header */}
            <div className="mb-5">
                <h1 className="fw-bold mb-2">
                    Smart Product Discovery
                </h1>

                <p className="text-muted">
                    Find products instantly using live search and advanced filters
                </p>
            </div>

            <div className="row">

                {/* Filters Sidebar */}
                <div className="col-lg-3 mb-4">
                    <Filters
                        categories={categories}
                        tags={tags}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                </div>

                {/* Products */}
                <div className="col-lg-9">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">
                            {loading
                                ? "Loading products..."
                                : `Showing ${filteredProducts.length} Products`}
                        </h5>
                    </div>

                    {/* Loading Shimmer */}
                    {loading ? (
                        <div className="row g-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    className="col-md-6 col-xl-4"
                                    key={index}
                                >
                                    <ProductShimmer />
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (

                        <div className="alert alert-warning text-center py-4">
                            <h5>No products found</h5>
                            <p className="mb-0">
                                Try changing your search or filters.
                            </p>
                        </div>

                    ) : (

                        <div className="row g-4">
                            {filteredProducts.map((product) => (
                                <div
                                    className="col-md-6 col-xl-4"
                                    key={product._id}
                                >
                                    <ProductCard
                                        product={product}
                                        onCompare={handleCompare}
                                        isSelected={compareProducts.some(
                                            (item) => item._id === product._id
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>

            {/* Recently Viewed Products */}
            <RecentlyViewed
                compareProducts={compareProducts}
                setCompareProducts={setCompareProducts}
            />

            {/* Floating Compare Bar */}
            {compareProducts.length > 0 && (
                <div
                    className="position-fixed bottom-0 start-50 translate-middle-x mb-4"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-dark text-white rounded-pill shadow px-4 py-3 d-flex align-items-center gap-3">

                        <span>
                            {compareProducts.length} Product
                            {compareProducts.length > 1 ? "s" : ""} Selected
                        </span>

                        <Link
                            to="/compare"
                            className="btn btn-success btn-sm"
                        >
                            Compare Products
                        </Link>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;