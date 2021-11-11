import { useState } from "react";
import GoogleMapReact from "google-map-react";
import './map.css';
import LocationMarker from "./LocationMarker";
import {getRandomKeyGenerator} from '../data/RandomKey';
import InfoBox from "./infoBox";
import SearchUser from './SerchUser';
import SearchErrorBox from "./SearchErrorBox";
import {useQuery } from '@apollo/client';
import {GET_users,GET_Vendors,GET_orders} from '../data/DataQuery';

const Maps=() =>{

  // Fetch the Customer datas From Database using GraphQl Query
  let CustomerLocations=[]
  const GetUsersData =()=>{const {data} = useQuery(GET_users);return data;}
  const users_data= GetUsersData();
  if(users_data){CustomerLocations=users_data.users}

  //Fetch The vendors Data From Database using GraphQl Query
  let VendorLocations=[]
  const GetVendorsData =()=>{const {data} = useQuery(GET_Vendors);return data;}
  const vendors_data= GetVendorsData();
  if(vendors_data){VendorLocations=vendors_data.vendors}

  //Get All Orders From DataBase using GraphQl Query
  let orders=[]
  const GetOrdersData =()=>{const {data} = useQuery(GET_orders );return data}
  const orders_data= GetOrdersData();

    //Fiter Only Pending Orders From Database
  if(orders_data){
    let allOrders=orders_data.orders
    let pendingOrders=allOrders.filter((order)=>(order.status==='pending'))
    orders=pendingOrders
  }

  // Assign variables, and states, functions to change State using useState of React
  const zoom=16;
  const [center,setCenter]= useState({ lat:6.9271,lng:79.8612});
  const [locationInfo,setLocationInfo] = useState(null);
  const [isInfoBoxShown,setInfoBoxShown]=useState(false);
  const [isSearchErrorBoxShow,setSearchErrorBoxShow]= useState(false);
  const [typeOfUsersToShow,setTypeofUsersToShow]= useState('all');
  const [isActive,setActive]= useState('all');

  return(
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{key:'AIzaSyBJQaGPESpG-vlcnpajwa3IY0J6MNUIdYg'}}
        center={center}
        defaultZoom={zoom}>

          {/*Show The Vendor Locations On the Map*/ }
        {VendorLocations.map((vendor)=>{
          let specificOrder = orders.filter((order)=>(order.vendorId===vendor.id));
          if(typeOfUsersToShow==='all' || typeOfUsersToShow==='vendor'){
            return(
              <LocationMarker  userType="vendor" specificOrder={specificOrder} isActive={isActive} 
              key={vendor.id} lat={vendor.location.Latitude} lng={vendor.location.Longitude} 
              onClick={()=>{setInfoBoxShown(true);setLocationInfo({id:vendor.id,userName:vendor.name,type:'vendor',lat:vendor.location.Latitude,lng:vendor.location.Longitude,vendorOrders:specificOrder})}} />
            )
          }else{return(<div key={getRandomKeyGenerator(10)}></div>)}  
        })}

       {/*Show The Customer Locations On the Map*/ }
        {CustomerLocations.map((customer)=>{
           let specificOrder = orders.filter((order)=>(order.customerId===customer.id));
           if(typeOfUsersToShow==='all' || typeOfUsersToShow==='customer'){
          return(
            <LocationMarker  userType="customer"  specificOrder={specificOrder} isActive={isActive} 
            key={customer.id} lat={customer.location.Latitude} lng={customer.location.Longitude} 
            onClick={()=>{setInfoBoxShown(true);setLocationInfo({id:customer.id,type:'Customer',userName:customer.username,lat:customer.location.Latitude,lng:customer.location.Longitude,customerOrders:specificOrder})}} />
          )}else{return(<div key={getRandomKeyGenerator(10)}></div>)}
        })}
      </GoogleMapReact>
      
      {/*To Show The model that contain Vendor ,Customers information*/ }
      {isInfoBoxShown && locationInfo && <InfoBox info={locationInfo} isShow={setInfoBoxShown} vendorDetails={VendorLocations} customerDetails={CustomerLocations}/>}
       {/*Search The Customer and user information , and filter them*/ }
      <SearchUser search={setCenter} setErrorMsg={setSearchErrorBoxShow} VendorLocations={VendorLocations} CustomerLocations={CustomerLocations} setTypeofUsersToShow={setTypeofUsersToShow} setActive={setActive}/>
       {/*The model For represent the Errors to Screen*/ }
      {isSearchErrorBoxShow &&  <SearchErrorBox  setErrorMsg={setSearchErrorBoxShow}/>}
     
    </div>
  )
}



export default Maps