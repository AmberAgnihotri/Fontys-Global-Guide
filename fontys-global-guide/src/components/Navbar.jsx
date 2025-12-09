import { Link } from "react-router-dom";
import fontysLogo from "../assets/fontys-logo-wit.png";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Navbar() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || "en";

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    const closeOffcanvas = () => {
        const element = document.getElementById("mainNavbar");
        if (!element) return;

        const offcanvas = bootstrap.Offcanvas.getInstance(element);
        if (offcanvas) offcanvas.hide();
    };

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
                                <Link className="nav-link text-white" to="/" onClick={closeOffcanvas}>
                                    <i className="fa-solid fa-house me-2"></i>
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/student-community" onClick={closeOffcanvas}>
                                    <i className="fa-solid fa-people-line me-2"></i>
                                    Student Community
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/city-guide" onClick={closeOffcanvas}>
                                    <i className="fa-solid fa-city me-2"></i>
                                    City Guide
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/administration" onClick={closeOffcanvas}>
                                    <i className="fa-regular fa-file-lines me-2"></i>
                                    Administration
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/fontys-discover" onClick={closeOffcanvas}>
                                    <i class="fas fa-book-open me-2"></i>
                                    Fontys Discover
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/campus-explorer" onClick={closeOffcanvas}>
                                    <i className="fa-regular fa-compass me-2"></i>
                                    Campus Explorer
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/expense-tracker" onClick={closeOffcanvas}>
                                    <i class="fa-solid fa-dollar-sign me-2"></i>
                                    Expense Tracker
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/help-center" onClick={closeOffcanvas}>
                                    <i className="fa-regular fa-circle-question me-2"></i>
                                    Help Center
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/profile" onClick={closeOffcanvas}>
                                    <i class="fa-regular fa-user me-2"></i>
                                    Profile
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login" onClick={closeOffcanvas}>
                                    Log out
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-4 text-center">
                            <p className="text-white mb-2">Language</p>

                            {["en", "nl", "de", "fr", "es", "zh", "tr"].map((lang) => (
                                <button
                                    key={lang}
                                    className={
                                        "btn btn-sm me-2 " +
                                        (currentLang === lang ? "btn-light" : "btn-outline-light")
                                    }
                                    onClick={() => {
                                        changeLang(lang);
                                        closeOffcanvas();
                                    }}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
