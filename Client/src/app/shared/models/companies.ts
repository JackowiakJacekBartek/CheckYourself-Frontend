export interface CompanyProfile {
  company: Company,
  companyImages: CompanyImages [],
  companyTechnologies : CompanyTechnologies [],
  companySocialMediaLinks : CompanySocialMediaLinks [],
  CompanyOffices : CompanyOffices []
}

export interface Company {
  name: string,
  employeecount: number,
  headquarteraddress: string,
  description: string,
  logo: string
}

export interface CompanyImages {
  image: string
}

export interface CompanyTechnologies {
  name: string,
  idtechnology: number
}

export interface CompanySocialMediaLinks {
  name: string,
  link: string
}

export interface CompanyOffices {
  location: string,
  iframeurl: string
}
