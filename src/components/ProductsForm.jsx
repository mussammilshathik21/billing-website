import { useState } from "react";

export default function ProductForm({ products, setProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (!name || !price) return;

    const exists = products.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("Product already exists");
      return;
    }

    setProducts([...products, { name, price: Number(price) }]);
    setName("");
    setPrice("");
  };

  return (
    <div className="form">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <button onClick={addProduct}>Add</button>
    </div>
  );
}