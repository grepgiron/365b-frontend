import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

import Admin from './layouts/Admin';


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='admin/*' element={<Admin/>}/>
        <Route path='/' element={<h1>LANDING PAGE</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
