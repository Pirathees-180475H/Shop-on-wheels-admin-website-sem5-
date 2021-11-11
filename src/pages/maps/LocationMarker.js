import React from 'react';
import {Icon} from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/rv-truck';
import locationIcon2 from '@iconify/icons-mdi/account';
import './map.css';


function LocationMarker({lat,lng,onClick,userType,isActive,specificOrder,key}) {
    if(isActive==='all'){
        if(userType==="vendor"){
            return (
                <div className='location-marker' onClick={onClick}>
                    <Icon key={key} icon={locationIcon} className="location-icon" />
                </div>
            )
        }else if(userType==='customer'){
            return (
                <div className='location-marker' onClick={onClick}>
                    <Icon key={key} icon={locationIcon2} className="location-icon-customer" />
                </div>
            )
        }
    }else if(isActive==='active'){
        if(userType==="vendor" && specificOrder.length !==0){
            return (
                <div className='location-marker' onClick={onClick}>
                    <Icon key={key} icon={locationIcon} className="location-icon" />
                </div>
            )
        }else if(userType==='customer' && specificOrder.length !==0){
            return (
                <div className='location-marker' onClick={onClick}>
                    <Icon key={key} icon={locationIcon2} className="location-icon-customer" />
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
   
    
}

export default LocationMarker
