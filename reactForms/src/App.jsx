import "./App.css";
import Main from "./assets/main.png";
import Logo from "./assets/logo.png";
import Form from "./Form";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="img">
            <img src={Main} alt="" />
          </div>
        </div>
        <div className="col">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="form">
            <h1>
              <span>Get In Touch</span> With Our Team
            </h1>
            <p>
              Reach out to our team for assistance or inquiries. <br />
              We{"'"}re here to help!
            </p>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
