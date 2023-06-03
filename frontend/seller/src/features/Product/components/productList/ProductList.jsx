import React, { useContext, useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct, getProductsFilter } from "../../productSlice";
import AuthContext from "../../../../context/authContext";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Slide, Tooltip, tooltipClasses } from "@mui/material";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import productApi from "../../api/product/productApi";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 450,
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,

  pt: 2,
  px: 4,
  pb: 3,
};


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
            {params.row.mediumPrice?.amount}{" "}
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
            <Link to={"/product/" + params.row.id + "/detail"}>
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
