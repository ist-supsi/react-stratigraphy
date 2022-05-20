import React, { useState } from "react";
import * as Styled from "./styles";
import Stratigraphy from "./stratigraphy";
import { data } from "../data";

const SecondModel = () => {
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
    </Styled.Container>
  );
};

export default SecondModel;
