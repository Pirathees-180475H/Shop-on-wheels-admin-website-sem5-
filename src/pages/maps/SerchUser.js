import React from 'react';
import './map.css';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SerchUser({search,setErrorMsg,VendorLocations,CustomerLocations,setTypeofUsersToShow,setActive}) {

  //These States and Handlers For filtering Users based on Type (all/customer/vendor):default is all 
  const [type, setType] = React.useState('all');
  const handleChange = (event) => {
    setType(event.target.value);
    setTypeofUsersToShow(event.target.value)
  };

  //These States and Handlers For filtering Users based on Pending Orders : if a user has pending orders Thats mean He is Active
  const [isActive, setIsActive] = React.useState('all');
  const handleActiveChange = (event) => {
    setIsActive(event.target.value);
    setActive(event.target.value);
  };

  //These States and Handlers For filtering Users based on therir unique Username (customer,vendor):default is all 
    const [userId,setuserId]= React.useState(''); 
    const changeHandler=(e)=>{
        setuserId(e.target.value)
    }
    const searchHandle=()=>{
        //Fetch user or vendor From  data that provided From Parent Component
        const vendor =VendorLocations.filter((vendor)=>{return(vendor.name===userId)});
        const customer =CustomerLocations.filter((customer)=>{return(customer.username===userId)});
        let location={}
        if(customer.length!==0){
            location.lat=customer[0].location.Latitude;location.lng=customer[0].location.Longitude
        }else if(vendor.length!==0){
            location.lat=vendor[0].location.Latitude;location.lng=vendor[0].location.Longitude
        }else{
            setErrorMsg(true) // if user Not Found throw Error
        }
        search(location);
    }
    return (
        <div className="search">
        <Toolbar>
        <TextField
            id="input-with-icon-textfield"
            label="SearchBy Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
        variant="standard"
        onChange={(eve)=>{changeHandler(eve)}}
         />
          <SearchIcon onClick={searchHandle}  />
         <div className="filter">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="User Type"
                onChange={handleChange}
            >
                <MenuItem value={'all'}>ALL</MenuItem>
                <MenuItem value={'customer'}>Customer</MenuItem>
                <MenuItem value={'vendor'}>Vendor</MenuItem>
            </Select>
            </FormControl>
         </div>

         <div className="filter">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Active?</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isActive}
                label="User Type"
                onChange={handleActiveChange}
            >
                <MenuItem value={'all'}>ALL</MenuItem>
                <MenuItem value={'active'}>Active</MenuItem>
            </Select>
            </FormControl>
         </div>
        </Toolbar>
        </div>
    )
}
export default SerchUser
