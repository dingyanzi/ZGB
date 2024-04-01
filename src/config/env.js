// 配置编译环境和线上环境之间的切换
let baseUrl = '';
let iconfontVersion = ['1583881_qjh3hlto58m'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
const env = process.env
let systemAppIds = '40';  //系统ID
if (env.NODE_ENV == 'development') {
    baseUrl = `https://jbms.nanjingdata.cn/welfareApi`; // 开发环境地址
    // baseUrl = `http://192.168.101.27:8099`; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = (_CONFIG.VUE_APP_API_BASE_URL && _CONFIG.VUE_APP_API_BASE_URL != '') ? _CONFIG.VUE_APP_API_BASE_URL : 'https://jbms.nanjingdata.cn/welfareApi'// 开发环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = ``; //测试环境地址
}
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    systemAppIds,
    env
}
