import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';
import './styles/MainStyles.css';
import Home from "./pages/Home"
import Payment from "./pages/Payment"
import Numberphotos from "./pages/Numberphotos"
import Capture from "./pages/Capture"
import Frame from "./pages/Frame"
import Email from "./pages/Email"
import LoadingScreen from "./pages/LoadingScreen";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/load" element={<LoadingScreen />} />
      <Route path="/capture" element={<Capture />} />
      <Route path="/number-photos" element={<Numberphotos />} />
      <Route path="/frame" element={<Frame />}/>
      <Route path="/email" element={<Email />}/>
    </Routes>
  </Router>
  );
}

export default App;
