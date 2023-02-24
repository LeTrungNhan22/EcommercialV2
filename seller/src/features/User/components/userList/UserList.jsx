import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import "./UserList.scss";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getError } from "../../../../utils/error";
import { getUserFilter } from "../../../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

export default function UserList() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const actionResult = await dispatch(getUserFilter());
        const userList = unwrapResult(actionResult);
        setData(userList);
      } catch (error) {
        console.log("Failed to fetch user list: ", getError(error));
      }
    };
    fetchUser();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    {
      field: "user",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.imageUrl} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "userStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListStatus">
            <span>{params.row.userStatus}</span>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline className="userListDelete" id="userListDelete" />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
