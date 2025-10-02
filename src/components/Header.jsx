import "../styles/header.css";
import { Download } from "lucide-react";
import element2Pdf from "../utils/download.js";

function DownloadBtn() {
  return (
    <button
      onClick={() => element2Pdf("canvas-container")}
      className="download-button"
    >
      <Download size={20} />
      Download
    </button>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="header-text">
        <h2>Profile Generator ⚡⚡</h2>
        <h3>Made for LinkedIn Local</h3>
      </div>
      <DownloadBtn />
    </div>
  );
}

export default Header;
