import React,{useState} from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  InputBase,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme: any) => ({
  container: {
    backgroundColor: "#383e4b",
    height:'100vh',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    boxSizing:'border-box'
  },
  loginModal: {
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      marginTop:30
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
    
    },
    [theme.breakpoints.up("lg")]: {
      width: "20%",
    },
    borderRadius: 5,
    marginTop: 100,
    padding: 20,
    minWidth: 250,
    height:400,
   
  },
  text: {
    fontSize: 15,
    margin: 0,
    padding: 0,
    lineHeightStep:1,
    lineHeight:'1.1',
    wordBreak:'break-word'
  },
  textError:{
    fontSize: 13,
    margin: 0,
    padding: 0,
    lineHeightStep:1,
    lineHeight:'1.1',
    color:'red'
  }
  ,
  inputBase: {
    marginTop: 10,
    background: "#e4e6eb",
    width: "100%",
    padding: theme.spacing(1, 1, 1, 2)
  },
  btn: {
    marginTop: 20,
    paddingBottom:20,
    borderBottomWidth:1,
    borderColor:'#000'
  },
  link:{
    fontSize: 15,
    margin: 0,
    padding: 0,
    lineHeightStep:1,
    lineHeight:'1.1',
    color:'black',
    '&:hover':{
      color:'#428bca'
    }
  }
}));

export default function ForgotPassScreen() {
  const classes = useStyle();
  const [showError, setShowError] = useState<boolean>(false)
  return (
    <Box className={classes.container}>
      <Box className={classes.loginModal}>
        {showError ?   <p className={classes.textError}>Email or password is invalid. Please try again.</p> :   <p className={classes.textError}></p>}
        <img
          src="http://www.test.quick-money-recorder.com/assets/images/logo_en.png"
          width="100%"
        />
       
        <p className={classes.text}>
        Enter your email address to reset your password. You may need to check your spam folder or unblock okanereco_support_d@docomo.ne.jp
        </p>
        <InputBase
          type="email"
          placeholder="type email"
          className={classes.inputBase}
        ></InputBase>
      
       <Box sx={{  marginTop:2 }}>
       <Button onClick={() => {
         setShowError(!showError)
       }} variant="contained" color='neutral' fullWidth >Send Mail</Button>
       </Box>    
       <Box sx={{  marginTop:2}}>
       <Link style={{textDecoration:'none'}} to={`/`}>
       <Button onClick={() => {
        
    }} variant="contained" color='neutral' fullWidth >Back</Button>
       </Link>
      
       </Box>  
      </Box>
    </Box>
  );
}
