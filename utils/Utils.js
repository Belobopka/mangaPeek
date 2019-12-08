export const msItemParser = (s, searchField, searchStart, searchEnd) => {
  const start = searchField === 'date' ? s.search(searchStart) + 19 : s.search(searchStart);
  const temp = s.slice(start);
  const end = temp.search(searchEnd);
  const res = temp.slice(0, end);
  return searchField === 'link' ? res.split('"')[1] : res;
};

export const bindActionCreator = (actionCreator, dispatch) => (...params) => (
  dispatch(actionCreator(...params))
);
