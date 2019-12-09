import { DEFAULT_PARAMS } from "../constants/params";


export function changePath(history, path) {
  history.push({
    pathname: "/",
    search: path
  });
}

function changeParams(history, {url, sort, order, page}) {
  changePath(history, `?url=${url}&sort=${sort}&order=${order}&page=${page}`);
}

export function getParams(query) {
  return {
    url: query.get("url") || DEFAULT_PARAMS.url,
    sort: query.get("sort") || DEFAULT_PARAMS.sort,
    order: query.get("order") || DEFAULT_PARAMS.order,
    page: query.get("page") || DEFAULT_PARAMS.page,
  };
}

export function changeUrl(history, params, url) {
  changeParams(history, {...params, url});
}

export function changeSort(history, params, sort) {
  changeParams(history, {...params, sort});
}

export function changeOrder(history, params, order) {
  changeParams(history, {...params, order});
}

export function changePage(history, params, page) {
  changeParams(history, {...params, page});
}
