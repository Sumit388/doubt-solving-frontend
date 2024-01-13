export const formatDateTime = (dateTimeString) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour12: false,
  };

  if (dateTimeString) {
    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDateTime;
  }
  return null;
};
