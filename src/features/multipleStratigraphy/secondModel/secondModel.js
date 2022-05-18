import React, { useState } from "react";
import * as Styled from "./styles";
import Stratigraphy from "./stratigraphy";
import { data } from "../data";

const SecondModel = () => {
  const [selected, setSelected] = useState(null);

  // component can't forget selected for each layer.
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
    </Styled.Container>
  );
};

export default SecondModel;
