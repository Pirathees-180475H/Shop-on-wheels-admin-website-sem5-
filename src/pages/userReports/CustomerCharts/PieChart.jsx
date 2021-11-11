import { Pie } from "react-chartjs-2";
import React from "react";
import { useQuery} from '@apollo/client';
import {GET_orders,GET_products} from '../../data/DataQuery';

let data = [];
let labels = [];
const color=["#7D6608","#D4AC0D","#F1C40F","#F4D03F","#F9E79F","#FEF9E7"]


function PieChartComponent(customer) {
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
    let specificOrders= orders_data.orders.filter((order)=>{return(order.customerId===customer.id)});
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
   
    data=[{data: counts,backgroundColor: color}];
    labels=productNames 
    
}
    return (React.createElement(Pie, { options: {
            width: "400",
            height: "400"
        }, data: {
            labels: labels,
            datasets: data
        } }));
}
export default PieChartComponent;
