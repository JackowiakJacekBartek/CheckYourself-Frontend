import { Company } from "./companies";

//POST
export interface JobOffer {
  id?: number,
  job: Job,
  jobapplications: JobApplications[],
  jobDetails: JobDetails[],
  jobTechnologies: JobTechnologies[]
}

export interface JobsQuickInfo {
  job: Job;
  company: Company;
  jobTechnologies: JobTechnologies[];
}

export interface Job {
  id?: number,
  name: string,
  publicid: string,
  image: string,
  description: string,
  employmentmethod: number,
  employmenttype: number
  expirationdate: Date,
  salarymin: number,
  salarymax: number,
  companyid: number,
}

export interface JobApplications {
  idtechnology: number,
  icon: string,
  description: string,
  idjobadvertisements: number,
  id: number
}

export interface JobDetails {
  iddetail: number,
  name: string,
  idjobadvertisements: number,
  id: number
}

export interface JobTechnologies {
  iddetail: number,
  name: string,
  idjobadvertisements: number,
  id: number,
  icon: string
}

//GET
export interface JobOfferGet {
  id?: number,
  name: string,
  publicid: string,
  image: string,
  description: string,
  employmentmethod: number,
  employmenttype: number
  expirationdate: Date,
  salarymin: number,
  salarymax: number,
  companyid: number,
  jobapplications: JobApplications[],
  jobDetails: JobDetails[],
  jobtechnologies: JobTechnologies[]
}
