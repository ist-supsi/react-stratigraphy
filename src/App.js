import React from "react";
import Stratigraphy from "./stratigraphy";
import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex: 1 1 100%;
  flexdirection: row;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  border: thin solid #d0d0d0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
`;

export const Col = styled.div`
  flex: 1 1 100%;
  padding: 1rem;
  border: ${(props) =>
    props.selected === true ? "2px solid #f00" : "transparent"};
  background-color: ${(props) =>
    props.selected === true ? "rgb(233, 233, 233)" : "transparent"};
  border-left: none;
  transition: all 0.25s cubic-bezier(.25,.8,.25,1);
`;

export const Subtitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #787878;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const App = () => {
  const [selected, setSelected] = React.useState(null);
  return (
    <Row>
      <Stratigraphy
        data={[
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
        ]}
        onSelected={(layer) => {
          setSelected(layer);
        }}
        unit="m"
      />
      <Col
        selected={selected!==null}
      >
        <Title>{selected?.title}</Title>
        <Subtitle>{selected?.subtitle}</Subtitle>
      </Col>
    </Row>
  );
};

export default App;
