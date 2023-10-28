import React, { useEffect } from "react";
import useProductStore from "../store/productStore";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    products,
    filteredProducts,
    selectedCategory,
    selectedBrand,
    selectedPrice,
    setFilteredProducts,
    gridView,
  } = useProductStore((state) => ({
    products: state.products,
    gridView: state.gridView,
    filteredProducts: state.filteredProducts,
    selectedCategory: state.selectedCategory,
    selectedBrand: state.selectedBrand,
    selectedPrice: state.selectedPrice,
    setFilteredProducts: state.setFilteredProducts,
  }));

  useEffect(() => {
    const filtered = products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (selectedBrand && product.company !== selectedBrand) {
        return false;
      }
      if (product.price > selectedPrice) {
        return false;
      }
      return true;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedBrand, selectedPrice]);

  if (filteredProducts.length < 1) {
    return (
      <h2 className="mt-10 ml-5 text-xl">
        Sorry, no products matched your search.
      </h2>
    );
  }

  return (
    <div>
      {gridView ? (
        <GridView products={filteredProducts} />
      ) : (
        <ListView products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductList;
