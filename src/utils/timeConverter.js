export function secoundsToTimeValues(secounds) {
  const hours = Math.floor(secounds / 3600);

  const minutes = Math.floor((secounds % 3600) / 60);

  // const remainingSecounds = secounds % 60;

  return {
    hour: hours,
    minutes: minutes,
    // secounds: remainingSecounds,
  };
}

export function mySecoundsToTimeValues(secounds) {
  let hours = Math.floor(secounds / 3600);
  let myhours;
  console.log(hours.toString().length);
  if ((hours.toString().length = 1)) {
    myhours = `0${hours}`;
  } else {
    myhours = hours;
  }
  console.log(myhours);
  let minutes = Math.floor((secounds % 3600) / 60);
  let myminutes = {};
  if (minutes.toString().length > 1) {
    myminutes = "0" + minutes.toString();
  }
  let remainingSecounds = secounds % 60;

  return {
    hour: myhours,
    minutes: myminutes,
    // secounds: remainingSecounds,
  };
}

export function timeValuesToSecounds(values) {
  console.log(values);
  console.log(values.hour * 3600 + values.minutes * 60);
  return values.hour * 3600 + values.minutes * 60;
}

export function padNumberToString(number) {
  return String(number).padStart(2, "0");
}

export function checkIsNumber(value) {
  const number = parseFloat(value);

  if (!isNaN(number)) {
    return true;
  } else {
    return false;
  }
}

export function range(start, end) {
  console.log(end);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
