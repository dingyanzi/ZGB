/**
 * 全局配置文件
 */
export default {
    title: "ZGB",
    logo: "Z",
    key: 'zgb',//配置主键,目前用于存储
    indexTitle: '后台快速开发模版',
    lockPage: '/lock',
    tokenTime: 15,//秒
    //http的status默认放行不才用统一处理的,
    statusWhiteList: [400],
    //配置首页不可关闭
    isFirstPage: false,
    fistPage: {
        label: "首页",
        value: "/wel/index",
        params: {},
        query: {},
        meta: {
            i18n: 'dashboard'
        },
        group: [],
        close: false
    },
    //配置菜单的属性
    menu: {
        iconDefault: 'icon-caidan',
        props: {
            label: 'label',
            path: 'path',
            icon: 'icon',
            children: 'children'
        }
    }
}
