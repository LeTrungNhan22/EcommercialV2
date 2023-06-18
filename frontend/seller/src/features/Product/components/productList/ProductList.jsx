import styled from "@emotion/styled";
import { Tooltip, tooltipClasses } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthContext from "../../../../context/authContext";
import { getProductsFilter } from "../../productSlice";
import "./ProductList.css";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 450,
  },
});


export default function ProductList() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductsFilterByShopId = async () => {
      const filter = {
        shopId: user?.shop?.shopId,
      }
      try {
        const filterProductsAction = await dispatch(getProductsFilter(filter))
        const unwrapResult = filterProductsAction.payload
        setProducts(unwrapResult?.resultList);

      } catch (err) {
        console.log(err)
      }
    }
    getProductsFilterByShopId();
  }, []);
  // console.log(products);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params?.row?.id}
          </div>
        );
      },
    },

    {
      field: "product",
      headerName: "Product",
      width: 270,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <CustomWidthTooltip
              title={
                <React.Fragment>
                  {params?.row?.imageUrls?.map((url) => (
                    <img key={url} src={url} alt="" style={{ width: 100, height: 100, marginRight: 5 }} />
                  ))}
                </React.Fragment>
              }
              interactive="true"
              placement="top"
              arrow

            >
              <img className="productListImg" src={params?.row?.featuredImageUrl} alt="" />
            </CustomWidthTooltip>
            <span className="productListName" style={{ whiteSpace: "pre-wrap" }}>
              {params?.row?.name}
            </span>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {Number(params.row.mediumPrice?.amount).toLocaleString("vi")}{" "}
            {params.row.mediumPrice?.currencyCode}
          </div>
        );
      }
    },
    {
      field: "TypeName",
      headerName: "TypeName",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.industrialTypeName}
          </div>
        );
      }
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 80,

      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params?.row.quantityAvailable}
          </div>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/seller/product/" + params.row.id + "/detail"}>
              <button className="productListEdit">Edit</button>
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
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />


    </div>
  );
}
