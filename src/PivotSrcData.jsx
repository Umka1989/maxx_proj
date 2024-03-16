import SettingsItem from "./SettingsItem.jsx";


function PivotSrcData(props) {
  let headersToShow = [];
  props.headers.forEach((each) => {
    if (each.place === "src") {
      headersToShow.push(
        <SettingsItem
          name={each.name}
          place={each.place}
          key={each.name}
          onDrop={props.handleDrop}
        />,
      );
    }
  });

  return (
    <div className="squareContainer">
      <h4 style={{ textAlign: "center" }}>Выбор данных</h4>
      <div>{headersToShow}</div>
    </div>
  );
}

export default PivotSrcData;
