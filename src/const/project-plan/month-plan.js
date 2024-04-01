import { baseUrl } from "@/config/env";
import store from '@/store'

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
    menuWidth: 150,
    showClomnuBtn: false,
    searchBtnText: '查询',
    searchSize: 'small',
    searchMenuPosition: 'right',
    searchMenuSpan: 18,
    column: [
        {
            label: '项目信息',
            prop: 'projectNameOrNo',
            search: true,
            // searchPlaceholder: '项目名称/项目编号',
            hide: true
        },
        {
            label: "项目编号",
            search: true,
            width: 120,
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
            label: '计划年月',
            prop: 'planMonth',
            search: true,
            type: "monthrange",
            searchRange: true,
            format: "yyyy-MM",
            valueFormat: "yyyy-MM",
            hide: true
        },
        {
            label: "计划年月",
            prop: "month",
        },
        {
            label: "项目名称",
            prop: "projectName",
            width: 300,
            overHidden: true
        },
        {
            label: "承接机构",
            prop: "orgName",
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

export const addOption = {
    labelWidth: 100,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '项目名称',
            prop: 'projectName',
            type: 'select',
            // filterable: true,
            multiple: false,
            span: 10,
            props: {
                label: 'projectName',
                value: 'projectId'
            },
            dicUrl: baseUrl + '/ctProjectPlan/selectPlanListOrg?undertakingUnitId=' + store.getters.userInfo.orgId,
            rules: [
                {
                    required: true,
                    message: '请选择 项目名称',
                    trigger: 'blur'
                }
            ],

        },
        {
            label: '计划月份',
            prop: 'planMonth',
            type: 'month',
            format: "yyyy-MM",
            span: 6,
            valueFormat: "yyyy-MM",
            rules: [
                {
                    required: true,
                    message: '请选择 计划月份',
                    trigger: 'blur'
                }
            ],
        },
    ]
}
export const planOption = {
    labelWidth: 130,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '活动/服务主题',
            prop: 'appName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 活动/服务主题',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '服务对象类型',
            prop: 'appName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 服务对象类型',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '服务人数',
            prop: 'appName',
            span: 8,
            append: "人",
            rules: [
                {
                    required: true,
                    message: '请输入 服务人数',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '活动/服务内容',
            prop: 'appName',
            span: 24,
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 活动/服务内容',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '活动/服务形式',
            prop: 'appName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 活动/服务形式',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '具体地址',
            prop: 'appName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 具体地址',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '负责人姓名',
            prop: 'appName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 负责人姓名',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '负责人联系方式',
            prop: 'appName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 负责人联系方式',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '活动/服务日期',
            prop: 'ri',
            span: 16,
            slot: true,
            rules: [
                {
                    required: true,
                    message: '请选择 活动/服务日期',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '开始时间',
            prop: 'jian',
            span: 8,
            type: 'time',
            format: 'HH:mm',
            valueFormat: 'HH:mm',
            start: '00:00',
            step: '00:15',
            end: '24:00',
            rules: [
                {
                    required: true,
                    message: '请选择 开始时间',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '是否与项目书设计一致',
            prop: 'appName',
            span: 8,
            type: "radio",
            dicData: [{
                label: "是",
                value: "1"
            }, {
                label: "否",
                value: "0"
            },],
            rules: [
                {
                    required: true,
                    message: '请选择 是否与项目书设计一致',
                    trigger: 'blur'
                }
            ],
        },
    ]
}

export const contentOption = {
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
    menuWidth: 150,
    showClomnuBtn: false,
    searchBtnText: '查询',
    searchSize: 'small',
    searchMenuPosition: 'right',
    searchMenuSpan: 24,
    menu: false,
    column: [
        {
            label: "活动/服务主题",
            prop: "serverTheam",
            width: 100,
        },
        {
            label: "活动/服务内容",
            prop: "serverContant",
            width: 300,
            // overHidden: true
        },
        {
            label: "活动/服务形式",
            prop: "serverForm",
            width: 100,
        },
        {
            label: "服务对象类型",
            prop: "serverType",
            width: 100,
        },
        {
            label: "计划服务人数",
            prop: "serverNumber",
            width: 100,
        },
        {
            label: "活动/服务日期",
            prop: "serverDate",
            width: 120,
        },
        {
            label: "活动/服务开始时间",
            prop: "startTime",
            width: 140,
        },
        {
            label: "活动/服务具体地址",
            prop: "address",
            width: 140,
        },
        {
            label: "负责人姓名",
            prop: "headName",
        },
        {
            label: "负责人联系方式",
            prop: "headPhone",
        },
        {
            label: "是否与项目书设计一致",
            prop: "projectProposal",
            width: 150,
            type: "select",
            dicData: [{
                label: "是",
                value: "1"
            }, {
                label: "否",
                value: "0"
            }]
        },
    ]
}
export const contentOption1 = {
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
    menuWidth: 150,
    showClomnuBtn: false,
    searchBtnText: '查询',
    searchSize: 'small',
    searchMenuPosition: 'right',
    searchMenuSpan: 18,
    menu: false,
    column: [
        {
            label: "计划月份",
            prop: "planMonth",
            search: true,
            hide: true,
            type: 'month',
            format: "yyyy-MM",
            valueFormat: "yyyy-MM",
            width: 100,
        },
        {
            label: "活动/服务主题",
            prop: "serverTheam",
            width: 100,
        },
        {
            label: "活动/服务内容",
            prop: "serverContant",
            width: 300,
            // overHidden: true
        },
        {
            label: "活动/服务形式",
            prop: "serverForm",
            width: 100,
        },
        {
            label: "服务对象类型",
            prop: "serverType",
            width: 100,
        },
        {
            label: "计划服务人数",
            prop: "serverNumber",
            width: 100,
        },
        {
            label: "活动/服务日期",
            prop: "serverDate",
            width: 120,
        },
        {
            label: "活动/服务开始时间",
            prop: "startTime",
            width: 140,
        },
        {
            label: "活动/服务具体地址",
            prop: "address",
            width: 140,
        },
        {
            label: "负责人姓名",
            prop: "headName",
        },
        {
            label: "负责人联系方式",
            prop: "headPhone",
        },
        {
            label: "是否与项目书设计一致",
            prop: "projectProposal",
            width: 150,
            type: "select",
            dicData: [{
                label: "是",
                value: "1"
            }, {
                label: "否",
                value: "0"
            }]
        },
    ]
}