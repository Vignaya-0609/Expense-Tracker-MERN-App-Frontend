import "./assets/css/style.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import UserLayout from "./components/UserLayout";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/user" element={<UserLayout/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
