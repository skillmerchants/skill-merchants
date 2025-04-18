import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

export default function Page() {
  return (
    <Router>
      {/* Routes: What to show for each URL */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
