import { Pie } from "react-chartjs-2";
import React from "react";
import { useQuery} from '@apollo/client';
import {GET_orders,GET_products} from '../../data/DataQuery';

let data = [];
let lable = ['sausages burger', 'Shawarma', 'masala salad', 'salad'];
const color=["#FFE5CC","#FFCC99","#FFB266","#FF8000","#994C00","#663300"]


function PieChartComponent(vendor) {

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
        console.log(products_data.products)
        productIds.forEach((id)=>{
            products_data.products.forEach((product)=>{
                if(product.id===id){productNames.push(product.name)}
            })
        })
    }
   
    data=counts;
    lable=productNames;
    console.log(data,lable,productIds)
}
    return (React.createElement(Pie, { options: {
            width: "400",
            height: "400"
        }, data: {
            labels: lable,
            datasets:[ {data: data,backgroundColor: color }]
        } }));
}
export default PieChartComponent;
