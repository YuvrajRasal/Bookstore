import logo from "./logo.svg";
import "./App.css";
import New from "./New";
import Home from "./pages/Home";
import HomeNew from "./pages/HomeNew";
import Footer from "./components/Footer";
import CardDetails from "./pages/CardDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExtraInfo from "./components/ExtraInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        {/* <Route exact path="/" element={<ExtraInfo />}></Route> */}
        {/* <Route path="/details/:id" element={<CardDetails />}></Route> */}
      </Routes>
      <ExtraInfo />
      <HomeNew />
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
