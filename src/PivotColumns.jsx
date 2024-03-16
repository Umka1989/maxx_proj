import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import SettingsItem from "./SettingsItem.jsx";
import styles from './SettingsPlace.module.css';

export const PivotColumns = (props) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "columns" }),
  }));
  let headersToShow = [];
  props.headers.forEach((each) => {
    if (each.place === "columns") {
      headersToShow.push(
        <SettingsItem
          name={each.name}
          key={each.name}
          onDrop={props.handleDrop}
          handleDelete={props.handleDelete}
        />,
      );
    }
  });
  return (
    <div ref={drop} className={styles.settingsPlace}>
      <h4>Столбцы</h4>
      <div>{headersToShow}</div>
    </div>
  );
};
