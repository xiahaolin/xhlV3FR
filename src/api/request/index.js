import axios from "axios";

const Base_Url = window.BaseConfig['Base_Url'];
const TimeOut = window.BaseConfig['TimeOut'];
const errCode = [401];
class HttpRequest {
  constructor(baseURL, timeout) {
    this._instance = axios.create({
      baseURL,
      timeout,
    });

    // 添加请求拦截器
    this._instance.interceptors.request.use(
      this.reqInterceptors,
      this.resInterceptors
    );

    // 添加响应拦截器
    this._instance.interceptors.response.use(
      this.resInterceptors,
      this.resInterceptors
    );
  }

  request(_config) {
    return new Promise((resolve, reject) => {
      this._instance
        .request(_config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(_config) {
    if (typeof _config === "string") _config = { url: _config };
    return this.request({ ..._config, method: "get" });
  }
  getFile(_config) {
    if (typeof _config === "string") _config = { url: _config };
    return this.request({
      ..._config,
      method: "get",
      headers: { responseType: "blob" },
    });
  }

  post(_config) {
    _config.data = _config.params;
    delete _config.params;
    return this.request({ ..._config, method: "post" });
  }

  put(_config) {
    return this.request({ ..._config, method: "put" });
  }

  delete(_config) {
    return this.request({ ..._config, method: "delete" });
  }

  reqInterceptors = (_config) => {
    const _XAT = localStorage.getItem("pkce_access_token");
    _config.headers['Authorization'] = "Bearer " + _XAT;
    return _config;
  };

  resInterceptors = (_params) => {
    if (errCode.includes(+_params.status)) {
      ElNotification({
        title: "提示",
        type: "warning",
        message: _params.response.data.message,
      });
    }
    return _params;
    // return Promise.reject();
  };
}

const httpReq = new HttpRequest(Base_Url, TimeOut);
// const otherHttpReq = new HttpRequest('http://localhost:3001');

export { httpReq };
