import React from "react";
import * as Styled from "./styles";
import FirstModel from "../features/multipleStratigraphy/firstModel";
import SecondModel from "../features/multipleStratigraphy/secondModel";
import ThirdModel from "../features/multipleStratigraphy/thirdModel/thirdModel";

const App = () => {
  return (
    <Styled.Container>
      {/* <FirstModel /> */}
      {/* <SecondModel /> */}
      <ThirdModel />
    </Styled.Container>
  );
};

export default App;
