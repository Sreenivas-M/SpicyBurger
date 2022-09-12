import React, { useContext, useEffect, useState}from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { Container } from '@mui/system';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


function Orders() {
  const context = useContext(GlobalContext);
  const [token] = context.token
  const [userData] = context.authApi.userData

  const [orders,setOrders] = useState([])

  useEffect(() => {
  const getOrders = async () => {
    let res = await axios.get(`/api/v1/auth/orders`, {
      headers: { Authorization: token }
    })
    setOrders(res.data.orders)
  } 
  getOrders()
}, [])


if(orders.length === 0) {
  return(
    <>
    <Box display='flex' justifyContent='center' mt='50px'>
  <Typography variant="h2">Hi {userData.name}, No Orders</Typography>  
  </Box>
  <Box display='flex' justifyContent='center'>
    <NavLink to={'/menu'}><Button variant="contained">Keep Shopping</Button></NavLink>
  </Box>
  </>
  )
}
  return (
    <Container>
      <Typography mt={3} mb={2} variant='h4' color='black' sx={{display:'flex' ,justifyContent:'center', fontWeight:'bold',}}>My Orders</Typography>
      <Grid >
      <Grid item xs={12} sm={12} md={6} lg={8}  >
                        <TableContainer component={Paper} elevation={8} >
                            <Table sx={{ minWidth: 650, backgroundColor:'lightcyan' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{color:'yellow'}} align="left">Order Id</TableCell>
                                        <TableCell sx={{color:'yellow'}} align="left">Date</TableCell>
                                        <TableCell sx={{color:'yellow'}} align="left">Address</TableCell>
                                        <TableCell sx={{color:'yellow'}} align="left">Status</TableCell>                                        
                                        <TableCell sx={{color:'yellow'}} align="left">Cart</TableCell>
                                        <TableCell sx={{color:'yellow'}} align="left">Total</TableCell>
                                        <TableCell sx={{color:'yellow'}} align="left">PaymentStatus </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        orders && orders.map((item, index) => {
                                            return (
                                                      <TableRow key={index}>
                                                        <TableCell sx={{fontWeight:'bold'}}>
                                                          {item.orderId}
                                                        </TableCell>
                                                        <TableCell sx={{fontWeight:'bold'}}>
                                                        {new Date(item.createdAt).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell sx={{fontWeight:'bold'}}>
                                                          {item.address}
                                                        </TableCell>
                                                        <TableCell sx={{fontWeight:'bold'}}>
                                                          {item.orderStatus}
                                                        </TableCell>
                                                        <TableCell sx={{fontWeight:'bold'}}>
                                                          <details>
                                                            <summary>Show Cart</summary>
                                                            {
                                                              item.cart.map((item, index) => {
                                                                return(
                                                                  <Box>
                                                                  <Box key={index} >
                                                                    <img src={item.image.url} height='150vh' alt="image" width='150px' />
                                                                  </Box>
                                                                  <Box>
                                                                    <Typography component='h5'>
                                                                      {item.title}
                                                                    </Typography>
                                                                    <Typography component='p' variant='span' >
                                                                       &#8377; {item.price}
                                                                    </Typography>
                                                                  </Box>
                                                                  </Box>
                                                                )
                                                              })
                                                            }
                                                          </details>
                                                        </TableCell>
                                                        <TableCell >
                                                          <Typography component='strong' sx={{fontWeight:'bold'}}>
                                                            &#8377;{item.finalTotal}
                                                          </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                          <Typography sx={{fontWeight:'bold'}}>
                                                            &#8377;{item.paymentStatus}
                                                          </Typography>
                                                        </TableCell>
                                                      </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    </Grid>
    </Container>
  )
}

export default Orders