import React from "react";
import { useState } from "react";

const useSingleton = (initializer) => {
  React.useState(initializer);
};

const Search = (props) => {
  const [upcDescList, setUpcDescList] = useState([]);

  const layoutUrl = `/altierre/asg/ws/apt/getUpcList?priceType` + "NORMAL";

  const username = "asgadmin";
  const password = "asgAdm1n!";
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  headers.set("mode", "cors");

  return <div>Hello world!</div>;
};

export default Search;
