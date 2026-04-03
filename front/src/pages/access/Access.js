import React, {useState} from "react";

import Toast from "../../components/web/Toast";
import ApiKey from "./components/ApiKey";
import Password from "./components/Password";
import "./Access.css";

function Access () {
  const [alert, setAlert] = useState(null)

  return (
    <>
      <ApiKey setAlert={setAlert} />
      <Password setAlert={setAlert} />
      <Toast alert={alert}/>
    </>
  );
}

export default Access;
