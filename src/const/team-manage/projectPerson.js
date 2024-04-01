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
    menu: false,
    showClomnuBtn: false,
    searchBtnText: '查询',
    searchSize: 'small',
    searchMenuPosition: 'right',
    searchMenuSpan: 12,
    column: [
        {
            label: '成员信息',
            prop: "NameOrPhone",
            search: true,
            searchPlaceholder: '姓名/联系电话',
            hide: true
        },
        {
            label: '项目名称',
            prop: "projectNameSearch",
            search: true,
            type: "select",
            multiple: false,
            props: {
            label: 'project_name',
            value: 'project_name'
            },
            dicUrl: `${baseUrl}/ctProjectPlan/getProjectIdAndName`,
            hide: true
        },
        {
            label: "姓名",
            prop: "name",
        },
        {
            label: "联系电话",
            prop: "phone",
        },
        {
            label: "角色",
            prop: "role",
        },
        {
            label: "项目名称",
            prop: "projectName",
        },
        {
            label: "创建人",
            prop: "createUserName",
        },
        {
            label: "创建时间",
            prop: "createTime",
            width: 130,
        },
    ]
}