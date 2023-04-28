import "./key.css";
import Search from "./Search.jpg";
import { useState, useEffect } from "react";
import Sklogo from "./Sklogo.jpg";
import Inbox from "./Inbox.jpg";

function Key(props) {
  
  const [data, setData] = useState([{subject: ""}])
  const [emailim, setEmail] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/api/keymarr")
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        console.log(d)
      });

    fetch("http://localhost:8000/api/email")
      .then((t) => t.json())
      .then((d) => setEmail(d));
    console.log(emailim);
    console.log(data);
  },[] );
  const [svalue, setValue] = useState("");
  const [op, setOp] = useState([]);

  const change = (e) => {
    setValue(e.target.value);
    if (data.length > 0) {
      var dd = data.filter((r) => {
        if (r.subject.includes(e.target.value)) {
          return { ...r };
        }
      });
      console.log("ktu funktionon");
      console.log(dd.length);
    }

    if (data.length > 0 && e.target.value.length > 0) {
      setOp(dd);
    } else {
      setOp([]);
    }
  };
  const clickKey =(a,b , c)=>{
    const headers = new Headers({
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      });

      fetch("http://localhost:8000/api/databasemesazh",{
    method: "POST",
headers: headers,
body: JSON.stringify({
  number: a
    })
  })
  .then(r=>r.json())
  .then(data=>{if(data['number']===a){
    if(b==emailim['email']){
      window.location.href="http://localhost:3000/sendmesazhe"
     }else if(c==emailim['email']){
       window.location.href="http://localhost:3000/inboxmesazhe"
     }
  }})
  
  

  }



  return (
    <html>
        <head>
        <meta name="csrf-token" content="your_csrf_token_here"/> 
        </head>
        <body>
      
        <div id="round12" class="rounded">
          <img src={Sklogo}></img>
          <input
            value={svalue}
            onChange={change}
            class="keyinp"
            placeholder="Search mail"
          ></input>
          <img src={Search}></img>
        </div>
        <div class="srcont">
          {op.map((d) => (
            <div
            onClick={()=>clickKey(d.id, d.derguesi, d.marresi)}
              class="serel"
              style={{ height: d.subject.length == 0 ? "0px" : "40px" }}
            >
              <img src={Inbox}></img>
              <p>{d.subject}</p>
            </div>
          ))}
        </div>
     
      </body>
    </html>
  );
}
export default Key;
