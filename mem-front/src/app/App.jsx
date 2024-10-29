import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import axios from "axios"
import './App.css'
import { TextField, Divider, Paper, Stack, Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ChatUI from "../components/ChatUI";


function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState([])

  
  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     const result = await fetch('http://127.0.0.1:8000/');
  //     const jsonResult = await result.json();

  //     setMessage(jsonResult.message);
  //   }

  //   fetchMessage();
  // }, [])

  // const changeMessage = async () => {
  //   const newMessage = {
  //     message: "This was sent from the front."
  //   }

  //   const result = await fetch('http://127.0.0.1:8000/new/', {
  //     method:'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newMessage)
  //   })

  //   const resultInJson = await result.json();
  //   console.log(resultInJson);
  //   setMessage(resultInJson.message);
    
  // }

  return (
    <Grid container sx={{flexGrow: 1, height: "100%"}}>
      <Grid size={3}>
        <Box sx={{bgcolor: "#76578c" , height:"100%"}} id="caja">
          <Box sx={{p: 1}}>
            <Typography variant="h5" align="center" color="white">
              Agente Asistente para VO
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid size={9}>
        <ChatUI />
      </Grid>
    </Grid>
  )
}

export default App
