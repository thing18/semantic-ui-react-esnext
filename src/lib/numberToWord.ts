export const numberToWordMap: Record<number | '__proto__', string | null> = {
  __proto__: null,
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
};

/**
 * Return the number word for numbers 1-16.
 * Returns strings or numbers as is if there is no corresponding word.
 * Returns an empty string if value is not a string or number.
 * @param {string|number} value The value to convert to a word.
 * @returns {string}
 */
export const numberToWord = (value: string | number) => {

  // tslint:disable: triple-equals
  switch (typeof value) {

    case 'string':
      return value;

    case 'number':
      return numberToWordMap[value];

    default:
      return '';
  }
  // tslint:enable: triple-equals
};
