import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatTweetDateTime(absoluteDateTime: string): string {
  const date = dayjs(absoluteDateTime);
  const time = date.format("hh:mm A Z");
  const formattedDate = date.format("MMM D, YYYY");
  const relativeDate = date.fromNow(true);

  return `${time} · ${formattedDate} (${relativeDate} ago)`;
}

export function formatProfileDateTime(absoluteDateTime: string): string {
  const date = dayjs(absoluteDateTime);
  const formattedDate = date.format("MMM D, YYYY");
  const relativeDate = date.fromNow(true);

  return `${formattedDate} (${relativeDate} ago)`;
}
