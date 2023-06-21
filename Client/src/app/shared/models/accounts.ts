export interface AccountRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface AccountLogin {
    email: string,
    password: string,
    method: string,
    token: string
}

export interface UserProfile {
    account: Account,
    accountCoursesCertificate: AccountCoursesCertificate,
    accountSoftSkill: AccountSoftSkill,
    accountWorkExpiriance: AccountWorkExpiriance
}

export interface Account {
    allowsNotifications: boolean,
    birthDate: Date,
    createDate: Date,
    description?: string,
    email: string,
    emailConfirmed: boolean,
    id: number,
    idRole: number,
    image: string,
    name: string,
    password: string,
    phoneNumber?: string,
    refreshToken: string,
    refreshTokenValid: Date,
    salaryMax: number,
    salaryMin: number,
    surname: string,
    verificationCode: number,
    verificationCodeValid: Date
}

export interface AccountCoursesCertificate {
    certificateIssueDate: Date,
    certificateNumber: string,
    createDate: Date,
    expirationDate: Date,
    id: number,
    idAccount: number,
    idCertificate: number,
    idOrganizationIssuingCertificate: number
}

export interface AccountSoftSkill {
    createDate: Date,
    id: number,
    idAccount: number,
    name: string
}

export interface AccountWorkExpiriance {
    createDate: Date,
    dateEnd: Date,
    DateStart: Date,
    id: number,
    idAccount: number,
    idProfession: number,
    idWorkCompany: number
}