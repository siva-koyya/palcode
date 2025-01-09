// CardList.jsx

import React, { useState } from "react";
import DraggableCard from "./DraggableCard";

const CardList = () => {
  const [layout, setLayout] = useState([
    { content: "Card 1" },
    { content: "Card 2" },
    { content: "Card 3" },
    { content: "Card 4" },
  ]);

  return (
    <div className="card-list">
      {layout.map((card, index) => (
        <DraggableCard
          key={index}
          card={card}
          index={index}
          setLayout={setLayout}
        />
      ))}
    </div>
  );
};

export default CardList;
