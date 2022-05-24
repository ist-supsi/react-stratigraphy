import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  border: thin solid #d0d0d0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
`;

export const Description = styled.div`
  flex: 1 1 100%;
  padding: 1rem;
  border: ${(props) =>
    props.selected === true ? "2px solid #f00" : "transparent"};
  background-color: ${(props) =>
    props.selected === true ? "rgb(233, 233, 233)" : "transparent"};
  border-left: none;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
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
