import React, { useState, useEffect } from "react";
import axios from "axios";

import Separator from "./elements/Separator";

import "./App.css";
import "./main.scss";

import NoteToDev from "./components/NoteToDev";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("https://s3.amazonaws.com/open-to-cors/assignment.json")
      .then((res) => {
        let obj = res.data.products;

        //remove null from object
        let o = Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v != null)
        );

        //get values of object which are object themselves into an array
        let arrProduct = Object.values(o);

        //GET THE ARRAY IN DESCENDING ORDER OF "POPULARITY"
        let descProduct = arrProduct.sort(function (a, b) {
          return b.popularity - a.popularity;
        });

        // console.log(Object.keys(o).length);

        setProducts(descProduct);

        console.log(descProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>SmartServ Interview Project</h1>
      <Separator />
      <NoteToDev />
      <Separator />
      <div className="content-wrapper card-layout">
        {products.map((item, index) => {
          return (
            <div className="cards-item" key={index}>
              <p>{item.title}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
