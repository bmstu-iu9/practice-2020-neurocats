export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    photoUrl: string;
    userCatsPhotoUrl: number[];
}

export interface LoginResponse {
    user: User;
    token: string;
}