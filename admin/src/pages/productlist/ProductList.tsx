import React, { useEffect } from 'react'
import "./productlist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../Hook';
import { deleteProducts, getProducts } from '../../Redux/apiCalls';
import { useSelector } from 'react-redux';

const ProductList = () => {
    
    const dispatch = useAppDispatch();
    const products = useSelector((state:any)=>state.product.products)

    useEffect(()=>{
        getProducts(dispatch);
    },[dispatch])

    const handleDelete = (id:any) => {
       deleteProducts(id,dispatch);
    };
  
    const columns = [
      { field: "_id", headerName: "ID", width: 220 },
      {
        field: "product",
        headerName: "Product",
        width: 200,
        renderCell: (params:any) => {
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" />
              {params.row.title}
            </div>
          );
        },
      },
      { field: "inStock", headerName: "Stock", width: 200 },
     
      {
        field: "price",
        headerName: "Price",
        width: 160,            
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params:any) => {
          return (
            <>
              <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row)=>row._id}
          pageSize={8}
          // checkboxSelection
        />
      </div>
    );
  }

export default ProductList