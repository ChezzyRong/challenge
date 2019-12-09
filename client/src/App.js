import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import WordCount from "./components/WordCount";
import History from "./components/History";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Container className="App">
        <Row className="mt-5">
          <UrlForm />
        </Row>
        <Row className="mt-5">
          <Col md="5">
            <WordCount />
          </Col>
          <Col md="2" />
          <Col md="5">
            <History history={history} />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
