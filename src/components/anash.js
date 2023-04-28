import Maillogo from "./Maillogo.jpg";
import "./anash.css";
import Compose from "./Compose.jpg";
import Inb from "./Inb.jpg";
import Starred from "./Starred.jpg";
import Snoze from "./Snoze.jpg";
import Send from "./Send.jpg";
import Draft from "./Draft.jpg";
import Set from "./Set.jpg";
import Pika from "./Pika.jpg";
import Right from "./Right.jpg";
import Sendbottom from "./Sendbottom.jpg";
import { useEffect, useState } from "react";
import Sigout from "./Sigout.jpg"

function Anash() {
  const [list, setList] = useState([
    { src: Inb, text: "Inbox", link: "http://localhost:3000/inbox" },
    { src: Starred, text: "Starred", link: "" },
    { src: Snoze, text: "Snoozed", link: "" },
    { src: Send, text: "Sent", link: "http://localhost:3000/send" },
    { src: Draft, text: "Drafts", link: "" },
  ]);
  const [shkronja, setShkronja] = useState("");
  const [aktiv, setAktiv] = useState(false);
  const [bashk, setBashk] = useState("dwef");


  useEffect(() => {
    fetch("http://localhost:8000/api/shkronjaepar")
      .then((r) => r.json())
      .then((dat) => {
        setShkronja(dat["shkronja"]);
      })
      .catch((err) => console.log(err));

      fetch("http://localhost:8000/api/logut")
      .then(r=>r.json())
      .then(data=>{setBashk(data)})
  }, []);
  const sendemail = (e) => {
    e.preventDefault();
    if (emailsend.includes("@") && emailsend.includes(".com")) {
      const data = new FormData(e.target);
      fetch("http://localhost:8000/api/dergomesazh", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((dat) => {
          if (dat["process"] === "done") {
            window.location.href = window.location.href;
          } else {
            window.alert(" it is not done");
          }
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Please write a correact email adress");
    }
  };
  const typesend = (t) => {
    if (t == "http://localhost:3000/send" ) {
      window.location.href = "http://localhost:3000/send";
    }else if(t == "http://localhost:3000/inbox"){
      window.location.href = "http://localhost:3000/inbox";
    }
  };
const [singout, setSingout] = useState("none")
  const [emailsend, setEMail] = useState("");
  return (
    <div id="anash1">
      <img src={Maillogo} id="img12"></img>
      <div class="rounded" id="shkruaj">
        <img onClick={() => setAktiv(true)} src={Compose}></img>
      </div>
      <form onSubmit={sendemail}>
        <div
          class="rounded-top"
          style={{ display: aktiv === true ? "inline" : "none" }}
          id="sendmessage"
        >
          <div class="sendheader">
            <p>New Message</p>
            <p onClick={() => setAktiv(false)} id="mesghright">
              x
            </p>
          </div>
          <div class="subsend">
            <p>To </p>
            <input
              type="text"
              value={emailsend}
              onChange={(e) => setEMail(e.target.value)}
              name="email1"
              id="inpp10"
            ></input>
          </div>
          <div class="subsend">
            <input
              placeholder="Subject"
              name="subject1"
              type="text"
              id="inpp10"
            ></input>
          </div>
          <textarea
            type="textbox"
            name="content1"
            id="inpmesagetext1"
          ></textarea>
          <div class="botsend"></div>
          <button type="submit" id="buttonsend" class="rounded-pill">
            Send
          </button>
          <img id="sendbottom" src={Sendbottom}></img>
        </div>
      </form>
      <br></br>
      {list.map((d) => (
        <div class="rounded" onClick={() => typesend(d.link)} id="list10">
          <img class="imgs" src={d.src}></img>
          <p>{d.text}</p>
        </div>
      ))}
      <img src={Set} id="setting"></img>
      <img id="pikaa" src={Pika}></img>
      <div  onClick={()=>setSingout(singout==="block"? "none":"block")}  class="topemri">
        <p>{shkronja}</p>
      </div>
      <img class="Rightmenu" src={Right}></img>
      <div  style={{display:singout}}  id="log"  >
        <div id="log1" >
    <div  class="cc" >
      <p>{shkronja}</p>

    </div>
    <p id="email23"  >{bashk['bashk']}</p> 

   <p id="emri23"  > {bashk['email']}</p>
        <div class="rounded" id="manage"  ><p>Manage Your Google Account</p></div>    
        </div>
        <img id="logimg"  onClick={()=>(window.location.href ="http://localhost:3000/")}  src={Sigout}  ></img>
</div>

    </div>
  );
}
export default Anash;
