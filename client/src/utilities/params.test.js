import * as params from "./params";
import { DEFAULT_PARAMS } from "../constants/params";

`
We're testing the params functionality here because we use the url as the
state for our application, so ensuring the params are correct is essential.
`
test("pushes the correct path to history", () => {
  const push = jest.fn();
  const mockHistory = { push };

  params.changePath(mockHistory, "example");
  expect(push).toHaveBeenCalledWith({ pathname: "/", search: "example" });
});

test("pushes the correct path to history (url change)", () => {
  const push = jest.fn();
  const mockHistory = { push };

  params.changeUrl(mockHistory, DEFAULT_PARAMS, "newUrl");
  expect(push).toHaveBeenCalledWith({
    pathname: "/",
    search: "?url=newUrl&sort=Word&order=DESC&page=1"
  });
});

test("pushes the correct path to history (sort change)", () => {
  const push = jest.fn();
  const mockHistory = { push };

  params.changeSort(mockHistory, DEFAULT_PARAMS, "Frequency");
  expect(push).toHaveBeenCalledWith({
    pathname: "/",
    search: "?url=&sort=Frequency&order=DESC&page=1"
  });
});

test("pushes the correct path to history (order change)", () => {
  const push = jest.fn();
  const mockHistory = { push };

  params.changeOrder(mockHistory, DEFAULT_PARAMS, "ASC");
  expect(push).toHaveBeenCalledWith({
    pathname: "/",
    search: "?url=&sort=Word&order=ASC&page=1"
  });
});

test("pushes the correct path to history (page change)", () => {
  const push = jest.fn();
  const mockHistory = { push };

  params.changePage(mockHistory, DEFAULT_PARAMS, "5");
  expect(push).toHaveBeenCalledWith({
    pathname: "/",
    search: "?url=&sort=Word&order=DESC&page=5"
  });
});
