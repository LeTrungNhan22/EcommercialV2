import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaShopify } from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Layout from "../../components/common/Layout";

import { AiFillMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";

import ProductVariants from "../../components/product/ProductVariants";
import { getProductDetailById } from "../../redux/product/productDetailSlice";
import { getError } from "../../utils/error";

export default function ProductScreen() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.product);
  const shop = useSelector((state) => state.productDetail.shop);
  const variants = useSelector((state) => state.productDetail.variants);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await dispatch(getProductDetailById(id));
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

          <section>
            <div className=" w-[1400px] mb-3 grid grid-cols-3 gap-6  mx-auto bg-white p-4 rounded shadow">
              <div className="container flex col-span-1 py-2 px-4 border-2 space-x-3 border-r border-gray-200">
                <div>
                  {shop?.imageUrl && (
                    <Image
                      src={shop?.imageUrl}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="object-center object-contain"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span>{shop?.name}</span>
                  <span className="text-sm text-gray-500">
                    Online 4 giờ trước
                  </span>
                  <div className="flex gap-3  border-gray-200 pb-5  mt-3">
                    <div
                      href="#_"
                      className="cursor-pointer rounded px-3 py-2 overflow-hidden group bg-rose-300 relative hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-400 text-rose-600 hover:text-black hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300 border border-rose-600"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <div className="flex items-center space-x-2 ">
                        <AiFillMessage />
                        <span className="relative">Chat</span>
                      </div>
                    </div>
                    <div
                      href="#_"
                      className="cursor-pointer rounded px-3 py-2 overflow-hidden group bg-white-300 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300 border border-black"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <div className="flex items-center space-x-2 text-white-600 hover:text-black">
                        <FaShopify />
                        <span className="relative">Xem shop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container flex col-span-2 py-2 pl-4 justify-center">
                <div className="grid grid-cols-3 space-x-16">
                  <div className="flex flex-col justify-around">
                    <div className="space-x-3">
                      <span className="text-gray-500">Địa chỉ:</span>
                      <span className="text-rose-600">
                        {shop?.address?.address1}
                      </span>
                    </div>

                    <div className="space-x-3">
                      <span className="text-gray-500">Sản phẩm</span>
                      <span className="text-rose-600">302</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around">
                    <div className="space-x-3">
                      <span className="text-gray-500">Tỉ lệ phản hồi:</span>
                      <span className="text-rose-500">71.1k</span>
                    </div>

                    <div className="space-x-3">
                      <span className="text-gray-500">Thời gian phản hồi:</span>
                      <span className="text-rose-500">71%</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around">
                    <div className="space-x-3">
                      <span className="text-gray-500">Tham gia:</span>
                      <span className="text-rose-600">3 năm trước</span>
                    </div>

                    <div className="space-x-3">
                      <span className="text-gray-500">Người theo dõi</span>
                      <span className="text-rose-600">31.1k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* product detail */}
          <section>
            <div className=" w-[1400px]  mx-auto   bg-white p-4 pb-16 rounded shadow">
              <div className="container pb-6 px-6">
                <h3 className="border-b border-gray-200  text-gray-800 pb-3 font-medium text-3xl">
                  Chi tiết sản phẩm
                </h3>
                <div className="w-full pt-6">
                  <div className="text-gray-600 space-y-3">
                    <p>{product?.description}</p>
                  </div>
                  <div>
                    <table className="table-auto border-collapse w-full text-left my-2">
                      <tbody>
                        <tr>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium">
                            Loại sản phẩm
                          </th>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium text-blue-600">
                            {product?.name}
                          </th>
                        </tr>

                        <tr>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium">
                            Vị trí
                          </th>
                          <th className="py-2 px-2 border border-gray-200 w-40 font-medium"></th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className=" w-[1400px]  mx-auto mt-5  bg-gray-200 p-4 pb-16 rounded shadow">
              <div className="container pb-6 px-6">
                <h3 className="border-b border-rose-600  text-gray-800 pb-3 font-medium text-3xl">
                  Liên quan
                </h3>
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
