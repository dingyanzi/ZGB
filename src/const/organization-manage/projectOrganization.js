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
            label: '组织机构',
            prop: 'serverTitleSearch',
            search: true,
            searchPlaceholder: '请输入 组织机构',
            hide: true
        },
        {
            label: '组织机构',
            prop: 'undertakingUnit',
            width: 200,
            overHidden: true
        },
        {
            label: '负责人',
            prop: 'head',
        },
        {
            label: "负责人联系方式",
            //labelWith: 150,
            prop: "headPhone",
        },
        {
            label: "通讯地址",
            prop: "address",
        },
        // {
        //     label: "创建人",
        //     prop: "createUser",
        // },
        {
            label: "创建时间",
            prop: "createTime",
            width: 130,
        },
    ]
}

export const infoOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '承接单位名称',
            prop: 'undertakingUnit',
            span: 8,
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
        },
        {
            label: '是否曾获得区级及以上公益创投项目',
            prop: 'welfareProject',
            span: 8,
            type: "radio",
            dicUrl: baseUrl + "/common/dict/infoByType?type=ct_wlfare_organization_dj",
        },
        {
            label: '登记机关',
            prop: 'registAuthority',
            span: 8,
        },
        {
            label: '登记时间',
            prop: 'registTime',
            span: 8,
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
        },
        {
            label: '统一信用代码',
            prop: 'registNo',
            span: 8,
        },
        {
            label: '户名',
            prop: 'accountName',
            span: 8,
        },
        {
            label: '开户账号',
            prop: 'accountNumber',
            span: 8,
        },
        {
            label: '开户行',
            prop: 'bank',
            span: 8,
        },
        {
            label: '单位负责人',
            prop: 'head',
            span: 8,
        },
        {
            label: '单位负责人职务',
            prop: 'headDutis',
            span: 8,
        },
        {
            label: '单位负责人联系电话',
            prop: 'headPhone',
            span: 8,
            rules:[{ 
                pattern: /^1[0-9]{10}$/,
                message: "请输入正确的手机号码",
                trigger: "blur"
            }]
        },
        {
            label: '单位负责人电子邮箱',
            prop: 'headEmail',
            span: 8,
            rules:[{ 
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                message: "请输入正确的电子邮箱",
                trigger: "blur"
            }]
        },
        {
            label: '社会组织评估等级',
            prop: 'assessLevel',
            span: 24,
            type: "radio",
            dicUrl: baseUrl + "/common/dict/infoByType?type=ct_assess_level",
        },
        {
            label: '单位基本情况',
            prop: 'basicSituation',
            span: 24,
            placeholder: '请输入单位基本情况 (200字以内)',
            type: 'textarea',
            maxlength:200,
            minRows: 3,
        },
        {
            label: '开展社区公益服务项目的经验',
            prop: 'experience',
            span: 24,
            placeholder: '请输入本单位开展社区公益服务项目的经验 (200字以内)',
            type: 'textarea',
            maxlength:200,
            minRows: 3,
        }
    ]
}

export const detailOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled:true,
    column: [
        {
            label: '承接单位名称',
            prop: 'undertakingUnit',
            span: 8,
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
        },
        {
            label: '是否曾获得区级及以上公益创投项目',
            prop: 'welfareProject',
            span: 8,
            type: "radio",
            dicUrl: baseUrl + "/common/dict/infoByType?type=ct_wlfare_organization_dj",
        },
        {
            label: '登记机关',
            prop: 'registAuthority',
            span: 8,
        },
        {
            label: '登记时间',
            prop: 'registTime',
            span: 8,
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
        },
        {
            label: '统一信用代码',
            prop: 'registNo',
            span: 8,
        },
        {
            label: '户名',
            prop: 'accountName',
            span: 8,
        },
        {
            label: '开户账号',
            prop: 'accountNumber',
            span: 8,
        },
        {
            label: '开户行',
            prop: 'bank',
            span: 8,
        },
        {
            label: '单位负责人',
            prop: 'head',
            span: 8,
        },
        {
            label: '单位负责人职务',
            prop: 'headDutis',
            span: 8,
        },
        {
            label: '单位负责人联系电话',
            prop: 'headPhone',
            span: 8,
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
            dicUrl: baseUrl + "/common/dict/infoByType?type=ct_assess_level",
        },
        {
            label: '单位基本情况',
            prop: 'basicSituation',
            span: 24,
            placeholder: '请输入单位基本情况 (200字以内)',
            type: 'textarea',
            minRows: 3,
        },
        {
            label: '开展社区公益服务项目的经验',
            prop: 'experience',
            span: 24,
            placeholder: '请输入本单位开展社区公益服务项目的经验 (200字以内)',
            type: 'textarea',
            minRows: 3,
        }
    ]
}
