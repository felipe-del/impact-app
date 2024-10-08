import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DynamicTable = ({items, columns, style}) => {
  return (
      <div className="table-responsive" style={{ ...style, overflowY: 'auto' }}>
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
          <tr>
            {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                    <td key={colIndex}>{item[column.accessor]}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default DynamicTable;