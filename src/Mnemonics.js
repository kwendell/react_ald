import React from "react";

import { useState } from "react";

import { useQuery } from "react-query";

import { Buffer } from "buffer";

const Mnemonics = () => {
  const [mnemonics, setMnemonics] = useState([]);

  const liStyle = {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#0080A8",
    backgroundColor: "#f1f1f1",
  };
  const width_proportion = "20%";
  const height_proportion = "50%";

  const tableStyle = {
    width: width_proportion,
    height: height_proportion,

    backgroundColor: "#f1f1f1",
  };

  const username = "asgadmin";
  const password = "asgAdm1n!";
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
    <table>
      <tbody>
        {mnemonics.map((mnemonic, index) => (
          <tr key={index + "tr"}>
            <td style={liStyle} key={index}>
              {mnemonic}
            </td>
            <td key={index + "td"}>
              <button key={index} id={mnemonic + "btn"} type="submit">
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Mnemonics;
