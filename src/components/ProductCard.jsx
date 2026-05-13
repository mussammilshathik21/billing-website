
import "../styles/product.css";

export default function ProductCard({ product, addToBill }) {
  return (
    <div className="product-card" onClick={() => addToBill(product)}>
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
    </div>
  );
}