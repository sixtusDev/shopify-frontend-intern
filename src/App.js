import { ToastContainer } from "react-toastify";
import MarsRover from "./components/MarsRover";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <MarsRover />
      <ToastContainer style={{ fontSize: "1.3rem" }} />
    </div>
  );
}

export default App;
