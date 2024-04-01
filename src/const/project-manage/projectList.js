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
    searchMenuSpan: 18,
    column: [
        {
            label: '项目信息',
            prop: 'projectNameOrNo',
            search: true,
            // searchPlaceholder: '请输入项目名称',
            hide: true
        },
        {
            label: "项目编号",
            search: true,
            prop: "projectNo",
        },
        {
            label: '项目类别',
            prop: 'projectType',
            search: true,
            type: "select",
            multiple: true,
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_project_type',
            hide: true
        },
        {
            label: "项目名称",
            prop: "projectName",
            width: 300,
            overHidden: true
        },
        {
            label: "需求方",
            prop: "departmentDetailName",
        },
        {
            label: '项目阶段',
            prop: 'managerStatus',
            search: true,
            type: "select",
            multiple: true,
            width: 100,
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_implement_status',
            // hide: true
        },
        {
            label: '创建时间',
            prop: 'time',
            search: true,
            type: "daterange",
            searchRange: true,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            hide: true
        },
        {
            label: "创建人",
            prop: "createUserName",
            width: 100,
        },
        {
            label: "创建时间",
            prop: "createTime",
            width: 150,
        },
    ]
}
export const baseOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '项目名称',
            prop: 'projectName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 项目名称',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目类型',
            prop: 'projectType',
            type: "select",
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_project_type',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请选择 项目类型',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '分包号',
            prop: 'subpackage',
            span: 8,
        },
        {
            label: '项目编号',
            prop: 'projectNo',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 项目编号',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目规划',
            prop: 'annual',
            // labelWidth: 130,
            span: 8,
            placeholder: "请输入",
            append: '年度',
            rules: [
                {
                    required: true,
                    message: '请输入 项目规划',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目周期',
            prop: 'StartTime',
            span: 8,
            type: "daterange",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
                {
                    required: true,
                    message: '请输入 项目周期',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目实施区域',
            prop: 'effectArea',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 项目实施区域',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '预计直接受益人数',
            prop: 'numberBeneficiaries',
            span: 8,
            append: '人',
            rules: [
                {
                    required: true,
                    message: '请输入 项目预计直接受益人数',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '监管方',
            prop: 'supervision',
            span: 8,
            type: "cascader",
            dicUrl: baseUrl + '/ctProjectPlan/streetAndCommunityTree?fId=-1',
            checkStrictly: true,
            rules: [
                {
                    required: true,
                    message: '请输入 监管方',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '需求方',
            prop: 'department',
            slot: true,
            span: 16,
            rules: [
                {
                    required: true,
                    message: '请输入 需求方',
                    trigger: 'blur'
                }
            ],
        },

    ]
}
export const baseOption1 = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '承接单位名称',
            prop: 'undertakingUnit',
            span: 8,
            disabled: true,
            rules: [
                {
                    required: true,
                    message: '请输入 承接单位名称',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '通讯地址',
            prop: 'address',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请选择 通讯地址',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '是否曾获得区级及以上公益创投项目',
            prop: 'welfareProject',
            span: 8,
            type: "radio",
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_wlfare_organization_dj',
            rules: [
                {
                    required: true,
                    message: '请输入 是否曾获得区级及以上公益创投项目',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '登记机关',
            prop: 'registAuthority',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 登记机关',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '登记时间',
            prop: 'registTime',
            span: 8,
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
                {
                    required: true,
                    message: '请选择 登记时间',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '统一信用代码',
            prop: 'registNo',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 统一信用代码',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '户名',
            prop: 'accountName',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 户名',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '开户账号',
            prop: 'accountNumber',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 开户账号',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '开户行',
            prop: 'bank',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 开户行',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '单位负责人',
            prop: 'head',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 单位负责人',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '单位负责人职务',
            prop: 'headDutis',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 单位负责人职务',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '单位负责人联系电话',
            prop: 'headPhone',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 单位负责人联系电话',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '单位负责人电子邮箱',
            prop: 'headEmail',
            span: 8,
        },
        {
            label: '社会组织评估等级',
            prop: 'assessLevel',
            span: 24,
            type: "radio",
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_assess_level',
            rules: [
                {
                    required: true,
                    message: '请输入 社会组织评估等级',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '单位基本情况',
            prop: 'basicSituation',
            span: 24,
            placeholder: '请输入单位基本情况 (200字以内)',
            type: 'textarea',
            minRows: 3,
            // maxlength: 200,
            // showWordLimit: true,
        },
        {
            label: '开展社区公益服务项目的经验',
            prop: 'experience',
            span: 24,
            placeholder: '请输入本单位开展社区公益服务项目的经验 (200字以内)',
            type: 'textarea',
            minRows: 3,
            // maxlength: 200,
            // showWordLimit: true,
        }
    ]
}
export const detailOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '项目概述',
            prop: 'overview',
            span: 24,
            placeholder: '请输入项目概述 (项目内容、预期效果,200字以内)',
            type: 'textarea',
            minRows: 3,
            // maxlength: 200,
            // showWordLimit: true,
            rules: [
                {
                    required: true,
                    message: '请输入 项目概述',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目特色',
            prop: 'characteristic',
            span: 24,
            placeholder: '请输入项目特色  (创新性、示范性、可推广性)    (200字以内)',
            type: 'textarea',
            minRows: 3,
            // maxlength: 200,
            // showWordLimit: true,
            rules: [
                {
                    required: true,
                    message: '请输入 项目特色',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '需求分析',
            prop: 'analysis',
            span: 24,
            placeholder: '请输入需求分析 (200字以内)',
            type: 'textarea',
            // maxlength: 200,
            // showWordLimit: true,
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 需求分析',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目总目标',
            prop: 'projectTarget',
            span: 24,
            placeholder: '请输入项目总目标',
            type: 'textarea',
            // showWordLimit: true,
            // minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 项目总目标',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目分目标',
            prop: 'mubiao',
            span: 24,
            slot: true,
        },
        {
            label: '项目实施方案',
            prop: 'plan',
            span: 24,
            placeholder: '请输入项目实施方案',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 项目实施方案',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '风险预计与防控方案',
            prop: 'riskEstimation',
            // maxlength: 200,
            // showWordLimit: true,
            span: 24,
            placeholder: '请输入风险预计与防控方案 (200字以内)',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 风险预计与防控方案',
                    trigger: 'blur'
                }
            ],
        },
    ]
}

export const regularOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '受益群体描述',
            prop: 'beneficiaryGroups',
            span: 24,
            placeholder: '请输入受益群体描述 (100字以内)',
            type: 'textarea',
            minRows: 3,
            // maxlength: 100,
            // showWordLimit: true,
            rules: [
                {
                    required: true,
                    message: '请输入 受益群体描述',
                    trigger: 'blur'
                }
            ],
        },
    ]
}

export const fundOption = {
    labelWidth: 130,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: false,
    column: [
        {
            label: '姓名',
            prop: 'name',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 姓名',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '联系电话',
            prop: 'phone',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 联系电话',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '是否缴纳社保',
            prop: 'isSocial',
            span: 8,
            type: "radio",
            dicData: [{
                label: "是",
                value: "1"
            }, {
                label: "否",
                value: "0"
            }],
            rules: [
                {
                    required: true,
                    message: '请输入 是否缴纳社保',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '学历',
            prop: 'education',
            type: "select",
            dicUrl: baseUrl + '/common/dict/infoByType?type=edu_level',
            span: 8,
        },
        {
            label: '专业',
            prop: 'speciality',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请选择 专业',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '职务',
            prop: 'duties',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 职务',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '项目角色分工',
            prop: 'role',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 项目角色分工',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '社会工作职业资格',
            prop: 'professionalQualifications',
            span: 8,
        },
        {
            label: '参与项目时间',
            prop: 'projectTime',
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 参与项目时间',
                    trigger: 'blur'
                }
            ],
        },
    ]
}