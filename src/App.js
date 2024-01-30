import "./App.css";
import HandTracking from "./components/HandTracking";
import Webcam from "./components/Webcam";

function App() {
  return (
    <div>
      <header>안녕</header>
      <Webcam />
      <HandTracking />
    </div>
  );
}

export default App;
