import Axios from 'axios';
import Vue from 'vue';

const inBrowser = typeof window !== 'undefined';

const API_URL = inBrowser ? (process.env.API_URL_BROWSER || '') : (process.env.API_URL || 'http://localhost:3000');

// Create new axios instance
const axios = Axios.create({
    baseURL: API_URL + (process.env.API_PREFIX || '/api')
});

// Throw nice http errors & keep SSR safe
function onError(e) {
    if (!inBrowser) {
        return {};
    }

    let response = {};
    if (e.response) {
        response = e.response.data;
    }

    throw Object.assign({
        statusCode: 500,
        message: 'Request error'
    }, response);
}

// Wap promise
function wrapPromise(p) {
    return p.then(res => {
        return res.data || {};
    }).catch(onError);
}

// Opts Enhancer
function wrapOpts(opts = {}, _url) {
    const url = _url || opts.url || '';

    if (opts.withCredentials === undefined) {
        // Send credentials only to relative and API Backend requests
        if (!/^https?:\/\//i.test(url) || url.indexOf(process.env.API_URL_BROWSER) === 0 || url.indexOf(process.env.API_URL) === 0) {
            opts.withCredentials = true;
        }
    }

    return opts;
}

// Create wrappers
// https://github.com/mzabriskie/axios#request-method-aliases
export const $request = function (opts) {
    return wrapPromise(axios.request(wrapOpts(opts)));
};

export const $get = function (url, opts) {
    return wrapPromise(axios.get(url, wrapOpts(opts, url)));
};

export const $delete = function (url, opts) {
    return wrapPromise(axios.delete(url, wrapOpts(opts, url)));
};

export const $head = function (url, opts) {
    return wrapPromise(axios.head(url, wrapOpts(opts, url)));
};

export const $post = function (url, data, opts) {
    return wrapPromise(axios.post(url, data, wrapOpts(opts, url)));
};

export const $put = function (url, data, opts) {
    return wrapPromise(axios.put(url, data, wrapOpts(opts, url)));
};

export const $patch = function (url, data, opts) {
    return wrapPromise(axios.patch(url, data, wrapOpts(opts, url)));
};

// ----------------------------------------
// Vue Plugin
// ----------------------------------------
const VueAxios = {
    install(Vue) {
        // Globally register as $http
        Vue.prototype.$http = axios;

        // Mixins
        Vue.mixin({
            methods: {
                $request,
                $get,
                $delete,
                $head,
                $post,
                $put,
                $patch
            }
        });
    }

};

// ----------------------------------------
// Install vue plugin
// ----------------------------------------
Vue.use(VueAxios);

// ----------------------------------------
// setToken module
// ----------------------------------------
export const setToken = function (token) {
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
};
