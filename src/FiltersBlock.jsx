function FiltersBlock(props) {
  let filtesrs = [];
  props.headers.forEach((each) => {
    if (each.src === "filter") {
      filtesrs.push(each.name);
    }
  });
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Установленные фильтры</h4>
      <div>{filtesrs}</div>
    </div>
  );
}

export default FiltersBlock;
