import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Outlet } from 'react-router-dom';
import Header from './header';

const theme= createTheme({
    palette:{
        mode:"light",
    }
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
       <Header/>
        <main>
            <Outlet/>
        </main>
        <footer>

        </footer>
    </ThemeProvider>
    
  )
}

export default Layout