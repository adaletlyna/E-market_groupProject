
import { Link, useLocation } from "react-router-dom";

const Favorites = () => {
  const location = useLocation();
  const favoriteCart = location.state?.favoriteCart || [];

  const handleBuyNow = (product) => {
    alert(
      `You bought ${product.quantity} of "${product.name}" for $${product.price * product.quantity}`
    );
    // Here you could integrate a real payment API
  };

  return (
    <div className="container p-4">
      {/* Navigation Links */}
      <div className="mb-3">
        <Link to="/" className="me-3 btn btn-outline-primary">🏠 Home</Link>
        <Link to="/dashboard" className="btn btn-outline-secondary">📊 Dashboard</Link>
      </div>

      <h1 className="mb-4">Favorite Cart</h1>

      {favoriteCart.length === 0 ? (
        <p>No products in favorites.</p>
      ) : (
        <div className="row g-4">
          {favoriteCart.map((p) => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image || "/no-image.jpg"}
                  className="card-img-top"
                  alt={p.name}
                  onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text flex-grow-1">{p.description}</p>
                  <p className="fw-bold mb-2">${p.price}</p>
                  <p>Quantity: {p.quantity}</p>

                  {/* Buy Now Button for this product */}
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleBuyNow(p)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;