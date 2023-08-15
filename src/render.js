const getSymbol = (str) => {
  switch (str) {
    case 'deleted':
      return '-';
    case 'equals':
      return ' ';
    case 'different':
      return '-';
    case 'added':
      return '+';
    default:
      return '';
  }
};
const render = (data) => {
  const strArr = [];
  data.forEach((el) => {
    strArr.push([`${' '.repeat(2)} ${getSymbol(el.result)} ${el.key}: ${el.value}\n`]);
  });
  const result = `{\n${strArr.join('')}}`;
  console.log(result);
};

export default render;
