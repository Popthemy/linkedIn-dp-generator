import { useState } from "react";
import "../styles/generator.css";

function UploadImageField() {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="image">Your Image </label>
        <input className="upload-input" name="image" type="file" />
      </div>
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
    console.log(`before Name:${name} ,nickname:${nickname}`);
    if (!name || !nickname) return;

    console.log(`after Name:${name} ,nickname:${nickname}`);
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
        <UploadImageField />
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

function DPCanvas({ user }) {
  return (
    <div className="canvas">
      <h3 className="title"> Generate your DP</h3>
      <UserInfo user={user} />
      <div className="canvas-container">
        <img
          src="/edited-linkedIn-profile.png"
          alt="canvas by linkedIn local creative team"
        />
      </div>
    </div>
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

function Generator() {
  const [user, setUser] = useState({});

  function onUpdateDp(user) {
    setUser(user);
    console.log(user);
  }

  return (
    <div className="generator">
      <div>
        <DetailForm onUpdateDp={onUpdateDp} />
      </div>
      <div>
        <DPCanvas user={user} />
      </div>
    </div>
  );
}

export default Generator;
