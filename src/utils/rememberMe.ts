export const RememberMe = (remember: boolean, token: string) => {
    if (remember && token) {
        localStorage.setItem('accessToken', token);
    }
};
