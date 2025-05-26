
import { defineStore } from 'pinia'
import * as httpApi from '@/api/model/login.js'

const useLoginStore = defineStore('useLoginStore', () => {
    // 登录
    const idmLogin = async _params => await httpApi.idmLogin(_params);

    return {
        idmLogin
    }
});

export default useLoginStore;
