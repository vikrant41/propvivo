export interface Error {
    status: number;
    data: ErrorData;
  }
  
  interface ErrorData {
    title: string;
    statuscode: number;
    message: string;
    detail: string;
    errors: any;
  }