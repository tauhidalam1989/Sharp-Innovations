export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  status_code: number;
  message: string;
  result: {
    user: User;
    token: string;
    expiresIn: string;
  };
  time: number;
  ex?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  avatar?: string;
  phone?: string;
  lastLogin?: Date;
}

export interface VerifyTokenResponse {
  success: boolean;
  status_code: number;
  message: string;
  result: {
    id: number;
    email: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
  };
  time: number;
  ex?: string;
}