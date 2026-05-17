import { useState, useEffect } from "react";

import "../styles/billing.css";

import ProductCard from "../components/ProductCard";

import productsData from "../data/products";

import { generateInvoice } from "../utils/pdf";

export default function BillingPage({
  search
}) {

  const [products, setProducts] = useState([]);

  const [bill, setBill] = useState([]);

  // LOAD PRODUCTS
  useEffect(() => {

    const saved = JSON.parse(
      localStorage.getItem("products")
    );

    setProducts(
      saved && saved.length
        ? saved
        : productsData
    );

  }, []);

  // ADD PRODUCT
  const addToBill = (product) => {

    const exists = bill.find(
      (i) => i.id === product.id
    );

    if (exists) {

      setBill(
        bill.map((i) =>
          i.id === product.id
            ? {
                ...i,
                qty: i.qty + 1
              }
            : i
        )
      );

    } else {

      setBill([
        ...bill,
        {
          ...product,
          qty:1
        }
      ]);
    }
  };

  // ➕ INCREASE
  const increaseQty = (id) => {

    setBill(
      bill.map((i)=>
        i.id === id
          ? {
              ...i,
              qty:i.qty + 1
            }
          : i
      )
    );
  };

  // ➖ DECREASE
  const decreaseQty = (id) => {

    setBill(
      bill
        .map((i)=>
          i.id === id
            ? {
                ...i,
                qty:i.qty - 1
              }
            : i
        )
        .filter((i)=> i.qty > 0)
    );
  };

  // ❌ REMOVE
  const removeItem = (id) => {

    setBill(
      bill.filter(
        (i)=> i.id !== id
      )
    );
  };

  // 🗑 CANCEL
  const cancelBill = () => {

    if(confirm("Cancel full bill?")){
      setBill([]);
    }
  };

  // 💰 TOTAL
  const total = bill.reduce(
    (a,b)=>
      a + b.price * b.qty,
    0
  );

  // PDF
  const handlePDF = () => {

    if(!bill.length)
      return alert("No items");

    // subtotal
    const subtotal = bill.reduce(
      (acc,item)=>
        acc + item.price * item.qty,
      0
    );

    // GST
    const gstRate = 0;

    const gst =
      (subtotal * gstRate) / 100;

    // total
    const finalTotal =
      subtotal + gst;

    // invoice
    const invoice = {
      id:Date.now(),
      date:new Date().toLocaleString(),
      items:bill,
      subtotal,
      gstRate,
      gst,
      total:finalTotal
    };

    // old history
    const oldHistory =
      JSON.parse(
        localStorage.getItem("history")
      ) || [];

    // save history
    localStorage.setItem(
      "history",
      JSON.stringify([
        ...oldHistory,
        invoice
      ])
    );

    // pdf
    generateInvoice(bill);

    // clear bill
    setBill([]);
  };

  return (

    <div className="billing-container">

      {/* LEFT PRODUCTS */}
      <div className="products-section">

        <h3>
          Products
        </h3>

        <div className="product-grid">

          {products
            .filter((p)=>
              p.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((p)=>(

              <ProductCard
                key={p.id}
                product={p}
                addToBill={addToBill}
              />

          ))}

        </div>

      </div>

      {/* RIGHT BILL */}
      <div className="bill-section">

        <h3>
          Bill Summary
        </h3>

        <table>

          <thead>

            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>

          </thead>

          <tbody>

            {bill.map((item)=>(

              <tr key={item.id}>

                {/* NAME */}
                <td>
                  {item.name}
                </td>

                {/* QTY */}
                <td>

                  <div className="qty-box">

                    <button
                      className="qty-btn minus-btn"
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      -
                    </button>

                    <span className="qty-number">
                      {item.qty}
                    </span>

                    <button
                      className="qty-btn plus-btn"
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                </td>

                {/* TOTAL */}
                <td>
                  ₹{
                    item.price *
                    item.qty
                  }
                </td>

                {/* REMOVE */}
                <td>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    ❌
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* TOTAL */}
        <h2>
          Total : ₹{total}
        </h2>

        {/* BUTTONS */}
        <div className="btn-group">

          <button
            className="pdf-btn"
            onClick={handlePDF}
          >
            Generate Invoice
          </button>

          <button
            className="cancel-btn"
            onClick={cancelBill}
          >
            Cancel Bill
          </button>

        </div>

      </div>

    </div>
  );
}