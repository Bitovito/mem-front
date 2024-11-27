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
    mode: 'dark',
    primary: {
      main: '#00838f',
    },
    secondary: {
      main: '#ad1457',
    },
    background: {
      default: '#04041e',
      paper: '#04041e',
    },
    error: {
      main: '#d50000',
    },
    warning: {
      main: '#ff6d00',
    },
    info: {
      main: '#4fc3f7',
    },
    success: {
      main: '#4caf50',
    },
    divider: 'rgba(189,189,189,0.28)',
  },
  typography: {
    fontFamily: 'Raleway',
  },
  shape: {
    borderRadius: 0,
  },
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{flexGrow: 1, height: "100%"}}>
        <Grid size={2}>
          <Box sx={{bgcolor: theme.palette.primary.main , height:"100%"}} id="caja">
            <Box sx={{p: 1}}>
              <Typography variant="h5" align="center" color="white">
                Agentic Assistant for the Virtual Observatory
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={10}>
          <ChatUI />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
