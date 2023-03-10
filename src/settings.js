import React, { useState } from "react";
import data from "./data.json";
import fuzzysort from "fuzzysort";
import Item from "./item";

const SettingsPage = () => {
  const [searchData, setSearchData] = useState(data);
  const searchItem = (query) => {
    if (!query) {
      setSearchData(data);
      return;
    }
    const result = fuzzysort.go(query, data, {
      keys: ["name"],
      limit: 10
    });
    console.log(result);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.obj);
      });
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  };
  return (
    <div>
      <p className="title">OSA Students</p>
      <div className="search-container">
        <input
          type="search"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search Students"
        />
      </div>

      <div className="item-container">
        {searchData.map((item) => (
          <Item {...item} key={item.name + ":" + item.description} />
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
