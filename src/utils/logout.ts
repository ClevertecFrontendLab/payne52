import { Paths } from '@constants/paths';
import { logout } from '@redux/authSlice';
import { history } from '@redux/configure-store';

export const LogoutFunc = () => {
    localStorage.removeItem('accessToken');
    logout();
    history.replace(Paths.AUTH);
};
