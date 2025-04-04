export const renderExternalImage = ({ src, width, quality }) => {
  return src;
};

// input : "2024-12-21T06:27:51.0547421Z"
// output : Dec 21, 2024
export function convertUTCToLocalDate(utcDateString) {
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(utcDateString);
  return date.toLocaleDateString("en-US", options);
}

export function formatDateWithMonth(dateString, withTime = true) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
  
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${month} ${day}, ${year} ${withTime ? `${hours}:${minutes}` : ""}`;
  }

  export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };


  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);
    const hours = ("0" + date.getUTCHours()).slice(-2);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    const seconds = ("0" + date.getUTCSeconds()).slice(-2);
    const milliseconds = ("00" + date.getUTCMilliseconds()).slice(-3);
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    return formattedDate;
  };