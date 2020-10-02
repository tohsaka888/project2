import React from 'react';
import Pc from "./Pc";
import Mobile from "./Mobile";
import {BrowserRouter as Router} from 'react-router-dom'

const App = () => {

    const width = window.innerWidth;
    const breakpoint = 620;

    return (
        <Router>
            {width < breakpoint ? <Mobile/> : <Pc/>}
        </Router>
    );
};

export default App;
