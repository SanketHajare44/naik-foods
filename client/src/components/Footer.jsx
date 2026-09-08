const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-5 text-center">

                <h4 className="fw-bold mb-3">
                    Smart Product Discovery
                </h4>

                <p
                    className="text-white-50 mx-auto mb-4"
                    style={{ maxWidth: "600px" }}
                >
                    Discover products effortlessly with smart search, advanced filters,
                    product comparison, personalized recommendations, and recently viewed products.
                </p>

                <div className="d-flex justify-content-center gap-4 mb-4">
                    <span className="text-white-50 small">
                        Discover
                    </span>

                    <span className="text-white-50 small">
                        Filter
                    </span>

                    <span className="text-white-50 small">
                        Compare
                    </span>

                    <span className="text-white-50 small">
                        Explore
                    </span>
                </div>

                <hr className="border-secondary mb-4" />

                <p className="text-white-50 mb-0 small">
                    © 2026 Smart Product Discovery. Built for Product Discovery.
                </p>

            </div>
        </footer>
    );
};

export default Footer;