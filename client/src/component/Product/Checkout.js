import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext';
import axios from 'axios'
import { toast } from 'react-toastify'
import { Card, Container, Divider, Grid, Typography, CardContent, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';

function Checkout() {
    const navigate = useNavigate()

    const context = useContext(GlobalContext)
    const [token] = context.token
    const [order, setOrder] = context.authApi.order;
    const [finalTotal] = context.authApi.finalTotal;
    const [cart,setCart] = context.authApi.cart;

    const [data,setData] = useState({
        address: "",
        paymentMode: ""
    })

    const readValue = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]: value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await axios.post(`/api/v1/order/newOrder`, {
            cart: cart,
            address: data.address,
            finalTotal: finalTotal,
            paymentMode: data.paymentMode,
            paymentId: Math.floor(Math.random() * 12345689),
            paymentStatus: "unpaid"
        },{
            headers: { Authorization: token }
        });
        toast.success("Order Confirmed Successfully")
        setCart([])
        navigate('/')
        window.location.href = "/"
    }

  return (
    <Container>
        <Grid container >
            <Grid item xs={12}>
                <Typography variant='h2' align='center'>Check out</Typography>
            </Grid>
        </Grid>

        <Grid container sx={{display:'flex',justifyContent:'center'}} >
            <Grid item xs={12} md={6} >
                <Card sx={{background:"#ffff8d"}}>
                    <CardContent>
                        <Typography variant='h6' color='primary' sx={{py:2}}>
                            <strong> Cart Total =  &#8377; {finalTotal ? finalTotal: null } </strong>                            
                        </Typography>

                        <Box component="div" >
                            <form action="" onSubmit={submitHandler}>
                                <Box component='div'>
                                    <Typography sx={{pt:1,pb:2}}>Address</Typography>
                                    <TextField color='secondary' variant='outlined' name="address" id="address" rows={5} fullWidth required onChange={readValue} label='address' multiline/>
                               </Box>
                               <FormControl>
                                    <FormLabel sx={{pt:2}} id="demo-row-radio-buttons-group-label">Payment mode</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel type="radio" name="paymentMode" id="paymentMode" checked={ data.paymentMode === "cod" } onChange={readValue} value="cod" control={<Radio color="secondary" />} label="Cash on delivery" />
                                        <FormControlLabel type="radio" name="paymentMode" id="paymentMode" checked={data.paymentMode === "card"} value="card" onChange={readValue} control={<Radio color="secondary" />} label="Card" />
                                    </RadioGroup>
                                </FormControl>
                               
                               <Divider color="black" sx={{my:3}}/>
                                <div style={{display:'flex',justifyContent:"center"}} >
                                    <Button variant='contained' color='warning' type='submit'>Check out</Button>
                                </div>
                            </form>
                        </Box>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>

    </Container>     
  )
}

export default Checkout