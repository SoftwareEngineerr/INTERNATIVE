import React,{useState} from 'react';
import axios from 'axios'
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    Alert,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { DomainName } from '../../../api/key';

const AuthLogin = ({ title, subtitle, subtext }) => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [ errortype , setErrortype ] = useState("");
    const [errorcolor , setErrorcolor ] = useState("");

    const [payload , setPayload ] = useState({
        Name:'',
        Password:'',
    });

    const myfunction = (getparams) =>{
        setPayload({...payload , [getparams.target.id] : getparams.target.value});
    }
    const check = () =>{
        console.log(payload)
        axios.post(`http://localhost:3001/login`, payload)
        .then((res)=>{
            if(res.status == 200){
                let get = res.data;
                console.log(get);
                localStorage.setItem("getiemss", JSON.stringify(res.data));
                navigate('/auth/dashboard');
                setErrortype('Welcome')
                setErrorcolor('success')
                setOpen(true)
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.status == 404){
                setErrortype('Account not found')
                setErrorcolor('error')
                setOpen(true)
            }
            else{
                setErrortype('Password is Incorrect')
                setErrorcolor('warning')
                setOpen(true)
            }
        })
    }
    return(
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Stack>
            <Box>
            <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='Name' mb="5px">Username</Typography>
                <CustomTextField onChange={myfunction} id="Name" variant="outlined" fullWidth />
            </Box>
            <Box mt="25px">
            <Typography variant="subtitle1"
                    fontWeight={600}  component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField onChange={myfunction}  id="Password" type="password" variant="outlined" fullWidth />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack>
        </Stack>
        <Box sx={{ width: '100%' }}>
      <Collapse in={open} >
        <Alert
        severity={errorcolor}
        id="alert"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
            {errortype}
        </Alert>
      </Collapse>
    </Box>
        <Box>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                // to="/"
                type="submit"
                onClick={check}
            >
                Sign In
            </Button>
        </Box>
       
        {subtitle}
    </>
)
};

export default AuthLogin;
