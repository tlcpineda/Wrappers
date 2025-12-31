/**
 * Format the date/datetime object to ISO string format.
 * @param {Object} datetime object with keys as :
 * - 'date' (REQUIRED);
 * - 'time' (OPTIONAL) defaults to '00:00:00.000'; and,
 * - 'tz' (OPTIONAL) in IANA format; defaults to 'Zulu'.
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
