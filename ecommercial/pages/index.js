import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Advisement from "../components/common/Advisement";
import Banner from "../components/common/Banner";
import CategoryList from "../components/common/CategoryList";
import Layout from "../components/common/Layout";
import ProductList from "../components/product/ProductList";
import SmallCard from "../components/common/SmallCard";
import { getError } from "../utils/error";
import ProductContext from "../utils/Product";
import productApi from "../api/product/productApi";

export default function Home() {
  const axios = require("axios");
  const basUrl = process.env.NEXT_PUBLIC_API_URL;
  const { productFilter } = useContext(ProductContext);
  const { resultList, maxResult } = productFilter;
  const [industrialList, setIndustrialList] = useState([]);

  // slideShow
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
  };
  // slideShow

  useEffect(() => {
    const getIndustrialList = async () => {
      try {
        await axios
          .get(`${basUrl}/product/1.0.0/product/industrials`)
          .then(function (response) {
            const { data } = response;

            setIndustrialList(data);
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } catch (error) {
        console.log(getError(error));
      }
    };
    getIndustrialList();
  }, []);
  // useEffect(() => {
  //   const getProductList = async () => {
  //     try {
  //       const res = await productApi.getProductFilter();
  //       console.log(res);
  //     } catch (error) {
  //       console.log(getError(error));
  //     }
  //   };
  //   getProductList();
  // }, []);

  return (
    <>
      <Layout title={`Home`}>
        {/* Banner */}
        <Banner />
        {/* Banner */}n
        {/* <main className="max-w-[1200px] my-2 mx-auto px-16  bg-gray-200">
          <section className="pt-10 mb-5">
            <h2 className="section-title">Dịch vụ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-2">
              {serviceData?.map(({ img, serviceName }) => (
                <SmallCard img={img} key={img} serviceName={serviceName} />
              ))}
            </div>
          </section>
        </main> */}
        {/* category list */}
        <main className="max-w-[1200px] my-2 mx-auto px-8 md:px-16  bg-gray-200 py-3">
          <section className="pt-10 mb-5">
            <h2 className="section-title">Danh mục</h2>
            <div>
              <div className="flex-1 w-full mx-auto">
                <div className="mt-2">
                  <Slider {...settings}>
                    {industrialList?.map(({ name, iconUrl }) => (
                      <CategoryList name={name} key={name} iconUrl={iconUrl} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* recommend */}
        <main className="max-w-[1200px] my-2 mx-auto px-16  bg-gray-200">
          <section className="pt-10 mb-5">
            <h2 className="section-title">Gợi ý sản phẩm</h2>
            <ProductList productFilter={resultList} />
          </section>
        </main>
        {/* recommend */}
        {/* category list */}
      </Layout>
      {/* advisement */}
      <Advisement />
      {/* advisement */}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
