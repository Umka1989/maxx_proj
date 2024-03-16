import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import Cross from "./images/cross.svg";

const style = {
  border: "1px solid lightgray",
  backgroundColor: "#d3e1f5",
  marginBottom: "5px",
  borderRadius: "7px",
  marginTop: "5px",
  paddingLeft: "7px",
  width: "auto",
  display: "inline-block",
  paddingRight: "7px",
  paddingTop: "3px",
  paddingBottom: "3px",
  cursor: "move",
};

const crossStyle = {
  marginLeft: "7px",
  width: "12px",
  height: "12px",
  border: "1px solid lightgray",
  borderRadius: "5px",
  backgroundColor: "white",
  cursor: "pointer",
};

const itemStyle = {};

function SettingsItem(props) {
  let showCrossButton = true;
  if (props.place == "src") {
    showCrossButton = false;
  }
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name: props.name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        props.onDrop(item, dropResult);
      }
    },
  }));
  return (
    <div ref={drag} style={style}>
      {props.name}
      {showCrossButton && (
        <img
          src={Cross}
          onClick={() => props.handleDelete(props.name)}
          style={crossStyle}
        />
      )}
    </div>
  );
}

export default SettingsItem;
