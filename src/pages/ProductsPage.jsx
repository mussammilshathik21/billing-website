import "../styles/products.css";
import { useState, useEffect } from "react";
import productsData from "../data/products";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    const saved = JSON.parse(
      localStorage.getItem("products")
    );

    if (!saved || saved.length === 0) {
      setProducts(productsData);
    } else {
      setProducts(saved);
    }

  }, []);

  // Add Product
  const addProduct = () => {

    if (!name || !price) {
      alert("Fill all fields");
      return;
    }

    // Edit
    if (editId) {

      setProducts(
        products.map((p) =>
          p.id === editId
            ? {
                ...p,
                name,
                price: Number(price),
              }
            : p
        )
      );

      setEditId(null);

    } else {

      // Add
      setProducts([
        ...products,
        {
          id: Date.now(),
          name,
          price: Number(price),
          image:
            "https://cdn-icons-png.flaticon.com/512/1037/1037762.png",
        },
      ]);
    }

    setName("");
    setPrice("");
  };

  // Edit
  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setEditId(p.id);
  };

  // Delete
  const deleteProduct = (id) => {
    setProducts(
      products.filter((p) => p.id !== id)
    );
  };

  // Save
  const saveProducts = () => {

    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

    alert("Saved Successfully");
  };

  return (
    <div className="container">

      <h2>Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        className="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Form */}
      <div className="form">

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button onClick={addProduct}>
          {editId ? "Update" : "Add"}
        </button>

      </div>

      {/* Product List */}
      <div className="product-list">

        {products
          .filter((p) =>
            p.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((p) => (

            <div key={p.id} className="product-card">

              <div className="left">

                <img
                  src={p.image}
                  alt={p.name}
                />

                <div>
                  <h4>{p.name}</h4>
                  <p>₹{p.price}</p>
                </div>

              </div>

              <div className="btns">

                <button
                  className="edit"
                  onClick={() => editProduct(p)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>

              </div>

            </div>

        ))}

      </div>

      <button
        className="save-btn"
        onClick={saveProducts}
      >
        Save Products
      </button>

    </div>
  );
}