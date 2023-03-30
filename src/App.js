import "./App.css";
import OrderForm from "./components/OrderForm";
import Invoice from "./components/Invoice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<OrderForm />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
