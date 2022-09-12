import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, Paper, TextField, Stack, Button, Box, Typography,  Card,
  CardContent,
  CardActions } from '@mui/material';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from "../../GlobalContext";
import { toast } from 'react-toastify';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";

const LoadingSpinner = () => {
  return (
    <div
      className="spinner-border text-success"
      style={{ width: "3em", height: "3em" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

function Editprofile(props) {
    const data = useContext(GlobalContext);
    const [token] = data.token;
    const [userData] = data.authApi.userData;
    const [isUser] = data.authApi.isUser;

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [user,setUser] = useState({
        email:"",
        password:"",
        name:"",
        mobile:""
    })

    // ref to navigate
    const navigate = useNavigate();
    const params   = useParams();

    useEffect(()=>{
        setUser(userData)
        setImage(userData.image)
    },[])

  // image upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      // to read file content from input
      const file = e.target.files[0];
      if (!file) return toast.error("file not exists..");
      // file size
      if (file.size > 1 * 1024 * 1024)
        return toast.error("file size is too large");
      // ref formData
      let formData = new FormData();
      formData.append("profileImg", file);

      setLoading(true);
      // upload logic
      const res = await axios.post(`/api/v1/image/profile/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // after upload
      setLoading(false);
      setImage(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // image delete handler
  const handleDestroy = async (e) => {
    try {
      if (window.confirm(`Are you sure to delete image?`)) {
        setLoading(true);
        await axios.post(
          `/api/v1/image/profile/destroy`,
          { public_id: image.public_id },
          {
            headers: { Authorization: token },
          }
        );

        setImage(false);
        setLoading(false);
      } else {
        toast.warning("delete terminated");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };


 

  const readValue = (e) =>{
    const { name, value } = e.target;
    setUser({...user, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Image doesn't exists.");

    const res = await axios.patch(
      `/api/v1/auth/updateProfile/${params.id}`,
      { ...user, image },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setImage(false);
    toast.success("Product created succesfully");
    navigate(`/`)
  };



  return (
    <Container>
      <Grid container sx={{display:'flex',justifyContent:'center',my:6}} >
      {/* <Grid  item md={6} sx={{display: { xs: "none", md: "block" }}}>
            <img src={image2} alt="" /> 
            <img src={user.image ? user.image.url : ""} sx={{height:'160px'}} alt="" />
        </Grid> */}
            {/* New*/}
         <Grid item md={6} xs={12} align="center">
          <Card >
            <CardContent sx={{display:"flex", justifyContent:'center'}}>
              <input
                variant="filled"
                type="file"
                name="profileImg"
                onChange={handleUpload}
                required
                style={{
                  border: "2px solid #726f6f",
                  padding: "10px",
                  borderRadius: "5px",
                  width:'75%'
                }}
              />
              <Box onClick={handleDestroy}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#f4474a",
                        ":hover": { backgroundColor: "#f4474a" },
                        padding: "14px",
                        borderRadius: "5px",
                        border: "2px solid #f4474a"
                      }}                      
                    >
                      <DeleteIcon />
                    </Button>
                    </Box>
            </CardContent>
            <CardActions align="center" sx={{display:'block'}}>
              {loading ? (
                <Box>
                  <LoadingSpinner />
                </Box>
              ) : (
                <Box align="center"     >
                  <img src={ image ? image.url : ""} height="275px"  alt="" />
                  
                </Box>
              )}
            </CardActions>
          </Card>
        </Grid> 
        {/* New*/}



        <Grid item xs={12} md={6}>
         <Paper elevation={10}>
          <Stack component='form' onSubmit={submitHandler} spacing={2} sx={{padding:2}}>
            <Box sx={{flexGrow:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <Typography variant="h4">
                Update Profile
              </Typography>
              <HowToRegSharpIcon color='warning' fontSize='large'/>
            </Box>
            <TextField color="secondary" label="Name" type="text" name='name' value={user.name} onChange={readValue} />
            <TextField color="secondary" label="Email" type="email" name='email' disabled value={user.email} onChange={readValue} />
            <TextField color="secondary" label="Mobile" type="number" name='mobile' value={user.mobile} onChange={readValue} />
            <Box sx={{display:'flex',justifyContent:'center'}}>
              <Button type='submit' color='warning' variant='contained'>Update</Button>
            </Box>
          </Stack>
          
         </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Editprofile