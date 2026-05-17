import "../styles/product.css";

export default function ProductCard({
  product,
  addToBill
}) {

  return (

    <div
      className="product-card"
      onClick={() => addToBill(product)}
    >

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
      />

      {/* TEXT */}
      <div className="text">

        <h4>
          {product.name}
        </h4>

        <p>
          ₹{product.price}
        </p>

      </div>

    </div>

  );
}