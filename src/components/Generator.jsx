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
  return (
    <div className="canvas">
      <h3 className="title"> Generate your DP</h3>
      <UserInfo user={user} />

      <div className="canvas-container">
        <img
          src="/edited-linkedIn-profile.png"
          alt="canvas by linkedIn local creative team"
        />

        <div className="canvas-image-upload">
          <UploadBox onImageUpload={onImageUpload} />
        </div>
      </div>
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
    <div onClick={handleClick} className="upload-box">
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

function DetailInputField({
  fieldName,
  text,
  size,
  onChangeText,
  onChangeSize,
}) {
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
        />
      </div>

      <div className="form-group">
        <label htmlFor={`${fieldName}-font-size`}>
          {fieldName} Font Size: {size}
        </label>
        <input
          className="form-input"
          name={`${fieldName}-font-size`}
          type="range"
          value={size}
          min="12"
          max="72"
          onChange={(e) => onChangeSize(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function DetailForm({ onUpdateDp }) {
  const [name, setName] = useState("");
  const [nameSize, setNameSize] = useState(12);
  const [nickname, setNickname] = useState("");
  const [nicknameSize, setNicknameSize] = useState(12);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const user = { name, nickname, nameSize, nicknameSize };
    onUpdateDp(user);
    resetForm();
  }

  function resetForm() {
    setName("");
    setNameSize(12);
    setNickname("");
    setNicknameSize(12);
  }

  return (
    <>
      <form className="detail-form" onSubmit={handleSubmit}>
        <h3 className="title">Fill your details to generate your profile</h3>
        <DetailInputField
          fieldName={"name"}
          text={name}
          size={nameSize}
          onChangeText={setName}
          onChangeSize={setNameSize}
        />

        <DetailInputField
          fieldName={"nickname"}
          text={nickname}
          onChangeText={setNickname}
          size={nicknameSize}
          onChangeSize={setNicknameSize}
        />
        <Button>Generate DP</Button>
      </form>
    </>
  );
}

function UserInfo({ user }) {
  return (
    <p className="title">
      User Info: <br />
      <span style={{ fontSize: `${user.nameSize}px` }}>
        Name: {user.name} {user.nameSize}
      </span>
      <br />
      <span style={{ fontSize: `${user.nicknameSize}px` }}>
        Nickname:{user.nickname}
        {user.nicknameSize}
      </span>
    </p>
  );
}
