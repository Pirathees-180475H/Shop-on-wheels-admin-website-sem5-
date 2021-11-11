import React from "react";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import {GET_Vendors} from '../../data/DataQuery';
import { useQuery } from '@apollo/client';

export default function DailyJoinedVendors() {

  const GetVendorData =()=>{
    const {data} = useQuery(GET_Vendors)
    return data
  }

  let vendors_data= GetVendorData();let vendors=[];let modifiedVendors=[];

  if(vendors_data){
    vendors =vendors_data.vendors
    modifiedVendors=  vendors.map((vendor)=>{
      let dateAndtimeObject=new Date(vendor.createAt._seconds *1000)
      let dateAndTimestring =`${dateAndtimeObject.getDate()}.${dateAndtimeObject.getMonth()}.${dateAndtimeObject.getFullYear()}`
      return({'id':vendor.id,'date':dateAndTimestring,}
      )
    })
  }
  let chartVendorsData= CountWiseFilterForUser(modifiedVendors)

  const users = [{name: "Vendors",data: chartVendorsData.counts,},];

  return (
      <div>
        <ApexCharts
         options={{
          dataLabels: {enabled: false},
          stroke: {width: [5, 7, 5], curve: 'straight',dashArray: [0, 8, 5]},
          legend: {
            tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''}
          },
          markers: {size: 0,hover: {sizeOffset:6}},
          xaxis: {categories: chartVendorsData.dates,},
          tooltip: {y: [{title: {formatter: function (val) {return val}}},{title: {formatter: function (val) {return val }}},{title: {formatter: function (val) {return val;}}}]},
          grid: {borderColor: '#f1f1f1', }}}

         series={users}
         type="line"
        height={350}
    /> 
    </div>
  );
}

function CountWiseFilterForUser(data){
  let array1=[]
  data.forEach(obj => {
    if(!array1.includes(obj.date)){array1.push(obj.date)}})

  let array2=[]
  array1.forEach((date)=>{
    let c=0;
    let method='';
    data.forEach((item)=>{
      if(item.date===date){c=c+1;}
    })
    array2.push({'date':date,'count':c,'method':method})
  })
  
  array2.sort((obj1,obj2)=>{
    if(process(obj1.date)>process(obj2.date)){
      return 1
    }else{
      return -1
    }
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
