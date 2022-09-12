import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react'
import Logo from './../../assets/images/img1.png'


const Banner = styled.div`
background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${Logo});
height:70vh;
background-repeat: no-repeat;
background-size: cover;
margin:5px 0 5px 0;
`;

const Style = () => {
  return (
    <>
    <Banner sx={{my:'1'}}>      
      <Box sx={{textAlign:'center', paddingTop:'140px', color:'white'}}>
        <Typography variant='h4' sx={{fontSize:{xs:'18px',md:'30px'}, my:2}}>Are You A Burger Lover..!</Typography>
        <Typography variant='h2' sx={{fontSize:{xs:'30px',md:'40px'}}}>Here is the Best Place Where You Have To Visit...</Typography>
      </Box>      
    </Banner>

    </>
  )
}

export default Style


// export const Image = styled(Box)(() => ({}))

// const Image = styled(Box)(() => ({}))

//cont theme = createTheme({})