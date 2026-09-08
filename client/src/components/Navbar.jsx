import { Link } from "react-router-dom";

const Navbar = ({ compareProducts }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
            <div className="container">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand fw-bold text-success fs-4"
                >
                    Smart Product Discovery
                </Link>

                {/* Navigation Links */}
                <div className="d-flex align-items-center gap-3">

                    <Link
                        to="/"
                        className="text-decoration-none text-dark fw-medium"
                    >
                        Home
                    </Link>

                    <Link
                        to="/compare"
                        className="btn btn-outline-success btn-sm position-relative"
                    >
                        Compare

                        {compareProducts?.length > 0 && (
                            <span className="badge bg-success ms-2">
                                {compareProducts.length}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;