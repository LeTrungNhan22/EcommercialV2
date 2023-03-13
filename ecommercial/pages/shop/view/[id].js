import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../../components/common/Layout";
import { getProductByFilter } from "../../../redux/product/productsSlice";

const ShopViewScreen = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const [shopProducts, setShopProducts] = React.useState([]);
    useEffect(() => {
        const params = {
            shopId: id,
        };
        const getShopProducts = async () => {
            const res = await dispatch(getProductByFilter(params))
            setShopProducts(res.payload);
        }
        if (id) {
            getShopProducts();
        }
        // getShopProducts();
    }, [id]);
    console.log(shopProducts.resultList);
    return <>
        <Layout title={`Shop view`}>
            {/* shop detail section */}
            <section>
                <main className=" bg-white h-52 mx-auto ">

                </main>
            </section>
            {/* shop detail section */}
        </Layout>
    </>;
};

export default ShopViewScreen;
