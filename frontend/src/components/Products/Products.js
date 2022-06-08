import React, { useEffect, useState } from "react";
import "./Products.scss";
import { ProductsSerivce } from "./Products.service";
import axios from "axios";
import Card from "../Card/Card";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [ChromeLista, setChromeLista] = useState([]);

  // const removeProduct = async (id) => {
  //   const removeArr = [...products].filter((product) => product.id !== id);

  //   await axios.post("/products/remove", { id });

  //   getProducts();
  // };

  const updateCard = () => {
    var Chrome = [];
    for (var key in localStorage) {
      if (key.length > 10) {
        Chrome.push(localStorage.getItem(key));
      }
    }

    setChromeLista(Chrome);
  };

  const getProducts = () => {
    ProductsSerivce.get().then((response) => {
      setProducts(response.data.products);
    });
  };
  useEffect(() => {
    getProducts();
    updateCard();
  }, []);

  const AddToCard = (e) => {
    var list = [1];
    for (var key in localStorage) {
      if (isNaN(key) == false) {
        list.push(parseInt(key));
      }
    }
    console.log(e);
    localStorage.setItem(e[0][0], e);
    getProducts();
    updateCard();
  };
  const removeCard = (product) => {
    const productId = product.split(",")[0];

    localStorage.removeItem(productId);
    updateCard();
  };
  return (
    <div className="products-container">
      <Card ChromeLista={ChromeLista} removeCard={removeCard} />

      <h3>Produkty</h3>
      {products.map((product) => {
        if (product.name != "") {
          return (
            <div key={product._id} className="product">
              <p>{product.name}</p>
              <p>{product.desc}</p>
              <p>{product.price} zł</p>
              <button
                className="add_to_card"
                onClick={(e) =>
                  AddToCard([
                    [product._id],
                    [product.name],
                    [product.desc],
                    [product.price],
                  ])
                }
              >
                Add to Card
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Products;
