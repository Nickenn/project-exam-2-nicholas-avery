export function formatDate(string: string) {
  const date = new Date(string);
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
}
