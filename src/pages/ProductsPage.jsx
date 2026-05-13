import "../styles/products.css"
import { useState, useEffect } from "react";
import productsData from "../data/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products"));

    if (!saved || saved.length === 0) {
      setProducts(productsData);
    } else {
      setProducts(saved);
    }
  }, []);

  const addProduct = () => {
    if (!name || !price) return;

    if (editId) {
      setProducts(
        products.map(p =>
          p.id === editId ? { ...p, name, price: Number(price) } : p
        )
      );
      setEditId(null);
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name,
          price: Number(price),
          image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        }
      ]);
    }

    setName("");
    setPrice("");
  };

  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setEditId(p.id);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const saveProducts = () => {
    localStorage.setItem("products", JSON.stringify(products));
    alert("Saved!");
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addProduct}>
        {editId ? "Update" : "Add"}
      </button>

      {products.map(p => (
        <div key={p.id}>
          {p.name} - ₹{p.price}
          <button onClick={() => editProduct(p)}>Edit</button>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}

      <button onClick={saveProducts}>OK / Save</button>
    </div>
  );
}