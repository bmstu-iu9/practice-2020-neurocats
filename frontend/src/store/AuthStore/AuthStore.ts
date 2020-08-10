import {action, observable} from "mobx";
import {LoginResponse, User} from "./types";
import Axios, {AxiosError} from "axios";

const AUTH_USER_KEY = "neuro-cats-user";

type RequestInterceptor = { request: number; };
type ResponseInterceptor = { response: number; };

type Interceptor = RequestInterceptor | ResponseInterceptor;

export class AuthStore {
    @observable.shallow user?: User;
    @observable token?: string;
    private interceptors: Interceptor[] = [];

    constructor() {
        const userData = localStorage.getItem(AUTH_USER_KEY);
        if (userData) {
            const json = JSON.parse(userData) as LoginResponse;
            this.user = json.user;
            this.token = json.token;
            this.setupInterceptors();
            this.updateUser();
        }
    }

    @action.bound
    async signIn(email: string, password: string): Promise<boolean> {
        try {
            const {data: {user, token}} = await Axios.post<LoginResponse>("/login", {
                email: email,
                password: password
            });

            this.user = user;
            this.token = token;
            this.saveLocal();
            this.setupInterceptors();
            return true;
        } catch (e) {
            console.log("Auth Failed:", e);
        }
        return false;
    }

    @action.bound
    async signOut(): Promise<boolean> {
        try {
            await Axios.get("/logout");
            this.clear();
            return true;
        } catch (e) {
            console.log("Logout failed:", e);
        }
        return false;
    }

    @action.bound
    async updateUser(): Promise<void> {
        if (this.user === undefined) return;
        try {
            const {data: user} = await Axios.get<User>(`/users/${this.user.id}`);
            this.user = user;
            this.saveLocal();
        } catch (e) {
            console.log("Update user failed:", e);
        }
    }

    @action.bound
    saveLocal() {
        if (this.user === undefined || this.token === undefined) return;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify({user: this.user, token: this.token}));
    }

    @action.bound
    setupInterceptors() {
        this.clearInterceptors();

        this.interceptors.push({
            request: Axios.interceptors.request.use(value => {
                value.headers["X-Auth-Token"] = this.token;
                return value;
            })
        });

        this.interceptors.push({
            response: Axios.interceptors.response.use(undefined, error => {
                if (isAxiosError(error)) {
                    if (error.code === "401") {
                        this.clear();
                    }
                }

                throw error;
            })
        });
    }

    @action.bound
    clear() {
        localStorage.removeItem(AUTH_USER_KEY);
        this.user = undefined;
        this.token = undefined;

       this.clearInterceptors();
    }

    @action.bound
    clearInterceptors() {
        this.interceptors.forEach(interceptor => {
            if (isRequestInterceptor(interceptor)) {
                Axios.interceptors.request.eject(interceptor.request);
            } else {
                Axios.interceptors.response.eject(interceptor.response);
            }
        });
    }
}

function isAxiosError(e: any): e is AxiosError {
    return e.isAxiosError;
}

function isRequestInterceptor(interceptor: Interceptor): interceptor is RequestInterceptor {
    return "request" in interceptor;
}

function isResponseInterceptor(interceptor: Interceptor): interceptor is ResponseInterceptor {
    return "response" in interceptor;
}