import { Link } from "react-router-dom";

const CompareProducts = ({ products }) => {
    if (!products || products.length < 2) {
        return (
            <div className="container py-5 text-center">
                <h3>Select at least 2 products to compare</h3>

                <Link to="/" className="btn btn-success mt-3">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <Link
                        to="/"
                        className="text-success text-decoration-none"
                    >
                        ← Back to Products
                    </Link>

                    <h1 className="fw-bold mt-2">
                        Compare Products
                    </h1>

                    <p className="text-muted">
                        Compare products side by side to make a better choice
                    </p>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th style={{ minWidth: "160px" }}>
                                Feature
                            </th>

                            {products.map((product) => (
                                <th
                                    key={product._id}
                                    className="text-center"
                                    style={{ minWidth: "220px" }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="img-fluid mb-3"
                                        style={{
                                            height: "150px",
                                            objectFit: "contain",
                                        }}
                                    />

                                    <h5>{product.name}</h5>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Price</th>
                            {products.map((product) => (
                                <td
                                    key={product._id}
                                    className="text-center fw-bold text-success"
                                >
                                    ₹{product.price}
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <th>Category</th>
                            {products.map((product) => (
                                <td key={product._id} className="text-center">
                                    {product.category}
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <th>Weight</th>
                            {products.map((product) => (
                                <td key={product._id} className="text-center">
                                    {product.weight}
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <th>Stock</th>
                            {products.map((product) => (
                                <td key={product._id} className="text-center">
                                    {product.stock} Available
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <th>Tags</th>
                            {products.map((product) => (
                                <td key={product._id} className="text-center">
                                    {product.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="badge bg-light text-dark border me-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <th>Ingredients</th>
                            {products.map((product) => (
                                <td key={product._id}>
                                    <ul className="mb-0 ps-3">
                                        {product.ingredients?.map((ingredient) => (
                                            <li key={ingredient}>
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <th>Description</th>
                            {products.map((product) => (
                                <td key={product._id}>
                                    {product.description}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompareProducts;