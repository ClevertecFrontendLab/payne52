export const RememberMe = (remember: boolean, token: string) => {
    if (remember && token) {
        localStorage.setItem('access token', token);
    } else if (token) {
        sessionStorage.setItem('access token', token);
    }
};
