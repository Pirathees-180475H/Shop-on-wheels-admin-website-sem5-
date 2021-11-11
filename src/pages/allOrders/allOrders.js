import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useQuery } from '@apollo/client';
import {GET_orders,GET_Vendors,GET_users} from "../data/DataQuery";

let datatableData = [];let allOrders=[];let vendorName="";let customerName="";

export default function Orders() {
  const GetOrdersData =()=>{
    const {data} = useQuery(GET_orders )
    return data}
  const orders_data= GetOrdersData();

  const GetCustomerData=()=>{
    const {data}= useQuery(GET_users)
    return data
  }
  const customers_data=GetCustomerData();

  
  const GetVendorsData =()=>{
    const {data}= useQuery(GET_Vendors);
    return data
  }
  const vendors_data=GetVendorsData();

  if(orders_data && customers_data && vendors_data){
      datatableData=[];
      vendorName="";customerName="";
      allOrders= orders_data.orders;
      allOrders.forEach(order => {
      let dateAndtimeObject=new Date(order.createAt._seconds *1000);
      let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`;
      let customerArrayForTheOrder= customers_data.users.filter((customer)=>{return(customer.id===order.customerId)})
      if(customerArrayForTheOrder.length ===1){customerName=customerArrayForTheOrder[0].username}
      let vendorArrayForTheOrder=vendors_data.vendors.filter((vendor)=>{return(vendor.id===order.vendorId)})
      if(vendorArrayForTheOrder.length ===1){vendorName=vendorArrayForTheOrder[0].name}

      datatableData.push({
        Date:dateAndTimestring,
        TotalPrice:order.totalPrice,
        "Payment Method":order.paymentMethod,
        Status:order.status,
        "Vendor Name":vendorName,
        "Customer Name":customerName,
        "Customer ID":order.customerId,
        "Vendor ID":order.vendorId
      })      
    });
  }
 
   return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Orders List"
            data={datatableData}
            columns={['Date',"TotalPrice","Status","Payment Method", "Customer Name",'Vendor Name',"Customer ID","Vendor ID"]}
            options={{
            filterType: "checkbox",
            downloadOptions:{
            filterOptions:{useDisplayedColumnsOnly:true,useDisplayedRowsOnly:true}},
            selectableRows:false
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
