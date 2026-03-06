import { useRef, useEffect } from "react";
import { element2Png } from "../utils/download.js";
import Header from "./Header.jsx";
import Generator from "./DpGenerator.jsx";

function ProfileGenerator() {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("printing canvas", canvasRef.current);
  }, []);


  return (
    <div>
      <Header onClick={() => element2Png(canvasRef.current)} />
      <Generator canvasRef={canvasRef} />
    </div>
  );
}

export default ProfileGenerator;
