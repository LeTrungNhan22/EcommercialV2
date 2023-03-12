import React, { useContext, useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsFilter } from "../../productSlice";
import AuthContext from "../../../../context/authContext";


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
  console.log(products);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.id}
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
            <img className="productListImg" src={params.row.featuredImageUrl} alt="" />
            <span className="productListName" style={{ whiteSpace: "pre-wrap" }}>
              {params.row.name}
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id + "/detail"}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              id="productListDelete"
            />
          </>
        );
      },
    },
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
