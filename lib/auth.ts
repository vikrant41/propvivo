import { NextApiRequest, NextApiResponse } from "next";
// import logger from "./logger";
import CookieUtil from "../lib/cookieUtil";

interface IAuthType {
    logIn: (email: string, password: string, res?: NextApiResponse) => Promise<ILoginResponse>;
    logOut: (res?: NextApiResponse) => void;
    isAuthenticated: (req: NextApiRequest) => boolean;
}
export interface ILoginResponse {
    ok: boolean;
    status: number;
    statusText: string;
    user: string;
    error: string;
}
const { addCookie, removeCookie, getCookie } = CookieUtil();
const UseAuthenticate = (): IAuthType => {
    const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME;
    const logIn = async (email: string, password: string, res?: NextApiResponse): Promise<ILoginResponse> => {
        let result: ILoginResponse = { ok: false, status: -1, statusText: "", user: "", error: "" };
        const payload = {
            email: email,
            password: password,
        };
        const endpoint: string = (process.env.NODE_ENV === "production" ? process.env.HOST : "http://localhost:3000") + "/authd/login";
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const json = await response.json().then((json) => json.data);
            if (json.access_token) {
                result = { ok: response.ok, status: response.status, statusText: response.statusText, user: email, error: "" };
                addCookie(res, AUTH_COOKIE_NAME, email);
            } else {
                result = { ok: response.ok, status: response.status, statusText: response.statusText, user: "", error: "error.missing-access-token" };
            }
        } else {
            result = { ok: response.ok, status: response.status, statusText: response.statusText, user: "", error: "error.invalid.email-or-password" };
        }
        return result;
    };

    const logOut = (res?: NextApiResponse): void => {
        removeCookie(res, AUTH_COOKIE_NAME);
    };
    const isAuthenticated = (req: NextApiRequest): boolean => {
        const cookieValue = getCookie(req, AUTH_COOKIE_NAME);
        // logger.debug("in isAuthenticated - cookie value: %s", cookieValue);
        return !cookieValue;
    };
    return {
        logIn,
        logOut,
        isAuthenticated,
    };
};
export default UseAuthenticate;
