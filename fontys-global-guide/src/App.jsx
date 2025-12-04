import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from "./pages/SignUp.jsx";
import CityGuide from "./pages/CityGuide.jsx";
import Administration from "./pages/Administration.jsx";
import Housing from "./pages/Housing.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import StudentCommunity from "./pages/StudentCommunity.jsx";
import Navbar from "./components/Navbar.jsx";
import FontysDiscover from "./pages/FontysDiscover.jsx";
import CampusExplorer from "./pages/CampusExplorer.jsx";
import ExpenseTracker from "./pages/expenseTracker.jsx";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city-guide" element={<CityGuide />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/student-community" element={<StudentCommunity />} />
        <Route path="/fontys-discover" element={<FontysDiscover />} />
        <Route path="/campus-explorer" element={<CampusExplorer />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
