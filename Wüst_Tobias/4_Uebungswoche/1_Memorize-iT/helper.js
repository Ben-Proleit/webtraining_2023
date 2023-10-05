const COLUMN_ROW_SIZE = ' 120px';

function columnRowDefinition(number) {
  let result = '';
  for(let i = 0; i < number; i++) {
    result += COLUMN_ROW_SIZE;
  }
  return result;
}

