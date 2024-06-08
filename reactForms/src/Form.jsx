import { useState, useEffect } from "react";
import axios from "axios";
import Success from "./assets/success.png";
import ReCAPTCHA from "react-google-recaptcha";

function Form() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [captchaToekn, setCaptchaToekn] = useState("");

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  }, [submitted]);

  const handleCaptchaChange = (value) => {
    console.log("captchaToekn", value);
    setCaptchaToekn(value);
  };
  const SubmitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!captchaToekn) {
      alert("Please verify that you are not a robot");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/",
        {
          name,
          mobile,
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Ensure the response status is checked properly
      if (response.status === 201) {
        console.log("Success:", response.data);
        setSubmitted(true);
        clearInputs();
      } else {
        console.error("Network response was not ok", response);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const clearInputs = () => {
    setName("");
    setMobile("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={SubmitForm}>
      <label>
        Name
        <input
          name="name"
          id="name"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        Phone Number
        <input
          type="number"
          name="mobile"
          id="mobile"
          placeholder="Enter Your Phone Number"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          id="message"
          placeholder="Enter Your Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        ></textarea>
      </label>
      <div className="captcha">
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_SITE_KEY}
          onChange={handleCaptchaChange}
        />
      </div>
      <button type="submit">
        <div className={`message ${submitted ? "active" : ""}`}>
          <img src={Success} />
          Thanks for Submitting
        </div>
        Submit
      </button>
    </form>
  );
}

export default Form;
