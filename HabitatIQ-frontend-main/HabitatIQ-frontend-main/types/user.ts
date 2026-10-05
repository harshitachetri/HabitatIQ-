export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    token: string;
}
