import {render, fireEvent} from '@testing-library/react';
import { ApolloClient,ApolloProvider,InMemoryCache,createHttpLink } from "@apollo/client";

//bring Dashboard components To test
import InfoBox from '../../pages/maps/infoBox'

//Appolo GraphQL contents
const link = createHttpLink({
    uri:"https://shop-on-wheel-server.veensiva10.workers.dev/",
    useGETForQueries:true,
    credentials: 'same-origin'
  });
  const client = new ApolloClient({
      link,
      cache:new InMemoryCache(),
    
  })

                        //vendor InfoBox Test

// InfoBox Format -> <InfoBox info={specificVendorDetails} isShow={setInfoBoxShown} customerDetails={allcustomerDetails}/>
//location information -> {id:customer.id,type:'Vendor',userName:vendor.name,lat:vendor.location.Latitude,lng:vendor.location.Longitude,vendorOrders:specificOrder})}}
//all customer details  ->all customer details

                       //case 1 -> basic case
let specificVendorCase1={id:'mmqquuxz',type:'vendor' ,lat:'77',lng:'411',vendorOrders:[{id:'orderID1',customerId:5},{id:'oderId2',customerId:25}]}
let allCustomerDetailsCase1=[{id:5,name:'customer1'},{id:25,name:'customer2'}]

it("CheckVendor's infoBoxRenderinMap BasicCase",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <InfoBox info={specificVendorCase1} isShow={true} customerDetails={allCustomerDetailsCase1}/> </ApolloProvider>);
    const customerInfoBox=queryAllByTitle("infoBox")
    expect(customerInfoBox).toBeTruthy();
})
                       
                         //case 2 -> vendor with zero orders
let specificVendorCase2={id:'mmqquuxz',type:'vendor' ,lat:'77',lng:'411',vendorOrders:[]}
let allCustomerDetailsCase2=[{id:5,name:'customer1'},{id:25,name:'customer2'}]

it("CheckVendor's infoBoxRenderinMap vendor has zero orders",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <InfoBox info={specificVendorCase2} isShow={true} customerDetails={allCustomerDetailsCase2}/> </ApolloProvider>);
    const customerInfoBox=queryAllByTitle("infoBox")
    expect(customerInfoBox).toBeTruthy();
})
                  

                    //case 3 -> vendor with zero orders
let specificVendorCase3={id:'mmqquuxz',type:'vendor' ,lat:'77',lng:'411',vendorOrders:[]}
let allCustomerDetailsCase3=[]

it("CheckVendor's infoBoxRenderinMap System has zero customers",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <InfoBox info={specificVendorCase3} isShow={true} customerDetails={allCustomerDetailsCase3}/> </ApolloProvider>);
    const customerInfoBox=queryAllByTitle("infoBox")
    expect(customerInfoBox).toBeTruthy();
})
                                      