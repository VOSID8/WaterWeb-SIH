import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grievance from './pages/Grievance/Grievance';
import Dashboard from './pages/Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path="/" element={<Dashboard/>}></Route>
                    <Route exact path="/grievance" element={<Grievance/>}></Route>
                </Routes>
            </div>
    </BrowserRouter>
  );
}

export default App;
