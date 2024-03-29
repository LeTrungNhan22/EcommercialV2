/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Layout from "../../components/Common/Layout";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumbLine";
import ProductsRelated from "../../components/Product/ProductsRelated";
import ProductVariants from "../../components/Product/ProductVariants";
import ShopDetail from "../../components/Shop/ShopDetail";
import { getProductDetailById } from "../../redux/product/productDetailSlice";
import { getError } from "../../utils/error";
import LanguageContext from "../../context/languageContext";

export default function ProductScreen() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.product);
  const shop = useSelector((state) => state.productDetail.shop);
  const variants = useSelector((state) => state.productDetail.variants);
  const { languageData } = useContext(LanguageContext);
  const {
    product_details,
    add_product_industry,
    add_product_name,
    from_the_same_shop,
    product_see_more, button_see_more_product
  } = languageData;


  useEffect(() => {
    const getProductDetail = async () => {
      try {
        await dispatch(getProductDetailById(id));
      } catch (error) {
        console.log(getError(error));
      }
    };
    if (id != null) {
      getProductDetail();
    } else {
      return <div>Không tìm thấy thông tin sản phẩm</div>;
    }
  }, [id]);
  // console.log(shop);
  // console.log(variants);

  return (
    <>
      <Layout>
        <div className="bg-gray-300 pb-10 ">
          <BreadCrumb
            industrialTypeName={product?.industrialTypeName}
            title={product?.name}
            pid={product?.id}
          />
          <ProductVariants product={product} variants={variants} />

          {/* product detail */}
          <ShopDetail
            shop={shop}
          />

          <section>
            <div className=" w-[1400px]   mx-auto   bg-white p-4 pb-16 rounded shadow">
              <div className="container pb-6 px-6">
                <h3 className="border-b border-gray-200  text-gray-800 pb-3 font-medium text-3xl">
                  {product_details}
                </h3>
                <div className=" pt-6">
                  <div className="text-gray-600 space-y-3 overflow-hidden text-ellipsis">
                    <pre className="font-sans ">{product?.description}</pre>
                  </div>
                  <div>
                    <table className="table-auto border-collapse w-full text-left my-2">
                      <tbody>
                        <tr>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium">
                            {add_product_name}
                          </th>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium text-blue-600">
                            {product?.name}
                          </th>
                        </tr>

                        <tr>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium">
                            {add_product_industry}
                          </th>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium text-blue-600">
                            {product?.industrialTypeName}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className=" w-[1400px]  mx-auto mt-5  bg-gray-200 p-4 rounded shadow">
              <div className="container pb-6 px-6">
                <h3 className="border-b border-rose-600  text-gray-800 pb-3 font-medium text-3xl">
                  {from_the_same_shop}
                </h3>
                <div className="   mx-auto mt-5  bg-gray-200 ">
                  <ProductsRelated
                    product_see_more={product_see_more}
                    button_see_more_product={button_see_more_product}
                    industrialId={product?.industrialId} />
                </div>
              </div>
            </div>
          </section>
          {/* product detail end */}
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}
