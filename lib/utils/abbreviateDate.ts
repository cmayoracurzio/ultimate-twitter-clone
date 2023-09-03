import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    s: "now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
  },
});

export default function abbreviateDate(absoluteDate: string): string {
  const date = dayjs(absoluteDate);
  const now = dayjs();
  const differenceInDays = now.diff(date, "day");

  // If the date difference is more than 1 day, show the absolute date
  if (differenceInDays > 1) {
    return date.format("MMM D, YYYY");
  }

  return date.fromNow(true);
}
