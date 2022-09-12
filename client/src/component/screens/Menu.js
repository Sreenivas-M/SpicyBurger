import React, { useContext, useState, useEffect } from 'react'
import { Grid, Typography, Container, Button, Box, Divider, Tab, Tabs,
Chip} from '@mui/material';
import Footer from './Footer';

import { toast } from 'react-toastify';
import axios from 'axios';

import Product from '../Product/Product';
import { GlobalContext } from './../../GlobalContext';
import { Stack } from '@mui/system';


function Menu() {

  const data = useContext(GlobalContext)
  const [products, setProducts] = data.productApi.products;
  const [isUser] = data.authApi.isUser;
  const [isAdmin] = data.authApi.isAdmin;
  const [token] = data.token

  const [curItems, setCurItems] = useState([]);



  const filterResult = (catItem) => {
    // console.log('cate item =', catItem)

    if (catItem === "All") {
      setCurItems(products);
    } else {
      let result = products.filter((curData) => {
        return curData.category === catItem;
      });
    // console.log("filtered result =", result);
      setCurItems(result);
    }
  };

  useEffect(() => {
    filterResult("All");
  }, [products]);

  const delHandler = async (id) => {
    if (window.confirm(`Are you sure to delete product?`)) {
      try {
        let product = await axios.get(`/api/v1/product/get/${id}`)
        if (!product) {
          toast.error('no product found')
        } else {
            // delete image
          axios.post(`/api/v1/image/product/destroy`, { public_id: product.public_id }, {
              headers: {Authorization: token}
           })
           await axios.delete(`/api/v1/product/delete/${id}`, {
              headers: {Authorization: token}
           })
            .then(res => {
              toast.success("Product deleted succssfully");
              window.location.reload();
          }).catch(err => toast.error(err.message))
        }

        } catch (err) {
          toast.error(err.message)
        }
    } else {
      toast.warning('delete terminated')
    }
  }

  return (
    <>
     
    <Container >
      <Grid container >
        {/*  md filter */}
        <Grid item xs={12} md={2} sx={{padding:3,background:'rgb(240,230,140, 0.2)', display: { xs: "none", md: "block" }}}>
            <Stack direction="column" spacing={1} mt={10} position="fixed">
              <Button variant="contained"  onClick={() => filterResult("All")}>All</Button>              
              <Button variant="contained" onClick={() => filterResult("Burger-1")}>Burger</Button>
              <Button variant="contained" onClick={() => filterResult("king-size")}>Whopers</Button>
              <Button variant="contained" onClick={() => filterResult("whopers")}>King Size</Button>
              <Button variant="contained" onClick={() => filterResult("soft-drinks")}>Soft Drinks</Button>
            </Stack>
        </Grid>
        {/* xs Filter */}
        <Grid item xs={12} md={2} sx={{padding:0,background:'rgb(250,100,250, 0.3)', display: { xs: "block", md: "none" }}}>
        <Box sx={{ display: "flex", justifyContent: "center", padding:0, marginTop:'30px'}}>
            <Tabs              
              indicatorColor="secondary" variant="scrollable" scrollButtons allowScrollButtonsMobile                       
            >
              <Tab sx={{padding: 0}} onClick={() => filterResult("All")}          
                label={
                  <>
                    <Chip
                      label="All" variant="contained"
                      sx={{
                        "&:hover": {
                          background: "#f4474a",
                          color: "white",
                        },
                        fontWeight: "bold", 
                      }}
                    />
                  </>
                }
                
              />
              <Tab  sx={{padding: 0.5}} onClick={() => filterResult("Burger-1")}
                label={
                  <>
                    <Chip
                      label="Burger" variant="contained"
                      sx={{
                        "&:hover": {
                          background: "#f4474a",
                          color: "white",
                        },
                        fontWeight: "bold",
                      }}
                    />
                  </>
                }
              />
              <Tab  sx={{padding: 0.5}} onClick={() => filterResult("king-size")}
                label={
                  <>
                    <Chip
                      label="king-size" variant="contained"
                      sx={{
                        "&:hover": {
                          background: "#f4474a",
                          color: "white",
                        },
                        fontWeight: "bold",                        
                      }}
                    />
                  </>
                }
              />
              <Tab  sx={{padding: 0.5}} onClick={() => filterResult("whopers")}
                label={
                  <>
                    <Chip
                      label="Whopers" variant="contained"
                      sx={{
                        "&:hover": {
                          background: "#f4474a",
                          color: "white",
                        },
                        fontWeight: "bold",
                      }}
                    />
                  </>
                }
              />
              <Tab  sx={{padding: 0.5}} onClick={() => filterResult("soft-drinks")}
                label={
                  <>
                    <Chip
                      label="soft-drinks" variant="contained"
                      sx={{
                        "&:hover": {
                          background: "#f4474a",
                          color: "white",
                        },
                        fontWeight: "bold",
                      }}
                    />
                  </>
                }
              />
            </Tabs>
          </Box>
        </Grid>
        {/* <Divider orientation="vertical" flexItem color="black" ></Divider> */}
        <Grid item xs={12} md={10}>        
          <Grid container  sx={{padding:0, background:'rgb(240,230,140, 0.2)'}}>
            
            <Typography variant='h5' padding='35px' margin='auto'>Our Menu</Typography>
            
            <Grid container> 
              {
                curItems && curItems.map((item,index)=>{
                  return(
                      <Product key={index} {...item} isUser={isUser} isAdmin={isAdmin} del={delHandler} />
                  )
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    {/* <Footer/> */}
    </>
  )
}

export default Menu

