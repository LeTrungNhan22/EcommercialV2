import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"
import styled from "@emotion/styled";
import { Tooltip, tooltipClasses } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState } from "react";

import { useDispatch } from "react-redux";
import AuthContext from "../../../context/authContext";
import { useEffect } from "react";
import { orderFilter } from "../orderSlice";
const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 450,
    },
});
export default function OrderScreen() {
    const { user } = useContext(AuthContext);
    const [orderFilterList, setOrderFilterList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const getOrderFilter = async () => {
            const filter = {
                shopId: user?.shop?.shopId,
                type: "PURCHASE",
            }
            try {
                const filterOrder = await dispatch(orderFilter(filter))
                console.log("filterOrder", filterOrder);
                const unwrapResult = filterOrder.payload
                console.log("unwrapResult", unwrapResult);
                setOrderFilterList(unwrapResult?.resultList);
            } catch (err) {
                console.log(err)
            }
        }
        getOrderFilter();
    }, []);
    console.log("orderFilter", orderFilterList);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params?.row?.id}
                    </div>
                );
            },
        },

        {
            field: "customer",
            headerName: "Customer",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">

                        <span className="productListName" style={{ whiteSpace: "pre-wrap" }}>
                            {params?.row?.emailCustomer}
                        </span>
                    </div>
                );
            },
        },
        {
            field: "price",
            headerName: "TotalPrice",
            width: 140,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {Number(params.row.totalPrice.amount).toLocaleString()}{" "}
                        {params.row.mediumPrice?.currencyCode}
                    </div>
                );
            }
        },
        {
            field: "phoneCustomer",
            headerName: "PhoneCustomer",
            width: 140,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.phoneCustomer}
                    </div>
                );
            }
        },
        {
            field: "status",
            headerName: "Status",
            justifyContent: "center",
            display: "flex",
            itemAlign: "center",
            width: 100,

            renderCell: (params) => {
                return (
                    <div className="productListItem btn btn-2">
                        {params?.row.status}
                    </div>
                );
            }
        },
        {
            field: "typeName",
            headerName: "Type",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="productListItem  btn btn-3">
                        {params?.row.type}
                    </div>
                );
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/seller/order/" + params.row.id + "/detail"}>
                            <button className="productListEdit">View</button>
                        </Link>


                    </>
                );
            },
        }
    ];
    return (
        <div className="productList">
            <DataGrid
                rowHeight={
                    100
                }
                rows={orderFilterList}
                columns={columns}
                hea
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                disableRowSelectionOnClick
            />


        </div>
    );
}
