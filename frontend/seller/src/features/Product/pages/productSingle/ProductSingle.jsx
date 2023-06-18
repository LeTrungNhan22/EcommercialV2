import { Publish } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import { getProductSingle } from "../../productSingleSlice";
import "./ProductSingle.scss";
import ProductVariant from "./ProductVariant";


export default function ProductSingle() {
  const history = useHistory();
  const dispatch = useDispatch();

  // getProductId from url
  const productId = history.location.pathname.split("/")[3];
  // console.log(productId);

  const product = useSelector((state) => state.productSingle.productSingle.product);
  const shop = useSelector((state) => state.productSingle.productSingle.shop);
  const variants = useSelector((state) => state.productSingle.productSingle.variants);

  useEffect(() => {
    // get product from api
    const getProductDetail = async () => {
      try {
        await dispatch(getProductSingle(productId));
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
          <Link to="/seller/newProduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <div className="ProductInfoTop">
            <img
              src={product?.featuredImageUrl}
              className="productInfoImg"
              alt={product?.name}
            />
            <span className="productName">{product?.name}</span>
          </div>
          <div className="ProductInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Product ID:</span>
              <span className="productInfoValue">{product?.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product?.mediumPrice.amount} {product?.mediumPrice.currencyCode}</span>

            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Loại:</span>
              <span className="productInfoValue">{product?.industrialTypeName}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Created At:</span>
              <span className="productInfoValue">{formatDate(product?.createdAt)}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Updated At:</span>
              <span className="productInfoValue">{formatDate(product?.updatedAt)}</span>
            </div>

          </div>
        </div>
        <div className="productTopRight">
          <div className="ProductInfoTop">
            <img
              src={shop?.imageUrl}
              className="productInfoImg"
              alt={shop?.name}
            />
            <span className="productName">{shop?.name}</span>
          </div>
          <div className="ProductInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Shop ID:</span>
              <span className="productInfoValue">{shop?.shopId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Status:</span>
              <span className="productInfoValue">{shop?.status}</span>
            </div>
            <div className="productInfoLongItem">
              <span className="productInfoKey">Address:</span>
              <span className="productInfoValue">{shop?.address.address1}</span>
            </div>

          </div>
        </div>
      </div>

      {variants && variants.map((variant) => (
        <ProductVariant key={variant?.id} variant={variant} />
      ))}

    </div>
  );
}
