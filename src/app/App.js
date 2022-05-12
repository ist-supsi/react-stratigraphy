import React, { useState } from "react";
import * as Styled from "./styles";
import Stratigraphy from "../features/stratigraphy";
import { data } from "./data";

const App = () => {
  const [selected, setSelected] = useState(null);

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
