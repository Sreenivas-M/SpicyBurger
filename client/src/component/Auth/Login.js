import React, {useState} from 'react'
import { Container, Grid, Paper, TextField, Stack, Button, Box, Alert, Typography } from '@mui/material';
import KeySharpIcon from '@mui/icons-material/KeySharp';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import image1 from '../../assets/images/img1.png'
import useValidation from '../util/Formvalidation'

function Login(props) {
  const [user,setUser] = useState({
    email:"",
    password:"",
  }) 

  const navigate = useNavigate();
  const {errors, validate} = useValidation()

  const readValue = (e) =>{
    const { name, value } = e.target;
    validate(name, value)
    setUser({...user, [name]:value})
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      await axios.post(`/api/v1/auth/login`,user).then(res =>{
        toast.success("login successful")
        localStorage.setItem('loginToken', true)
        navigate('/')
        window.location.reload();
      }).catch(err => toast.error(err.response.data.msg));
    }catch(error){
      toast.error(error.response.data.msg)
    }
  }


  return (
    <Container>
      <Grid container sx={{display:'flex',justifyContent:'center',my:10}} >
        <Grid  item md={6} sx={{display: { xs: "none", md: "block" }}}>
            <img src={image1} alt="" />
        </Grid>
        <Grid item xs={12} md={6}>
         <Paper elevation={10}>
          <Stack component='form' autoComplete='off' onSubmit={submitHandler} spacing={2} sx={{paddingX:2, paddingY:5}}>
            <Box sx={{flexGrow:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <Typography variant="h4">
                Login
              </Typography>
              <KeySharpIcon color='success' fontSize='large'/>
            </Box>

              <TextField color="secondary" label="Email" type='email' name='email' value={user.email} onChange={readValue} />
              {
                      errors && errors.email ? (
                        <Alert severity="error" sx={{padding:0, margin:0}} >{errors.email}</Alert>                        
                      ) : null
                    }
              <TextField color="secondary" label="Password" type='password' name='password' value={user.password} onChange={readValue} />
              {
                      errors && errors.password ? (
                        <Alert severity="error" sx={{padding:0, margin:0}} >{errors.password}</Alert>                        
                      ) : null
                    }
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <Button type='submit' color='success' sx={{width:'200px'}} variant='contained'>Login</Button>
              </Box>

              <Box sx={{display:'flex',justifyContent:'space-around'}}>
              <NavLink to={`/recover`}  style={{textDecoration: 'none'}}><Typography>Forgotten account?</Typography></NavLink>
              <NavLink to={`/register`}  style={{textDecoration: 'none'}}><Typography>Sign up for Spicy Burger</Typography></NavLink>
              </Box>

          </Stack>
          
         </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login