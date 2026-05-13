import { useState, useEffect } from "react";
import "../styles/billing.css";

import ProductCard from "../components/ProductCard";
import productsData from "../data/products";
import { generateInvoice } from "../utils/pdf";

export default function BillingPage() {
  const [products, setProducts] = useState([]);
  const [bill, setBill] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products"));
    setProducts(saved && saved.length ? saved : productsData);
  }, []);

  // ➕ add product
  const addToBill = (product) => {
    const exists = bill.find((i) => i.id === product.id);

    if (exists) {
      setBill(
        bill.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setBill([...bill, { ...product, qty: 1 }]);
    }
  };

  // ➕➖ qty
  const increaseQty = (id) => {
    setBill(
      bill.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (id) => {
    setBill(
      bill
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  // ❌ remove item
  const removeItem = (id) => {
    setBill(bill.filter((i) => i.id !== id));
  };

  // 🗑 cancel bill
  const cancelBill = () => {
    if (confirm("Cancel full bill?")) {
      setBill([]);
    }
  };

  // 💰 total
  const total = bill.reduce((a, b) => a + b.price * b.qty, 0);

  // 🖨 print
  const handlePrint = () => {
    if (!bill.length) return alert("No items");
    window.print();
  };

  // 📄 PDF
  const handlePDF = () => {
    if (!bill.length) return alert("No items");
    generateInvoice(bill);
  };

  return (
    <div className="billing-container">

      {/* LEFT PRODUCTS */}
      <div className="products-section">
        <h3>Products</h3>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToBill={addToBill} />
          ))}
        </div>
      </div>

      {/* RIGHT BILL */}
      <div className="bill-section">
        <h3>Bill Summary</h3>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {bill.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  {item.qty}
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </td>

                <td>₹{item.price * item.qty}</td>

                <td>
                  <button onClick={() => removeItem(item.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Total: ₹{total}</h2>

        <div className="btn-group">


          <button className="pdf-btn" onClick={handlePDF}>
            Generate Invoice
          </button>
        </div>

        <button className="cancel-btn" onClick={cancelBill}>
          Cancel Bill
        </button>
      </div>
    </div>
  );
}