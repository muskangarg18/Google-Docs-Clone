import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Doc from './Pages/Doc';
import { useAuth } from './Firebase/Auth';

function App() {
  const currentUser = useAuth();

  return (
    <>
    
    <Router>
      <Routes>
        
        <Route
          path="/"
          element={currentUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/document/:id" element={<Doc />} />
        
      </Routes>
    </Router>
    
    </>
    
  );
}

export default App;
