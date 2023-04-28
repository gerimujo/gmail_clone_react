import logo from "./logo.svg";
import "./App.css";
import Hyrje1 from "./components/hyrje1";
import { Route, Routes } from "react-router-dom";
import Hyrje2 from "./components/hyrje2";
import Hyrje3 from "./components/hyrje3";
import Inboxcom1 from "./components/inboxcom1";
import Inbox from "./components/inbox";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hyrje1 />}></Route>
      <Route element={<Hyrje2 />} path="/pass"></Route>
      <Route element={<Hyrje3 />} path="/reg"></Route>
      <Route  element={<Inbox />}  path="/send"></Route>
      <Route  element={<Inbox/>}  path="/inbox" ></Route>
      <Route  element={<Inbox/>}  path="/sendmesazhe" ></Route>
      <Route  element={<Inbox/>}  path="/inboxmesazhe" ></Route>

    </Routes>
  );
}

export default App;
