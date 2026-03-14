import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import LostDetails from "./pages/LostDetails";
import FoundDetails from "./pages/FoundDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/found-items" element={<FoundItems />} />
        <Route path="/lost/:id" element={<LostDetails />} />
        <Route path="/found/:id" element={<FoundDetails />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
