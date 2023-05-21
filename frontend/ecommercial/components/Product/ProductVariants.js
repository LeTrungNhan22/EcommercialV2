import Image from "next/image";
import { default as React, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaDollarSign,
  FaFacebook,
  FaInstagram,
  FaShoppingBag,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import cartApi from "../../api/cart/cartApi";
import AuthContext from "../../context/authContext";
import { addToCart, createCartItems, getCartDetailByUserId } from "../../redux/cart/cartSlice";
import { getProductVariantById } from "../../redux/product/productDetailSlice";

export default function ProductVariants({ product, variants }) {
  const [originalPrice, setOriginalPrice] = useState(0);
  const [productSingle, setProductSingle] = useState({});
  const [dimension, setDimension] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { isLogin, user } = useContext(AuthContext);
  const [variantDetail, setVariantDetail] = useState({});
  const [cartDetail, setCartDetail] = useState({});

  useEffect(() => {
    setProductSingle(product);
    setOriginalPrice(productSingle?.mediumPrice?.amount);
  }, [product]);

  if (variants.length === 0) {
    return <div>Loading....</div>;
  }

  if (product === null) {
    return <div>Loading....</div>;
  }
  if (variantDetail === null) {
    return <div>Loading....</div>;
  }

  const getImageUrl = (url) => {
    const relatedImageUrl = product?.imageUrls.find((image) => image === url);
    return relatedImageUrl || url;
  };

  const updateImage = (
    price,
    imageUrl,
    dimension,
    { productId, variantId }
  ) => {
    setProductSingle({
      ...productSingle,
      featuredImageUrl: imageUrl,
      options: { variantId: variantId, productId: productId },
    });
    setOriginalPrice(price);
    setDimension(dimension);
    getVariantDetail(variantId);
  };

  // console.group("productVariants");
  // console.log({ product: productSingle, variants: variants });
  // console.log({ dimension: dimension });
  // console.groupEnd();

  // increment
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    // decrement not less than 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  const handleAddToCart = async (productAddToCart) => {
    if (isLogin == false) {
      toast.error("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    }
    if (dimension == null) {
      toast.error("Hãy chọn một loại sản phẩm");
      setSelectedVariant(false);
    } else {
      setSelectedVariant(true);
      const {
        options,
        name,
        shopId,
        industrialId,
        industrialTypeName,
        description,
        featuredImageUrl,
      } = productAddToCart;
      try {
        const addToCartAction = dispatch(
          addToCart({
            quantity,
            options,
            name,
            shopId,
            industrialId,
            industrialTypeName,
            description,
            featuredImageUrl,
            options,
          })
        );

        try {
          const response = await cartApi.getCartDetailByUserId(user?.id);
          if (response.cart !== null) {
            const { cart } = response;
            setCartDetail(cart);
            const data = {
              cartId: cart?.id,
              productVariant: variantDetail,
              quantity: quantity,
              shopId: shopId,
            };
            // create cart item to api
            try {
              const response = await cartApi.createCartItems(data);
              // console.log({ response: response });
              const userId = user?.id;
              if (userId === undefined) {
                return;
              }
              await dispatch(getCartDetailByUserId({ userId }));
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getVariantDetail = async (variantId) => {
    try {
      const response = await dispatch(getProductVariantById(variantId));
      if (response.payload === null) {
        return;
      } else {
        console.log({ response: response.payload });
        setVariantDetail(response.payload);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log({ variantDetail: variantDetail, cartDetail: cartDetail });

  return (
    <>
      <section>
        <div className=" w-[1400px] mb-3 grid grid-cols-2 gap-6  mx-auto bg-white p-4 rounded shadow">
          {/* product image */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full">
              <div className="image-container">
                <picture>
                  <img
                    className="rounded bg-[#ebebeb] w-[400px] h-[400px] cursor-pointer transition ease-in-out mx-auto"
                    src={productSingle?.featuredImageUrl}
                    alt="product-image"
                  />
                </picture>
              </div>

              <div className="flex gap-3  mt-5 items-center justify-center">
                {variants.length
                  ? variants.map((variant, index) => (
                      <picture key={index}>
                        <img
                          alt={variant.productName}
                          src={getImageUrl(variant.imageUrl)}
                          className="w-[70px] h-[70px] bg-[#ebebeb] cursor-pointer"
                          onClick={() =>
                            updateImage(
                              variant?.price.amount,
                              getImageUrl(variant?.imageUrl),

                              variant?.dimension,
                              {
                                variantId: variant.id,
                                productId: variant.productId,
                              }
                            )
                          }
                        />
                      </picture>
                    ))
                  : null}
              </div>
            </div>
          </div>

          {/* product image */}

          {/* product content */}
          <div>
            <h2 className="text-3xl font-medium uppercase mb-2">
              {productSingle?.name}
            </h2>

            <div className="space-y-3">
              <div className="text-gray-800 font-normal space-x-2 text-xl">
                <span>Loại sản phẩn:</span>
                <span className="text-rose-500">
                  {productSingle?.industrialTypeName}
                </span>
              </div>
            </div>
            <div className="my-4">
              <Image
                src="https://cf.shopee.vn/file/4533a6c752823c3bc7491d3267e20bf2"
                alt=""
                height={44}
                width={665}
                className=""
              ></Image>
            </div>
            <div className="flex items-baseline mb-1 space-x-2 font-bold mt-4 flex-col">
              <p className="text-4xl text-rose-600 font-semibold">
                <span className="text-gray-500 text-xl">Giá: </span>
                {originalPrice}
                {productSingle?.mediumPrice?.currencyCode}
              </p>

              {/* <p className="text-base text-gray-400 font-semibold line-through">
          $50.00
        </p> */}
            </div>
            <p className="mt-4 text-gray-400 line-clamp-4">
              {productSingle?.description}
            </p>
            <div className="mt-4 grid grid-cols-4 space-x-5">
              <h3 className="text-md text-gray-800 uppercase font-medium">
                Kích cỡ
              </h3>
              {dimension != null ? (
                <div>
                  <div className=" flex items-center text-gray-500">
                    <span>{dimension.length}</span>x
                    <span>{dimension.width}</span>x
                    <span>{dimension.height}</span>
                    <span>{dimension.dimensionUnit}</span>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">Hãy chọn một màu</span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 space-x-5">
              <h3 className="text-md text-gray-800 uppercase font-medium">
                Màu sắc
              </h3>
              <div>
                <div className=" flex items-center gap-2">
                  {/* single color */}

                  {variants?.map((variant) => (
                    <div className="color-selector" key={variant.id}>
                      <input
                        type="radio"
                        name="color"
                        className="hidden"
                        id={`color-${variant.color}`}
                        onClick={() =>
                          updateImage(
                            variant?.price.amount,
                            getImageUrl(variant?.imageUrl),
                            variant?.dimension,
                            {
                              variantId: variant.id,
                              productId: variant.productId,
                            }
                          )
                        }
                      />
                      <label
                        htmlFor={`color-${variant.color}`}
                        className={`border border-gray-200 rounded-sm h-7 w-10 block cursor-pointer shadow-sm`}
                        style={{
                          backgroundColor: variant.color,
                        }}
                      ></label>
                    </div>
                  ))}

                  {/* single color */}
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 space-x-5 items-center mb-3">
              <h3 className="text-md text-gray-800 uppercase font-medium">
                Số lượng
              </h3>
              <div>
                <div className=" flex border  border-gray-300 text-gray-300 w-max divide-x divide-gray-300">
                  <div
                    onClick={() => {
                      decrementQuantity();
                    }}
                    className="text-green-500 select-none h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
                  >
                    -
                  </div>
                  <div className="select-none font-semibold text-black h-8 w-8 text-base flex items-center justify-center">
                    {quantity}
                  </div>
                  <div
                    onClick={() => {
                      incrementQuantity();
                    }}
                    className=" text-red-500 select-none h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            {selectedVariant == null ? (
              ""
            ) : selectedVariant == false ? (
              <span className="text-red-500">
                Hãy chọn một loại sản phẩm để thêm vào giỏ hàng
              </span>
            ) : null}

            <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
              <div
                href="#_"
                className="cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-rose-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <div className="flex items-center space-x-2">
                  <FaShoppingBag />
                  <button
                    onClick={() => handleAddToCart(productSingle)}
                    className="relative"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              <div
                href="#_"
                className="cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-rose-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <div className="flex items-center space-x-2">
                  <FaDollarSign />

                  <a className="relative">Mua ngay</a>
                </div>
              </div>
            </div>
            {/* social share */}
            <div className="flex gap-3 mt-4">
              <a
                href=""
                className="text-gray-400 hover:text-gray-800 h-10 w-10 rounded-full border
          border-gray-300 flex items-center justify-center"
              >
                <FaFacebook />
              </a>
              <a
                href=""
                className="text-gray-400 hover:text-gray-800 h-10 w-10 rounded-full border
          border-gray-300 flex items-center justify-center"
              >
                <FaInstagram />
              </a>
              <a
                href=""
                className="text-gray-400 hover:text-gray-800 h-10 w-10 rounded-full border
          border-gray-300 flex items-center justify-center"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* product content */}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
