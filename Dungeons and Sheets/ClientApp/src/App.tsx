import React, { useEffect, useState } from 'react';
import Landing from './pages/LandingPage/Landing'
import Login from './pages/LoginPage/Login'
import SignUp from './pages/SignUpPage/SignUp'
import { useNavigate } from "react-router-dom"
import useAuth, { AuthProvider } from "./Components/AuthProvider/Auth";
import {
  BrowserRouter,
  Routes,
  Route,
  RouteProps
} from "react-router-dom";


function AuthenticatedRoute({ ...props }: RouteProps) {
  const { user } = useAuth()
  let navigate = useNavigate()

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
        element={<SignUp />}
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
