
export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    blocked?: boolean;
    newUser?: boolean;
}