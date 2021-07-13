import { HashRouter } from "react-router-dom";
import { instance } from "./api/axiosapi";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import { RoutesSwitch } from "./routes/RoutesSwitch";
import { Toaster } from "react-hot-toast";
import Interceptor from "./utils/interceptor";
function App() {
  const { authToken } = useAuth();
  instance.defaults.headers.common["Authorization"] = authToken || "";
  return (
    <HashRouter>
      <div className="App">
        <Interceptor/>
        <Toaster />
        <Navbar />
        <RoutesSwitch />
      </div>
    </HashRouter>
  );
}

export default App;
