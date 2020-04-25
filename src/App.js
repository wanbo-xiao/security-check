import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import './App.css';
import SubmitPage from "./pages/SubmitPage";
import Dashboard from "./pages/Dashboard"

function App() {

    return (
        <Router>
            <Route exact path="/" component={SubmitPage}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </Router>
    );
}

export default App;
