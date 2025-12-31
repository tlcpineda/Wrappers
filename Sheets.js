/**
 * Get key sheets from either container sheet, or external.
 * @param sheet_name {string} The name of the tab; if not set, will return the Spreadsheet.
 * @param url {string} The URL of the target Sheets file. If unspecified refers to the container sheet.
 * @return ss_data {Sheet} Return a Sheet of object, or Spreadsheet if param is set as "ss".
 */
function get_ss(sheet_name, url = "") {
  const ss = url
    ? SpreadsheetApp.openByUrl(url)
    : SpreadsheetApp.getActiveSpreadsheet();

  return sheet_name ? ss.getSheetByName(sheet_name) : ss;
}

/**
 * Get Range object.
 * @param sheet_name {string} Either the name of the sheet in the file "Main" or "Helper" only,
 * @param tl_A1 {string} Cell adrress "A1" or "A2:B5"; either a single cell or range of cells in A1 notation.
 * @param url {string} OPTIONAL. The URL of the target Sheets file. If unspecified refers to the container sheet.
 * @param param OPTIONAL. [{string}, {object}] Leave blank to get only the range specified by "tl_A1". Either "down" or "all" to describe the required range with respect to the cell specified in "tl_A1", or an Array object.  When an Array object, the range is expanded from "tl_A1" based on the dimensions of the provided Array object.
 * @return {Range}
 */
function get_range(sheet_name, tl_A1, param, url = "") {
  const sh = get_ss(sheet_name, url);
  const col_A1 = tl_A1.match(/[A-Z]+/g)[0];
  const row_A1 = tl_A1.match(/\d+/g)[0] * 1;

  let range = sh.getRange(tl_A1); // Default if param is blank.

  switch (typeof param) {
    case "string":
      if (param == "down") {
        const last_row = range
          .getDataRegion(SpreadsheetApp.Dimension.ROWS)
          .getLastRow();

        range = sh.getRange(`${tl_A1}:${col_A1}${last_row}`);
      } else if (param == "all") {
        range = range.getDataRegion();
      }
      break;

    case "object":
      const object_length = param.length,
        object_width = param[0].length,
        col_0 = range.getColumn();

      range = sh.getRange(row_A1, col_0, object_length, object_width);
      break;
  }

  return range;
}

/**
 * Write the array of values to the specified range. A mask of Range.setValues() method.
 * @param range {Range} Range object on where to write the values.
 * @param values {object} 2D array of values
 * @return {null}
 */
function write_to_range(range, values) {
  range.setValues(values);
}
