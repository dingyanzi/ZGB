import { baseUrl } from "@/config/env";

export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    columnBtn: false,
    searchShowBtn: false,
    menuWidth: 140,
    showClomnuBtn: false,
    searchBtnText: '查询',
    searchSize: 'small',
    searchMenuPosition: 'right',
    searchMenuSpan: 6,
    column: [
        {
            label: '项目信息',
            prop: 'projectNoOrName',
            search: true,
            // searchPlaceholder: '项目名称',
            hide: true
        },
        {
            label: '项目名称',
            prop: 'projectName',
            width: 200,
            overHidden: true
        },
        {
            label: "项目编号",
            search: true,
            prop: "projectNo",
        },
        {
            label: '承接机构',
            prop: 'undertakingUnit',
            search: true,
            searchPlaceholder: '机构名称',
            hide: true
        },
        {
            label: "财政补助资金预算(万元)",
            prop: "subsidySund",
        },
        {
            label: "社会配套资金预算(万元)",
            prop: "toatlSubtotalSh",
        },
        {
            label: "项目总预算(万元)",
            prop: "price",
        },
        {
            label: "已支金额(万元)",
            prop: "expenditureAmount",
        },
    ]
}

export const moneyOption = {
    border: true,
    index: false,
    stripe: true,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    columnBtn: false,
    searchShowBtn: false,
    menu: false,
    showClomnuBtn: false,
    column: [
        {
            label: '活动/服务名称',
            prop: 'serverTitle',
            width: 200,
            overHidden: true
        },
        {
            label: "支出类别",
            prop: "expenditureType",
        },
        {
            label: "费用具体说明",
            prop: "costIllustrate",
        },
        {
            label: "单价(元)",
            prop: "price",
        },
        {
            label: "数量",
            prop: "number",
        },
        {
            label: "小计",
            prop: "subtotal",
        },
    ]
}