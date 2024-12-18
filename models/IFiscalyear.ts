export interface IFiscalyear {
  id: number;
  title: string;
  country: string;
  frequency: string;
  updatedDate: string;
  createdBY: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface IFiscalYearDetail {
  description: string;
  period: string;
  country: string;
  reportingFrequency: string;
  status: string;
  createdOn: string;
  createdBy: string;
  mappedAssociations: MappedAssociation[];
}

export interface MappedAssociation {
  id: number;
  mappedAssociation: string;
  code: string;
  mappedOn: string;
  mappedBy: string;
}
