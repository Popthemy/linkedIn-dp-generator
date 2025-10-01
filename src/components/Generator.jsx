import { useRef, useState } from "react";
import { ImageUp } from "lucide-react";
import "../styles/generator.css";

export default function Generator() {
  const [user, setUser] = useState({});

  function onUpdateDp(user) {
    setUser(user);
    console.log(user);
  }

  function handleImageUpload(imageUrl) {
    console.log(imageUrl);
    setUser((user) => ({ ...user, image: imageUrl }));
  }

  return (
    <div className="generator">
      <div>
        <DetailForm onUpdateDp={onUpdateDp} />
      </div>
      <div>
        <DPCanvas user={user} onImageUpload={handleImageUpload} />
      </div>
    </div>
  );
}

function DPCanvas({ user, onImageUpload }) {
  console.log(user);
  return (
    <div className="canvas">
      <h3 className="title"> Generate your DP</h3>

      <div className="canvas-container">
        <img
          src="/edited-linkedIn-profile.png"
          alt="canvas by linkedIn local creative team"
        />

        <div className="canvas-text">
          {!user.name ? (
            <span>Add your name to show it here!!.</span>
          ) : (
            <h4>
              {user.name} <br />
              <span>{user.nickname}</span>
            </h4>
          )}
        </div>
        {user.stakeholder && (
          <div className="canvas-stakeholder">
            <h4>{user.stakeholder}</h4>
          </div>
        )}

        <div className="canvas-image-upload">
          <UploadBox onImageUpload={onImageUpload} />
        </div>
      </div>

      <p className="note">
        <strong>Attribution:</strong> All credit for the template design goes to
        LinkedIn Local Lagos [LLL]. I developed the code logic that powers the
        interactivity.
      </p>
    </div>
  );
}

function UploadBox({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  function handleClick() {
    fileInputRef.current.click();
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageUpload(imageUrl);
    } else {
      setPreview(null);
      alert("Please select a valid image file");
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`upload-box ${preview ? "borderless" : " "}`}
    >
      {!preview ? (
        <button aria-label="Upload image">
          <span style={{ color: "white", textAlign: "center" }}>
            Click here to add your image <br /> (JPG / PNG)
          </span>
          <ImageUp size={"5%"} />
        </button>
      ) : (
        <img src={preview} alt="preview" />
      )}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/png, image/jpg, image/jpeg"
      />
    </div>
  );
}

function DetailInputField({ fieldName, text, onChangeText }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={fieldName}>{fieldName}: </label>
        <input
          className="form-input"
          name={fieldName}
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          type="text"
          placeholder={"Enter your " + fieldName}
        />
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function DetailSelectField({ stakeholder, onChangeStakeholder }) {
  const stakeholders = ["Attendee", "Media", "Planning Team"];

  return (
    <div className="form-group">
      <label>Stakeholder: </label>

      <select
        className="form-input"
        value={stakeholder}
        onChange={(e) => onChangeStakeholder(e.target.value)}
      >
        {stakeholders.map((stakeholder, i) => (
          <option key={i} value={stakeholder}>
            {stakeholder}
          </option>
        ))}
      </select>
    </div>
  );
}

function DetailForm({ onUpdateDp }) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [stakeholder, setStakeholder] = useState("Attendee");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const user = { name, nickname, stakeholder };
    onUpdateDp(user);
    resetForm();
  }

  function resetForm() {
    setName("");
    setNickname("");
  }

  function handleChangeStakeholder(stakeholder) {
    setStakeholder((curStakeholder) => stakeholder);
  }

  return (
    <>
      <form className="detail-form" onSubmit={handleSubmit}>
        <h3 className="title">Fill your details to generate your profile</h3>
        <DetailInputField
          fieldName={"name"}
          text={name}
          onChangeText={setName}
        />

        <DetailInputField
          fieldName={"nickname"}
          text={nickname}
          onChangeText={setNickname}
        />

        <DetailSelectField
          stakeholder={stakeholder}
          onChangeStakeholder={handleChangeStakeholder}
        />

        <Button>
          {!name ? "Name is required before generating profile" : "Generate DP"}
        </Button>
      </form>
    </>
  );
}
