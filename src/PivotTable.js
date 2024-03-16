import styles from './table.module.css';

function PivotTable(props) {
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
    for (let i = 0; i < arr.length; i++) {
        if (JSON.stringify(arr[i][0]) === JSON.stringify(elem)) {
            return i;
        }
    }
    return -1;
  };

  function sum_values(arr) {
    let value = 0
    for (var i = 0; i < arr.length; i++) {
        value += arr[i]
    }
    return value;
};
  let rows = [];
  let cols = [];
  props.data.forEach((number, source_data_index) => {
           //rows
           let value_indexes = [];
           value_indexes.push(source_data_index);
           let source_data_row = [];
           user_set['dimensions']['rows'].forEach((number, user_set_row_index) => {
                source_data_row.push(props.data[source_data_index][user_set['dimensions']['rows'][user_set_row_index]]);
           });
           let source_data_row_n_value_indexes = [];
           source_data_row_n_value_indexes.push(source_data_row, value_indexes);
           if (contains(rows, source_data_row) > -1) {rows[(contains(rows, source_data_row))][1].push(source_data_index)}
           else {rows.push(source_data_row_n_value_indexes);}

           //cols
           value_indexes = [];
           value_indexes.push(source_data_index);

           let source_data_col = [];
           user_set['dimensions']['columns'].forEach((number, user_set_col_index) => {
                source_data_col.push(props.data[source_data_index][user_set['dimensions']['columns'][user_set_col_index]]);
           });

           let source_data_col_n_value_indexes = [];
           source_data_col_n_value_indexes.push(source_data_col, value_indexes);

           if (contains(cols, source_data_col) > -1) {cols[(contains(cols, source_data_col))][1].push(source_data_index)}
           else {cols.push(source_data_col_n_value_indexes);}

});

cols.sort();
rows.sort();
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
    header_row = [];
});

//measure_headers
header_row = [];
user_set['dimensions']['rows'].forEach((n, uri) => {
    header_row.push(user_set['dimensions']['rows'][uri]);
});
header_row.push('Measure');
result[0].forEach((n, ri) => {
    if (ri != 0) {
        user_set['measures'].forEach((n, umi) => {
        header_row.push(user_set['measures'][umi]);
        });
        }
});
headers.push(header_row);

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


	function buildHeaders(data){

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
            for (const [key, value] of Object.entries(counts)) {
                row.push(<th colSpan={value} className={styles.thStyle}>{key}</th>)
            }
			thead.push(<tr>{row}</tr>);
		}
	}
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
	buildHeaders(headers);
    buildData(values);

  return (
    <table className={styles.tableStyle}>
        <thead className ={styles.theadStyle}>{thead}</thead>
        <tbody className ={styles.tbodyStyle}>{tbody}</tbody>
    </table>
  )
}

export default PivotTable;
