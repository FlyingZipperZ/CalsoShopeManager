export const currentDate = () => {
  var day = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year

  var dateCurrent = month + "/" + day + "/" + year;

  return dateCurrent;
};

export const currentTime = () => {
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds

  var dateCurrent = hours + ":" + min + ":" + sec;

  return dateCurrent;
};

export const getNow = () => {
  return currentDate() + " " + currentTime();
};
