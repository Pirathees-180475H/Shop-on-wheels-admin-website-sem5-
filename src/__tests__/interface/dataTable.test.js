import {render, fireEvent} from '@testing-library/react';
import { ApolloClient,ApolloProvider,InMemoryCache,createHttpLink } from "@apollo/client";

//components that Brings To test
import CustomerTable from '../../pages/allCustomers/customerTable';
import Orders from '../../pages/allOrders/allOrders';
import VendorTables from '../../pages/allVendors/allVendors';

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

// test for all Customer Table
it("checkCustomerTableRender",()=>{
    const{queryAllByTitle} =render( <CustomerTable/>);
    const customerTable=queryAllByTitle("customers List")
    expect(customerTable).toBeTruthy();
})

//test for all Order Table
it("checkAllOrderTableRender",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <Orders/> </ApolloProvider>);
    const allOrderTable = queryAllByTitle("Orders List");
    expect(allOrderTable).toBeTruthy();
})

//test for all vendorData Table

it("checkAllVendorTableRender",()=>{
    const{queryAllByTitle} =render(<ApolloProvider client={client} > <VendorTables/> </ApolloProvider>);
    const allVendorTable = queryAllByTitle("Vendor List");
    expect(allVendorTable).toBeTruthy();
})

