import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

import Admin from './layouts/Admin';

import FormEmployee from "./views/employee/components/Form";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='admin/*' element={<Admin/>}/>
        <Route path='/employee' element={<FormEmployee/>}/>
        <Route path='/' element={<h1>LANDING PAGE</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
