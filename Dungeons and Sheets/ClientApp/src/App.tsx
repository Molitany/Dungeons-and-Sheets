import React, { useEffect, useState } from 'react';
import Landing from './Pages/LandingPage/Landing'
import Login from './Pages/LoginPage/Login'
import SignUp from './Pages/SignupPage/Signup'
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
