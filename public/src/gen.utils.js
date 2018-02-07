/**
 * @author EmmanuelOlaojo
 * @since 2/6/18
 */

const PREVIEW_LENGTH = 300;

/**
 * Formats the date as "MM.DD.YY hh:mm"
 * @param dateString
 * @returns {string|*}
 */
export function formatDate(dateString){
  let date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = "am";

  if(minutes < 10){
    minutes = "0" + minutes;
  }

  if(hours === 24){
    hours = 12;
  }
  else if(hours >= 12){
    period = "pm";

    if(hours > 12){
      hours = hours % 12;
    }
  }

  dateString = date.toDateString().substring(4);
  dateString = dateString.split(" ").join(".") + ` ${hours}:${minutes}  ${period}`;

  return dateString;
}

/**
 * Shortens text greater than a max length
 * and adds ellipsis.
 *
 * @param text the full length text
 *
 * @returns shortened text + ellipsis
 */
export function textPreview(text){
  if(text.length > PREVIEW_LENGTH){
    text = text.substr(0, PREVIEW_LENGTH) + "  .  .  .";
  }

  return text;
}
