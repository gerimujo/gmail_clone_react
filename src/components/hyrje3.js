import "./hyrje3.css";
import { useState } from "react";
import Myphoto from "./Myphoto.jpg";

function Hyrje3() {
  const [ck, setCk] = useState(false);
  const [po, setPo] = useState(
    "  Use 8 or more characters with a mix of letters, numbers & symbols"
  );
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [col, setCol] = useState("black");
  const handle = (event) => {
    event.preventDefault();
    if (pass1 == pass2) {
      const data = new FormData(event.target);
      fetch("http://localhost:8000/api/regist", {
        body: data,
        method: "POST",
      })
        .then((res) => res.json())
        .then((d) => {
          if (d["proces"] === "done") {
            window.location.href = "http://localhost:3000/";
          }
        })
        .catch((err) => console.log(err));
    } else {
      setPo("Those passwords didn’t match. Try again.");
      setPass2("");
      setCol("red");
    }
  };

  return (
    <div>
      <form onSubmit={handle} id="form3">
        <div class="log3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
          <p id="crg">Create your Google Account</p>
          <p>to continue to Gmail</p>
          <div class="line1">
            <input type="text" name="emri" placeholder="First name"></input>
            <input
              type="text"
              name="mbiemri"
              id="inp4"
              placeholder="Last name"
            ></input>
          </div>
          <br></br>
          <input
            id="inp5"
            name="email"
            placeholder="Username                                     @gmail.com"
          ></input>
          <p id="p1"> You can use letters, letters and periods </p>
          <br></br>
          <div class="line2">
            <input
              name="pass"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              type={ck == true ? "text" : "password"}
              placeholder="Password"
            ></input>
            <input
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              type={ck == true ? "text" : "password"}
              id="inp6"
              placeholder="Confirm"
            ></input>
          </div>
          <p style={{ color: col }} id="p2">
            {po}
          </p>
          <input
            id="inp7"
            checked={ck}
            onChange={() => setCk(ck == true ? false : true)}
            type="checkbox"
          ></input>
          Show password
          <br></br>
          <br></br>
          <div class="fot5">
            <p
              onClick={() => (window.location.href = "http://localhost:3000/")}
              style={{ color: "  rgb(22, 171, 230)", fontWeight: "bold" }}
            >
              Sign in instead
            </p>
            <input type="submit" value="Next" class="btn btn-primary"></input>
          </div>
        </div>
        <div class="photo3">
          <div class="xm">
            <img src={Myphoto}></img>
            <p>One account All of Google working for you</p>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Hyrje3;
