import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { changePath } from "../utilities/params";

const updateHistory = (pages, setPages, page) => {
  if (pages.length >= 10) {
    pages.pop();
  }

  setPages([page, ...pages.filter(p => p !== page)]);
};

function History(props) {
  const [pages, setPages] = useState([]);
  props.history.listen(loc => {
    updateHistory(pages, setPages, loc.search);
  });

  return (
    <ListGroup key="history-list" variant="flush">
      <h4 className="text-left">History</h4>
      {pages.length ? (
        pages.map(k => (
          <ListGroup.Item
            onClick={() => changePath(props.history, k)}
            key={k}
          >
            {k}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>No history found</ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default withRouter(History);
