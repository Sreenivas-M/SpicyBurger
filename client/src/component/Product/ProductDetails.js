import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from './../../GlobalContext';
import { Card, CardContent, Container, Grid, Typography, Paper, CardHeader,  Button, Rating } from '@mui/material';


function ProductDetails() {
  const data = useContext(GlobalContext);
  const [isAdmin] = data.authApi.isAdmin;
  const params = useParams();
  const [product, setProduct] = useState("");
  const [itemCount, setItemCount] = useState(0)
  const addToCart = data.authApi.addToCart

  const getSingle = async (id) => {
    let res = await axios.get(`/api/v1/product/get/${id}`);
    setProduct(res.data.product);
  };

  useEffect(() => {
    getSingle(params.id);
  }, []);

  
  return (
    <Container>
      <Grid container spacing={2}>

        <Grid item xs={12} sx={{paddingY:3}} textAlign="center">
          <Typography variant="h4">
            Product details
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} align='center'>
         <Paper sx={{p:2}}>
            {
            !product ? null : (
              <img
                src={product.image.url}
                alt={product.title} 
                style={{width:'90%', height:'60vh'}}                             
              />
            )
            }
            <Rating sx={{py:2}} name="read-only" readOnly defaultValue={5} max={5} />
         </Paper>  
        </Grid>

        <Grid item xs={12} md={6}>
         <Card>
          <CardHeader sx={{textAlign:'center'}} title={product.title}/>
          <CardContent>

            <div style={{display:'flex'}}>
            <Typography > <strong>Price &nbsp;</strong></Typography>
              <Typography color='red'> &#8377; {product.price} </Typography>
              <del style={{marginLeft:"10px"}} >
                &#8377;{product.price + product.price * (10 / 100)}
              </del>
              <span>(inclusive GST)</span>
            </div>

            <div >
                <Typography sx={{pt:3}}> <strong>Quantity</strong></Typography>
              <div style={{display:'flex',justifyContent:"space-between"}}>
                <Button variant="contained" size="small" color="secondary">{product.qnty}</Button>                 
              </div>                
            </div>

            <div style={{paddingBottom:'30px'}} >
                <Typography sx={{pt:3}}><strong > Description </strong></Typography>
                <Typography variant="p"> {product.desc} </Typography>
            </div>

            <div>
              {
                  isAdmin ? null : (
                      <Button onClick={() => addToCart(product)} variant="contained" color="warning" fullWidth> Add to Cart </Button>
                  )
              }
            </div>                                   
          </CardContent>
         </Card>

        </Grid>
      </Grid>



      



    </Container>
  );
}

export default ProductDetails;