import styled from '@emotion/styled';
import { Box, Typography, Stack, Container, Grid, Button, Divider, IconButton } from '@mui/material';
import React from 'react'
import Footerimage from './../../assets/images/footerimg2.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Banner = styled.div`
background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${Footerimage});
height:100%;
background-repeat: no-repeat;
background-size: cover;

`;

const FooterStyle = () => {
  return (
    <>
    <Banner>
        <Container sx={{py:4}}>            

            <Grid container spacing={1} sx={{display:'flex',justifyContent:{xs:'flex-start',md:'center'}}}>
                <Grid item xs={6} sm={4} md={3} sx={{color:'white'}}>
                    <Typography variant='h5' sx={{paddingY:1}} > Support </Typography> <Divider color="white"/>
                    <Typography variant="subtitle1">Get Help</Typography>
                    <Typography variant="subtitle1">Feedback</Typography>
                    <Typography variant="subtitle1">Contact us</Typography>
                    <Typography variant="subtitle1">Privacy Policy</Typography>
                </Grid >        
                <Grid item xs={6} sm={4} md={3} sx={{color:'white'}}>
                    <Typography variant='h5' sx={{paddingY:1}}> Legal </Typography> <Divider color="white"/>
                    <Typography variant="subtitle1">Terms and Condition</Typography>
                    <Typography variant="subtitle1">Privacy Policy</Typography>
                    <Typography variant="subtitle1">Disclaimer</Typography>
                    <Typography variant="subtitle1">Caution notice</Typography>
                </Grid>                         
                <Grid item xs={6} sm={4} md={3} sx={{color:'white'}}>
                    <Typography variant='h5' sx={{paddingY:1}}>Contact</Typography> <Divider color="white"/>
                    <Typography variant="subtitle1">About</Typography>
                    <Typography variant="subtitle1">Care</Typography>
                    <Typography variant="subtitle1">Careers</Typography>
                    <Typography variant="subtitle1">Our Golden</Typography>
                </Grid>

                <Grid item xs={6} sm={4} md={3} sx={{color:'white',textAlign:{xs:'left',md:'left'}}}>
                    <Typography variant='h5' sx={{paddingY:1}}>Follow Us</Typography> <Divider color="white"/>
                    <Box sx={{paddingY:5, textAlign:{xs:'center', md: 'left'}}} >
                        <IconButton sx={{color:'white', border:1, backgroundColor:"blue", mx:1}}>
                            <FacebookIcon/>
                        </IconButton> 
                        <IconButton sx={{color:'white', border:1, backgroundColor:"#f50057", sx:{mx:1}}}>
                            <InstagramIcon/>
                        </IconButton> 
                        <IconButton sx={{color:'white', border:1, backgroundColor:"skyblue", mx:1}}>
                            <TwitterIcon/>
                        </IconButton> 
                        <IconButton sx={{color:'white', border:1, backgroundColor:"red", sx:{mx:1}}}>
                            <YouTubeIcon/> 
                        </IconButton>    
                    </Box> 
                    
                </Grid>              

            </Grid>

            <Divider color="white" sx={{paddingY:'1px',marginY:'20px'}}/>

            <Grid container spacing={2} sx={{color:'white'}}>
                <Grid item xs={12} md={12} sx={{display:'flex',justifyContent:'center'}}>
                    <Typography variant='p'>Copyright © Spicy Burger 2022 All Rights Reserved</Typography>
                </Grid>
                
            </Grid>
        </Container>
    </Banner>
    </>
  )
}

export default FooterStyle

    
