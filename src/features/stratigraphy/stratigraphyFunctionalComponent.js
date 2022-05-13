import React, { useEffect, useState, useRef } from "react";
import * as Styled from "./styles";
import PropTypes from "prop-types";
import Draggable from "react-draggable";

const Stratigraphy = (props) => {
  console.log("Stratigraphy props", props);
  const element = useRef(null);
  const [state, setState] = useState({
    selected: null,
    over: null,
    minimapCursor: "grab",
    scale: 1,

    // Distance from top in px
    top: 0,
    // pixel / meter
    pxm: 0,
    // height of this component in pixels
    height: 0,
    // height of the window in pixels
    wHeight: 0,
  });

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handleTitle = (layer) => {
    const { getTitle, mapping } = props;
    if (getTitle !== undefined && typeof getTitle === "function") {
      return getTitle(layer);
    }
    return layer[mapping.title];
  };
  const handleSubTitle = (layer) => {
    const { getSubTitle, mapping } = props;
    if (getSubTitle !== undefined && typeof getSubTitle === "function") {
      return getSubTitle(layer);
    }
    return layer[mapping.subtitle];
  };
  const handleMouseEnter = (layer) => {
    setState((prevState) => ({
      ...prevState,
      over: layer,
    }));
  };
  const handleMouseLeave = () => {
    setState((prevState) => ({
      ...prevState,
      over: null,
    }));
  };
  const handleColor = (layer) => {
    const { getColor, mapping } = props;
    if (typeof getColor === "function") {
      return getColor(layer[mapping.color]);
    }
    return layer[mapping.color];
  };
  const handleOnWheel = (event) => {
    event.preventDefault();
    let scale = state?.scale;
    let factor = 0.05;
    if (scale >= 0.75) {
      factor = 0.1;
    } else if (scale >= 0.5) {
      factor = 0.05;
    } else if (scale >= 0.2) {
      factor = 0.025;
    } else if (scale >= 0.05) {
      factor = 0.01;
    } else if (scale < 0.05) {
      factor = 0.005;
    }

    if (event.deltaY < 0) {
      scale -= factor;
    } else {
      scale += factor;
    }

    const rangeHeight = scale * state?.height;

    let top = state?.top;
    if (state?.top + rangeHeight > state?.height) {
      top = state?.top - (state?.top + rangeHeight - state?.height);
    }

    setState((prevState) => ({
      ...prevState,
      scale: Math.min(Math.max(0.02, scale), 1),
      top: top < 0 ? 0 : top,
    }));
  };
  const handlePattern = (layer) => {
    const { getPattern, mapping } = props;
    if (typeof getPattern === "function") {
      return getPattern(layer[mapping.pattern]);
    }
    return `url('${layer[mapping.pattern]}')`;
  };
  const handleStart = (e, data) => {
    setState((prevState) => ({
      ...prevState,
      minimapCursor: "grabbing",
    }));
  };

  const handleDrag = (e, data) => {
    if (data.y !== state?.top) {
      setState((prevState) => ({ ...prevState, top: data.y }));
    }
  };

  const handleStop = (e, data) => {
    setState((prevState) => ({
      ...prevState,
      minimapCursor: "grab",
    }));
  };

  const updateDimensions = () => {
    console.log("updateDimensions");
    // what is this element?
    // if (element !== undefined && element !== null) {
    //   if (props.data.length > 0) {
    //   }
    //   setState({
    //     height: element.clientHeight,
    //     pxm:
    //       props.data.length > 0
    //         ? element.clientHeight /
    //           props.data[props.data.length - 1][props.mapping.to]
    //         : 0,
    //   });
    // }
    if (element !== undefined && element !== null) {
      if (props.data.length > 0) {
      }
      setState((prevState) => ({
        ...prevState,
        height: element.current?.clientHeight,
        // add const 1.5 to show the red line in last layer when its selected
        pxm:
          props.data.length > 0
            ? element.current?.clientHeight /
                props.data[props.data.length - 1][props.mapping.to] -
              1.5
            : 0,
      }));
    }
  };

  const { data, mapping, onSelected } = props;

  const { height, pxm, top } = state;

  const rangeHeight = state?.scale * height;

  const factor = rangeHeight === 0 ? 0 : pxm * (height / rangeHeight);

  const offset = top * (height / rangeHeight);

  const titleLimit = 30;
  const subTitleLimit = 50;
  return (
    <Styled.Container
      onWheel={handleOnWheel}
      ref={element}
      style={{
        ...props.style,
      }}
    >
      {/* first column */}
      <div
        style={{
          position: "relative",
          minWidth: "60px",
          maxWidth: "60px",
          width: "60px",
        }}
      >
        {/* list of layers in first column */}

        {data?.map((layer, idx) => (
          <div
            key={"stratigrafy-minimap-layer-" + idx}
            style={{
              ...(state?.selected !== null &&
              state?.selected?.id === layer[mapping.id]
                ? props.minimapSelectedLayerStyle
                : {
                    border: "thin solid rgb(100, 100, 100)",
                  }),
              ...{
                backgroundColor: handleColor(layer),
                backgroundImage: handlePattern(layer),
                height: (layer[mapping.to] - layer[mapping.from]) * pxm + "px",
                position: "relative",
                margin: "0px 12px",
              },
            }}
          />
        ))}

        {/* lens for magnifier */}
        <Draggable
          axis="y"
          bounds="parent"
          defaultPosition={{ x: 0, y: 0 }}
          onDrag={handleDrag}
          onStart={handleStart}
          onStop={handleStop}
          // position={null}
          position={{
            y: state.top,
            x: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "rgba(0, 0, 0, 0.2) 4px 4px 12px",
              border: "thin solid rgba(165, 165, 165, 0.5)",
              cursor: state.minimapCursor,
              display: "flex",
              flexDirection: "column",
              height: rangeHeight + "px",
              margin: "0px 4px",
              position: "absolute",
              top: "0px",
              width: "52px",
            }}
          >
            {rangeHeight >= 40
              ? [
                  <div
                    key="stratigrafy-range-1"
                    style={{
                      color: "black",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* number at top of first column */}
                    {
                      parseInt(top / pxm, 10)
                      // Math.round(top / pxm * 100) / 100
                    }{" "}
                    {props.unit}
                  </div>,
                  <div
                    key="stratigrafy-range-2"
                    style={{ flex: "1 1 100%" }}
                  />,
                  <div
                    key="stratigrafy-range-3"
                    style={{
                      color: "black",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* number at bottom of first column */}
                    {
                      parseInt((top + rangeHeight) / pxm, 10)
                      // Math.round((top + rangeHeight) / pxm * 100) / 100
                    }{" "}
                    {props.unit}
                  </div>,
                ]
              : null}
          </div>
        </Draggable>
      </div>

      {/* second and third column */}
      <div
        style={{
          flex: "1 1 100%",
          position: "relative",
          // backgroundColor: "red",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-" + offset + "px",
            width: "100%",
            // backgroundColor: "pink",
          }}
        >
          {data.map((layer, idx) => {
            const layerHeight =
              factor * (layer[mapping.to] - layer[mapping.from]);

            return (
              <div
                key={"stratigrafy-layer-" + idx}
                onClick={() => {
                  if (
                    onSelected !== undefined &&
                    typeof onSelected === "function"
                  ) {
                    onSelected(
                      state?.selected === null ||
                        state?.selected.id !== layer[mapping.id]
                        ? layer
                        : null
                    );
                  }
                  setState((prevState) => ({
                    ...prevState,
                    selected:
                      state?.selected === null ||
                      state?.selected.id !== layer[mapping.id]
                        ? layer
                        : null,
                  }));
                }}
                onMouseEnter={() => {
                  handleMouseEnter(layer);
                }}
                onMouseLeave={handleMouseLeave}
                style={{
                  // what they are doing??? hoverable?
                  ...(state?.selected !== null &&
                  state?.selected.id === layer[mapping.id]
                    ? props.selectedLayerStyle
                    : state?.selected !== null
                    ? props.unselectedLayerStyle
                    : null),
                  ...(state?.over !== null &&
                  state?.over[mapping.id] === layer[mapping.id]
                    ? props.overLayerStyle
                    : null),
                  // until here
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  height: layerHeight,
                  // backgroundColor: "yellow",
                  transition:
                    "background-color 0.25s cubic-bezier(.25,.8,.25,1)",
                }}
              >
                {/* list of layers in second column */}
                <div
                  style={{
                    minWidth: "4em",
                    backgroundColor: handleColor(layer),
                    // backgroundColor: "red",
                    backgroundImage: handlePattern(layer),
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* number at bottom of each layer */}
                  {layerHeight > titleLimit ? (
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        // backgroundColor: "red",
                        color: "white",
                        fontSize:
                          layerHeight > subTitleLimit ? "0.7em" : "0.6em",
                        fontWeight: "bold",
                        textAlign: "center",
                        transition: "font-size 0.25s",
                      }}
                    >
                      {layer[mapping.to]} {props.unit}
                    </div>
                  ) : null}
                </div>
                {/* third column: big area with the name of layers that is clickable */}
                <div
                  style={{
                    flex: "1 1 100%",
                    padding: "0.5em 1em 0.5em 0.5em",
                    overflow: "hidden",
                    // backgroundColor: "green",
                  }}
                >
                  <div
                    style={{
                      position: "sticky",
                      top: "0.5em",
                    }}
                  >
                    {layerHeight > titleLimit ? (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize:
                            layerHeight > subTitleLimit ? "1em" : "0.8em",
                          transition: "font-size 0.25s",
                        }}
                      >
                        {handleTitle(layer)}
                      </div>
                    ) : null}
                    {layerHeight > subTitleLimit ? (
                      <div
                        style={{
                          color: "#787878",
                          fontSize: "0.8em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {handleSubTitle(layer)}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Styled.Container>
  );
};

Stratigraphy.propTypes = {
  data: PropTypes.array,
  getColor: PropTypes.func,
  getPattern: PropTypes.func,
  getSubTitle: PropTypes.func,
  getTitle: PropTypes.func,
  mapping: PropTypes.shape({
    id: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    color: PropTypes.string,
    pattern: PropTypes.string,
  }),
  minimapSelectedLayerStyle: PropTypes.object,
  onSelected: PropTypes.func,
  overLayerStyle: PropTypes.object,
  selectedLayerStyle: PropTypes.object,
  style: PropTypes.object,
  unit: PropTypes.string,
  unselectedLayerStyle: PropTypes.object,
};

Stratigraphy.defaultProps = {
  data: [],
  mapping: {
    id: "id",
    from: "from",
    to: "to",
    color: "color",
    pattern: "pattern",
    title: "title",
    subtitle: "subtitle",
  },
  minimapSelectedLayerStyle: {
    border: "2px solid red",
  },
  overLayerStyle: {
    backgroundColor: "rgb(233, 233, 233)",
  },
  selectedLayerStyle: {
    backgroundColor: "rgb(233, 233, 233)",
    borderTop: "2px solid red",
    borderBottom: "2px solid red",
  },
  unit: "m",
  unselectedLayerStyle: {
    borderRight: "2px solid red",
  },
};

export default Stratigraphy;
