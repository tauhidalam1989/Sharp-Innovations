export interface Client {
    id: number;
    name: string;
    logo: string;
    isActive: boolean;
    order: number;
    createdBy: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Partner {
    id: number;
    name: string;
    logo: string;
    isActive: boolean;
    order: number;
    createdBy: number;
    updatedBy?: number;
    updatedAt: Date;
}

export interface Certificate {
    id: number;
    name: string;
    image: string;
    isActive: boolean;
    order: number;
    createdBy: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    result: T;
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}
