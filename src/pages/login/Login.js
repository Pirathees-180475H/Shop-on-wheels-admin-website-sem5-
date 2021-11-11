import React, { useState ,useEffect} from "react";
import { Grid,CircularProgress,Typography,Button,Tabs,Tab,TextField} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import logo from "./adminLogo.png";
import { useUserDispatch, loginUser} from "../../context/UserContext";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {auth,db} from '../../firebase';
import {collection,getDocs} from 'firebase/firestore';
import ErrorMessage from './ErrorMessages';
import SuccessMessage from './SucessMessage';

function Login(props) {
  //define Variables with useState
  var classes = useStyles();
  var userDispatch = useUserDispatch();
  var [isLoading, setIsLoading] = useState(false);
  var [activeTabId, setActiveTabId] = useState(0);
  let [adminRegisterEmail,setAdminRegisterEmail]=useState("");
  let [adminRegisterPassword,setAdminRegisterPassword]=useState("");
  let [adminLoginEmail,setAdminLoginEmail]=useState("");
  let [adminLoginPassword,setAdminLoginPassword]=useState("");
  let [successMessage,setSuccessMessage]=useState("");
  let [successBoxShow,setBoxSuccessShow]=useState(false);
  let [errorMessage,setErrorMessage]=useState(false);
  let [errorBoxShow,setBoxErrorshow] = useState(false);
  let [adminSecretKey,setAdminSecretKey]= useState("");
  let [adminKeyInput,setAdminKeyInput]= useState("");

  //FetCh adminSecret Key From FireStore Database ,with help of npm firebase pakage
  useEffect(()=>{
    const getAdminKey= async()=>{
      let  adminSecretKeyCollection= collection(db,"adminkey");
      const data= await getDocs(adminSecretKeyCollection);
      let dataArray=data.docs.map((doc)=>({...doc.data()}))
      setAdminSecretKey(dataArray[0].key);
    }
    getAdminKey();
  },[])

  //Register new admin to the system after valid Secret key
  const RigsterAdmin=async()=>{
      try{
      const Admin= await createUserWithEmailAndPassword(auth,adminRegisterEmail,adminRegisterPassword);
      if(Admin){setSuccessMessage("New Admin Account is Created");setBoxSuccessShow(true)}
      }catch(error){setBoxErrorshow(true);setErrorMessage(error.message.substring(9))}
  }

  //Login Admin To the dashboard
  const loginAdmin = async()=>{
     try{
       const LoggedAdmin = await signInWithEmailAndPassword(auth,adminLoginEmail,adminLoginPassword);
       if(LoggedAdmin){ loginUser(userDispatch,adminLoginEmail,adminLoginPassword,props.history,setIsLoading)}
     }catch(error){
       setBoxErrorshow(true);setErrorMessage(error.message.substring(9))
     }
  }
  //Check The Entred Secret Key And Alow to Login or Register as new user
  const adminkeyCheck=()=>{
    if(adminKeyInput===adminSecretKey){setActiveTabId(1)}else{setErrorMessage("Invalid Key,Enter the Correct key for login");setBoxErrorshow(true)}
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>ShopOnWheel Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>

          {/*Active id 0 is render Secret Key Page */}
        {activeTabId === 0 && (
            <React.Fragment>
                <Tabs
                    value={activeTabId}
                    onChange={(e, id) => setActiveTabId(id)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="Enter The Key" classes={{ root: classes.tab }} />
              </Tabs>
              {errorBoxShow &&<ErrorMessage isShow={setBoxErrorshow} message={errorMessage}/>}
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <div className={classes.formDivider} />
              </div>
              <Typography variant="h1" className={classes.greeting}> Welcome!</Typography>
              <Typography variant="h2" className={classes.subGreeting}>Enter Secret Key</Typography>
              <TextField
                id="Secret key"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={adminKeyInput}
                onChange={e => setAdminKeyInput(e.target.value)}
                margin="normal"
                placeholder="Enter the secret key"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      adminKeyInput.length <5 
                    }
                    onClick={adminkeyCheck}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Enter to Login
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
          {/*Active id 1 for  render Login Page */}
          {activeTabId === 1 && (
            <React.Fragment>
                <Tabs
                    value={activeTabId}
                    onChange={(e, id) => setActiveTabId(id)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                   <Tab label=" "classes={{root:classes.tab}}/>
                  <Tab label="Login" classes={{ root: classes.tab }} />
                  <Tab label="Register" classes={{ root: classes.tab }} />
              </Tabs>
              {errorBoxShow &&<ErrorMessage isShow={setBoxErrorshow} message={errorMessage}/>}
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <div className={classes.formDivider} />
              </div>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Log-in to your account
              </Typography>
              <TextField
                id="email"
                title="Login Email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={adminLoginEmail}
                onChange={e => setAdminLoginEmail(e.target.value)}
                margin="normal"
                placeholder="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                id="Login password"
                title="Login Password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={adminLoginPassword}
                onChange={e => setAdminLoginPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      adminLoginEmail.length <5 || adminLoginPassword.length <5
                    }
                    onClick={loginAdmin}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
                    {/*Active id 2 is render Secret Key Page */}
          {activeTabId === 2 && (
             <React.Fragment>
                <Tabs
                  value={activeTabId}
                  onChange={(e, id) => setActiveTabId(id)}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons={false}
                >
                  <Tab label="  "classes={{root:classes.tab}}/>
                  <Tab label="Login" classes={{ root: classes.tab }} />
                  <Tab label="Register" classes={{ root: classes.tab }} />
                </Tabs>
               {errorBoxShow &&<ErrorMessage isShow={setBoxErrorshow} message={errorMessage}/>}
               {successBoxShow &&<SuccessMessage isShow={setBoxSuccessShow} message={successMessage}/>}
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <TextField
                id="email"
                title="Register Email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={adminRegisterEmail}
                onChange={e => setAdminRegisterEmail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                title="Register Password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={adminRegisterPassword}
                onChange={e => setAdminRegisterPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    title="Register Button"
                    onClick={RigsterAdmin}
                    disabled={adminRegisterEmail.length <5 ||adminRegisterPassword.length <5 }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
}
export default withRouter(Login);
export {Login}
