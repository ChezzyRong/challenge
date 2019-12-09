import React from "react";
import { createUltimatePagination } from "react-ultimate-pagination";
import { Pagination } from "react-bootstrap";

function Page(props) {
  return (
    <Pagination.Item onClick={props.onClick} active={props.isActive}>{props.value}</Pagination.Item>
  );
}

function Ellipsis(props) {
  return (
    <Pagination.Ellipsis onClick={props.onClick} disabled={props.disabled} />
  );
}

function FirstPageLink(props) {
  return <Pagination.First onClick={props.onClick} disabled={props.disabled} />;
}

function PreviousPageLink(props) {
  return <Pagination.Prev onClick={props.onClick} disabled={props.disabled} />;
}

function NextPageLink(props) {
  return <Pagination.Next onClick={props.onClick} disabled={props.disabled} />;
}

function LastPageLink(props) {
  return <Pagination.Last onClick={props.onClick} disabled={props.disabled} />;
}

const itemTypeToComponent = {
  PAGE: Page,
  ELLIPSIS: Ellipsis,
  FIRST_PAGE_LINK: FirstPageLink,
  PREVIOUS_PAGE_LINK: PreviousPageLink,
  NEXT_PAGE_LINK: NextPageLink,
  LAST_PAGE_LINK: LastPageLink
};

export default createUltimatePagination({
  itemTypeToComponent: itemTypeToComponent,
  WrapperComponent: Pagination
});
