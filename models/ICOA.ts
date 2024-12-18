export interface ICOA {
  id: number;
  name: string;
  typeOfBusiness: string;
  country: String;
  status: string;
  startDate: string;
  mappedAssociation: number;
}

export interface COADetail {
  id: number;
  name: string;
  typeofBusiness: string;
  country: String;
  status: string;
  startDate: string;
  mappedAssociation: number;
  items: ICOA[];
}
