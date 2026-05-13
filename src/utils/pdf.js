import jsPDF from "jspdf";

export const generateInvoice = (bill = []) => {
  if (!bill.length) {
    alert("No items to generate invoice");
    return;
  }

  // 🧾 Thermal receipt size
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 200], // receipt width
  });

  let y = 8;

  // =========================
  // SHOP HEADER
  // =========================

  doc.setFont("courier", "bold");
  doc.setFontSize(14);

  doc.text("SHATHIK BAKERY", 40, y, { align: "center" });

  y += 5;

  doc.setFontSize(9);
  doc.setFont("courier", "normal");

  doc.text("Tenkasi, Tamil Nadu", 40, y, { align: "center" });

  y += 4;

  doc.text("Ph: 8870394549", 40, y, { align: "center" });

  y += 5;

  doc.text("--------------------------------", 40, y, {
    align: "center",
  });

  y += 5;

  // =========================
  // DATE + BILL
  // =========================

  const now = new Date();

  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  doc.text(`Date : ${date}`, 5, y);

  y += 4;

  doc.text(`Time : ${time}`, 5, y);

  y += 4;

  doc.text(`Bill : ${Date.now()}`, 5, y);

  y += 5;

  doc.text("--------------------------------", 40, y, {
    align: "center",
  });

  y += 5;

  // =========================
  // TABLE HEADER
  // =========================

  doc.setFont("courier", "bold");

  doc.text("Item", 5, y);
  doc.text("Qty", 38, y);
  doc.text("Rate", 50, y);
  doc.text("Amt", 67, y);

  y += 3;

  doc.text("--------------------------------", 40, y, {
    align: "center",
  });

  y += 5;

  // =========================
  // ITEMS
  // =========================

  doc.setFont("courier", "normal");

  let grandTotal = 0;

  bill.forEach((item) => {
    const amount = item.price * item.qty;

    grandTotal += amount;

    // item name
    doc.text(item.name.substring(0, 14), 5, y);

    // qty
    doc.text(String(item.qty), 40, y);

    // rate
    doc.text(item.price.toFixed(2), 50, y);

    // amount
    doc.text(amount.toFixed(2), 65, y);

    y += 5;
  });

  // =========================
  // TOTAL
  // =========================

  y += 2;

  doc.text("--------------------------------", 40, y, {
    align: "center",
  });

  y += 6;

  doc.setFont("courier", "bold");
  doc.setFontSize(12);

  doc.text("TOTAL", 5, y);

  doc.text(`Rs ${grandTotal.toFixed(2)}`, 52, y);

  y += 8;

  // =========================
  // FOOTER
  // =========================

  doc.setFont("courier", "normal");
  doc.setFontSize(9);

  doc.text("Thank You Visit Again!", 40, y, {
    align: "center",
  });

  y += 4;

  doc.text("Powered by Shathik Bakery", 40, y, {
    align: "center",
  });

  // =========================
  // SAVE
  // =========================

  doc.save("bakery-bill.pdf");
};