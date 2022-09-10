import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Header from './Components/Header';

import App from "./Views/App"
import Character from "./Views/Character/Character"
import CharacterList from "./Views/Character/CharacterList"
import CharacterBuilder from "./Views/Character/CharacterBuilder"

ReactDOM.render(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/characters" element={<CharacterList/>}/>
            <Route path="/characters/:id" element={<Character/>}/>
            <Route path="/characters/builder" element={<CharacterBuilder/>}/>
            <Route path="/characters/builder/:id" element={<CharacterBuilder/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);