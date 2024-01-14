export interface localeInterface {
    locale: string
}

export const LANGUAGES = [
    {locale: 'pl'},
    {locale: 'en'}
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

export enum JobType {
    'Praca na pełen etat' = 1,
    'Praca na niepełny etat' = 2,
    'Praca jako freelancer (umowa zlecenie)' = 3,
    'Umowa o pracę na czas określony' = 4,
}

export enum TechList {
    'html' = 0,
    'css3' = 1,
    'angularjs' = 2,
    'ansic' = 3,
    'csharp' = 4,
    'cplus' = 5,
    'java' = 6,
    'python' = 7,
    'js' = 8,
    'discordjs' = 9,
    'typescript' = 10,
    'androidstudio' = 11,
    'react' = 12,
    'unrealengine' = 13,
    'arduino' = 14
}

export enum NecessarySkill {
    'mile widziane' = 0,
    'początkujący' = 1,
    'podstawowy' = 2,
    'średnio zaawansowany' = 3,
    'zaawansowany' = 4,
}

export enum ToolsList {
    'jenkins' = 0, 'git' = 1, 'jira' = 2
}

// export const localUrl = 'http://localhost:5010'
export const localUrl = 'http://68.219.240.80:5010' //your local IP
export const comapniesUrl = 'http://localhost:5013' //your local company IP
export const quizzesUrl = 'http://68.219.240.80:5015/api/Quizzes' //your local company IP
export const jobsUrl = 'http://68.219.240.80:5013' //your local company IP


export const images = '/assets/images'
export const icons = '/assets/icons'
