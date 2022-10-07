function getRandomNumberInteger (minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0)
  {
    if (minNumber <= maxNumber)
    {
      minNumber = Math.ceil(minNumber);
      maxNumber = Math.floor(maxNumber);
      return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    } else {
      let temp = minNumber;
      minNumber = maxNumber;
      maxNumber = temp;
      minNumber = Math.ceil(minNumber);
      maxNumber = Math.floor(maxNumber);
      return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    }
  } else {
    return NaN;
  }
}

console.log(getRandomNumberInteger(1.5,1.9));


function getRandomNumberFractional (minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0)
  {
    if (minNumber <= maxNumber)
    {
      return Math.random() * (maxNumber - minNumber + 1) + minNumber;
    } else {
      let temp = minNumber;
      minNumber = maxNumber;
      maxNumber = temp;
      return Math.random() * (maxNumber - minNumber + 1) + minNumber;
    }
  } else {
    return NaN;
  }
}

console.log(getRandomNumberFractional(1.5,1.9));
