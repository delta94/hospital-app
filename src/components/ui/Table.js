import React from 'react';

const Table = ({ thead, children }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {thead.map((name, i) =>
            <th key={i}>{name}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
};

export default Table;
