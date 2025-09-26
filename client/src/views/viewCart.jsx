import { useEffect, useState } from "react";
import './viewCart.css';
export default function ViewCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get cartId that was saved when user clicked "Shop Now"
  const cartId = localStorage.getItem("cartId");

  useEffect(() => {
    if (!cartId) {
      setError("No cart found. Please add items first.");
      setLoading(false);
      return;
    }

    async function fetchCart() {
      try {
        const res = await fetch(`http://localhost:5000/api/carts/${cartId}`);
        if (!res.ok) {
          throw new Error("Failed to load cart");
        }
        const data = await res.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [cartId]);

  const handleCheckout = () => {
    // Here you would call Flouci API (third-party payment)
    alert("Redirecting to payment with Flouci… (to be implemented)");
  };

  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart?.items?.length > 0 ? (
        <ul>
          {cart.items.map((item, index) => (
            <li key={index}>
              <strong>{item.product?.name || "Unnamed product"}</strong> — 
              Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <button onClick={handleCheckout} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Checkout with Flouci
      </button>
    </div>
  );
}
