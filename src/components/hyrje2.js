import { useEffect, useState } from "react";
import "./hyrje2.css";
import "bootstrap/dist/css/bootstrap.css";

function Hyrje2() {
  const [ek, setEk] = useState("");
  const [em, setEm] = useState("");
  const [emri, setEmri] = useState("geri");
  const [email, setEmail] = useState("");
  const [ckek, setChek] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/email")
      .then((res) => res.json())
      .then((d) => setEmail(d["email"]));
  }, []);

  const handlepass = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("http://localhost:8000/api/pasadr")
      .then((r) => r.json())
      .then((dd) => {
        if (dd["password"] == em) {
          window.location.href = "http://localhost:3000/inbox";
        } else {
          setEk("Password is not correct");
          console.log(dd["password"]);
          console.log(em);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div class="cont">
        <form onSubmit={handlepass}>
          <div class="topv">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
            <br></br>
            <br></br>
            <p>Welcome</p>
          </div>
          <div class="super">
            {" "}
            <div id="majtas"></div>
            <div class="em">
              <img src="https://assets.nationbuilder.com/solarcitizens/pages/1127/attachments/original/1452212890/blank-profile.png?1452212890"></img>
              <p id="email1">{email}</p>
            </div>
            <div id="djathtas"></div>
          </div>
          <br></br>
          <div id="text1">To continue, first verify it’s you</div>
          <input
            id="email"
            style={{ borderColor: ek.length == 0 ? "black" : "red" }}
            value={em}
            type={ckek == true ? "text" : "password"}
            onChange={(e) => setEm(e.target.value)}
            placeholder="Email or phone"
            name="email"
          ></input>
          <br></br>
          <p style={{ color: "red" }}>{ek}</p>
          <br></br>
          <input
            type="checkbox"
            checked={ckek}
            onChange={() => setChek(ckek == true ? false : true)}
          ></input>
          Show password
          <br></br>
          <br></br>
          <br></br>
          <div class="fott">
            <p>More ways to sign in</p>
            <button type="submit" class="btn btn-primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Hyrje2;
