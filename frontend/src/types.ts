export interface User {
    id: number,
    email: string,
    password: string,
    name: string,
    photoUrl: string,
    userCatsPhotoUrl: number[]
}

export interface CatsPhoto {
    id: number,
    photoUrl: string,
    breed: string,
    owner: number,
    likes: number[]
}