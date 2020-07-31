export type Rol = "Registrado" | "Premiun";
export type Level = "Principiante" | "Intermedio" | "Avanzado";
export interface User{
    uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
    userPremiun?: boolean;
    follower?: string[];
    follow?: string[];
    followerPremiun?: string[];
    followPremiun?: string[];
    paypalAccount?: number;
    photoURL?: string;
    points?: number;
    level?:Level,
  type?: Rol;
    
}