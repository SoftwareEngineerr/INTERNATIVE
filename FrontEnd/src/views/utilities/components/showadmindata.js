import  React,{useState , useEffect}  from 'react'
import Button from '@mui/material/Button';
import { DomainName } from '../../../api/key'
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Grid, CardContent , Card , Avatar , useTheme} from '@mui/material';
import PropTypes from 'prop-types'
import axios from 'axios';
import { gettoken } from '../../../layouts/full/token/gettoken';
import Modal from '@mui/material/Modal';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';



export const Showadmindata = (event) => {
    const theme = useTheme();
    const color = theme.palette.primary.main;


    const navigate = useNavigate();
    const [ count , setCount ] = useState(0);
    const [ showEdit , setShowEdit ] = useState(false);
    
    const id = event.myfunc.id;
    console.log(event.myfunc)

    const deleteitem = () =>{
        const id = event.myfunc.id;
        gettoken.id = id;
        console.log(gettoken)
        axios.post(`${DomainName}admin/delete` , gettoken)
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
        gettoken.id = id;
        gettoken.Role = payload.Role;
        axios.post(`${DomainName}admin/edit/${id}`, gettoken)
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
  return (
    <Card sx={{marginTop: "30px"}}>
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    <Grid container>
                        <Grid item md={1}>
                        <Avatar
                        sx={{ bgcolor: color }}
                        alt={event.myfunc.Name}
                        src="/broken-image.jpg"
                        />
                        </Grid>
                        <Grid item md={7}>
                        {showEdit == false ?
                        <>
                            <Typography variant="h4">User Name :{event.myfunc.Name}
                            </Typography>
                             <Typography variant="p">Role :{event.myfunc.role}
                             </Typography>
                             </>
                             :
                             <>
                         <CustomTextField onChange={myfunction} sx={{marginRight: '20px !important'}} id="Role" type="text" variant="outlined" fullWidth />
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
                            <Button href={`/auth/adminshowuser/${id}`}  sx={{marginLeft:'10px'}} startIcon={<VisibilityIcon sx={{marginLeft:'10px'}} />}></Button>
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>
  )
}