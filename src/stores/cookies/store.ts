import { create } from 'zustand';

export type CookiesStore = {
    cookies: null | boolean;
    updateCookies: (cookies: boolean) => void;
    clearCookies: () => void;
};

const useCookiesStore = create<CookiesStore>((set) => {
    // Define an initial value for cookies, ensuring it's null on the server
    let initialCookies: null | boolean = null;
    if (typeof document !== 'undefined') {
        const cookies = document.cookie;
        initialCookies = cookies.includes('cookies=true') ? true : cookies.includes('cookies=false') ? false : null;
    }

    return {
        cookies: initialCookies,
        updateCookies: (cookies: boolean) => {
            set({ cookies });
            if (typeof document !== 'undefined') {
                document.cookie = 'cookies=' + cookies + '; max-age=' + (30 * 24 * 60 * 60) + '; path=/; sameSite=lax; secure=' + (process.env.NODE_ENV === 'production');
            }
        },
        clearCookies: () => {
            set({ cookies: null });
            if (typeof document !== 'undefined') {
                document.cookie = 'cookies=; max-age=0; path=/; sameSite=lax; secure=' + (process.env.NODE_ENV === 'production');
            }
        },
    };
});

export default useCookiesStore;
