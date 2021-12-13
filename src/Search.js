import React from "react";
import { useState } from "react";

const useSingleton = (initializer) => {
  React.useState(initializer);
};

const Search = (props) => {
  const [upcDescList, setUpcDescList] = useState([]);

  const url = `/altierre/asg/ws/apt/getUpcList?priceType=NORMAL`;

  const username = "asgadmin";
  const password = "asgAdm1n!";
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  headers.set("mode", "cors");

  useSingleton(() => {
    const requestUpcDescAwait = async (id = 100) => {
      const response = await fetch(url, headers);
      const json = await response.json();
      setUpcDescList(json);
    };

    requestUpcDescAwait();
  });

  console.log(upcDescList);

  return <div>Hello world!</div>;
};

export default Search;
