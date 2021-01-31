const { DateTime } = require('luxon');

function readableDate() {
  return (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  };
}

function readableUTCDate() {
  return (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toLocaleString(DateTime.DATE_MED);
  };
}

function htmlDateString() {
  return (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toFormat('yy-MM-dd');
  };
}

exports.htmlDateString = htmlDateString;
exports.readableDate = readableDate;
exports.readableUTCDate = readableUTCDate;
