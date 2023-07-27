import  React,{useState , useEffect}  from 'react'
import Button from '@mui/material/Button';
import { DomainName } from '../../api/key'
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Grid, CardContent , Card } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { gettoken } from '../../layouts/full/token/gettoken';
import Modal from '@mui/material/Modal';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';


export const Listofitem = (event) => {
    const id = event.myfunc.id;
    const navigate = useNavigate();
    const [ count , setCount ] = useState(0);
    const [ showEdit , setShowEdit ] = useState(false);


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
      };

    const myfunc = (getparams) =>{
        // setCount(count + 1);
        // navigate(`/auth/edit/${id}`); 
        // console.log(count)
    }
    const deleteitem = () =>{
        const id = event.myfunc.id;
        gettoken.noteid = id;
        console.log(gettoken)
        axios.post(`${DomainName}delete` , gettoken)
        .then((res)=>{
            console.log(res);
            // navigate('/ui/typography');
            event.changeword(id)
        })
        .catch((err)=>{
            if(err) throw err;
        })
    }

    const [payload , setPayload ] = useState({
        Content:''
    });

    const myfunction = (getparams) =>{
        setPayload({...payload , [getparams.target.id] : getparams.target.value});
    }

    const update = () =>{
        console.log(payload)
        gettoken.noteid = id;
        gettoken.Content = payload.Content;
        axios.post(`${DomainName}edit`, gettoken)
        .then((res)=>{
            if(res.status == 200){
                event.changeword(id)
                event.showsucces(true)
                setShowEdit(false)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
        <Card sx={{marginTop: "30px"}}>
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    <Grid container>
                        <Grid item md={8}>
                        {showEdit == false ?
                            <Typography variant="h4">Content :{event.myfunc.Content}
                            </Typography>
                             :
                             <>
                         <CustomTextField onChange={myfunction} sx={{marginRight: '20px !important'}} id="Content" type="text" variant="outlined" fullWidth />
                         </>
                         }
                       </Grid>
                        <Grid item md={4}>
                            <Button variant="outlined" onClick={deleteitem} startIcon={<DeleteIcon style={{marginLeft:'10px'}} />} ></Button>
                            {showEdit == false ?

                            <Button onClick={()=>setShowEdit(true)} variant="outlined"  style={{marginLeft:'10px'}} startIcon={<EditIcon style={{marginLeft:'10px'}} />}></Button>
                                :
                            <Button onClick={update} variant="outlined"  style={{marginLeft:'10px'}} >Save Updates</Button>
                            }
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>
        </>
    )
}

