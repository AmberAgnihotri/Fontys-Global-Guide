import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar" style={{ backgroundColor: "#663366" }}>
            <div className="container-fluid">

                <Link className="navbar-brand text-white" to="/">
                    Fontys Global Guide
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

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
                                <Link className="nav-link text-white" to="/home" data-bs-dismiss="offcanvas">
                                    Home
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
                                    Community
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

                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;