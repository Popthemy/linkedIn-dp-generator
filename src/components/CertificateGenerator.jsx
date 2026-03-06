import "../styles/certificate-generator.css";
import { Download } from "lucide-react";
import {element2Cert} from "../utils/download";
import { useState } from "react";
import Header from "./Header";

function CertificateGenerator() {
  const [name, setName] = useState("");

  const downloadProps = {
    container: "certificate-image-container",
    fileName: `lll-attendee-${new Date().toDateString()}.png`,
    height: "2550",
    width: "3300",
  };

  function handlerDownload() {
    if (!name)
      return alert("Enter your full name to download your certificate.");
    element2Cert( downloadProps);
  }
  return (
    <div>
      <Header onClick={handlerDownload}/>
    
      <section className="certificate-generator">
        <div className="certificate-container">
          <div className="certificate-form">
            <label>Enter your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />
          </div>
          <div
            className="certificate-image-container"
            id="certificate-image-container"
          >
            <div className="certificate-name-wrapper">
              <p className="certificate-name">
                {name || "Your name will appear here"}
              </p>
            </div>
            <img
              className="certificate-image"
              src="/llc-attendee-certificate.png"
              alt="linkedin local lagos attendee certificate"
            />
          </div>
          <button
            onClick={handlerDownload}
            className={`download-btn ${name && "active"}}`}
          >
            <Download size={"25%"} />
            Download
          </button>
        </div>
      </section>
    </div>
  );
}

export default CertificateGenerator;
