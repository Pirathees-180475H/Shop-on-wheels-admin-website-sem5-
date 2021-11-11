import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {useQuery} from '@apollo/client';
import {GET_Vendors} from "../data/DataQuery";

export default function VendorTables() {
  const GetVendorsData =()=>{
    const {data} = useQuery(GET_Vendors)
    return data
  }
  const vendors_data= GetVendorsData();
  if (vendors_data){
      return (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                title="Vendor List"
                data={vendors_data.vendors}
                columns={["name", "email","registrationNumber","rating", "priceRating","id"]}
                 options={{
                  filterType: "checkbox",
                  downloadOptions:{
                  filterOptions:{useDisplayedColumnsOnly:true,useDisplayedRowsOnly:true}},selectableRows:false
                }}
              />
            </Grid>
          </Grid>
        </>);
  }else{
    return(
      <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="vendors List"
            data={[]}
            columns={["name", "rating", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>)}}
