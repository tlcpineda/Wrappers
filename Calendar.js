/**
 * Requires :
 * Calendar API v3 - https://developers.google.com/workspace/calendar/api/v3/reference
 * Utilities.format_as_iso
 */

/**
 * Save event to default calendar.
 * @param cal_id {string} The ID of the calendar where the event is to be saved; defaults to 'primary'
 * @param all_day {boolean} Whether the event to be saved is an all-day event; defauls to True
 * @param data {Object} Nested object containing the data to be saved with keys as:
 * - 'event_title' {string};
 * - 'location' {string} (OPTIONAL) The geographic location of the event;
 * - 'description' {string} (OPTIONAL) Plain text or HTML;
 * - 'start.start_date' {string} The date when the event starts; 'yyyy-MM-dd';
 * - 'start.start_time' {string} (OPTIONAL when all_day is True) The time when the event starts; 'HH:mm:ss.SSS' or 'h:mmm a';
 * - 'start.tz' {string} Timezone of the start time, in IANA format;
 * - 'end.end_date' {string} The date when the event end; 'yyyy-MM-dd';
 * - 'end.end_time' {string} (OPTIONAL when all_day is True) The time when the event starts; 'HH:mm:ss.SSS' or 'h:mmm a';
 * - 'end.tz' {string} Timezone of the end time, in IANA format; and,
 * - 'event_color' {string} The color code of the event colour; different from the colour of the calendar.
 *
 * @returns event {Object} If successful, returns an object representation of the event saved; empty object.
 */
function save_event(
  cal_id = "primary",
  all_day = True,
  {
    event_title,
    location,
    description,
    start: { start_date, start_time, start_tz },
    end: { end_date, end_time, end_tz },
    event_color,
  },
) {
  try {
    console.log(`Saving data to calendar ${cal_id} ...`);

    let start_obj, end_obj;

    if (all_day) {
      // For all day events, date properties are formatted as "yyyy-MM-dd"; dateTime property is not set.
      start_obj = {
        date: format_as_iso({ date: start_date, tz: start_tz }).split("T")[0],
        timeZone: start_tz,
      };
      end_obj = {
        date: format_as_iso({ date: end_date, tz: start_tz }).split("T")[0],
        timeZone: end_tz,
      };
    } else {
      // For non all-day events, dateTime properties are formatted as "yyyy-MM-ddTHH:mm:ssSSSXXX";
      // date property is not set.
      start_obj = {
        dateTime: format_as_iso({
          date: start_date,
          time: start_time,
          tz: start_tz,
        }),
        timeZone: start_tz,
      };
      end_obj = {
        dateTime: format_as_iso({ date: end_date, time: end_time, tz: end_tz }),
        timeZone: end_tz,
      };
    }

    return calv3.Events.insert(
      {
        summary: event_title,
        location: location,
        description: description,
        start: start_obj,
        end: end_obj,
        colorId: event_color,
      },
      cal_id,
    );
  } catch (error) {
    console.error(`Save failed.\n${error.stack}`);
    return {};
  }
}

/**
 * Delete the Calendar event given the ID.
 * @param {string} cal_id The ID of the calendar to delete the event from; defaults to 'primary'
 * @param {string} event_id The ID of the Calendar event.
 */
function delete_event(cal_id = "primary", event_id) {
  calv3.Events.remove(cal_id, event_id);
}

/**
 * Get events in Calendar for the Months selected by the user.
 * @param cal_id {string} The ID of the calendar where the event is to be saved; defaults to 'primary'
 * @param months {Array} An array of the month index, when the required events occur; 1-indexed
 * @param year {number} The year when the required events occur
 * @return cal_events {array} An array of the IDs (from DATA ENTRY) of events that are in Calendar for the selected Months.
 */
function get_cal_events(cal_id = "primary", months, year) {
  const tz = calv3.Calendars.get(cal_id).timeZone; // Time zone defined in the calendar

  let cal_events = [];

  // Get events for each of the months specified by the user, and extract the IDs.
  months.forEach((month) => {
    let page_token = null;

    do {
      const event_list = calv3.Events.list(cal_id, {
        timeMin: format_as_iso(`${year}-${month}-01`, tz),
        timeMax: format_as_iso(`${year}-${month + 1}-01`, tz),
        pageToken: page_token,
      });

      cal_events.push(...event_list.items);

      page_token = event_list.nextPageToken;
    } while (page_token);
  });

  return cal_events;
}
