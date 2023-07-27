import React, { useState } from 'react';
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
import axios from 'axios';

const AuthRegister = ({ title, subtitle, subtext }) => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [ errortype , setErrortype ] = useState("");
    const [errorcolor , setErrorcolor ] = useState("");

    const [payload , setPayload ] = useState({
        Name:'',
        Password:'',
    });

    const myfunction = (getparams) =>{
        // alert(getparams.target.value)
        setPayload({...payload , [getparams.target.id] : getparams.target.value});
    }
    const check = () =>{
        // <Navigate to='/register' />
        axios.post(`http://localhost:3001/register`, payload)
        .then((res)=>{
            if(res.status == 201){

                setErrortype('This Name is Already Taken')
                setErrorcolor('warning')
                setOpen(true)

                
                navigate('/login');
            }
        })
        .catch((err)=>{
            if(err.response.status == 409){
                setErrortype('This Name is Already Taken')
                setErrorcolor('warning')
                setOpen(true)
            }
            if(err.response.status ==  500){
                setErrortype('Feilds Required')
                setErrorcolor('error')
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

    

        <Box>
            <Stack mb={3}>
            <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='Name' mb="5px">Username</Typography>
                <CustomTextField onChange={myfunction} id="Name" variant="outlined" fullWidth />


                <Typography variant="subtitle1"
                    fontWeight={600}  component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField onChange={myfunction}  id="Password" type="password" variant="outlined" fullWidth />
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
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
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

export default AuthRegister;
