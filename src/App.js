import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';
import './styles/MainStyles.css';
import Home from "./pages/Home"
import Payment from "./pages/Payment"
import Capture from "./pages/Capture"
import Frame from "./pages/Frame"
import Email from "./pages/Email"
import LoadingScreen from "./pages/LoadingScreen";
import FinalPreview from "./pages/FinalPreview";
import GifPreview from "./pages/GifPreview";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/load" element={<LoadingScreen />} />
      <Route path="/capture" element={<Capture />} />
      <Route path="/frame" element={<Frame />}/>
      <Route path="/final-preview" element={<FinalPreview />}/>
      <Route path="/gif-preview" element={<GifPreview />}/>
      <Route path="/email" element={<Email />}/>
    </Routes>
  </Router>
  );
}

export default App;
