import "../styles/header.css";
import { Download } from "lucide-react";

function DownloadBtn({onClick}) {
  return (
    <button
      // onClick={() => element2Png("canvas-container")}
      onClick={onClick}
      className="download-button"
    >
      <Download size={20} />
      Download
    </button>
  );
}

function Header({onClick}) {
  return (
    <div className="header">
      <div className="header-text">
        <h2>Profile Generator ⚡⚡</h2>
        <h3>Made for LinkedIn Local</h3>
      </div>
      <DownloadBtn onClick={onClick} />
    </div>
  );
}

export default Header;
