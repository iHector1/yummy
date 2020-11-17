import { User } from './user.inteface';
export interface myCupboard{
    uid: string;
    uidUser: User["uid"];
    uidIngredient: string[];
    cant: number;
    uidUnit?: string;
}
