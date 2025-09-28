import { useEffect, useState } from "react";
//import './viewCart.css';
import { Link } from "react-router-dom";

export default function ViewCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: ""
  });

  const cartId = localStorage.getItem("cartId");

  // Fetch cart data
  useEffect(() => {
    if (!cartId) {
      setError("No cart found. Please add items first.");
      setLoading(false);
      return;
    }

    async function fetchCart() {
      try {
        const res = await fetch(`http://localhost:5000/api/carts/${cartId}`);
        if (!res.ok) throw new Error("Failed to load cart");
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

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.zip || !shipping.country) {
      alert("Please fill out all shipping details before checkout!");
      return;
    }

    const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    alert(`Thank you for your purchase!\nTotal: $${total}\nShipping to: ${shipping.address}, ${shipping.city}, ${shipping.country}`);
    // Here you would integrate a real payment API
  };

  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center"> Your Cart</h1>

      {cart?.items?.length > 0 ? (
        <>
          <div className="row g-4 mb-4">
            {cart.items.map((item, index) => {
              const imgSrc = item.product.images && item.product.images.length > 0 
                              ? item.product.images[0] 
                              : "/no-image.jpg";

              return (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <img 
                      src={imgSrc} 
                      className="card-img-top" 
                      alt={item.product.name} 
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.product.name}</h5>
                      <p className="card-text text-muted">{item.product.category}</p>
                      <p className="card-text flex-grow-1">{item.product.description}</p>
                      <p className="fw-bold mb-2">Price: ${item.product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p className="fw-bold">Subtotal: ${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shipping Info */}
          <div className="card p-4 mb-4 shadow-sm">
            <h4 className="mb-3"> Shipping Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Full Name" 
                  name="name"
                  value={shipping.name}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Address" 
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="City" 
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="ZIP Code" 
                  name="zip"
                  value={shipping.zip}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Country" 
                  name="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Total & Checkout */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h3>
              Total: $
              {cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
            </h3>
            <button className="btn btn-success btn-lg" onClick={handleCheckout}>
               Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty. Add some products first!</p>
      )}

      <div className="text-center">
        <Link to="/" className="btn btn-outline-primary mt-3"> Continue Shopping</Link>
      </div>
    </div>
  );
}

