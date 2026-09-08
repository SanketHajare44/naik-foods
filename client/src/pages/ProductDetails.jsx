import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "../services/productApi";
import { addRecentlyViewed } from "../utils/recentlyViewed";

const ProductDetails = () => {
    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProductBySlug(slug);

                console.log("Product Data:", data.product);

                setProduct(data.product);

                // Save product in recently viewed
                addRecentlyViewed(data.product);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-md-6">
                        <div
                            className="shimmer"
                            style={{ height: "450px" }}
                        ></div>
                    </div>

                    <div className="col-md-6">
                        <div
                            className="shimmer mb-3"
                            style={{ height: "30px", width: "70%" }}
                        ></div>

                        <div
                            className="shimmer mb-3"
                            style={{ height: "20px", width: "40%" }}
                        ></div>

                        <div
                            className="shimmer mb-3"
                            style={{ height: "100px" }}
                        ></div>

                        <div
                            className="shimmer"
                            style={{ height: "45px", width: "100%" }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <h3 className="text-danger">{error}</h3>

                <Link to="/" className="btn btn-success mt-3">
                    Back to Products
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h3>Product not found</h3>
            </div>
        );
    }

    return (
        <div className="container py-5">

            {/* Breadcrumb */}
            <div className="mb-4">
                <Link
                    to="/"
                    className="text-decoration-none text-success"
                >
                    ← Back to Products
                </Link>
            </div>

            <div className="row g-5">

                {/* Product Image */}
                <div className="col-lg-6">
                    <div className="card border shadow-sm">
                        <div className="p-4 bg-light text-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img-fluid"
                                style={{
                                    height: "450px",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Product Information */}
                <div className="col-lg-6">

                    <small className="text-success fw-semibold">
                        {product.category}
                    </small>

                    <h1 className="mt-2 fw-bold">
                        {product.name}
                    </h1>

                    {/* Tags */}
                    <div className="mb-3">
                        {product.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="badge bg-light text-dark border me-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Price */}
                    <h2 className="fw-bold mb-3">
                        ₹{product.price}
                    </h2>

                    <p className="text-muted fs-6">
                        {product.description}
                    </p>

                    <hr />

                    {/* Product Info */}
                    <div className="row mb-4">

                        <div className="col-6">
                            <p className="text-muted mb-1">
                                Weight
                            </p>

                            <strong>
                                {product.weight}
                            </strong>
                        </div>

                        <div className="col-6">
                            <p className="text-muted mb-1">
                                Stock
                            </p>

                            <strong className="text-success">
                                {product.stock} Available
                            </strong>
                        </div>

                    </div>

                    {/* Add Cart */}
                    <button className="btn btn-success w-100 py-2 fw-semibold">
                        Add to Cart
                    </button>

                </div>
            </div>

            {/* Bottom Information */}
            <div className="row mt-5">

                <div className="col-lg-8">

                    {/* Ingredients */}
                    <div className="card shadow-sm border mb-4">
                        <div className="card-body">

                            <h4 className="mb-3">
                                Ingredients
                            </h4>

                            <ul className="mb-0">
                                {product.ingredients?.map((ingredient) => (
                                    <li key={ingredient} className="mb-2">
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>

                    {/* Storage */}
                    <div className="card shadow-sm border">
                        <div className="card-body">

                            <h4 className="mb-3">
                                Storage Instructions
                            </h4>

                            <p className="mb-0 text-muted">
                                {product.storageInstructions}
                            </p>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;