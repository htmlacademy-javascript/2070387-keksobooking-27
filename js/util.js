function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, number) {
  if (a < 0 || b < 0 || number < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(number);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getRand () {
  return Math.random() - 0.5;
}

export {getRandomPositiveInteger};
export {getRandomPositiveFloat};
export {getRandomArrayElement};
export {getRand};
