import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

import Admin from './layouts/Admin';

import './App.css';
import 'rsuite/dist/rsuite.min.css'; // or css

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
