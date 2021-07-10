import { BrowserRouter, HashRouter } from "react-router-dom";
import { instance } from "./api/axiosapi";
import "./App.css";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { RoutesSwitch } from "./routes/RoutesSwitch";
import { Toaster } from "react-hot-toast";

function App() {
  const { authToken } = useAuth();
  instance.defaults.headers.common["Authorization"] = authToken || "";
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster />
        <Navbar />
        <RoutesSwitch />
      </div>
    </BrowserRouter>
  );
}

export default App;
