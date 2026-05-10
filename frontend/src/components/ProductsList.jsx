import './ProductsList.css';
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProduct();

  const [prds, setPrds] = useState([]);
  useEffect(() => {
    if(products?.length > 15) {
      setPrds(products.slice(0, 15));
    } else {
      setPrds(products);
    }
  }, [products]);

  return (
    <motion.div
      className="products-table-wrap"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table className="products-table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Featured</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {prds?.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="product-thumb">
                    <img
                      className="product-thumb__img"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="product-thumb__name">
                      {product.name}
                    </div>
                  </div>
                </td>
                <td>
                  ₹{product.price.toFixed(2)}
                </td>
                <td>
                  {product.category}
                </td>
                <td>
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`star-btn ${product.isFeatured ? "star-btn--active" : "star-btn--inactive"}`}
                  >
                    <Star size={20} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="delete-btn"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default ProductsList;
