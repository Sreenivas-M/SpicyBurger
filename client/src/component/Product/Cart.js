import { Grid, Stack, Typography, Container, Box, Paper, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { NavLink } from 'react-router-dom';


function Cart() {
    const data = useContext(GlobalContext);
    const [cart, setCart] = data.authApi.cart;
    const [token] = data.token;
    const orderUpdate = data.authApi.orderUpdate;
    const [finalTotal, setFinalTotal] = data.authApi.finalTotal
    const [order, setOrder] = data.authApi.order;

    const [total, setTotal] = useState(0); //total price
    const [gst, setGst] = useState(5); //gst -> cgst & get
    const [dc, setDc] = useState(30); //delivery charge


    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
            let gstTotal = Math.round(total * (5 / 100))
            let final = total + gstTotal + dc;
            setFinalTotal(final)
        }
        getTotal()
    }, [cart])

    // inc count of items
    const incCount = (id) => {

        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        });
        setCart([...cart])
        updateCart(cart)

        setOrder(cart,finalTotal)
        storeOrder(cart,finalTotal)
    };

    //   to dec count on item
    const decCount = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })
        setCart([...cart])
        updateCart(cart)

        setOrder(cart,finalTotal)
        storeOrder(cart,finalTotal)
    };

    //   to update cart
    const updateCart = async (cart) => {
        await axios.patch(`/api/v1/auth/addToCart`, { cart }, {
            headers: { Authorization: token }
        })
    };

    // delete item from cart
    const delItem = (id) => {
        if (window.confirm(`Do you want to remove this product ?`)) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            });
            setCart([...cart]);
            updateCart(cart)

            // setOrder(cart,finalTotal)
            // storeOrder(cart,finalTotal)
        }
    };
        // final order save and continue to check out
        const storeOrder = async (cart, finalTotal) => {
            await orderUpdate(cart,finalTotal)
        }

    if (cart.length === 0) {
        return (
            <Stack>
                {/* <Separator /> */}
                <Container>
                    <Box component="div">
                        <video width="100%"
                            height="500" src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-cart-5183597-4323095.mp4" autoplay="autoplay" muted="muted" loop="loop"></video>
                    </Box>
                    {/* <CommonHeader textAlign="center" sx={{ color: "red" }}>
                        Your Cart Is Empty...
                    </CommonHeader> */}
                </Container>
            </Stack>
        );
    }

    return (
        <Stack >
            {/* <Separator /> */}
            <Container>
                {/* <CommonHeader textAlign="center">
                    Cart
                </CommonHeader> */}
                <Grid container spacing={3} sx={{mt:5}} >
                    <Grid item xs={12} sm={12} md={6} lg={8}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Title</TableCell>
                                        <TableCell align="left">Image</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                        <TableCell align="left">Count</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart && cart.map((item, index) => {
                                            const { _id, title, image, price, quantity } = item;
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {title}
                                                    </TableCell>
                                                    <TableCell>
                                                        <img src={image.url} alt="" height={70} width={100} />
                                                    </TableCell>
                                                    <TableCell>
                                                        &#8377;{price}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton sx={{ padding: "0px", border:'1px solid yellow' }} color="warning" onClick={() => decCount(_id)}><RemoveIcon /></IconButton>
                                                        <strong> {quantity} </strong>
                                                        <IconButton sx={{ padding: "0px", border:'1px solid green' }} color="success" onClick={() => incCount(_id)}><AddIcon /></IconButton >  
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton variant="outlined" color="error" sx={{ marginX: "8px" }} onClick={() => delItem(_id)} >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card align="center">
                            <Typography sx={{ fontSize: "30px" }}>
                                Card-Info
                            </Typography>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <strong>Sub Total</strong>
                                    </div>
                                    <div>
                                        &#8377;{total}
                                    </div>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={3}>
                                    <div>
                                        <strong>Gst</strong>
                                    </div>
                                    <div>
                                        {gst} %
                                    </div>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={3}>
                                    <div>
                                        <strong>Delivery Charges</strong>
                                    </div>
                                    <div>
                                        &#8377; {dc}
                                    </div>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mt={3}>
                                    <div>
                                        <strong>Final Total</strong>
                                    </div>
                                    <div>
                                        &#8377; {finalTotal}
                                    </div>
                                </Box>
                            </CardContent>
                            <CardActions sx={{display:"flex",justifyContent:"center"}}>
                                <Button color='secondary' variant='contained' >
                                    <NavLink to={`/checkout`} style={{textDecoration:"none",fontWeight:"bold",color:"white"}}>
                                        Buy now
                                    </NavLink>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>


        </Stack >
    );
}

export default Cart;