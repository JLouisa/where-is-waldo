import { DateTime } from "luxon";

function formattedDate() {
  return DateTime.fromJSDate(this.createdDate).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default formattedDate;
