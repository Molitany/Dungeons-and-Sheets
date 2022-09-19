import React, { useEffect, useState } from 'react';
import Landing from './pages/LandingPage/Landing'
import Login from './pages/LoginPage/Login'
import CharacterBuilder from './pages/CharacterBuilderPage/CharacterBuilder';
import { SystemBuilder } from './pages/SystemBuilderPage/SystemBuilder'
import {
  BrowserRouter,
  Routes,
  Route,
  RouteProps
} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import useAuth, { AuthProvider } from "./AuthProvider/Auth";

function AuthenticatedRoute({ ...props }: RouteProps) {
  const { user } = useAuth()
  let navigate = useNavigate()
  console.log("BIG:" + user)
  useEffect(() => {
    if (!user) {
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
        element={<Login />}
      />
      <Route
        path="/CharacterBuilder"
        element={<CharacterBuilder />}
      />
      <Route
        path="/SystemBuilder"
        element={<SystemBuilder />}
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
