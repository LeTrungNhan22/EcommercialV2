import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/common/Layout";
import ShopDetail from "../../../components/Shop/ShopDetail";
import ShopProductItem from "../../../components/Shop/ShopProductItem";
import ShopProductItems from "../../../components/Shop/ShopProductItem";
import ShopView from "../../../components/Shop/ShopView";
import { getProductByFilter } from "../../../redux/product/productsSlice";
import { getShopDetailById } from "../../../redux/shop/shopSlice";

const ShopViewScreen = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const [shopProducts, setShopProducts] = React.useState([]);
    const [maxResult, setMaxResult] = React.useState(10);
    const [total, setTotal] = React.useState(0);
    const shopDetail = useSelector((state) => state.shop.shop);

    useEffect(() => {
        const params = {
            shopId: id,
        };
        const getShopProducts = async () => {
            const res = await dispatch(getProductByFilter(params))
            const { total, maxResult, resultList } = res.payload;
            setShopProducts(resultList);
            setMaxResult(maxResult);
            setTotal(total);
        }
        if (id) {
            getShopProducts();
        }
        // getShopProducts();
    }, [id]);
    // get first item
    useEffect(() => {
        const getShopDetail = async () => {
            const res = await dispatch(getShopDetailById(id));
        }
        if (id) {
            getShopDetail();
        }
    }, [id]);
    console.group("shop detail");
    console.log({ shopDetail, shopProducts, maxResult, total });
    console.groupEnd();



    return <>
        <Layout title={`Shop view`}>
            {/* shop detail section */}
            <div className="bg-gray-100 h-full pt-6 pb-3 ">
                {/*  */}
                <ShopView
                    shop={shopDetail} />
                {/*  */}
                <div className="w-[1400px] mx-auto bg-gray-100 py-3 rounded-md pb-4">
                    <div className="container mx-auto my-12 px-4 md:px-12">
                        <div className="grid grid-cols-6  gap-10">
                            <div className="col-span-1">
                                <h2 className="text-2xl font-medium mb-6">Danh mục</h2>
                            </div>
                            <div className="col-span-5">
                                <h2 className="text-2xl font-medium mb-6">Tất cả sản phẩm</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                                    {shopProducts.map((product) => (
                                        <ShopProductItem key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* shop detail section */}

            </div>



        </Layout>
    </>;
};

export default ShopViewScreen;
