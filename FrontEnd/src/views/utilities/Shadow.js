import React, { useEffect, useState } from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { DomainName } from '../../api/key';
import { gettoken } from '../../layouts/full/token/gettoken';
import axios from 'axios';
import { Showadmindata } from './components/showadmindata';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  const [rerunshow , setRerunshow] = useState('null');
  const [ data , setData ] = useState(null);
  const [sucess, setSucess] = useState(false);
  useEffect(()=>{
    console.log(gettoken)
      axios.post(`${DomainName}admin/user`, gettoken)
    .then((res)=>{
      console.log(res.data);
      setData(res.data);
    })
    
  },[rerunshow]);


  return (
    <PageContainer title="Shadow" description="this is Shadow">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Typography variant='h3'>
          Total Users :
          {
           data != null  ?
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
           <Showadmindata key={ind} showsucces={getres => setSucess(getres)}  changeword={word => setRerunshow(word)} myfunc={item} />
           )
           :
           null
         }
       </Grid>
        </Grid>
    </PageContainer>
  );
};

export default Shadow;
