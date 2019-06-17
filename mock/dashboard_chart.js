function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [80, 40, 43, 56, 11, 97];
      break;
    default:
      res = null;
      break;
  }
  return res;
}

module.exports = chart;
