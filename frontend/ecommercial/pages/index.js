import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useDispatch, useSelector } from "react-redux";
import productApi from "../api/product/productApi";
import Advisement from "../components/common/Advisement";
import Banner from "../components/common/Banner";
import CategoryList from "../components/common/CategoryList";
import Layout from "../components/common/Layout";
import ProductList from "../components/product/ProductList";
import { initFirebase } from "../firebase/initFirebase";

import { getError } from "../utils/error";
import { getProductByFilter } from "../redux/product/productsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ScrollToTopButton from "../components/Common/ScrollToTopButton";

//init firebase
initFirebase();

export default function Home() {
  const dispatch = useDispatch();
  const resultList = useSelector((state) => state.products.products);
  const [industrialList, setIndustrialList] = useState([]);
  const [maxResult, setMaxResult] = useState(20);
  const [total, setTotal] = useState(0);
  const [loadMoreProduct, setLoadMoreProduct] = useState(true);

  // slideShow
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 2,
    variableWidth: true,
  };
  // slideShow

  useEffect(() => {
    const getProductList = async () => {
      const params = {
        maxResult: maxResult,
      };
      try {
        const res = await dispatch(getProductByFilter(params));
        const { total } = unwrapResult(res);
        setTotal(total);
      } catch (error) {
        console.log(getError(error));
      }
    };
    getProductList();
  }, [maxResult]);
  // handle load more by maxResult
  const handleLoadMore = () => {
    setMaxResult(maxResult + 20);
    if (maxResult >= total) {
      setLoadMoreProduct(false);
    } else {
      setLoadMoreProduct(true);
    }
  };

  useEffect(() => {
    const getIndustrialList = async () => {
      try {
        const data = await productApi.getIndustrialList();
        setIndustrialList(data);
      } catch (error) {
        console.log(getError(error));
      }
    };
    getIndustrialList();
  }, []);


  return (
    <>
      <Layout title={`Home`}>
        {/* Banner */}
        <Banner />
        {/* category list */}
        <main className="max-w-[1200px] my-2 mx-auto px-8 md:px-16  bg-gray-200 py-3">
          <section className="pt-10 mb-5">
            <h2 className="section-title">Danh mục</h2>
            <div>
              <div className="flex-1 w-full mx-auto">
                <div className="mt-2">
                  <Slider {...settings}>
                    {industrialList?.map(({ name, iconUrl, id }) => (
                      <CategoryList name={name} key={name} iconUrl={iconUrl} id={id} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* recommend */}
        <main className="max-w-[1200px] my-2 mx-auto px-16  bg-gray-200">
          <section className="py-10 mb-5 ">
            <h2 className="section-title">Gợi ý sản phẩm</h2>
            <ProductList
              productFilter={resultList}
              handleLoadMore={handleLoadMore}
              loadMoreProduct={loadMoreProduct}
            />
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
