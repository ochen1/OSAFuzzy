import React, { useState } from "react";
import data from "./data.json";
import Fuse from "fuse.js";
import Item from "./item";

data = data.map((item) => {
  return {
    ...item,
    key: item.name.replace(/\s/g, "").toLowerCase()
  };
});

const SettingsPage = () => {
  const [searchData, setSearchData] = useState(data);
  const searchItem = (query) => {
    if (!query) {
      setSearchData(data);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["key"],
      threshold: 0.3,
      shouldSort: true,
      includeScore: true,
      ignoreLocation: true,
      isCaseSensitive: false
    });
    const result = fuse.search(query);
    console.log(result);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
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
