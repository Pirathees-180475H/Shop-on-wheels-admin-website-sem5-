import React from 'react'
import VendorProfile from './VendorProfile';
import CustomerProfile from './CustomerProfile';
import  { useRef ,useState} from 'react';
import ReactToPrint from 'react-to-print';
//printButton
import './ProfileerrorMsg.css';
import {Icon} from '@iconify/react';
function ProfileWithPrint() {
  const componentRef = useRef();
  const [isVendorProfileView,setIsVendorProfileview]=useState(true);
  const [isCustomerProfileView,setIsCustomerProfileview]=useState(false);
  return (
    <div>
      <Icon icon="bi:arrow-left-circle-fill" className="arrow" onClick={()=>{setIsVendorProfileview(true);setIsCustomerProfileview(false);}}/>
      <Icon icon="bi:arrow-right-circle-fill" className="arrow" onClick={()=>{setIsVendorProfileview(false);setIsCustomerProfileview(true);}}/>
      {isVendorProfileView && <VendorProfile ref={componentRef}  />}
      {isCustomerProfileView &&   <CustomerProfile ref={componentRef} />}
      <ReactToPrint
        trigger={() => <Icon icon="flat-color-icons:print" className="printIcon" />}
        content={() => componentRef.current}
      />    
    </div>
  )
}

export default ProfileWithPrint
