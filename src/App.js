import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

import Admin from './layouts/Admin';
import Pos from './layouts/Pos';

//import './App.css';
//import 'rsuite/dist/rsuite.min.css'; // or css

function App() {
  return (
    <Router>
      <Routes>
        <Route path='admin/*' element={<Admin/>}/>
        <Route path='pos/*' element={<Pos />}/>
        <Route path='/' element={<h1>LANDING PAGE</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
