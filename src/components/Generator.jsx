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

function DetailInputField({ text, size }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={text}>{text}: </label>
        <input className="form-input" name={text} type="text" />
      </div>

      <div className="form-group">
        <label htmlFor={`${text}-font-size`}>
          {text} Font Size: {size}
        </label>
        <input
          className="form-input"
          name={text}
          type="range"
          value={size}
          min={10}
          max={72}
        />
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onclick}>{children}</button>;
}

function DetailForm() {
  return (
    <form className="detail-form">
      <h3 className="title">Fill your details to generate your profile</h3>
      <UploadImageField />
      <DetailInputField text={"name"} size={13} />
      <DetailInputField text={"nickname"} size={13} />
      <Button>Generate DP</Button>
    </form>
  );
}

function DPCanvas() {
  return (
    <div className="canvas">
      <h3 className="title"> Generate your DP</h3>
      <div className="canvas-container">
        <img
          src="/edited-linkedIn-profile.png"
          alt="canvas by linkedIn local creative team"
        />
      </div>
    </div>
  );
}

function UserInfo() {}

function Generator() {
  return (
    <div className="generator">
      <div>
        <DetailForm />
      </div>
      <div>
        <DPCanvas />
      </div>
    </div>
  );
}

export default Generator;
