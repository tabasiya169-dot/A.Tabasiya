import productImage from "./assets/download.jpg";
import "./ProductCard.css";

const ProductCard = () => {
  return (
    <div className="productCard">
      <img src={productImage} alt="Product" />
      <h2>Smart Watch</h2>
      <p>₹1999</p>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductCard;