import "../styles/navbar.css"
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>Billing App</h2>
      <div>
        <Link to="/">Billing</Link>
        <Link to="/products">Products</Link>
        <Link to="/history">History</Link>
      </div>
    </div>
  );
}