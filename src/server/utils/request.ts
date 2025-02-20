import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { Toast } from 'vant';

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: 'api/v1',
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' }
});

// 添加请求拦截器
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		// const cfg: InternalAxiosRequestConfig = response.config;
		// 对响应数据做点什么
		const res = response.data;
		if (res instanceof Blob) {
			return response;
		}
		// 统一成功码
		if ([200, '200'].includes(res.code)) {
			return res;
		}
		if (res.code && res.code !== 0) {
			// `token` 过期或者账号已在别处登录
			return Promise.reject(res);
		}
		return Promise.reject(res);
	},
	(error) => {
		// 对响应错误做点什么
		if (error.response) {
			const { status } = error.response;
			switch (status) {
        case 401:
					Toast.fail('Unauthorized, token may have expired');
          console.error('Unauthorized, token may have expired');
          break;
        case 404:
					Toast.fail('Requested resource not found');
          console.error('Requested resource not found');
          break;
        case 500:
					Toast.fail('Server error');
          console.error('Server error');
          break;
        default:
					Toast.fail('Request error');
          console.error('Request error');
      }
		} else {
			Toast.fail('Request error');
			console.error('Request error');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
