export interface localeInterface {
    locale: string
}

export const LANGUAGES = [
    { locale: 'pl' },
    { locale: 'en' }
]

export enum CompanySize {
  '1-5' = 1,
  '6-50' = 2,
  '51-100' = 3,
  '101-500' = 4,
  '501-1000' = 5,
  '1001-5000' = 6,
  '5000 >' = 7
}

// export const localUrl = 'http://localhost:5010'
export const localUrl = 'http://68.219.240.80:5010' //your local IP
export const comapniesUrl = 'http://68.219.240.80:5013' //your local company IP
export const jobsUrl = 'http://68.219.240.80:5013' //your local company IP


export const images = '/assets/images'
export const icons = '/assets/icons'
