import React from "react";

import { useState } from "react";

import { useQuery } from "react-query";

import { Buffer } from "buffer";

import "bootstrap/dist/css/bootstrap.min.css";

const Mnemonics = () => {
  const [mnemonics, setMnemonics] = useState([]);

  const liStyle = {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#0080A8",
    backgroundColor: "#f1f1f1",
  };

  const username = "username";
  const password = "password";
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  headers.set("mode", "cors");

  const { isLoading, error, data, isFetching } = useQuery("mnemonicsKey", () =>
    fetch("/altierre/asg/ws/apt/getMnemonics", headers)
      .then((res) => res.json())
      .then((data) => {
        setMnemonics(data);
      })
  );

  if (isLoading) return "Loading...";
  if (error) return `Error!`;
  if (data) return "data";
  if (isFetching) return "fetching";

  return (
    <div className="mnemonics">
      {mnemonics.map((mnemonic, index) => (
        <div className="row" key={index + "tr"}>
          <div style={liStyle} className="col-lg-9" key={index}>
            {mnemonic}
          </div>
          <div className="col-lg-3" key={index + "td"}>
            <button key={index + "btn"} type="submit">
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mnemonics;
