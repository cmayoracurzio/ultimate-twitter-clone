import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);

const localeList = dayjs.Ls;

dayjs.updateLocale("en", {
  relativeTime: {
    ...localeList["en"].relativeTime,
    s: "now",
    m: "1m ago",
    mm: "%dm ago",
    h: "1h ago",
    hh: "%dh ago",
    d: "1d ago",
  },
});

export function formatRelativeDateTime(absoluteDate: string): string {
  const date = dayjs(absoluteDate);
  const now = dayjs();
  const differenceInHours = now.diff(date, "hour");

  // If the date difference is more than 24 hours, show the absolute date
  if (differenceInHours > 24) {
    return date.format("MMM D, YYYY");
  }

  return date.fromNow(true);
}

export function formatAbsoluteDateTime(dateTimeString: string): string {
  const date = dayjs(dateTimeString);
  const time = date.format("hh:mm A Z");
  const formattedDate = date.format("MMM D, YYYY");

  return `${time} · ${formattedDate}`;
}
