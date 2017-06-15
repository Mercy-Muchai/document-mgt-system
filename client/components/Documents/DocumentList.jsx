import React, { PropTypes } from "react";
import DocumentsListRow from "./DocumentsListRow.jsx";

const DocumentList = ({ document }) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Title</th>
        <th>Content</th>
      </tr>
      </thead>
      <tbody>
        {console.log("Here they are: ", document)}
        {document ? document.map(document =>

         <DocumentsListRow key={document.id} document={document}/>
        ) : <span/>}
        </tbody>
    </table>
  );
};

DocumentList.propTypes = {
  document: PropTypes.array.isRequired
};

export default DocumentList;