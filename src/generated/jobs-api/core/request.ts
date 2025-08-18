/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
import { ApiError } from './ApiError';
import { CancelablePromise } from './CancelablePromise';

import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';
import type { OnCancel } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';

export const isDefined = <T>(value: T | null | undefined): value is Exclude<T, null | undefined> => {
    return value !== undefined && value !== null;
};

export const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

export const isStringWithValue = (value: unknown): value is string => {
    return isString(value) && value !== '';
};

// Type guard to check if a value is a Blob or File
const isBlobLike = (value: unknown): value is { 
    type: string; 
    stream?: () => unknown;
    arrayBuffer?: () => unknown;
    constructor: { name: string };
    [Symbol.toStringTag]: string;
} => {
    return (
        value !== null &&
        typeof value === 'object' &&
        value !== undefined &&
        'type' in value &&
        typeof (value as { type: unknown }).type === 'string' &&
        'constructor' in value &&
        value.constructor !== null &&
        typeof value.constructor === 'function' &&
        'name' in value.constructor &&
        typeof (value.constructor as { name: unknown }).name === 'string' &&
        /^(Blob|File)$/.test((value.constructor as { name: string }).name)
    );
};

// Type guard to check if a value is a Blob or File
export const isBlob = (value: unknown): value is Blob => {
    // First check if it's a Blob/File instance
    if (value instanceof Blob) {
        return true;
    }
    
    // Then check for blob-like objects
    if (!isBlobLike(value)) {
        return false;
    }
    
    // Additional runtime checks for Blob/File methods
    const hasStream = 'stream' in value && typeof value.stream === 'function';
    const hasArrayBuffer = 'arrayBuffer' in value && typeof value.arrayBuffer === 'function';
    const hasToStringTag = Symbol.toStringTag in value && 
                         typeof value[Symbol.toStringTag] === 'string' &&
                         /^(Blob|File)$/.test(value[Symbol.toStringTag]);
    
    return hasStream && hasArrayBuffer && hasToStringTag;
};

export const isFormData = (value: unknown): value is FormData => {
    return value instanceof FormData;
};

export const base64 = (str: string): string => {
    try {
        return btoa(str);
    } catch {
        // In Node.js environment, Buffer is available
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(str).toString('base64');
        }
        // Fallback for environments where neither btoa nor Buffer is available
        return str;
    }
};

// Type for query parameters
type QueryParams = Record<string, unknown>; // Using unknown for maximum flexibility

