import { IUser } from '../AppUser/AppUser.props';

export interface IAppHeader {
    user: IUser;
    isNavOpen: boolean;
    navBtnClick: () => void;
}