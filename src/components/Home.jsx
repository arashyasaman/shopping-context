import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";

function Home() {
  const {
    state: { products },
    productState: { byStock, byDelivery, byRating, sort, searchQuery },
  } = CartState();

  const transformProduct = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((item) => item.inStock);
    }

    if (byDelivery) {
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (item) => item.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="Home container">
      <div className="row">
        <div className="col-md-3">
          <Filter />
        </div>
        <div className="col-md-9">
          <div className="row">
            {transformProduct().map((item, index) => {
              return <SingleProduct product={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
