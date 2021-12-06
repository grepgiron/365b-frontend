import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

import Admin from './layouts/Admin';
import Pos from './layouts/Pos';
import Login from "./views/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='admin/*' element={<Admin/>}/>
        <Route path='pos/*' element={<Pos />}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
