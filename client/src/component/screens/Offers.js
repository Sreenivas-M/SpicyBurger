import React from 'react'
import {Button, Typography} from '@mui/material'
import {NavLink} from 'react-router-dom'

function Offers() {
  return (
    <div align='center' >
    <Typography color='red' variant='h4' sx={{marginTop:"100px"}}>Page under construction</Typography>
    <NavLink to={'/'}><Button variant='contained'>Back Home</Button></NavLink>
    </div>
  )
}

export default Offers