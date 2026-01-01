/**
 * Format the date/datetime object to ISO string format.
 * @param '' {Object} datetime object with keys as :
 * - 'date' {string} (REQUIRED);
 * - 'time' {string} (OPTIONAL) defaults to '00:00:00.000'; and,
 * - 'tz' {string} (OPTIONAL) in IANA format; defaults to 'Zulu'.
 *
 * @returns date_iso {string} The formatted datetime string.
 */
function format_as_iso({ date, time = "00:00:00.000", tz = "Zulu" }) {
  const date_obj = new Date(date);

  let date_iso = "";

  // if (new Date(date) == "Invalid Date") {
  if (date_obj == "Invalid Date") {
    console.error(`Invalid input date, ${date}.`);
  } else {
    // Ignore provided time if, time is already included in date.
    if (!date.includes(":")) {
      date += ` ${time}`;
    }

    date_iso = Utilities.formatDate(
      date_obj,
      tz,
      "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
    );
  }

  return date_iso;
}

/**
 * Get the week number of the input date.
 * @param date {string} The date for which the week number for the year is to be determined
 * @param tz {string} The timezone associated with the date, in IANA format
 *
 * @returns wk_num {string} The week number for the year.
 */
function get_week_num(date, tz = "Zulu") {
  const date_obj = new Date(date);

  let wk_num = "0";

  if (date_obj == "Invalid Date") {
    console.error(`Invalid input date, ${date}.`);
  } else {
    wk_num = Utilities.formDate(date_obj, tz, "w");
  }

  return wk_num;
}
