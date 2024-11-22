import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import axios from "axios"
import './App.css'
import { TextField, Divider, Paper, Stack, Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ChatUI from "../components/ChatUI";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#13576e',
      contrastText: '#f1ecec'
    },
    secondary: {
      main: '#571c56',
    },
    background: {
      default: '#000f2b',
      paper: '#f1d1b0',
    },
    text: {
      primary: '#000000',
    },
    divider: '#f3e8d5',
  },
  typography: {
    fontFamily: 'Raleway',
  },
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{flexGrow: 1, height: "100%"}}>
        <Grid size={3}>
          <Box sx={{bgcolor: "#76578c" , height:"100%"}} id="caja">
            <Box sx={{p: 1}}>
              <Typography variant="h5" align="center" color="white">
                Agentic Assistant for the Virtual Observatory
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={9}>
          <ChatUI />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
