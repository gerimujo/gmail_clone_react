import { useEffect, useState } from "react";
import Inboxcom1 from "./inboxcom1";
import Key from "./key";
import "./inbox.css";
import Trash from "./Trash.jpg";

import Anash from "./anash";

function Inbox() {
  const [checkbox, setCheck] = useState(false);
  const [mes, setmessage] = useState([]);
  const chk = (i, ck) => {
    const ss = mes.map((r) => {
      if (r.id == i) {
        return { ...r, ck: !r.ck };
      } else {
        return r;
      }
     
    });
    console.log(mes);
    setmessage(ss);
  };
  useEffect(() => {
    const ulr = window.location.href;
    if (ulr === "http://localhost:3000/send") {
      fetch("http://localhost:8000/api/marrsend")
        .then((r) => r.json())
        .then((f) => setmessage(f));
    } else if (ulr === "http://localhost:3000/inbox") {
      fetch("http://localhost:8000/api/marrinobx")
        .then((r) => r.json())
        .then((d) => setmessage(d));
        console.log(mes);
    }else if (ulr === "http://localhost:3000/inboxmesazhe") {
      fetch("http://localhost:8000/api/inmesazhiinboxsend")
        .then((r) => r.json())
        .then((d) => setmessage(d));
    }else if (ulr === "http://localhost:3000/sendmesazhe") {
      fetch("http://localhost:8000/api/mesazhinxjerrsend")
        .then((r) => r.json())
        .then((f) => setmessage(f));
    }

    console.log(mes);
  }, []);
  const handlebox = () => {
    setCheck(!checkbox);
    const ff = mes.map((d) => {
      return { ...d, ck: !checkbox };
    });
    setmessage(ff);
  };

  const dele = () => {
    const idsToDelete = mes.filter((d) => d.ck).map((d) => d.id);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    });
    
    fetch("http://localhost:8000/api/deletemessage",{
      method:"POST",
      headers: headers,
      body: JSON.stringify({
        number: idsToDelete
      })
    })
    .then((res)=>res.json())
    .then((d)=>console.log(d))
   
    .catch((err)=>console.log(err));
    console.log(idsToDelete);
    const gg = mes.filter((f) => {
      if (f.ck === false) {
        return { ...f };
      }
    });
    setmessage(gg);
    console.log(mes);
  };
 
  
  const handleClick = (cc)=>{
    console.log("funksionon te 1 shi");
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    });
    fetch("http://localhost:8000/api/databasemesazh",{
      method: "POST",
  headers: headers,
  body: JSON.stringify({
    number: cc
      })
    })
    .catch((err)=>console.log(err));

  }
  
  
  

  return (
    <html>
      <head>
      <meta name="csrf-token" content="your_csrf_token_here"/> 
         </head>
         <body>
    <div class="contmain">
      <Anash />

      <Key class="listx" value={mes} />
      <br></br>
      <div id="messto">
        <div id="rtop" class="rounded-top">
          <input
            type="checkbox"
            checked={checkbox}
            id="chk3"
            onChange={() => handlebox()}
          ></input>
          <img src={Trash} onClick={() => dele()}></img>
        </div>
        <div class="rounded-bottom" id="messg1">
          {mes.map((r) => (
            <Inboxcom1
              onChange={(ck) => chk(r.id, ck)}
             onClick={()=>handleClick(r.id)}
              key={r.id}
              idd={r.id}
              ck={r.ck}
              marresi={r.marresi}
              derguesi={r.derguesi}
              name={r.name}
              subject={r.subject + " -  "}
              text={" " + r.text}
            />
          ))}
        </div>
      </div>
    </div>
    </body>
    </html>
  );
}
export default Inbox;
