import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { RoutesSwitch } from "./routes/RoutesSwitch";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <RoutesSwitch/>
      </div>
    </BrowserRouter>
  );
}

export default App;
