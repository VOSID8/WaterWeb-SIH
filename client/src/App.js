import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grievance from "./pages/Grievance/Grievance";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import Mappage from "./pages/Mappage/Mappage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Mappage />}></Route>
          <Route exact path="/grievance" element={<Grievance />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
