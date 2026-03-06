import Header from "./components/Header";
import ProfileGenerator from "./components/ProfileGenerator";
import CertificateGenerator from "./components/CertificateGenerator";

import { Route , Routes } from "react-router-dom";


function App() {

  return (
    <Routes>
      <Route path="/" element={<ProfileGenerator />} />
      <Route path="/certificate" element={<CertificateGenerator />} />
    </Routes>

  );
}

export default App;
