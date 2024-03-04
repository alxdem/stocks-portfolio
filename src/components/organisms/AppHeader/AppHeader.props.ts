import { IUser } from '@atoms/AppUser/AppUser.props';

export interface IAppHeader {
    user: IUser;
    isNavOpen: boolean;
    navBtnClick: () => void;
}