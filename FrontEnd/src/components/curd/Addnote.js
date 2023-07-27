import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, CardContent, Button  , Box , Link } from '@mui/material';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import axios from 'axios';
import { gettoken } from '../../layouts/full/token/gettoken';
import { DomainName } from '../../api/key';

export const Addnote = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

      const [payload , setPayload ] = useState({
        Content:'',
    });

    const myfunction = (getparams) =>{
        // alert(getparams.target.value)
        setPayload({...payload , [getparams.target.id] : getparams.target.value});
    }
    const check = () =>{
        gettoken.Content = payload.Content;
        axios.post(`${DomainName}add`, gettoken)
        .then((res)=>{
            console.log(res)
            handleChange()
        })
        .catch((err)=>{
            // if(err.response.status == 403){
                console.log(err)

            // }
        })
    }

    const [childValue, setChildValue] = useState('');

    // Function to handle value changes in the child component
    function handleChange  (event) {
    props.changeword(false)
    };
  

      
  return (
    <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h4" id="parent-modal-title" mb="20px">Add Note</Typography>
        <Typography variant="subtitle1"
                fontWeight={600} component="label" htmlFor='Name' >Your Note</Typography>
            <CustomTextField onChange={myfunction} id="Content" variant="outlined" sx={{height:' 60px'}} fullWidth />
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                type="submit"
                onClick={check}
            >
                Add Note
            </Button>
    </Box>
  )
}