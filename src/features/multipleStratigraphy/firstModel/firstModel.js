import React, { useState } from "react";
import * as Styled from "./styles";
import Stratigraphy from "../../../features/stratigraphy";
import { data, dataCasing, dataFilling } from "./../data";

const FirstModel = () => {
  const [selected, setSelected] = useState(null);
  const [selectedCasing, setSelectedCasing] = useState(null);
  const [selectedFilling, setSelectedFilling] = useState(null);

  // component can't forget selected for each layer.
  return (
    <Styled.Container>
      <Stratigraphy
        data={data}
        onSelected={(layer) => {
          setSelected(layer);
          setSelectedCasing(null);
          setSelectedFilling(null);
        }}
        unit="m"
      />
      {/* half left side of the page that shows the title */}
      {selected && !selectedCasing && !selectedFilling && (
        <Styled.Description selected={selected !== null}>
          <Styled.Title>{selected?.title}</Styled.Title>
          <Styled.Subtitle>{selected?.subtitle}</Styled.Subtitle>
        </Styled.Description>
      )}
      <Stratigraphy
        data={dataCasing}
        onSelected={(layer) => {
          setSelectedCasing(layer);
          setSelected(null);
          setSelectedFilling(null);
        }}
        unit="m"
      />
      {selectedCasing && !selected && !selectedFilling && (
        <Styled.Description selected={selectedCasing !== null}>
          <Styled.Title>{selectedCasing?.title}</Styled.Title>
          <Styled.Subtitle>{selectedCasing?.subtitle}</Styled.Subtitle>
        </Styled.Description>
      )}

      <Stratigraphy
        data={dataFilling}
        onSelected={(layer) => {
          setSelectedFilling(layer);
          setSelected(null);
          setSelectedCasing(null);
        }}
        unit="m"
      />
      {selectedFilling && !selected && !selectedCasing && (
        <Styled.Description selected={selectedFilling !== null}>
          <Styled.Title>{selectedFilling?.title}</Styled.Title>
          <Styled.Subtitle>{selectedFilling?.subtitle}</Styled.Subtitle>
        </Styled.Description>
      )}
    </Styled.Container>
  );
};

export default FirstModel;
