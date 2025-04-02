import { useEffect, useState } from "react";
type DeleteFunction = (deleteID: string) => any;
interface Response {
  error: boolean;
  success: boolean;
  message?: string;
}
interface DeleteResponse {
  deleteModal: boolean;
  setDeleteModal: (deleteModal: boolean) => void;
  setDeleteID: (deleteId: string) => void;
  response: Response;
  handleDelete: () => void;
  setDeleteResponse: (newResponse: Response) => void; // Add setDeleteResponse function
}
export const useOnClickOutside = (ref, handleClick) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handleClick]);
};

export const formatDateToMonthYear = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long" };
  return dateString ? date.toLocaleString("en-US", options as any) : "";
};
export const multiSelectFilter =
  (attribute) => (rows, columnIds, filterValue) => {
    // Filters only if filters are selected
    return filterValue.length === 0
      ? rows
      : rows.filter((row) => {
          return filterValue.some((element) => {
            return (
              element.toLowerCase() === row.original[attribute].toLowerCase()
            );
          });
        });
  };

export const useDeleteResponse = (
  deleteFunction: DeleteFunction
): DeleteResponse => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string | null | any>(null);
  const [response, setResponse] = useState<Response>({
    message: "",
    error: false,
    success: false,
  });
  const handleDelete = async () => {
    if (deleteID) {
      setDeleteModal(false);

      const response = await deleteFunction(deleteID).unwrap();

      if (response.statusCode === 200) {
        setResponse({
          error: false,
          success: true,
          message: response?.message,
        });
      } else {
        setResponse({
          error: true,
          success: false,
          message: response.message || response.message,
        });
      }
    }
  };

  useEffect(() => {
    if (response.success) {
      setDeleteModal(false);
      const timeOut = setTimeout(() => {
        setResponse({
          error: false,
          success: false,
        });
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [response]);
  const setDeleteResponse = (newResponse: Response) => {
    setResponse(newResponse);
  };

  return {
    deleteModal,
    setDeleteModal,
    setDeleteID,
    response,
    handleDelete,
    setDeleteResponse,
  };
};

export const useApiStatus = (apiStatus: any, data: any, apiStatus2?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  useEffect(() => {
    if (
      (apiStatus && apiStatus.statusCode) ||
      (apiStatus2 && apiStatus2.statusCode)
    ) {
      setIsLoading(false);
      if (data === "" || data === undefined) {
        setIsAddSuccess(true);
      } else {
        setIsEditSuccess(true);
      }
    }
  }, [apiStatus, apiStatus2, data]);

  return {
    isLoading,
    isAddSuccess,
    isEditSuccess,
    setIsLoading,
  };
};

export const dateFormat = (upcomingDate) => {
  if (upcomingDate == "0001-01-01T00:00:00") {
    return "-";
  }

  const originalDate = new Date(upcomingDate);
  const formattedDate = `${
    originalDate.getMonth() + 1
  }/${originalDate.getDate()}/${originalDate.getFullYear()}`;
  return upcomingDate ? formattedDate : "-";
};

export const formatCurrentTime=()=> {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime = `${day}-${month}-${year} | ${String(hours).padStart(
    2,
    "0"
  )}:${minutes} ${ampm}`;
  return formattedTime;
}

export const debounce = (func: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
export function convertDateFormat(originalDate) {
  if (originalDate == "0001-01-01T00:00:00") {
    return "-";
  }
  // Create a new Date object from the original string
  const date = new Date(originalDate);

  // Form the final date string in the desired format
  return (
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
}

export function convertDateToMMDDYYYY(
  dateString: string,
  isOnlyReturn?: boolean
): string {
  // Check if the dateString is empty or not a valid date
  if (!dateString && isOnlyReturn) {
    return;
  } else if (!dateString) {
    return "-";
  }

  // Extract the date part (assumes format is YYYY-MM-DD)
  const dateParts = dateString.slice(0, 10).split("-");

  // Validate the length of dateParts
  if (dateParts.length !== 3) {
    return "-";
  }

  const year = dateParts[0];
  const month = dateParts[1].padStart(2, "0"); // Ensure month is two digits
  const day = dateParts[2].padStart(2, "0"); // Ensure day is two digits

  // Return the formatted date
  return `${month}/${day}/${year}`;
}

export function getInitials(name) {
  // Split the name by spaces and commas
  const nameParts = name.split(/[\s,]+/);

  // Get the initials from each part
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return name ? initials : "";
}

// return "09/23/2024 14:30" format
export function dateformatewithTime(dateString) {
  const date = new Date(dateString);

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return dateString ? `${mm}/${dd}/${yyyy} ${hh}:${min}` : "";
}

// return 1h 30min format
export function formatTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (minutes > 0) {
    formattedTime += `${minutes}min `;
  }

  // if (seconds > 0) {
  //     formattedTime += `${seconds}s `;
  // }

  return formattedTime.trim();
}

// return dd/mm/yyyy
export const dateFormatDDMMYYYY = (upcomingDate) => {
  if (upcomingDate == "0001-01-01T00:00:00") {
    return "-";
  }

  const originalDate = new Date(upcomingDate);
  const formattedDate = `${originalDate.getDate()}/${
    originalDate.getMonth() + 1
  }/${originalDate.getFullYear()}`;

  return upcomingDate ? formattedDate : "-";
};

// Output: "4:59:00 PM"
export const convertTo12HourFormat = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const newHours = hours % 12 || 12;
  return `${newHours}:${minutes?.toString().padStart(2, "0")} ${ampm}`;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) {
    return text;
  }
  return text?.slice(0, maxLength) + "...";
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export function convertDateToCustomFormat(dateStr) {
  // Create a new Date object
  const date = new Date(dateStr);
  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Get the hours, minutes, and seconds
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Determine AM/PM and convert hours from 24-hour to 12-hour format
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedHours = String(hours).padStart(2, "0");

  // Format the date as MM/DD/YYYY; hh:mm AM/PM

  return dateStr
    ? `${month}/${day}/${year} ${formattedHours}:${minutes} ${period}`
    : "";
}

//function to nest SideBar data
export function nestData(data) {
  const map = new Map();

  // Step 1: Populate the map with each item by its featureId
  data.forEach((item) => {
    map.set(item.featureId, { ...item, children: [] });
  });

  // Step 2: Build the nested structure
  const nestedData = [];
  data.forEach((item) => {
    if (item.featureParentId) {
      const parent = map.get(item.featureParentId);
      if (parent) {
        parent.children.push(map.get(item.featureId));
      }
    } else {
      nestedData.push(map.get(item.featureId));
    }
  });

  return nestedData;
}
// Utility function to format the createdOn date
export const formatCreatedOnDate = (createdOn?: string): string => {
  if (createdOn) {
    const date = new Date(createdOn);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`;
  }
  return "-";
};

// Example usage:
// const dateString = "2024-06-24T11:20:04.467";
// const result = calculateDateDifference(dateString);
export const dateBackendFormat = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const milliseconds = ("00" + date.getMilliseconds()).slice(-3);
  let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  if (formattedDate.match("NaN")) {
    formattedDate = null;
  }
  return formattedDate ?? "-";
};
