import { HashRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </HashRouter>
  );
}

export default App;
