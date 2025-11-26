import { Link } from "react-router-dom";
import fontysLogo from "../assets/fontys-logo-wit.png";

function Navbar() {
    return (
        <nav className="navbar" style={{ backgroundColor: "#663366" }}>
            <div className="container-fluid">

                <button
                    className="navbar-toggler me-auto"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand text-white d-flex align-items-center" to="/">
                    <img
                        src={fontysLogo}
                        alt="Fontys Logo"
                        style={{ height: "40px", marginRight: "10px" }}
                    />
                </Link>

                <div
                    className="offcanvas offcanvas-start text-white"
                    tabIndex="-1"
                    id="mainNavbar"
                    aria-labelledby="mainNavbarLabel"
                    style={{ backgroundColor: "#663366" }}
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="mainNavbarLabel">
                            Menu
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/" data-bs-dismiss="offcanvas">
                                    Student Community
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/city-guide" data-bs-dismiss="offcanvas">
                                    City Guide
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/housing" data-bs-dismiss="offcanvas">
                                    Housing
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/administration" data-bs-dismiss="offcanvas">
                                    Administration
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/student-community" data-bs-dismiss="offcanvas">
                                    Student Community
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/fontys-discover" data-bs-dismiss="offcanvas">
                                    Fontys Discover
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/campus-explorer" data-bs-dismiss="offcanvas">
                                    Campus Explorer
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/expense-tracker" data-bs-dismiss="offcanvas">
                                    Expense Tracker
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/help-center" data-bs-dismiss="offcanvas">
                                    Help Center
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login" data-bs-dismiss="offcanvas">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/signup" data-bs-dismiss="offcanvas">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;