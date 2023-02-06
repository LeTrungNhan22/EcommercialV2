import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getError } from "./error";
import { useRouter } from "next/router";
import moment from "moment";

export const ProductContext = createContext({
  productFilter: {},
  loadProduct: () => {},
});

export const ProductContextProvider = ({ children }) => {
  const basUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productFilter, setProductFilter] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getProductFilter = async () => {
      try {
        await axios
          .post(
            `${basUrl}/product/1.0.0/product/filter`,
            { maxResult: 35 },
            {
              headers: {
                "Content-Type": "application/json",
                charset: "utf-8",
              },
            }
          )
          .then(function (response) {
            const { data } = response;
            console.log(data);
            setProductFilter(data);
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } catch (error) {
        console.log(getError(error));
      }
    };
    getProductFilter();
  }, []);

  const loadProductMore = async () => {};

  const context = {
    productFilter,
  };
  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
