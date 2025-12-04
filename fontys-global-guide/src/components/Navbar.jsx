import { Link } from "react-router-dom";
import fontysLogo from "../assets/fontys-logo-wit.png";
import { useTranslation } from "react-i18next";

function Navbar() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || "en";

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
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
                                <Link
                                    className="nav-link text-white"
                                    to="/"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-solid fa-house me-2"></i>
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/student-community"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-solid fa-people-line me-2"></i>
                                    Student Community
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/city-guide"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-solid fa-city me-2"></i>
                                    City Guide
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/housing"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-solid fa-house-chimney-window me-2"></i>
                                    Housing
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/administration"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-regular fa-file-lines me-2"></i>
                                    Administration
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/fontys-discover"
                                    data-bs-dismiss="offcanvas"
                                >
                                    Fontys Discover
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/campus-explorer"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-regular fa-compass me-2"></i>
                                    Campus Explorer
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/expense-tracker"
                                    data-bs-dismiss="offcanvas"
                                >
                                    Expense Tracker
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/help-center"
                                    data-bs-dismiss="offcanvas"
                                >
                                    <i className="fa-regular fa-circle-question me-2"></i>
                                    Help Center
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/profile"
                                    data-bs-dismiss="offcanvas"
                                >
                                    Profile
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/login"
                                    data-bs-dismiss="offcanvas"
                                >
                                    Log out
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-4 text-center">
                            <p className="text-white mb-2">Language</p>
                            <button
                                className={
                                    "btn btn-sm me-2 " +
                                    (currentLang === "en" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("en")}
                            >
                                EN
                            </button>
                            <button
                                className={
                                    "btn btn-sm me-2 " +
                                    (currentLang === "nl" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("nl")}
                            >
                                NL
                            </button>
                            <button
                                className={
                                    "btn btn-sm me-2" +
                                    (currentLang === "de" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("de")}
                            >
                                DE
                            </button>
                            <button
                                className={
                                    "btn btn-sm me-2" +
                                    (currentLang === "fr" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("fr")}
                            >
                                FR
                            </button>
                            <button
                                className={
                                    "btn btn-sm me-2" +
                                    (currentLang === "es" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("es")}
                            >
                                ES
                            </button>
                            <button
                                className={
                                    "btn btn-sm me-2" +
                                    (currentLang === "zh" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("zh")}
                            >
                                ZH
                            </button>
                            <button
                                className={
                                    "btn btn-sm " +
                                    (currentLang === "tr" ? "btn-light" : "btn-outline-light")
                                }
                                onClick={() => changeLang("tr")}
                            >
                                TR
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
