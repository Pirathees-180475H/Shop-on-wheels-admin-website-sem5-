import React from "react";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import {GET_users} from '../../data/DataQuery'
import {useQuery } from '@apollo/client';

export default function ApexLineChart() {
  const GetCustomerData =()=>{
    const {data} = useQuery(GET_users)
    return data
  }  
  let customers_data= GetCustomerData();
  let customers=[];
  let modifiedCustomers=[];
  if(customers_data){
    customers =customers_data.users
    modifiedCustomers=  customers.map((customer)=>{
        let dateAndtimeObject=new Date(customer.createAt._seconds *1000)
        let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
        return({'id':customer.id,'date':dateAndTimestring,}
      )
    })
  }
  let chartCustomerData= CountWiseFilterForUser(modifiedCustomers)
  const users = [{name: "Customers",data: chartCustomerData.counts,},];

  return (
      <div>
        <ApexCharts
          options={{dataLabels: {enabled: false},stroke: {width: [5, 7, 5],curve: 'straight',dashArray: [0, 8, 5]},
                  legend: {tooltipHoverFormatter: function(val, opts) {return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''}},
                  markers: {size: 0,hover: {sizeOffset: 6}},
                  xaxis: {categories: chartCustomerData.dates,},
                  tooltip: {y: [{title: {formatter: function (val) {return val}}},
                  {title: {formatter: function (val) {return val }}},
                  {title: {formatter: function (val) {return val;}}}]},
                  grid: {borderColor: '#f1f1f1',}}}
          series={users}
          type="line"
          height={350}
        /> 
    </div>
  );
}

///function to return for a Graph
//input format -->[{id:1,date:'26.5.2021'},{id:2,date:'26.5.2021'},{id:3,date:'27.5.2021'},{id:4,date:'27.5.2021'}]
//output format--> {'counts':[2,2],'dates':['26.5.2021','27.5.2021']}
function CountWiseFilterForUser(data){
  let array1=[]
  data.forEach(obj => {if(!array1.includes(obj.date)){array1.push(obj.date)}})
  let array2=[]

  array1.forEach((date)=>{
    let c=0;
    let method='';
    data.forEach((item)=>{if(item.date===date){c=c+1;}})
    array2.push({'date':date,'count':c,'method':method})
  })

  array2.sort((obj1,obj2)=>{
    if(process(obj1.date)>process(obj2.date)){return 1}else{return -1}
  })

  function process(date){
    var parts = date.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
 }
  let dateArray=[];
  let countArray=[];
  array2.forEach(obj => {
      dateArray.push(obj.date)
      countArray.push(obj.count)
  })
  return ({'dates':dateArray,'counts':countArray})
}

export {CountWiseFilterForUser}