import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Typography } from '@mui/material'
import axios from 'axios';
import { DomainName } from '../../api/key';
import { useParams } from 'react-router';
import { gettoken } from '../../layouts/full/token/gettoken';

function Adminshowuser (props)  {

// Access the id parameter using useParams hook
  const { id } = useParams();
  const [data , setData ] = useState(null)

useEffect(()=>{
    gettoken.id = id;
  axios.post(`${DomainName}admin/userpost` , gettoken)
  .then((res)=>{
    console.log(res.data)
    setData(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[])

  return (
    <>
    {
        data != null ?
        data.map((item , ind)=>
        <Card sx={{marginTop: '20px' , padding:'10px'}}>
            <Typography variant='h3'>
                Content:{item.Content}
            </Typography>
        </Card>
        )
        :
        null
    }
    {
        data < 1 ?
        <Card sx={{marginTop: '20px' , padding:'30px'}}>
            <Typography variant='h3'>
                 User Don't Have Content
            </Typography>
        </Card>
        :
        null
    }
    </>
  )
}
export default Adminshowuser