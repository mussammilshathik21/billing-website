export default function BillTable({ bill, setBill }) {

  const increaseQty = (id) => {
    setBill(
      bill.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setBill(
      bill
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0) // remove if 0
    );
  };

  const removeItem = (id) => {
    setBill(bill.filter(item => item.id !== id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Total</th>
          <th>❌</th>
        </tr>
      </thead>

      <tbody>
        {bill.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>

            <td>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              {item.qty}
              <button onClick={() => increaseQty(item.id)}>+</button>
            </td>

            <td>{item.price * item.qty}</td>

            <td>
              <button onClick={() => removeItem(item.id)}>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}