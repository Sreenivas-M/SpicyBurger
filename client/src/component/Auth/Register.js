import React, { useState } from 'react'
import { Container, Grid, Paper, TextField, Stack, Button, Box, Typography, Alert } from '@mui/material';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import image2 from '../../assets/images/logo.png'
import useValidation from '../util/Formvalidation'

function Register(props) {
  const [user,setUser] = useState({
    email:"",
    password:"",
    name:"",
    mobile:""
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
      await axios.post(`/api/v1/auth/register`,user).then(res =>{
        toast.success("user registered successfully")        
        navigate('/')
      }).catch(err => toast.error(err.response.data.msg));
    }catch(error){
      toast.error(error.response.data.msg)
    }
  }


  return (
    <Container>
      <Grid container sx={{display:'flex',justifyContent:'center',my:6}} >
      <Grid  item md={6} sx={{display: { xs: "none", md: "block" }}}>
            <img src={image2} alt="" />
        </Grid>
        <Grid item xs={12} md={6}>
         <Paper elevation={10}>
          <Stack component='form' onSubmit={submitHandler} spacing={2} sx={{padding:2}}>
            <Box sx={{flexGrow:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <Typography variant="h4">
                Register
              </Typography>
              <HowToRegSharpIcon color='warning' fontSize='large'/>
            </Box>
            <TextField color="secondary" label="Name" type="text" name='name' value={user.name} onChange={readValue} />
                    {
                      errors && errors.name ? (
                        <Alert severity="error" sx={{padding:0, margin:0}}>{errors.mobile}</Alert>                        
                      ) : null
                    }
            <TextField color="secondary" label="Email" type="email" name='email' value={user.email} onChange={readValue} />
            {
                      errors && errors.email ? (
                        <Alert severity="error" sx={{padding:0, margin:0}}>{errors.email}</Alert>                        
                      ) : null
                    }
            <TextField color="secondary" label="Mobile" type="number" name='mobile' value={user.mobile} onChange={readValue} />
            {
                      errors && errors.mobile ? (
                        <Alert severity="error" sx={{padding:0, margin:0}}>{errors.mobile}</Alert>                        
                      ) : null
                    }
            <TextField color="secondary" label="Password" type='password' name='password' value={user.password} onChange={readValue} />
            {
                      errors && errors.password ? (
                        <Alert severity="error" sx={{padding:0, margin:0}} >{errors.password}</Alert>                        
                      ) : null
                    }
            <Box sx={{display:'flex',justifyContent:'center'}}>
              <Button type='submit' color='warning' variant='contained'>Sign Up</Button>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center'}}>
              <NavLink to={`/login`}  style={{textDecoration: 'none'}}><Typography>Already have an account?</Typography></NavLink>
            </Box>
          </Stack>
          
         </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register