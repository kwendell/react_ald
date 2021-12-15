import React from "react";
import { useState } from "react";
import "./Ald.css";

const useSingleton = (initializer) => {
  React.useState(initializer);
};

const Search = (props) => {
  const [upcDescList, setUpcDescList] = useState([]);
  const [initialized, setInitialized] = useState(false);

  if (
    props.pricingScenario !== undefined &&
    props.pricingScenario &&
    !initialized
  ) {
    setInitialized(true);

    const url =
      `/altierre/asg/ws/apt/getUpcList?priceType=` + props.pricingScenario;

    const username = "username";
    const password = "password";
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(username + ":" + password).toString("base64")
    );
    headers.set("mode", "cors");

    // useSingleton(() => {
    const requestUpcDescAwait = async (id = 100) => {
      const response = await fetch(url, headers);
      const json = await response.json();
      setUpcDescList(json);
    };

    requestUpcDescAwait();
    // });
  }

  return (
    <div>
      {upcDescList.map((val, key) => {
        return (
          <div className="search-item" key={key}>
            {val.Description}
          </div>
        );
      })}
    </div>
  );
};

export default Search;
