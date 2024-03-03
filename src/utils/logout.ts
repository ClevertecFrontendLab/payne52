import { Paths } from '@constants/paths';
import { logout } from '@redux/authSlice';
import { history } from '@redux/configure-store';

export const LogoutFunc = () => {
    localStorage.removeItem('access token');
    sessionStorage.removeItem('access token');
    logout();
    history.replace(Paths.AUTH);
};
