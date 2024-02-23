export function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date(dateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const month = months[date.getUTCMonth()];
  const day = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `Published ${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm} EST, ${day} ${month} ${dayOfMonth}, ${year}`;
}
