import React from "react";

const Item = (props) => {
  return (
    <div className="item">
      <div className="name">
        <p>{props.name}</p>
        <div className="tags">{props.description}</div>
      </div>
    </div>
  );
};

export default Item;
