import React, { useEffect } from "react";
import Header from "../component/Header";
import useProductStore from "../store/productStore";
import Filters from "../component/Filters";
import ProductList from "../component/ProductList";
import ProductListHeader from "../component/ProductListHeader";

const Products = () => {
  const { fetchProducts } = useProductStore((state) => ({
    fetchProducts: state.fetchProducts,
  }));

  useEffect(() => {
    fetchProducts();
  }, []);

  
  return (
    <>
      <Header title="Products" />

      <div className="flex flex-col items-start md:flex-row max-w-[85em] mx-auto ">
        <div className="md:sticky md:top-10">
          <Filters />
        </div>

        <div className="flex flex-col w-full  ">
          <ProductListHeader />

          <div>
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
