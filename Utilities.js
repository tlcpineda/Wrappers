/**
 * Format the date/datetime object to ISO string format.
 * @param {string} date Date to be formatted, with year, month, and day values.
 * @param {string} time Time portion of the datetime object; defaults to start of day.
 * @param {string} tz IANA timezone; defaults to Zulu.
 * @returns {string} dt The formatted datetime string.
 */
function format_as_iso(date, time = "00:00:00.000", tz = "Zulu") {
  if (!date.includes(":")) {
    // Check if date does not includes time value; append time to date.
    date += ` ${time}`;
  }

  return Utilities.formatDate(
    new Date(date),
    tz,
    "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
  );
}
