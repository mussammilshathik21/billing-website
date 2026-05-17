import "../styles/history.css";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data.reverse()); // latest first
  }, []);

  // ❌ delete one bill
  const deleteBill = (id) => {
    const updated = history.filter(b => b.id !== id);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  // 🧹 clear all
  const clearAll = () => {
    if (confirm("Clear all history?")) {
      setHistory([]);
      localStorage.removeItem("history");
    }
  };

  return (
    <div className="container">
      <div className="history-header">
        <h2>Bill History</h2>
        <button onClick={clearAll}>Clear All</button>
      </div>

      {history.length === 0 ? (
        <p>No bills found</p>
      ) : (
        history.map(bill => (
          <div key={bill.id} className="history-card">

            <div className="history-top">
              <span>{bill.date}</span>
              <button onClick={() => deleteBill(bill.id)}>Delete</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>₹{item.price * item.qty}</td>
                  </tr>
                ))}
                
              </tbody>
              <div className="history-summary">
              <p>Subtotal: ₹{bill.subtotal}</p>
              <p>GST ({bill.gstRate}%): ₹{bill.gst}</p>
              <h3>Total: ₹{bill.total}</h3>
            </div>
            </table>

            

          </div>
        ))
      )}
    </div>
  );
}