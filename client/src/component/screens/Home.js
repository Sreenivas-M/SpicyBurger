import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Style from "./Style";
import Footer from "./Footer";
import Content from "./Content"; 
import Favorate from "./Favorate";



function Home() {
  return (
    <>   
      <Style />

      <Box sx={{ background: "#f8f7f5", height: 100, paddingY:2, display:'flex',alignItems:'center',justifyContent:'center' }}>
        <Typography variant="h4" textAlign='center' sx={{fontSize:{xs:'20px',md:'30px'}}}>Welcome To <stong color="red">Spicy Burger</stong></Typography>
      </Box>

      <Content/>

      <Favorate/>

      <Box sx={{background:'#ffecb3', padding:'30px', marginY:5, display:'flex', justifyContent:'center'}}>
     
      <Button variant="contained"><Typography>Click here for more</Typography></Button>
   
      </Box>
      
      <Footer/>

    </>
  );
}

export default Home;
