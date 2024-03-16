import SamplePivot from "./SamplePivot";
import PivotTable from "./PivotTable";
import FiltersBlock from "./FiltersBlock";
import AggrFunct from "./AggrFunt";

function Pivot(props) {
  let countRows = 0;
  let countCols = 0;
  let countVals = 0;
  let componentToShow;
  const thStyle = {
    border: "1px solid lightgray",
    padding: "5px 5px 5px 5px",
    textalign: "center",
    background: "#475c7a",
    color: "white",
    borderRadius: "7px",
  };
  props.headers.forEach((each) => {
    if (each.place === "rows") {
      countRows++;
    } else if (each.place === "columns") {
      countCols++;
    } else if (each.place === "values"){
      countVals++;
    }
  });
  if (countRows + countCols + countVals < 1) {
    componentToShow = <SamplePivot thStyle={thStyle} />;
  } else {
    componentToShow = (
      <PivotTable headers={props.headers} data={props.data} thStyle={thStyle} />
    );
  }

  let pivotStale = {
    overflowX: 'scroll',
    overflowY: 'scroll',
    maxWidth: '50%',
    maxHeight: '50%'
  }

  return (
    <div>
      <AggrFunct />
      <FiltersBlock headers={props.headers} />
      <div >{componentToShow}</div>
    </div>
  );
}

export default Pivot;
