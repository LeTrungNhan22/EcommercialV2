import Image from "next/image";
import { default as React, useEffect } from 'react';
import { FaShopify } from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AiFillMessage } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProductByFilter } from "../../redux/product/productsSlice";
import moment from "moment";


const ShopDetail = ({ shop }) => {
    const dispatch = useDispatch();
    const [shopProducts, setShopProducts] = React.useState([]);
    const [durationDays, setDurationDays] = React.useState(0);
    useEffect(() => {
        const params = {
            shopId: shop?.shopId,
        };
        const getShopProducts = async () => {
            const res = await dispatch(getProductByFilter(params))
            setShopProducts(res.payload);
        }
        if (shop?.shopId) {
            getShopProducts();
        }
        // getShopProducts();
    }, [shop?.shopId]);


    useEffect(() => {
        const firstItem = shopProducts?.resultList?.[0];
        if (firstItem) {
            const startDate = moment(firstItem.createdAt);
            const endDate = moment();
            const durationInDays = endDate.diff(startDate, 'days');
            setDurationDays(durationInDays);
        }
    }, [shopProducts?.resultList]);




    if (!shop) return <div>Loading...</div>;

    return (
        <div>
            <section>
                <div className=" w-[1400px] mb-3 grid grid-cols-3 gap-6  mx-auto bg-white p-4 rounded shadow">
                    <div className="container flex col-span-1 py-2 px-4 border-2 space-x-3 border-r border-gray-200 bg-cover bg-center"
                        style={{ "background-image": "url(https://images.unsplash.com/photo-1672699303821-34b69a75f49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }}
                    >
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
                                <Link
                                    href={`/shop/view/${shop?.shopId}`}

                                >
                                    <a
                                        target="_blank" rel="noopener noreferrer"
                                        className="cursor-pointer rounded px-3 py-2 overflow-hidden group bg-white-300 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300 border border-black"
                                    >
                                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        <div className="flex items-center space-x-2 text-white-600 hover:text-black">
                                            <FaShopify />
                                            <span className="relative">Xem shop</span>
                                        </div>
                                    </a>

                                </Link>

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
                                    <span className="text-rose-600">{shopProducts?.total}</span>
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
                                    <span className="text-rose-600">{durationDays} ngày trước</span>
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
        </div>
    )
}

export default ShopDetail