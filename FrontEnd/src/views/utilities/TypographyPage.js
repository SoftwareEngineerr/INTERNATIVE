import React, { useEffect, useState } from 'react';
import { Typography, Grid, CardContent, Button  , Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';
import { DomainName } from '../../api/key';
import axios from 'axios';
import { Listofitem } from './listofitem';
import { gettoken } from '../../layouts/full/token/gettoken';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@emotion/react';
import Modal from '@mui/material/Modal';
import { Addnote } from '../../components/curd/Addnote';
import { SimpleSnackbar } from '../../components/message/note';


const TypographyPage = () => {
  const theme = useTheme();
  const addbutn = theme.palette.addbutn.data;
  const [open, setOpen] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [rerunshow , setRerunshow] = useState('null');
  const [ word , setWord] = useState('null')
  const handleClose = () => {
    setOpen(false);
  };
  const childresponse = (getparams) =>{
    setOpen(false);
    setSucess(true)
    setRerunshow('1')
  }

  const [ data , setData ] = useState(null);
  useEffect(()=>{
    console.log(gettoken)
      axios.post(`${DomainName}users`, gettoken)
    .then((res)=>{
      console.log(res.data);
      setData(res.data);
    })
    
  },[rerunshow]);

  return (
    <PageContainer title="User Notes" description="this is user notes">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Typography variant='h3'>
          Your Total Notes : {
            data != null ?
          data.length
          :
          null
          }

          </Typography>
        </Grid>
        <Grid item sm={12}>
         
          {
            data != null  ?
            data.map((item , ind)=>
            <Listofitem key={ind} myfunc={item} showsucces={getres => setSucess(getres)}  changeword={word => setRerunshow(word)} />
            )
            :
            null
          }
        </Grid>
      </Grid >


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Addnote  changeword={word => childresponse(word)} />
      </Modal>
      {
      sucess == true ?
        <SimpleSnackbar sucess changeword={word => setSucess(word)} />
        :
        null
      }


      <Button variant="secondary" sx={addbutn} onClick={()=>setOpen(true)} >
        <AddIcon  />
      </Button>


    </PageContainer>
  );
};

export default TypographyPage;
