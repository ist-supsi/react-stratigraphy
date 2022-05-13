import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: row;
`;

export const FirstColumn = styled.div`
  position: relative;
  width: 60px;
`;

export const FirstLayerList = styled.div`
  position: relative;
  margin: 0px 12px;
  background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage};
  height: ${(props) => props.height};
`;
export const LensContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 12px;
  border: thin solid rgba(165, 165, 165, 0.5);
  cursor: ${(props) => props.cursor};
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
  margin: 0px 4px;
  position: absolute;
  top: 0px;
  width: 52px;
`;

export const LensNumber = styled.div`
  color: black;
  font-size: 10px;
  text-align: center;
`;
