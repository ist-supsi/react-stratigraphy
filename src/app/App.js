import React, { useState } from "react";
import * as Styled from "./styles";
import Stratigraphy from "../stratigraphy";

const App = () => {
  const [selected, setSelected] = useState(null);
  const data = [
    {
      id: 1,
      from: 0,
      to: 1.23,
      color: "rgb(225, 157, 157)",
      pattern: "/assets/15104018.svg",
      title: "Jura des Juragebirges",
      subtitle: "Dazit",
    },
    {
      id: 2,
      from: 1.23,
      to: 1.77,
      color: "#789123",
      pattern: "/assets/15102042.svg",
      title: "Quartar, undifferenziert",
      subtitle: "Phonolith",
    },
    {
      id: 3,
      from: 1.77,
      to: 2.34,
      color: "#456789",
      pattern: "/assets/15102034.svg",
      title: "Altere Ablagerungen, undifferenziert",
      subtitle: "Magmatit",
    },
  ];
  return (
    <Styled.Container>
      <Stratigraphy
        data={data}
        onSelected={(layer) => {
          setSelected(layer);
        }}
        unit="m"
      />
      {/* half left side of the page that shows the title */}
      <Styled.Description selected={selected !== null}>
        <Styled.Title>{selected?.title}</Styled.Title>
        <Styled.Subtitle>{selected?.subtitle}</Styled.Subtitle>
      </Styled.Description>
    </Styled.Container>
  );
};

export default App;
