import React from 'react'
import { useTheme } from "@material-ui/styles";
import useStyles from "../styles";
import {LineChart,Line} from "recharts";
//componets
import {Grid,} from "@material-ui/core";
import Widget from "../../../components/Widget";
import { Typography } from "../../../components/Wrappers";
import { useQuery } from '@apollo/client';

//products
import {GET_products,GET_categories} from '../../data/DataQuery';


function TotalProductLineChart({vendorCount}) {
    let allProducts=[];
    let allCategories=[];
    var classes = useStyles();
    var theme = useTheme();

    //Get productsdata
const GetProductsData =()=>{
    const {data} = useQuery(GET_products)
    return data
  }
const products_data= GetProductsData();
if(products_data){allProducts=products_data.products}

  //Get categories data
const GetcategoriesData =()=>{
    const {data} = useQuery(GET_categories)
    return data
  }
const categories_data= GetcategoriesData();
if(categories_data){allCategories=categories_data.categories}
    return (
      
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Products"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
         
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
               {allProducts.length}
              </Typography>
              
                </Grid>
                <Grid item xs={6}>
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: 50 },
                  { value: 200 },
                  { value: 100 },
                  { value: 107 },
                  { value: 0 },
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            > 
            <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                Categories
                </Typography>
                <Typography size="md">{allCategories.length}</Typography>
            </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                 Vendors
                </Typography>
                <Typography size="md">{vendorCount}</Typography>
              </Grid>
             
              
            </Grid>
          </Widget>
        </Grid>
    )
}

export default TotalProductLineChart
