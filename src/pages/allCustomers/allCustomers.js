import React ,{useEffect,useState} from "react";
import { Grid } from "@material-ui/core";
import CustomerTable from './customerTable';
import {collection,getDocs} from 'firebase/firestore';
import {db} from '../../firebase';

export default function Tables() {
  let  [userTableData,setUserTableData]=useState([]);

  useEffect(()=>{
    let  usersCollection= collection(db,"users");
    const getUsersData= async()=>{
      const data= await getDocs(usersCollection);
      let userDataArray=data.docs.map((doc)=>({...doc.data()})); // Get Data From FireBase
      setUserTableData(userDataArray);
    }
    getUsersData();
  },[]
  )
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CustomerTable userTableData={userTableData} />
        </Grid>
      </Grid>
    </>
  );
}
