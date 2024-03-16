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

export interface ITransaction {
    id: number;
    amount: number;
    title: string;
    categories: ICategory,
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICategory {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    transactions?: [];
}

export interface IResponseTransactionLoader {
    categories: ICategory[];
    transactions: ITransaction[];
    totalIncome: number;
    totalExpense: number;
}

export interface ITransactionTable {
    limit: number;
}

export interface IChart {
    totalIncome: number;
    totalExpense: number;
}

export interface IDataChart {
    value: number;
    name: string;
    color: string;
}