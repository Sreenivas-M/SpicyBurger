import React from 'react'
import { NavLink } from 'react-router-dom'
import {Grid, Container, Typography, Card, CardMedia} from '@mui/material'

const product = [
  {
    title: "Burger-1",
    src: 'https://images.pexels.com/photos/2983098/pexels-photo-2983098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    title: "Burger-99",
    src: "https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Burger-46",
    src: "https://images.pexels.com/photos/9842225/pexels-photo-9842225.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  },
  {
    title: "Burger-07",
    src: "https://images.pexels.com/photos/3864682/pexels-photo-3864682.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  }
]


function Content() {
  return (
    <Container>
      <Typography variant='h4' color="error" p='10px' >Menu</Typography>
      <Grid container spacing={2} sx={{justifyContent:'center'}}>        
              {
                product.map((item, index) => {
                    return (
                      <Grid item xs={12} md={3} sx={{justifyContent:'center'}} >
                      <NavLink to={`/menu`} sx={{text:'none'}} style={{textDecoration:'none'}}>
                      <Card key={index}>
                        <CardMedia 
                          component="img"
                          height="100%"
                          width="100%"
                          image={item.src}
                          alt={item.title}
                          sx={{
                            "&:hover": {
                              transition: "all 0.3s ease 0s",
                              transform:"scale(1.5)"
                            }                             
                          }}
                      />                      
                      {/* <CardContent align="center" sx={{background:"violet"}}>
                        
                        <Typography  variant='h6'>{item.title}</Typography>
                      </CardContent> */}
                      <Typography textAlign="center" variant='h6'>{item.title}</Typography>
                      </Card>
                      </NavLink>
                      </Grid>
                    )
                })
              }
      </Grid>
    </Container>
  )
}

export default Content