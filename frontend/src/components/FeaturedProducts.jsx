import './FeaturedProducts.css';
import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCart();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="featured">
      <div className="container">
        <h2 className="featured__title">Featured</h2>
        <div className="featured__slider">
          <div className="featured__track-wrap" style={{ overflow: "hidden" }}>
            <div
              className="featured__track"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="featured__slide"
                    style={{ width: `${100 / itemsPerPage}%` }}
                  >
                    <div className="featured__card">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="featured__card-img"
                      />
                      <div className="featured__card-body">
                        <h3 className="featured__card-name">{product.name}</h3>
                        <p className="featured__card-price">₹{product.price.toFixed(2)}</p>
                        <button
                          onClick={() => addToCart(product)}
                          className="btn btn--primary btn--full"
                        >
                          <ShoppingCart size={20} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                null
              )}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`slider-btn slider-btn--prev ${
              isStartDisabled ? "slider-btn--disabled" : "slider-btn--active"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`slider-btn slider-btn--next ${
              isEndDisabled ? "slider-btn--disabled" : "slider-btn--active"
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeaturedProducts;
