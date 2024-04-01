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
    searchMenuSpan: 24,
    column: [
        {
            label: '项目信息',
            prop: 'projectNameOrNo',
            search: true,
            // searchPlaceholder: '项目名称/项目编号',
            hide: true
        },
        {
            label: "项目名称",
            prop: "projectName",
            width: 300,
            overHidden: true
        },
        {
            label: "项目编号",
            search: true,
            prop: "projectNo",
        },
        {
            label: '承接机构',
            prop: 'undertakingUnitId',
            search: true,
            searchPlaceholder: '机构名称',
            hide: true
        },
        {
            label: "承接机构",
            prop: "undertakingUnit",
        },
        {
            label: '状态',
            prop: 'status',
            search: true,
            type: "select",
            dicData: [
                {
                    label: "待审核",
                    value: "1"
                },
                {
                    label: "审核通过",
                    value: "2"
                },
                {
                    label: "待修改",
                    value: "3"
                },
                {
                    label: "未提交",
                    value: "4"
                },
            ],
            hide: true
        },
        {
            label: '状态',
            prop: 'planStatus',
            type: "select",
            dicData: [
                {
                    label: "待审核",
                    value: "1"
                },
                {
                    label: "审核通过",
                    value: "2"
                },
                {
                    label: "待修改",
                    value: "3"
                },
                {
                    label: "未提交",
                    value: "4"
                },
            ],
        },
        {
            label: "创建人",
            prop: "createUserName",
        },
        {
            label: "创建时间",
            prop: "createTime",
            width: 150,
        },
    ]
}

export const resultOption = {
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
    menu: false,
    column: [
        {
            label: "变更时间",
            prop: "createTime",
        },
        {
            label: "变更人",
            prop: "createUserName",
        },
        {
            label: "变更前项目计划书",
            prop: "beforeTableq",
            slot: true,
            width: 200,
        },
    ]
}
export const aduitOption = {
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
    menu: false,
    column: [
        {
            label: "操作人姓名",
            prop: "createName",
        },
        {
            label: "操作人类别",
            prop: "type",
        },
        {
            label: "操作时间",
            prop: "createTime",
            width: 200,
        },
        {
            label: "状态",
            prop: "status",
        },
        {
            label: "不通过原因",
            prop: "notes",
        },
    ]
}