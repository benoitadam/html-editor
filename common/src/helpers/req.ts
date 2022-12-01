import fetch from 'cross-fetch';

export type ReqMethod = 'GET'|'POST'|'DELETE'|'PATCH'|'PUT';
export type ReqURL = string | URL;
export type ReqResponse<T = any> = Response & { data?: T };
export type ReqParams = Record<string, string|number|(string|number)[]>;
export type ReqData = any;
export type ReqResponseType = XMLHttpRequestResponseType|'json'|'text'|'html'|'blob'|'stream';
export type ReqOption = RequestInit & {
  baseUrl?: string,
  timeout?: number,
  params?: ReqParams,
  data?: ReqData,
  responseType?: ReqResponseType,
  xhr?: boolean,
  onProgress?: (e: ProgressEvent<XMLHttpRequestEventTarget>, progress: number) => void,
  formData?: FormData,
};

export const mapJson = (res: Response) => res.json();
export const mapText = (res: Response) => res.text();
export const mapBlob = (res: Response) => res.blob();
export const mapStream = (res: Response) => res.body;

const acceptMap: Partial<Record<ReqResponseType, string>> = {
  'json': 'application/json; charset=utf-8',
  'text': 'text/*; charset=utf-8',
  'html': 'text/html, application/xhtml+xml, application/xml; q=0.9; charset=utf-8',
  'blob': '*/*',
  'stream': '*/*',
}

const getterMap: Partial<Record<ReqResponseType, ((res: Response) => any)>> = {
  'json': (res) => res.json(),
  'text': (res) => res.text(),
  'html': (res) => res.text(),
  'blob': (res) => res.blob(),
  'stream': (res) => res.body,
}

export const reqFetch = async <T = any>(url: ReqURL, options: ReqOption = {}) => {
  let timeoutRef: any;

  const { baseUrl, timeout, params, data, responseType, ...rest } = options;
  const fetchOptions: RequestInit = rest;
  const headers = (fetchOptions.headers || (fetchOptions.headers = {})) as Record<string, string>;

  // console.debug('reqFetch', url, options);

  if (data) {
    fetchOptions.body = JSON.stringify(data);
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
    }
  }

  if (!headers['Accept']) {
    headers['Accept'] = acceptMap[responseType||'json'] || acceptMap.json!;
  }

  if (params || baseUrl) {
    const urlObj = new URL(url, baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          urlObj.searchParams.delete(key);
          Object.values(val).forEach(p => urlObj.searchParams.append(key, String(p)));
          return;
        }
        if (typeof val === 'object') {
          urlObj.searchParams.set(key, JSON.stringify(val));
          return;
        }
        urlObj.searchParams.set(key, String(val));
      });
    }
    url = urlObj.toString();
  }

  if (timeout) {
    const controller = new AbortController();
    fetchOptions.signal = controller.signal;
    timeoutRef = setTimeout(() => controller.abort(), timeout);
  }

  // console.debug('reqFetch fetch', url, fetchOptions);
  if (options.xhr) {
    const xhr = new XMLHttpRequest();
		xhr.responseType = (responseType as XMLHttpRequestResponseType) || 'json';
		xhr.open((fetchOptions.method||'POST').toUpperCase(), url);
    Object.entries(headers).forEach(([k,v]) => xhr.setRequestHeader(k, v));
    const { onProgress } = options;
    if (onProgress) xhr.addEventListener('progress', e => onProgress(e, e.loaded / e.total));
		const xhrPromise = new Promise((resolve) => xhr.addEventListener('loadend', resolve));
    const formData = options.formData || new FormData();
    if (data) Object.entries(data).forEach(([k,v]) => formData.append(k, String(v)));
		xhr.send(formData);
		await xhrPromise;
    return xhr.response;
  }

  const response = await fetch(url, fetchOptions) as ReqResponse<T>;

  if (timeout) {
    clearTimeout(timeoutRef);
  }

  const getter = getterMap[responseType||'json'] || getterMap.json!;
  response.data = await getter(response);

  return response;
}

export class Req {
  constructor(public options: Partial<ReqOption> = {}) {}

  async get<T = any>(url: ReqURL, options: ReqOption = {}) {
    return reqFetch<T>(url, { ...this.options, method: 'GET', ...options });
  }

  async delete<T = any>(url: ReqURL, options: ReqOption = {}) {
    return reqFetch<T>(url, { ...this.options, method: 'DELETE', ...options });
  }

  async post<T = any>(url: ReqURL, data?: ReqData, options: ReqOption = {}) {
    return reqFetch<T>(url, { ...this.options, method: 'POST', data, ...options });
  }

  async patch<T = any>(url: ReqURL, data?: ReqData, options: ReqOption = {}) {
    return reqFetch<T>(url, { ...this.options, method: 'PATCH', data, ...options });
  }

  async put<T = any>(url: ReqURL, data?: ReqData, options: ReqOption = {}) {
    return reqFetch<T>(url, { ...this.options, method: 'PUT', data, ...options });
  }

  async upload<T = any>(url: ReqURL, name: string, file: File, fileName: string|null, options: ReqOption = {}) {
    const formData = new FormData();
    formData.append(name, file, fileName||file.name);
    return reqFetch<T>(url, {
      ...this.options,
      xhr: true,
      method: 'POST',
      formData,
      ...options
    });
  }
}

export const req = new Req({ timeout: 20000 });
export default req;