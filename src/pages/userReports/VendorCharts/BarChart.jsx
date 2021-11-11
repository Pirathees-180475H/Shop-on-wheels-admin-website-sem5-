import { Bar } from "react-chartjs-2";
import React from "react";
//grapql import
import { useQuery} from '@apollo/client';

import {GET_orders,GET_products} from '../../data/DataQuery';

const color = ["#b3d7f2","#7bbced","#377eb3","#254f6e","#143045","#021d30"];
let data = [{data: [],backgroundColor: color}];
let lable = [];


function ColumnChart(vendor) {

    //get Orders Data
    function GetOrdersData(){
        const {data} = useQuery(GET_orders)
        return data
      }
    const orders_data= GetOrdersData();

    //get ProductsData
    function GetproductsData(){
        const {data} = useQuery(GET_products)
        return data
      }
    const products_data= GetproductsData();

    if(orders_data){
        let specificOrders= orders_data.orders.filter((order)=>{return(order.vendorId===vendor.id)});
        let onlyItemsFromSpecifcOrders = specificOrders.map((order)=>{return(order.items)})
        //console.log(onlyItemsFromSpecifcOrders,'specificItems')

        let countsPerID={}
        let productIds=[]
        let counts=[]
        let productNames=[]
        onlyItemsFromSpecifcOrders.forEach((orderArray)=>{
            orderArray.forEach((productCountObj)=>{
                let productID=productCountObj.product
                if(!countsPerID[productID]){
                    Object.assign(countsPerID,{[productID]:productCountObj.count})
                }else{
                    Object.assign(countsPerID,{[productID]:countsPerID[productID]+productCountObj.count})
                }
            })
        })
        productIds=Object.keys(countsPerID);
        counts=Object.values(countsPerID);
        if(products_data){
          //  console.log(products_data.products)
            productIds.forEach((id)=>{
                products_data.products.forEach((product)=>{
                    if(product.id===id){productNames.push(product.name)}
                })
            })
        }
       
        data=[{data: counts,backgroundColor: color}];
        lable=productNames 
        
    }

    return (React.createElement(Bar, { data: {
            labels: lable,
            datasets: data,
        } }));
}
export default ColumnChart;

