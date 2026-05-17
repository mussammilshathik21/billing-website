import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({
  search,
  setSearch
}) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <h2 className="logo">
        Billing App
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-box"
        value={search}
        onChange={(e)=>
          setSearch(e.target.value)
        }
      />

      {/* MOBILE MENU */}
      <div
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        ☰
      </div>

      {/* LINKS */}
      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        <Link to="/">
          Billing
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/history">
          History
        </Link>

      </div>

    </nav>
  );
}