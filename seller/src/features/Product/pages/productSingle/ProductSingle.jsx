import { Publish } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getProductSingle } from "../../productSingleSlice";

import "./ProductSingle.scss";

export default function ProductSingle() {
  const history = useHistory();
  const dispatch = useDispatch();

  // getProductId from url
  const productId = history.location.pathname.split("/")[2];
  console.log(productId);

  const product = useSelector((state) => state.productSingle.productSingle.product);
  const shop = useSelector((state) => state.productSingle.productSingle.shop);
  const variants = useSelector((state) => state.productSingle.productSingle.variants);

  useEffect(() => {
    // get product from api
    const getProductDetail = async () => {
      try {
        const detailAction = await dispatch(getProductSingle(productId));
        console.log(detailAction);
      } catch (err) {
        console.log(err);
      }
    };
    if (productId) getProductDetail();

  }, [dispatch, productId]);




  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <div className="buttonContainer">
          <button
            onClick={() => history.goBack()}
            className="backButton">Back</button>
          <Link to="/newProduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <div className="ProductInfoTop">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
              className="productInfoImg"
              alt=""
            />
            <span className="productName">Apple AirPods</span>
          </div>
          <div className="ProductInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">no</span>
            </div>
          </div>
        </div>
        <div className="productTopRight">
          <div className="ProductInfoTop">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
              className="productInfoImg"
              alt=""
            />
            <span className="productName">Apple AirPods</span>
          </div>
          <div className="ProductInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">no</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form action="" className="productForm">
          <div className="productFormLeft">
            <label htmlFor="">Product Name</label>
            <input type="text" placeholder="Apple AirPods" />
            <label htmlFor="">In Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label htmlFor="">Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
