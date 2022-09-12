import React, { useEffect, useState } from 'react';
import Landing from './pages/LandingPage/Landing'
import Login from './pages/LoginPage/Login'
import {
  BrowserRouter,
  Routes,
  Route,
  RouteProps
} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import useAuth, { AuthProvider } from "./AuthProvider/Auth";
import Signup from './pages/SignupPage/Signup';

function AuthenticatedRoute({ ...props }: RouteProps) {
  const { user } = useAuth()
  let navigate = useNavigate()
  console.log("BIG:" + user)
  useEffect(() => {
    if (!user){
      navigate("../Login")
    }
  })
  
  return <Landing />;
}

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={<AuthenticatedRoute />}
      />
      <Route
        path="/Login"
        element={<Login />}
      />
      <Route
        path="/SignUp"
        element={<Signup />}
      />
    </Routes>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
