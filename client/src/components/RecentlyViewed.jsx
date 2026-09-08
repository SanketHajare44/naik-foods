import { useEffect, useState } from "react";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import ProductCard from "./ProductCard";

const RecentlyViewed = ({
    compareProducts,
    setCompareProducts,
}) => {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const products = getRecentlyViewed();
        setRecentProducts(products);
    }, []);

    const handleCompare = (product) => {
        const alreadySelected = compareProducts.some(
            (item) => item._id === product._id
        );

        // Remove product if already selected
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
        setCompareProducts((prev) => [
            ...prev,
            product,
        ]);
    };

    if (recentProducts.length === 0) {
        return null;
    }

    return (
        <section className="mt-5 pt-4 border-top">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-1">
                        Recently Viewed
                    </h3>

                    <p className="text-muted mb-0">
                        Products you recently explored
                    </p>
                </div>

                <span className="badge bg-light text-dark border">
                    Last {recentProducts.length} Products
                </span>
            </div>

            <div className="row g-4">
                {recentProducts.map((product) => (
                    <div
                        className="col-md-6 col-xl-3"
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
        </section>
    );
};

export default RecentlyViewed;