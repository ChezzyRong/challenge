import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useLocation, withRouter } from "react-router-dom";
import { ListGroup, Col, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import { addHistory } from "../utilities/storage";
import { getParams, changePage } from "../utilities/params";
import { DEFAULT_PARAMS } from "../constants/params";
import { getWordCount } from "../utilities/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const checkForRefresh = async (prevState, setState, query) => {
  if (!query.url || _.isEqual(prevState.params, query)) {
    return;
  }

  countWords(prevState, setState, query);
};

const countWords = async (prevState, setState, query) => {
  try {
    const response = await getWordCount(query);
    switch (response.status) {
      case 200:
        const json = await response.json();
        setState({ data: json.data, pages: json.pages, params: query });
        addHistory(query.url);
        break;
      case 202:
        setState({ data: ["Loading"], pages: 0, params: query });
        setTimeout(() => countWords(prevState, setState, query), 500);
        break;
      default:
        setErrorState(setState, query);
        break;
    }
  } catch (e) {
    setErrorState();
  }
};

function setErrorState(setState, query) {
  setState({
    data: ["Unable to process URL, please check format again and retry"],
    pages: 0,
    params: query
  });
}

function WordCount(props) {
  const [state, setState] = useState({
    params: DEFAULT_PARAMS,
    data: [],
    pages: 0
  });
  const query = getParams(useQuery());

  useEffect(() => {
    checkForRefresh(state, setState, query);
  }, [state, query]);

  return (
    <>
      <Row>
        <Col>
          <ListGroup key="wc-list" variant="flush">
            <h4 className="text-left">Word Count</h4>
            {state.data.length ? (
              state.data.map(p => (
                <ListGroup.Item key={p[0]}>
                  <Row>
                    <Col className="text-left">{p[0]}</Col>
                    <Col className="text-right">{p[1]}</Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No words to count</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {state.pages ? (
            <Pagination
              currentPage={parseInt(state.params.page)}
              totalPages={state.pages}
              onChange={p => changePage(props.history, state.params, p)}
              style={{ justifyContent: "center" }}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
}

export default withRouter(WordCount);
