import React from 'react'
import { Container, Card, CardContent, Divider, Stack, TextField, Button, Box, CardActions, Typography } from '@mui/material';

function Recover() {
  return (
    <Container sx={{display:'flex',justifyContent:'center'}}>
    <Card sx={{display:'block',justifyContent:'center', my:10,  width: '600px', background:'#e1bee7' }}>
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Forget Your Password
        </Typography>
        <Divider color="black"></Divider>
        <Typography sx={{m:5}}>How do you want to receive the code to reset your password?</Typography>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="fioutlined-basic" label="Number" variant="outlined" />
            
        </Box>
      </CardContent>
      <CardActions sx={{justifyContent:'center'}}>        
        <Button variant='contained' size="small" color="secondary">Continue</Button>
      </CardActions>
    </Card>
    </Container>
  )
}

export default Recover