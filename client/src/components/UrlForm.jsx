import React, { useState } from "react";
import { Button, FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import { useLocation, withRouter } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import {
  getParams,
  changeUrl,
  changeSort,
  changeOrder
} from "../utilities/params";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function UrlForm(props) {
  const params = getParams(useQuery());
  const [url, setUrl] = useState(params.url);

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Please enter url"
        aria-label="Please enter url"
        aria-describedby="basic-addon1"
        value={url}
        onChange={evt => setUrl(evt.target.value)}
      />
      <InputGroup.Append>
        <Button
          variant="primary"
          onClick={() => changeUrl(props.history, params, url)}
        >
          Count Words
        </Button>
      </InputGroup.Append>
      <DropdownButton
        className="ml-2"
        as={InputGroup.Append}
        variant="outline-secondary"
        title={"Sort by: " + params.sort}
        id="input-group-dropdown-2"
        onSelect={k => changeSort(props.history, params, k)}
      >
        <Dropdown.Item href="#" eventKey="Word">
          Words
        </Dropdown.Item>
        <Dropdown.Item href="#" eventKey="Frequency">
          Frequencies
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton
        className="ml-2"
        as={InputGroup.Append}
        variant="outline-secondary"
        title={"Order By: " + params.order}
        id="input-group-dropdown-2"
        onSelect={k => changeOrder(props.history, params, k)}
      >
        <Dropdown.Item href="#" eventKey="ASC">
          ASC
        </Dropdown.Item>
        <Dropdown.Item href="#" eventKey="DESC">
          DESC
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
}

export default withRouter(UrlForm);
