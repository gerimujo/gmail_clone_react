import { useState, useEffect } from "react";
import Reply from "./Reply.jpg";
import Inboxanash from "./Inboxanash.jpg";
import "./inboxcom1.css";
function Inboxcom1(props) {
  const [inbox, setdd] = useState([
    <div class="s1">
      <div
        style={{
          backgroundColor: props.ck == true ? " rgb(187, 221, 249)" : "white",
        }}
        class="cont10"
      >
        <input
          checked={props.ck}
          className="chk1"
          id="ckl1"
          type="checkbox"
          onChange={() => props.onChange(!props.ck)}
        />
        <p class="names">{props.name}</p>
        <p class="subject">
          <p class="subname">{props.subject}</p>
          <p class="subjectd">{props.text}</p>
        </p>
      </div>
    </div>,
  ]);
  const [mesazh, setMesazh] = useState([
    <div>
      <div class="cont20">
        <p id="marhead1">{"[" + props.name + "]"}</p>
        <p>{props.subject}</p>
      </div>
      <div class="marmesagibox">
        <img
          id="img10"
          src="https://lh3.googleusercontent.com/a/default-user=s80-p"
        ></img>
        <p id="nameinbox">{props.name}</p>
        <p>
          {window.location.href == "http://localhost:3000//sendmesazhe"
            ? props.derguesi
            : props.marresi}
        </p>
      </div>
      <textarea id="textareamarr" value={props.text}></textarea>
      <br></br>
      <img id="replly" src={Reply}></img>
    </div>,
  ]);
  const [tamam, setTamam] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    if (url === "http://localhost:3000/inbox") {
      setTamam(inbox);
      setDisline("block");
      setDisvetem("none");
    } else if (url === "http://localhost:3000/send") {
      setTamam(inbox);
      setDisline("block");
      setDisvetem("none");
    } else if (url === "http://localhost:3000/sendmesazhe") {
      setTamam(mesazh);
      setDisline("none");
      setDisvetem("block");
    } else if (url === "http://localhost:3000/inboxmesazhe") {
      setTamam(mesazh);
      setDisline("none");
      setDisvetem("block");
    }
  },[]);
  const [disline, setDisline] = useState("none");
  const [disvetem, setDisvetem] = useState("none");

  const handleClick = (cc) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
    });
    fetch("http://localhost:8000/api/databasemesazh", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        number: cc,
      }),
    })
      .then((r) => r.json())
      .then((d) => {if(d['number']==cc){
        if (url === "http://localhost:3000/send") {
          window.location.href = "http://localhost:3000/sendmesazhe";
        } else if (url === "http://localhost:3000/inbox") {
          window.location.href = "http://localhost:3000/inboxmesazhe";
        }

      }})
      .catch((err) => console.log(err));
    const url = window.location.href;
    console.log("id e ja e mesazhit qe do hapesh" + cc);
  
  };

  return (
    <html>
      <head>
        <meta name="csrf-token" content="your_csrf_token_here" />
      </head>
      <body>
        <div onClick={() => handleClick(props.idd)}>
          <div style={{ display: disline }} class="s1">
            <div
              style={{
                backgroundColor:
                  props.ck == true ? " rgb(187, 221, 249)" : "white",
              }}
              class="cont10"
            >
              <input
                checked={props.ck}
                className="chk1"
                id="ckl1"
                type="checkbox"
                onChange={() => props.onChange(!props.ck)}
              />
              <p class="names">{props.name}</p>
              <p class="subject">
                <p class="subname">{props.subject}</p>
                <p class="subjectd">{props.text}</p>
              </p>
            </div>
          </div>

          <div style={{ display: disvetem }}>
            <div class="cont20">
              <p id="marhead1">{"[" + props.name + "]"}</p>
              <p>{props.subject}</p>
            </div>
            <div class="marmesagibox">
              <img
                id="img10"
                src="https://lh3.googleusercontent.com/a/default-user=s80-p"
              ></img>
              <p id="nameinbox">{props.name}</p>
              <p>
                {window.location.href == "http://localhost:3000/sendmesazhe"
                  ? props.marresi
                  : props.derguesi}
              </p>
              <img src={Inboxanash} id="idinboxanash12"></img>
            </div>
            <textarea id="textareamarr" value={props.text}></textarea>
            <br></br>
            <img id="replly" src={Reply}></img>
          </div>
        </div>
      </body>
    </html>
  );
}
export default Inboxcom1;
