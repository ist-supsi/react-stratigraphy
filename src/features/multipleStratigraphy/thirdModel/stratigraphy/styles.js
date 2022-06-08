import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: row;
`;
export const FirstColumnContainer = styled.div`
  flex: 1 7 100%;
  padding-right: 3px;
`;

export const FirstColumn = styled.div`
  position: relative;
  width: 200px;
`;

export const FirstLayerList = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.backgroundColor,
    backgroundImage: props.backgroundImage,
    height: props.height,
  },
}))`
  position: relative;
  margin: 0px 12px;
`;
export const LensContainer = styled.div.attrs((props) => ({
  style: {
    height: props.height,
    cursor: props.cursor,
    border: props.isSelected
      ? "2px solid black"
      : "thin solid rgba(165, 165, 165, 0.5)",
    // backgroundColor: props.isSelected
    //   ? "rgba(255, 0, 0, 0.6)"
    //   : "rgba(255, 255, 255, 0.3)",
    // opacity: props.isSelected && 0.7,
    boxShadow: props.isSelected
      ? "rgba(0, 0, 0, 0.6) 4px 4px 14px"
      : "rgba(0, 0, 0, 0.2) 4px 4px 12px",
  },
}))`
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 12px;
  display: flex;
  flex-direction: column;
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

export const ColumnsContainer = styled.div`
  flex: 1 2 100%;
  position: relative;
`;

export const ShakingColumns = styled.div.attrs((props) => ({
  style: {
    top: props.offset,
  },
}))`
  position: absolute;
  width: 100%;
`;

export const LayerInfoList = styled.div.attrs((props) => ({
  style: {
    height: props.height,
  },
}))`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  transition: background-color 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const SecondLayerList = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.backgroundColor,
    backgroundImage: props.backgroundImage,
  },
}))`
  min-width: 4em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const LayerLength = styled.div.attrs((props) => ({
  style: {
    fontSize: props.isBig ? "0.7em" : "0.6em",
  },
}))`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  text-align: center;
  transition: font-size 0.25s;
`;

export const LayerTitleContainer = styled.div`
  flex: 1 1 100%;
  padding: 0.5em 1em 0.5em 0.5em;
  overflow: hidden;
`;

export const ShakingLayerTitle = styled.div`
  position: sticky;
  top: 0.5em;
`;

export const LayerTitle = styled.div.attrs((props) => ({
  style: {
    fontSize: props.isBig ? "1em" : "0.8em",
  },
}))`
  font-weight: bold;
  transition: font-size 0.25s;
`;

export const LayerSubtitle = styled.div`
  color: #787878;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.div.attrs((props) => ({
  style: {
    borderTop: props.selected === true ? "2px solid #f00" : "transparent",
    borderRight: props.selected === true ? "2px solid #f00" : "transparent",
    borderBottom: props.selected === true ? "2px solid #f00" : "transparent",
    backgroundColor:
      props.selected === true ? "rgb(233, 233, 233)" : "transparent",
  },
}))`
  flex: 1 2 100%;
  padding: 1rem;

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
