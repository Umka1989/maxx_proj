import styles from './table.module.css';

function PivotTable(props) {
    // набор пользовательских параметров для построения сводной
  let user_set = {
    'dimensions': {
      'columns': [],
      'rows': []
    },
        'measures': []
  };
  props.headers.forEach((each) => {
    if (each.place === "rows") {
      user_set['dimensions']['rows'].push(each.name);
    } else if (each.place === "columns") {
      user_set['dimensions']['columns'].push(each.name);
    } else if (each.place === "values") {
      user_set['measures'].push(each.name);
    }
  });
  function contains(arr, elem) {
      //Находит индекс объекта в массиве
    for (let i = 0; i < arr.length; i++) {
        if (JSON.stringify(arr[i][0]) === JSON.stringify(elem)) {
            return i;
        }
    }
    return -1;
  };

  function sum_values(arr) {
      // суммирует все элементы массива
    let value = 0
    for (var i = 0; i < arr.length; i++) {
        value += arr[i]
    }
    return value;
};
  let rows = [];
  let cols = [];
  props.data.forEach((dataObject, sourceDataIndex) => {
           //rows
           let value_indexes = [];
           value_indexes.push(sourceDataIndex);
           //список значений, соответствующих выбранным строкам в одном эелементе массива исходных данных
           let sourceDataRow = [];
           user_set['dimensions']['rows'].forEach((rowsName) => {
                sourceDataRow.push(dataObject[rowsName]);
           });
           // Массив выбранных пользователем rows(массив) и строк, в которых эти занчения нашлись (массив)
           let rowsVSdataIndexes = [];
           rowsVSdataIndexes.push(sourceDataRow, value_indexes);
           let existingRowsItem = contains(rows, sourceDataRow);
           if (existingRowsItem > -1) {
               rows[existingRowsItem][1].push(sourceDataIndex)
           } else {
               rows.push(rowsVSdataIndexes)
           }

           //cols
           value_indexes = [];
           value_indexes.push(sourceDataIndex);
           //список значений, соответствующих выбранным столбцам в одном эелементе массива исходных данных
           let sourceDataCol = [];
           user_set['dimensions']['columns'].forEach((colsName, user_set_col_index) => {
                sourceDataCol.push(dataObject[colsName]);
           });
            // Массив выбранных пользователем cols(массив) и строк, в которых эти занчения нашлись (массив)
           let colsVSdataIndexes = [];
           colsVSdataIndexes.push(sourceDataCol, value_indexes);
            let existingColsItem = contains(cols, sourceDataCol);
           if (existingColsItem > -1) {
               cols[existingColsItem][1].push(sourceDataIndex);
           } else {
               cols.push(colsVSdataIndexes);
           }

});

//cols.sort();
//rows.sort();
console.log('строки')
console.log(rows)
console.log('столбцы')
console.log(cols)
let result = [];

rows.forEach((n, ri) => {
    let result_row = [];
    result_row.push(rows[ri][0]);
    result.push(result_row);
        cols.forEach((n, ci) => {
            let result_col = [];
            result_col.push(cols[ci][0]);
            let intersection = rows[ri][1].filter(x => cols[ci][1].includes(x));

            user_set['measures'].forEach((n, ui) => {
                let measure_values = [];
                intersection.forEach((n, ii) => {
                    measure_values.push(props.data[n][user_set['measures'][ui]])
                });

                result_col.push(sum_values(measure_values));
            });
            result_row.push(result_col);
        });
});

//headers

var headers = [];
var header_row = [];
console.log('result');
console.log(result);
//cols_headers

user_set['dimensions']['columns'].forEach((n, uci) => {
    header_row = [];
    user_set['dimensions']['rows'].forEach((n, uri) => {
        header_row.push('');
    });
    header_row.push(user_set['dimensions']['columns'][uci]);
    result[0].forEach((n, ri) => {
        if (ri != 0) {
            user_set['measures'].forEach((n, umi) => {
            header_row.push(result[0][ri][0][uci]);
            });
            }
    });
    headers.push(header_row);

});
console.log('headers');
console.log(headers);
//measure_headers
header_row = [];
user_set['dimensions']['rows'].forEach((n, uri) => {
    header_row.push(user_set['dimensions']['rows'][uri]);
});
//header_row.push('Measure');
let measureHeader = [];
result[0].forEach((n, ri) => {
    if (ri != 0) {
        user_set['measures'].forEach((n, umi) => {
        measureHeader.push(user_set['measures'][umi]);
        });
        }
});
console.log(measureHeader);

// values

var values = [];
var value_row = [];

result.forEach((n, ri) => {
    value_row = [];
    user_set['dimensions']['rows'].forEach((n, uri) => {
        value_row.push(result[ri][0][uri]);
    });

    value_row.push('');

    result[ri].forEach((n, riv) => {
        if (riv != 0) {
            user_set['measures'].forEach((n, umi) => {
            value_row.push(result[ri][riv][umi+1]);
            })
        }
    });

    values.push(value_row);
});

    let thead= [];
    let tbody = [];


	function buildHeaders(data, measureData){
        let firstElem;
		for (let i = 0; i < data.length; i++){
			let row = [];
			let rowData = [];
			for (let x = 0; x < data[i].length; x++){
			    //let th = <th styles={tdStyle}>{data[i][x]}</th>
                //row.push(th);
                rowData.push(data[i][x])
            }
			let counts = {};
            rowData.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
            firstElem = counts[''];
            console.log('firstElem');
            console.log(firstElem);
            for (const [key, value] of Object.entries(counts)) {
                row.push(<th colSpan={value} className={styles.thStyle}>{key}</th>)
            }
            console.log('counts');
            console.log(counts);
			thead.push(<tr>{row}</tr>);
		}
		let measureRow = [];
		if (typeof myVar !== 'undefined'){
		    measureRow.push(<th className={styles.thStyle} colSpan={firstElem}></th>)
		}
		measureRow.push(<th className={styles.thStyle}></th>)
        measureData.forEach((each)=>{
            measureRow.push(<th className={styles.thStyle}>{each}</th>);
        })
        thead.push(<tr>{measureRow}</tr>);
	}




console.log('values');
console.log(values);

	function buildData(data){

		for (let i = 0; i < data.length; i++){
			let row = [];
			for (let x = 0; x < data[i].length; x++){
			    let td = <td className={styles.tdStyle}>{data[i][x]}</td>
                row.push(td);
            }
			tbody.push(<tr>{row}</tr>);
		}
	}
	buildHeaders(headers, measureHeader);

    buildData(values);

  return (
    <table className={styles.tableStyle}>
        <thead className ={styles.theadStyle}>{thead}</thead>
        <tbody className ={styles.tbodyStyle}>{tbody}</tbody>
    </table>
  )
}

export default PivotTable;
