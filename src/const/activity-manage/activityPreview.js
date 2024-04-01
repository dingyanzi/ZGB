import { baseUrl } from "@/config/env";

export const tableOption = {
    border: true,
    // index: true,
    // indexLabel: '序号',
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
    menu: false,
    column: [
        {
            label: '江北新区购买社会组织服务和公益创投项目活动预告',
            children: [
                
                {
                    label: "项目编号",
                    search: true,
                    width: 120,
                    prop: "projectNo",
                    hide: true
                },
                {
                    label: '活动月份',
                    prop: 'serverDate',
                    search: true,
                    type: "month",
                    format: "yyyy-MM",
                    valueFormat: "yyyy-MM",
                    hide: true
                },
                {
                    label: '项目名称',
                    prop: 'projectNameOrNo',
                    search: true,
                    hide: true
                },
                {
                    label: "序号",
                    prop: "num",
                    width: 50,
                },
                {
                    label: "机构名称",
                    prop: "undertakingUnit",
                    width: 300,
                    search: true,
                    overHidden: true
                },
                {
                    label: "项目名称",
                    prop: "projectName",
                },
                {
                    label: "活动名称",
                    prop: "serverTheam",
                },
                {
                    label: "活动内容",
                    prop: "serverContant",
                },
                {
                    label: "计划开展日期",
                    prop: "planMonth",
                },
                {
                    label: "活动地点",
                    prop: "address",
                },
                {
                    label: "负责人",
                    prop: "head",
                },
            ]
        }
    ]
}

export const projectOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    searchBtn: true,
    emptyBtn: true,
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
    searchMenuSpan: 18,
    // disabled: true,
    column: [
        {
            label: '开展月份',
            prop: 'cardNoAndUserName',
            search: true,
            type: "month",
            format: "yyyy-MM",
            valueFormat: "yyyy-MM",
            hide: true
        },
        {
            label: "活动/服务主题",
            prop: "serverTitle",
            width: 300,
            overHidden: true
        },
        {
            label: "活动/服务日期",
            prop: "serverDate",
        },
        {
            label: "活动/服务时长",
            prop: "serviceTimeCalculated",
        },
        {
            label: "具体地点",
            prop: "serverAddress",
        },
        {
            label: "服务对象类型",
            prop: "objectType",
        },
        {
            label: "服务人数",
            prop: "objectNumber",
        },
        {
            label: "创建人",
            prop: "createUser",
        },
        {
            label: "创建时间",
            prop: "createTime",
        },
    ]
}

export const memberOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    searchBtn: true,
    emptyBtn: true,
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
    searchMenuSpan: 18,
    menu: false,
    column: [
        {
            label: "姓名",
            prop: "name",
            width: 300,
            overHidden: true
        },
        {
            label: "联系电话",
            prop: "phone",
        },
        {
            label: "项目角色分工",
            prop: "role",
        },
        {
            label: "职务",
            prop: "duties",
        },
        {
            label: "社会工作职业资格",
            prop: "professionalQualifications",
        },
        {
            label: "学历",
            prop: "education",
            dicUrl: baseUrl + "/common/dict/infoByType?type=edu_level",
        },
        {
            label: "专业",
            prop: "speciality",
        },
        {
            label: "参与项目时间",
            prop: "projectTime",
        },
        {
            label: "是否缴纳社保",
            prop: "isSocial",
            dicUrl: baseUrl + "/common/dict/infoByType?type=ct_team_details_is_social",
        },
    ]
}