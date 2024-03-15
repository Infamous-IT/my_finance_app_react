export interface IUserData {
    email: string;
    password: string;
}

export interface IResponseUser {
    email: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    password: string;
}

export interface IResponseUserData {
    token: string;
    user: IResponseUser;
}

export interface IUser {
    id: number;
    email: string;
    token: string;
}

export interface ICategory {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    transactions: [];
}