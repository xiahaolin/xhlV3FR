/*
 * @Author: 林夏
 * @Date:  24.6.27
 * @desc  url参数转对象
 * @params params -> 传入数据 String | Object
 * @params  _needEncode -> 是否需要编码 默认 true
 */
export function dealUrlSearchParams(_params = '', _needEncode = true) {
    const isUrlStr = !(_params instanceof Object);
    isUrlStr && _params.includes('?') && (_params = _params.split('?')[1]);
    const paramsVM = new URLSearchParams(_params);
    !_needEncode && paramsVM.forEach((v, k) => paramsVM.set(k, decodeURIComponent(v)));
    if (isUrlStr) return Object.fromEntries(paramsVM);
    return _needEncode ? String(paramsVM) : decodeURIComponent(paramsVM);
};

/*
 * @Author: 林夏
 * @Date:  25.3.13
 * @desc  获取文件后缀
 * @params _fileName -> 传入文件名称 String
 */
export function dealFileType(_fileName) {
    return _fileName.split(".").at(-1);
}

