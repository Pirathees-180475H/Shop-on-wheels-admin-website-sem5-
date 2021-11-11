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

                        //customer InfoBox Test

// InfoBox Format -> <InfoBox info={locationInfo} isShow={setInfoBoxShown} vendorDetails={VendorLocations}/>
//location information -> {id:customer.id,type:'Customer',userName:customer.username,lat:customer.location.Latitude,lng:customer.location.Longitude,customerOrders:specificOrder})}}
//vendor details  ->vendors with location{LatitudeLongitude}

                        //case 1 -> basic case
let specificCustomerCase1={id:'mmqquuxz',type:'Customer' ,lat:'77',lng:'411',customerOrders:[{id:'orderIDxxx',vendorId:5},{id:'oderIdyyy',vendorId:25}]}
let allVendorDetailsCase1=[{id:5,name:'davidw'},{id:25,name:'vendorx'}]

it("CheckCustomer's infoBoxRenderinMap BasicCase",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <InfoBox info={specificCustomerCase1} isShow={true} vendorDetails={allVendorDetailsCase1}/> </ApolloProvider>);
    const customerInfoBox=queryAllByTitle("infoBox")
    expect(customerInfoBox).toBeTruthy();
})

                        //case 2 -. customer with zero Orders
let specificCustomerCase2={id:'mmqquuxz',type:'Customer' ,lat:'77',lng:'411',customerOrders:[]}
let allVendorDetailsCase2=[{id:5,name:'davidw'},{id:25,name:'vendorx'}]

it("CheckCustomer's infoBoxRenderinMap customer with zero orders",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <InfoBox info={specificCustomerCase2} isShow={true} vendorDetails={allVendorDetailsCase2}/> </ApolloProvider>);
    const customerInfoBox=queryAllByTitle("infoBox")
    expect(customerInfoBox).toBeTruthy();
})
                        
                //case 3 -. No vendors in the system
let specificCustomerCase3={id:'mmqquuxz',type:'Customer' ,lat:'77',lng:'411',customerOrders:[]}
let allVendorDetailsCase3=[]

it("CheckCustomer's infoBoxRenderinMap system with zero vendors",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <InfoBox info={specificCustomerCase3} isShow={true} vendorDetails={allVendorDetailsCase3}/> </ApolloProvider>);
    const customerInfoBox=queryAllByTitle("infoBox")
    expect(customerInfoBox).toBeTruthy();
})
                              
