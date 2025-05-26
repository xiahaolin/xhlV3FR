import { httpReq } from "@/api/request"
// 登录
export const idmLogin = (params = {}) => httpReq.post({ url: '/policeAI/idm/idmLogin', params, appUrl: 'api/c5eeff84cb1a4d27a3a6248aa3e97644/' })
