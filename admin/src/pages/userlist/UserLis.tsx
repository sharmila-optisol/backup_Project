import React, { useEffect } from 'react'
import "./userlist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {  deleteUser, getUser } from '../../Redux/apiCalls';
import { useAppDispatch } from '../../Hook';
import { useSelector } from 'react-redux';

const UserLis = () => {
    const dispatch = useAppDispatch();
    const users = useSelector((state:any)=>state.userProduct.users)

    useEffect(()=>{
      getUser(dispatch);      
    },[dispatch])
    
    const handleDelete = (id:any) => {
      deleteUser(id,dispatch)
    };
  
    
    const columns = [
      { field: "_id", headerName: "ID", width: 300 },
      {
        field: "user",
        headerName: "User",
        width: 240,
        renderCell: (params:any) => {
            return (
            
              <div className="userListUser">
                 
                <img className="userListImg" src={params.row.img } alt="" />
                {params.row.username}
              </div>
            );
          },
        },
        { field: "email", headerName: "Email", width: 300 },
       
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params:any) => {
            return (
              <>
                <Link to={"/user/" + params.row._id}>
                  <button className="userListEdit">View</button>
                </Link>
                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(params.row._id)}
                />
              </>
            );
          },
        },
      ];

      return (
        <div className="userList">
        { users&&
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row)=>row._id}
            pageSize={8}
            // checkboxSelection
          />}
        </div>
      );
    
}

export default UserLis