import { Card, CardContent, Grid, Typography, Box, List, ListItem, CardMedia, IconButton } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


const noImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNGGjrfSqqv8UjL18xS4YypbK-q7po_8oVQ&usqp=CAU"

function Product(props) {
    const {_id, title, price, image, desc, stock, isAdmin, del} = props
    
  return ( 
    <React.Fragment>
      {
         stock === 0 ? null : (
          
          <Grid item xs={12} sm={4} md={4} sx={{padding:1}}>
            <NavLink to={`/product/details/${_id}`} style={{textDecoration:'none'}}>
              <Card sx={{height:'400px'}}>
                {
                  image.url ? (
                    <CardMedia component='img' image={image.url} sx={{height:'200px'}} alt={title} />
                  ): (
                    <CardMedia component='img' image={noImage} alt="No image found" />
                  )
                }

                <CardContent>
                  <Typography variant='h5' sx={{paddingY:1}} textAlign='center'>{title}</Typography>
                  <List>
                    <ListItem sx={{display:'flex',justifyContent:'space-between'}}>
                      <strong>Price</strong>
                      <span> &#8377;{price} </span>
                    </ListItem>

                    <ListItem>
                      <Typography variant='p'>
                        {desc}
                      </Typography>
                    </ListItem>
                  </List>

                  <Box component='div'>
                    {
                      isAdmin ? (
                        
                          <div style={{display:'flex',justifyContent:'space-between'}}>
                            <NavLink to={`/product/update/${_id}`} >
                                <IconButton color='info'>
                                  <EditRoundedIcon/>
                                </IconButton>
                            </NavLink>
                            <IconButton onClick={() => del(_id)} color="error">
                              <DeleteForeverRoundedIcon/>
                            </IconButton>
                          </div>
                        
                      ): null
                    }
                  </Box>
                </CardContent>
                  
              </Card>
            </NavLink>
            

          </Grid>
          

        
        )
      }

    </React.Fragment>






















  )
}

export default Product
