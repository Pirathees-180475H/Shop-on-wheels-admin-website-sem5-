import {db} from './firebase';
import {collection,getDocs} from 'firebase/firestore';

let  customersCollection=collection(db,'users');


const GetUserDataFromFireBase=async()=>{
    const customersDataDoc= await getDocs(customersCollection);
    let customerDataArray=  customersDataDoc.docs.map((doc)=>({...doc.data()}))
    return customerDataArray;
}


export {GetUserDataFromFireBase}