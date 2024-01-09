export interface CompanyProfile {
  company: Company,
  companyImages: CompanyImages [],
  companyTechnologies : CompanyTechnologies [],
  companySocialMediaLinks : CompanySocialMediaLinks [],
  companyOffices : CompanyOffices []
}

export interface Company {
  name: string,
  nip: string,
  employeecount: number,
  headquarteraddress: string,
  description: string,
  logo: string,
  id: number,
  idaccount: number
}

export interface CompanyImages {
  image: string,
  idcompany: number
}

export interface CompanyTechnologies {
  name: string,
  idtechnology: number,
  idcompany: number
}

export interface CompanySocialMediaLinks {
  name: string,
  link: string,
  idcompany: number
}

export interface CompanyOffices {
  location: string,
  iframeurl: string,
  idcompany: number
}
