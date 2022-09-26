import React, { useEffect, useState } from 'react'
import { userRequest } from '../../requestMethods';
import "./widgetlg.css";



const Widgetlg = () => {
  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    const getOrder = async ()=>{
      try{
     const res = await userRequest.get("orders");
     setOrders(res.data);
      }catch{}
    }
    getOrder();
  })
    const Button = ({ type }:any)=>{
        return <button className={"widgetLgButton " + type}>{type}</button>;
      };
  return (
    <div><div className="widgetLg">
    <h3 className="widgetLgTitle">Latest transactions</h3>
    <table className="widgetLgTable">
      <tr className="widgetLgTr">
        <th className="widgetLgTh">Customer</th>
        <th className="widgetLgTh">Date</th>
        <th className="widgetLgTh">Amount</th>
        <th className="widgetLgTh">Status</th>
      </tr>
      {orders.map(order=>(
    <tr className="widgetLgTr">
        <td className="widgetLgUser">
          <span className="widgetLgName">{order.userId}</span>
        </td>
        <td className="widgetLgDate">{order.createdAt}</td>
        <td className="widgetLgAmount">{order.amount}</td>
        <td className="widgetLgStatus">
          <Button type={order.status} />
        </td>
      </tr>
      ))}
    </table>
  </div></div>
  )
}

export default Widgetlg