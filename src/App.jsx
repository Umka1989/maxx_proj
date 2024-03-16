import Pivot from "./Pivot.jsx";
import Settings from "./Settings";
import React from "react";
import dataSrc from "./data.json";
import Angle from "./images/angle-left.svg";
import style from "./main.module.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        {
          name: "Category",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "Customer Name",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "Manufacturer",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "Order Date",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "Product Name",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "Sub-Category",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "AVG(Discount)",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "SUM(Profit)",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "SUM(Quantity)",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
        {
          name: "SUM(Sales)",
          place: "src",
          groupMethod: null,
          isSelected: false,
        },
      ],
      data: [],
      aggrFunct: 'sum',
      isParametrsOpen: true
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
  }
  
  handleChangeSize(){
    this.setState({
      isParametrsOpen: this.state.isParametrsOpen ? false : true
    })
  }

  handleDelete(name) {
    let headers = this.state.headers;
    headers.forEach((each) => {
      if (each.name === name) {
        each.place = "src";
      }
    });
    this.setState({ headers: headers });
  }

  componentDidMount() {
    let data = [];
    let headers = this.state.headers;
    dataSrc.forEach((each) => {
      let dict_ = {};
      each.forEach((inserted, index) => {
        dict_[headers[index].name] = inserted._value;
      });
      data.push(dict_);
    });
    this.setState({ data: data });
  }

  handleDrop(item, result) {
    console.log(item);
    let headers = this.state.headers;
    this.state.headers.forEach((each, index) => {
      if (each.name === item.name) {
        headers[index].place = result.name;
      }
    });
    this.setState({ headers: headers });
  }

  render() {
    console.log(this.state);

    let AngleStyle = this.state.isParametrsOpen ? style.AngleStyleRight : style.AngleStyleLeft;
    let leftStyle = this.state.isParametrsOpen ? style.leftStyleOpened : style.leftStyleClosed;
    let rightStyle = this.state.isParametrsOpen ? style.rightStyleOpened : style.rightStyleClosed;




    return (
      <div>

        <div className={leftStyle}>
          <Pivot headers={this.state.headers} data={this.state.data} />
        </div>
        <div>
          <img src={{Angle}} onClick={() => this.handleChangeSize()} className={AngleStyle}/>
        </div>
        <div className={rightStyle}>
          <Settings
            headers={this.state.headers}
            handleDelete={this.handleDelete}
            handleDrop={this.handleDrop}
          />
        </div>
        <div className={style.clearStyle}></div>
      </div>
    );
  }
}

export default App;
