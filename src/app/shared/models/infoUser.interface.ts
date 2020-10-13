import { level } from './level.interface';
import { User } from './user.inteface';
import { state} from './state.interface';
export interface infoUser{
    uid: string;
    uidUser: User["uid"];
    uidLevel: level["uid"];
    uidstate: state["uid"];
    points: number;
    paypalAccount: string;
    displayName: string;
    photoUrl: string;
}