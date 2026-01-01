# Google Apps Script Wrappers

This is a collection of wrapper functions of frequently used methods in Google Apps Script.

## Resources by App or Class

* [Utilities](Utilities.md) - wrapper function for Class Utilities, along with reference to formatting datetime string output
* Sheets - (to be updated ...)
* Drive - (to be updated ...)
* [Calendar](Calendar.md) - wrapper functions with Calendar API v3, along with colour reference for both Calendar API v3 and CalendarApp service.
* Doc - (to be updated ...)

## General Resources

* **Time zones** are specified in Google Apps Script using time zone identifiers based on the Internet Assigned Numbers Authority (IANA) database.  Additional information can be found on the [Time Zone Database](https://www.iana.org/time-zones) by IANA.  A few time zone identifiers, and their current standard UTC offsets, and daylight saving time offsets (in parenthesis) are listed below :
  | TZ Identifier      | Standard (DST)  |
  |:-------------------|:----------------|
  | Australia/Canberra | +10:00 (+11:00) |
  | Asia/Tokyo         | +09:00          |
  | Asia/Bangkok       | +07:00          |
  | Europe/Helsinki    | +02:00 (+03:00) |
  | Zulu               | +00:00          |
  | Canada/Atlantic    | -04:00 (-05:00) |
