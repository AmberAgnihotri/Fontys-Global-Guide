import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#663399' }}>
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">
                    Fontys Global Guide
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/city-guide">City Guide</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/housing">Housing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/administration">Administration</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/student-community">Community</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/fontys-discover">Fontys Discover</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/campus-explorer">Campus Explorer</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/expense-tracker">Expense Tracker</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/help-center">Help Center</Link>
                        </li>
                        {/* later: login / signup */}
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
