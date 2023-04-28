import { useState } from "react";
import "./hyrje1.css";
import "bootstrap/dist/css/bootstrap.css";
function Hyrje1() {
  const [ek, setEk] = useState("");
  const [em, setEm] = useState("");

  const handleemail = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("http://localhost:8000/api/hyremail", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((dat) => {
        if (dat.length > 0 && dat[0]["email"]) {
          window.location.href = "http://localhost:3000/pass";
        }
      })
      .catch((err) => setEk("Enter a valid email or phone number"));
  };

  return (
    <div>
      <div class="cont">
        <form onSubmit={handleemail}>
          <div class="tops">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
            <br></br>

            <p id="sig">Sign in</p>
            <br></br>
            <p id="con">to continue to Gmail</p>
            <br></br>
          </div>
          <input
            id="email"
            style={{ borderColor: ek.length == 0 ? "black" : "red" }}
            value={em}
            onChange={(e) => setEm(e.target.value)}
            placeholder="Email or phone"
            name="email"
          ></input>
          <br></br>
          <p style={{ color: "red" }}>{ek}</p>
          <p id="forg">Forgot email?</p>
          <br></br>
          <p style={{ fontSize: 15 }}>
            Not your computer? Use Guest mode to sign in privately.
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "rgb(7, 161, 232)",
            }}
          >
            Learn more
          </p>
          <div class="fotts">
            <p
              onClick={() =>
                (window.location.href = "http://localhost:3000/reg")
              }
            >
              Create accout
            </p>
            <button type="submit" class="btn btn-primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Hyrje1;
