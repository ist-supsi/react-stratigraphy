import React from "react";
import * as Styled from "./styles";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
class Stratigraphy extends React.Component {
  constructor(props) {
    super(props);
    this.handleColor = this.handleColor.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleOnWheel = this.handleOnWheel.bind(this);
    this.handlePattern = this.handlePattern.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubTitle = this.handleSubTitle.bind(this);
    this.state = {
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
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  handleTitle(layer) {
    const { getTitle, mapping } = this.props;
    if (getTitle !== undefined && typeof getTitle === "function") {
      return getTitle(layer);
    }
    return layer[mapping.title];
  }
  handleSubTitle(layer) {
    const { getSubTitle, mapping } = this.props;
    if (getSubTitle !== undefined && typeof getSubTitle === "function") {
      return getSubTitle(layer);
    }
    return layer[mapping.subtitle];
  }
  handleMouseEnter(layer) {
    this.setState({
      over: layer,
    });
  }
  handleMouseLeave() {
    this.setState({
      over: null,
    });
  }
  handleColor(layer) {
    const { getColor, mapping } = this.props;
    if (typeof getColor === "function") {
      return getColor(layer[mapping.color]);
    }
    return layer[mapping.color];
  }
  handleOnWheel(event) {
    event.preventDefault();
    let scale = this.state.scale;
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

    const rangeHeight = scale * this.state.height;

    let top = this.state.top;
    if (this.state.top + rangeHeight > this.state.height) {
      top = this.state.top - (this.state.top + rangeHeight - this.state.height);
    }

    this.setState({
      scale: Math.min(Math.max(0.02, scale), 1),
      top: top < 0 ? 0 : top,
    });
  }
  handlePattern(layer) {
    const { getPattern, mapping } = this.props;
    if (typeof getPattern === "function") {
      return getPattern(layer[mapping.pattern]);
    }
    return `url('${layer[mapping.pattern]}')`;
  }
  handleStart(e, data) {
    this.setState({
      minimapCursor: "grabbing",
    });
  }

  handleDrag(e, data) {
    if (data.y !== this.state.top) {
      this.setState({
        top: data.y,
      });
    }
  }

  handleStop(e, data) {
    this.setState({
      minimapCursor: "grab",
    });
  }

  updateDimensions() {
    if (this.element !== undefined && this.element !== null) {
      if (this.props.data.length > 0) {
      }
      this.setState({
        height: this.element.clientHeight,
        pxm:
          this.props.data.length > 0
            ? this.element.clientHeight /
              this.props.data[this.props.data.length - 1][this.props.mapping.to]
            : 0,
      });
    }
  }

  render() {
    const { data, mapping, onSelected } = this.props;

    const { height, pxm, top } = this.state;

    const rangeHeight = this.state.scale * height;

    const factor = rangeHeight === 0 ? 0 : pxm * (height / rangeHeight);

    const offset = top * (height / rangeHeight);

    const titleLimit = 30;
    const subTitleLimit = 50;

    return (
      <div
        onWheel={this.handleOnWheel}
        ref={(divElement) => (this.element = divElement)}
        style={{
          display: "flex",
          flex: "1 1 100%",
          flexDirection: "row",
          ...this.props.style,
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
          {data.map((layer, idx) => (
            <div
              key={"stratigrafy-minimap-layer-" + idx}
              style={{
                ...(this.state.selected !== null &&
                this.state.selected.id === layer[mapping.id]
                  ? this.props.minimapSelectedLayerStyle
                  : {
                      border: "thin solid rgb(100, 100, 100)",
                    }),
                ...{
                  backgroundColor: this.handleColor(layer),
                  backgroundImage: this.handlePattern(layer),
                  height:
                    (layer[mapping.to] - layer[mapping.from]) * pxm + "px",
                  position: "relative",
                  margin: "0px 12px",
                },
              }}
            />
          ))}
          <Draggable
            axis="y"
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
            onDrag={this.handleDrag}
            onStart={this.handleStart}
            onStop={this.handleStop}
            // position={null}
            position={{
              y: this.state.top,
              x: 0,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "rgba(0, 0, 0, 0.2) 4px 4px 12px",
                border: "thin solid rgba(165, 165, 165, 0.5)",
                cursor: this.state.minimapCursor,
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
                      {this.props.unit}
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
                      {this.props.unit}
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
                        this.state.selected === null ||
                          this.state.selected.id !== layer[mapping.id]
                          ? layer
                          : null
                      );
                    }
                    this.setState({
                      selected:
                        this.state.selected === null ||
                        this.state.selected.id !== layer[mapping.id]
                          ? layer
                          : null,
                    });
                  }}
                  onMouseEnter={() => {
                    this.handleMouseEnter(layer);
                  }}
                  onMouseLeave={this.handleMouseLeave}
                  style={{
                    // what they are doing??? hoverable?
                    ...(this.state.selected !== null &&
                    this.state.selected.id === layer[mapping.id]
                      ? this.props.selectedLayerStyle
                      : this.state.selected !== null
                      ? this.props.unselectedLayerStyle
                      : null),
                    ...(this.state.over !== null &&
                    this.state.over[mapping.id] === layer[mapping.id]
                      ? this.props.overLayerStyle
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
                      backgroundColor: this.handleColor(layer),
                      // backgroundColor: "transparent",
                      backgroundImage: this.handlePattern(layer),
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
                        {layer[mapping.to]} {this.props.unit}
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
                          {this.handleTitle(layer)}
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
                          {this.handleSubTitle(layer)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

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
