import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';
import './styles/MainStyles.css';
import Payment from './pages/Payment';
import Home from './pages/Home';
import LoadingScreen from "./pages/LoadingScreen";
import LoadingScreen2 from "./pages/LoadingScreen2";

function App() {
  return (
    <Router>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/load" element={<LoadingScreen />} />
      <Route path="/load2" element={<LoadingScreen2 />} />
      {/* <Route path="/capture" element={<Capture />} /> */}
      {/* <Route path="/number-photos" element={<Numberphotos />} /> */}
      {/* <Route path="/frame" element={<Frame />}/> */}
      {/* <Route path="/email" element={<Email />}/> */}
    </Routes>
  </Router>
  );
}

export default App;
