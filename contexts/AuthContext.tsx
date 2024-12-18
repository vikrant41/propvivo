import { createContext, useContext } from "react";
import router from "next/router";
import CookieUtil from "../lib/cookieUtil";

type IAuth = {
    auth: { authenticated: false; user: null };
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string) => void;
};

const error: string = "Attempt to use AuthContext outside of a valid provider.";
const defaultValue: IAuth = {
    auth: { authenticated: false, user: null },
    login: (email: string, password: string) => {
        throw new Error(error);
    },
    logout: () => {
        throw new Error(error);
    },
    register: (email: string, password: string) => {
        throw new Error(error);
    },
};
export const AuthContext = createContext<IAuth>(defaultValue);

export const getUser = async (context) => {
    const { parseCookie } = CookieUtil();
    const loggedInUser = parseCookie(context?.req?.headers?.cookie, process.env.AUTH_COOKIE_NAME);
    return { authenticated: loggedInUser ? true : false, user: loggedInUser ? loggedInUser : "" };
};

const AuthProvider = (props) => {
    const auth = props.auth || { authenticated: false, user: null };
    const login = async (email: string, password: string) => {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then(function (response) {
                router.push("/");
            })
            .catch(function (error) {
                console.error(error.message);
            });
    };

    const logout = async () => {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: "GET",
        })
            .then(function (response) {
                router.push("/");
            })
            .catch(function (error) {
                console.error(error.message);
            });
    };

    const register = async (email: string, password: string) => {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then(function (response) {
                router.push("/");
            })
            .catch(function (error) {
                console.error(error.message);
            });
    };
    return <AuthContext.Provider value={{ auth, login, logout, register }} {...props} />;
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
//export const AuthConsumer = AuthContext.Consumer;
