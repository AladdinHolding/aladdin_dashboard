import axios, { AxiosError, AxiosRequestConfig } from "axios";

type HeadersFunction = (headers: Record<string, string>, options: { getState: () => any }) => Record<string, string>;

const baseURL = `https://aladdincreative-001-site1.btempurl.com/api/v1`;
export const axiosBaseQuery = ({
    baseUrl = "",
    headers,
}: {
    baseUrl?: string;
    headers?: HeadersFunction;
}) => {
    return async (
        { url, params, method, data, responseType }: AxiosRequestConfig,
        { signal, getState }: { signal: AbortSignal, getState: () => any }
    ) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method: method ? method : "GET",
                ...(params && { params: params }),
                ...(headers && { headers: headers({}, { getState }) }),
                ...(data && { data: data }),
                responseType: responseType ? responseType : "json",
            });
            return {
                data: result.data,
            };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: { status: err.response?.status, data: err.response?.data },
            };
        }
    };
};
export const APIBaseQueryInterceptor = axiosBaseQuery({
    baseUrl: baseURL,
    headers: (headers, { getState }) => {
        const {
            auth: { access_token },
        } = getState();
        if (access_token) {
            headers["Authorization"] = `Bearer ${access_token}`;
        }
        return headers;
    },
});

export const APIBaseQuery = async (
    args: AxiosRequestConfig,
    api: any,
) => {
    let result = await APIBaseQueryInterceptor(args, api, /*extraOptions*/);
    return result;
};