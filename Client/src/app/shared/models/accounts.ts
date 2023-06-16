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

}