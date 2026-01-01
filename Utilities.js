/**
 * Format the date/datetime object to ISO string format.
 * @param '' {Object} datetime object with keys as :
 * - 'date' {string} (REQUIRED);
 * - 'time' {string} (OPTIONAL) defaults to '00:00:00.000'; and,
 * - 'tz' {string} (OPTIONAL) in IANA format; defaults to 'Zulu'.
 *
 * @returns {string} The formatted datetime string.
 */
function format_as_iso({ date, time = "00:00:00.000", tz = "Zulu" }) {
  // Ignore provided time if, time is already included in date.
  if (!date.includes(":")) {
    date += ` ${time}`;
  }

  return Utilities.formatDate(
    new Date(date),
    tz,
    "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
  );
}

/**
 * Get the week number of the input date.
 * @param date {string} The date for which the week number for the year is to be determined
 * @param tz {string} The timezone associated with the date, in IANA format.
 *
 * @returns '' {string} The week number for the year.
 */
function get_week_num(date, tz = "Zulu") {
  return Utilities.formatDate(date, tz, "w");
}
