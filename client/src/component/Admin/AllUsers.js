import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import {  Button, Grid, Paper, Table, TableBody,  TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';


function AllUsers() {
    const data = useContext(GlobalContext);
    const [products] = data.productApi.products;
    const [allUsers] = data.authApi.allUsers
    const [editableUser, setEditableUser] = useState(false)

    const [isEdit, setIsEdit] = useState(false)


    const toggleEdit = (userId) => {
        let user = allUsers.find(item => item._id === userId)
        setEditableUser(user)
    }
    const cancelEdit = () => {
        setIsEdit(false)
    }
    
  return (
    <div>
        <Container>
            <Typography mt={3} mb={2} variant='h4' color='black' sx={{display:'flex' ,justifyContent:'center', fontWeight:'bold',}}>All Users</Typography>
            <Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}  >
                <TableContainer component={Paper} elevation={8} >
                                <Table sx={{ minWidth: 650, backgroundColor:'#fce4ec' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor:'#5d4037'}}>
                                            <TableCell sx={{fontWeight:'bolder',  color:'#fafafa'}} align="left">NAME</TableCell>
                                            <TableCell sx={{fontWeight:'bolder',  color:'#fafafa'}} align="left">Email</TableCell>
                                            <TableCell sx={{fontWeight:'bolder',  color:'#fafafa'}} align="left">Mobile</TableCell>
                                            <TableCell sx={{fontWeight:'bolder',  color:'#fafafa'}} align="left">Role</TableCell>                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            allUsers && allUsers.map((item, index) => {
                                                return (
                                                        <TableRow key={index}>
                                                            <TableCell sx={{fontWeight:'bold'}}>
                                                            {item.name}
                                                            </TableCell>
                                                            <TableCell sx={{fontWeight:'bold'}}>
                                                            {new Date(item.createdAt).toLocaleString()}
                                                            </TableCell>
                                                            <TableCell sx={{fontWeight:'bold'}}>
                                                            {item.email}
                                                            </TableCell>
                                                            <TableCell sx={{fontWeight:'bold'}}>
                                                            {item.role}
                                                            <Button onCLick={()=> toggleEdit(item._id)}><EditIcon/></Button>
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
    </div>
  )
}

export default AllUsers