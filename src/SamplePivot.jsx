function SamplePivot(props) {
  return (
    <table>
      <thead>
        <tr>
          <th style={props.thStyle}>Названия строк</th>
          <th style={props.thStyle}>Значение столбца</th>
          <th style={props.thStyle}>Значение столбца</th>
          <th style={props.thStyle}>Значение столбца</th>
          <th style={props.thStyle}>Значение столбца</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={props.thStyle}>Значение строки</td>
          <td rowSpan="4" colSpan="4">
            Чтобы создать отчёт, выберете необходимые поля в списке полей
            сводной таблицы
          </td>
        </tr>
        <tr>
          <td style={props.thStyle}>Значение строки</td>
        </tr>
        <tr>
          <td style={props.thStyle}>Значение строки</td>
        </tr>
        <tr>
          <td style={props.thStyle}>Значение строки</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SamplePivot;
