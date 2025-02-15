import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";
import Location from "./pages/Location";
import secret from "./secret.json";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={secret.web.client_id}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/location" element={<Location />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