export const getQueryString = (params: QueryParams): string => {
    const qs: string[] = [];

    const append = (key: string, value: string | number | boolean) => {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };

    const process = (key: string, value: unknown) => {
        if (value === null || value === undefined) return;
        
        if (Array.isArray(value)) {
            value.forEach((v) => {
                if (v !== null && v !== undefined) {
                    process(key, v);
                }
            });
        } else if (typeof value === 'object') {
            // Handle nested objects
            Object.entries(value).forEach(([k, v]) => {
                if (v !== null && v !== undefined) {
                    process(`${key}[${k}]`, v);
                }
            });
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            append(key, value);
        }
    };

    Object.entries(params).forEach(([key, value]) => {
        process(key, value);
    });

    return qs.length > 0 ? `?${qs.join('&')}` : '';

    return '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
    const encoder = config.ENCODE_PATH || encodeURI;
    const pathParams = options.path || {};

    const path = options.url
        .replace('{api-version}', config.VERSION)
        .replace(/{(.*?)}/g, (substring: string, group: string) => {
            if (Object.prototype.hasOwnProperty.call(pathParams, group)) {
                return encoder(String(pathParams[group]));
            }
            return substring;
        });

    const url = `${config.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};

export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
    if (options.formData) {
        const formData = new FormData();

        const process = (key: string, value: unknown) => {
            if (isString(value) || isBlob(value)) {
                formData.append(key, value);
            } else {
                formData.append(key, JSON.stringify(value));
            }
        };

        Object.entries(options.formData)
            .filter(([_, value]) => isDefined(value))
            .forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => process(key, v));
                } else {
                    process(key, value);
                }
            });

        return formData;
    }
    return undefined;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export const resolve = async <T>(options: ApiRequestOptions, resolver?: T | Resolver<T>): Promise<T | undefined> => {
    if (typeof resolver === 'function') {
        return (resolver as Resolver<T>)(options);
    }
    return resolver;
};

export const getHeaders = async (config: OpenAPIConfig, options: ApiRequestOptions): Promise<Headers> => {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    // Resolve token, username, and password in parallel
    const [token, username, password, _additionalHeaders] = await Promise.all([
        resolve(options, config.TOKEN),
        resolve(options, config.USERNAME),
        resolve(options, config.PASSWORD),
        resolve(options, config.HEADERS),
    ]);

    // Add custom headers from options
    if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                headers.set(key, String(value));
            }
        });
    }

    // Handle authentication
    if (isStringWithValue(token)) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (isStringWithValue(username) && isStringWithValue(password)) {
        const credentials = base64(`${username}:${password}`);
        headers.set('Authorization', `Basic ${credentials}`);
    }

    // Set Content-Type based on request body
    if (options.body !== undefined) {
        if (options.mediaType) {
            headers.set('Content-Type', options.mediaType);
        } else if (isBlob(options.body)) {
            const blob = options.body as Blob;
            headers.set('Content-Type', blob.type || 'application/octet-stream');
        } else if (isString(options.body)) {
            headers.set('Content-Type', 'text/plain');
        } else if (!isFormData(options.body)) {
            headers.set('Content-Type', 'application/json');
        }
    }

    // Add global headers from config
    if (config.HEADERS) {
        Object.entries(config.HEADERS).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                headers.set(key, String(value));
            }
        });
    }

    // Handle credentials
    if (config.WITH_CREDENTIALS) {
        // Note: credentials is a request init property, not a header
        // It will be handled in the fetch options
    }

    return headers;
};

export const getRequestBody = (options: ApiRequestOptions): unknown => {
    if (options.body !== undefined) {
        if (options.mediaType?.includes('/json')) {
            return JSON.stringify(options.body)
        } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
            return options.body;
        } else {
            return JSON.stringify(options.body);
        }
    }
    return undefined;
};

export const sendRequest = async (
    config: OpenAPIConfig,
    options: ApiRequestOptions,
    url: string,
    body: unknown,
    formData: FormData | undefined,
    headers: Headers,
    onCancel: OnCancel
): Promise<Response> => {
    const controller = new AbortController();

    // Ensure the body is a valid BodyInit type
    const requestBody: BodyInit | null | undefined = (() => {
        if (body === null || body === undefined) {
            return formData || null;
        }
        if (typeof body === 'string' || body instanceof Blob || body instanceof FormData || 
            body instanceof URLSearchParams || body instanceof ReadableStream) {
            return body as BodyInit;
        }
        // For other types, try to stringify them
        return JSON.stringify(body);
    })();

    const request: RequestInit = {
        headers,
        body: requestBody,
        method: options.method,
        signal: controller.signal,
    };

    if (config.WITH_CREDENTIALS) {
        request.credentials = config.CREDENTIALS;
    }

    onCancel(() => controller.abort());

    return await fetch(url, request);
};

export const getResponseHeader = (response: Response, responseHeader?: string): string | undefined => {
    if (responseHeader) {
        const content = response.headers.get(responseHeader);
        if (isString(content)) {
            return content;
        }
    }
    return undefined;
};

export const getResponseBody = async (response: Response): Promise<unknown> => {
    if (response.status !== 204) {
        try {
            const contentType = response.headers.get('Content-Type');
            if (contentType) {
                const jsonTypes = ['application/json', 'application/problem+json']
                const isJSON = jsonTypes.some(type => contentType.toLowerCase().startsWith(type));
                if (isJSON) {
                    return await response.json();
                } else {
                    return await response.text();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return undefined;
};

export const catchErrorCodes = (options: ApiRequestOptions, result: ApiResult): void => {
    const errors: Record<number, string> = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        ...options.errors,
    }

    const error = errors[result.status];
    if (error) {
        throw new ApiError(options, result, error);
    }

    if (!result.ok) {
        const errorStatus = result.status ?? 'unknown';
        const errorStatusText = result.statusText ?? 'unknown';
        const errorBody = (() => {
            try {
                return JSON.stringify(result.body, null, 2);
            } catch {
                return undefined;
            }
        })();

        throw new ApiError(options, result,
            `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
        );
    }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
    return new CancelablePromise(async (resolve, reject, onCancel) => {
        try {
            const url = getUrl(config, options);
            const formData = getFormData(options);
            const body = getRequestBody(options);
            const headers = await getHeaders(config, options);

            if (!onCancel.isCancelled) {
                const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
                const responseBody = await getResponseBody(response);
                const responseHeader = getResponseHeader(response, options.responseHeader);

                const result: ApiResult = {
                    url,
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    body: responseHeader ?? responseBody,
                };

                catchErrorCodes(options, result);

                // We know the type of result.body matches the expected type T
                // because it comes from the API response that's expected to return T
                resolve(result.body as T);
            }
        } catch (error) {
            reject(error);
        }
    });
};
