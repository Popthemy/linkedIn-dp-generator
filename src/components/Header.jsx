import "../styles/header.css";
import { Download } from "lucide-react";

function Header() {
  return (
    <div className="header">
      <div className="header-text">
        <h2>Profile Generator ⚡⚡</h2>
        <h3>Made for LinkedIn Local</h3>
      </div>
      <button className="download-button">
        <Download size={20} />
        Download
      </button>
    </div>
  );
}

export default Header;
