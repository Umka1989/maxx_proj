import { PivotFilters } from "./PivotFilters.jsx";
import { PivotColumns } from "./PivotColumns.jsx";
import PivotSrcData from "./PivotSrcData.jsx";
import { PivotRows } from "./PivotRows.jsx";
import { PivotValues } from "./PivotValues";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Settings(props) {
  const widePositionContainerStyle = {
    width: "100%",
    height: "auto",
    border: "1px solid lightgray",
    borderRadius: "7px",
    padding: "10px 10px 10px 10px",
  };
  const positionContainerStyle = {
    float: "left",
    minWidth: "48%",
    minHeight: "100px",
    border: "1px solid lightgray",
  };
  const clearFix = {
    clear: "both",
  };
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={widePositionContainerStyle}>
          <PivotSrcData headers={props.headers} handleDrop={props.handleDrop} />
        </div>
        <div>
          <h4>Перетащите поля в нужную область</h4>
          <div style={positionContainerStyle}>
            <PivotColumns
              handleDrop={props.handleDrop}
              handleDelete={props.handleDelete}
              headers={props.headers}
            />
          </div>
          <div style={positionContainerStyle}>
            <PivotRows
              handleDrop={props.handleDrop}
              handleDelete={props.handleDelete}
              headers={props.headers}
            />
          </div>
          <div style={positionContainerStyle}>
            <PivotFilters
              handleDrop={props.handleDrop}
              handleDelete={props.handleDelete}
              headers={props.headers}
            />
          </div>
          <div style={positionContainerStyle}>
            <PivotValues
              handleDrop={props.handleDrop}
              handleDelete={props.handleDelete}
              headers={props.headers}
            />
          </div>
          <div style={clearFix}></div>
        </div>
      </DndProvider>
    </div>
  );
}

export default Settings;
