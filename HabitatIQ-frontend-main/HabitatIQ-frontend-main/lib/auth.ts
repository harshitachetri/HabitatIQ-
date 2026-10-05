export const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('habitatIQ_token', token);
    }
};

export const getToken = (): string => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('habitatIQ_token') || '';
    }
    return '';
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('habitatIQ_token');
    }
};
