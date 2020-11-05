import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
      </div>
    </Router>
  );
}

export default App;
