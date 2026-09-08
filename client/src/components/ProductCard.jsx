import { Link } from "react-router-dom";

const ProductCard = ({
    product,
    onCompare,
    isSelected,
}) => {
    return (
        <div
            className={`card h-100 shadow-sm border ${isSelected ? "border-success border-2" : ""
                }`}
        >
            {/* Product Image */}
            <div className="position-relative bg-light">
                <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top p-3"
                    style={{
                        height: "220px",
                        objectFit: "contain",
                    }}
                />

                {product.isFeatured && (
                    <span className="badge bg-success position-absolute top-0 end-0 m-2">
                        Featured
                    </span>
                )}
            </div>

            <div className="card-body d-flex flex-column">
                {/* Category */}
                <small className="text-success fw-semibold">
                    {product.category}
                </small>

                {/* Product Name */}
                <h5 className="card-title mt-2">
                    {product.name}
                </h5>

                {/* Description */}
                <p className="card-text text-muted small">
                    {product.description}
                </p>

                {/* Tags */}
                <div className="mb-3">
                    {product.tags?.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="badge bg-light text-dark border me-1"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Price & Weight */}
                <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
                    <span className="fw-bold fs-5">
                        ₹{product.price}
                    </span>

                    <small className="text-muted">
                        {product.weight}
                    </small>
                </div>

                {/* Buttons */}
                <div className="d-grid gap-2">
                    <Link
                        to={`/products/${product.slug}`}
                        className="btn btn-success"
                    >
                        View Details
                    </Link>

                    <button
                        className={`btn ${isSelected
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            }`}
                        onClick={() => onCompare(product)}
                    >
                        {isSelected
                            ? "Remove from Compare"
                            : "Compare Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;