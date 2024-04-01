import { baseUrl } from "@/config/env";

export const planOption = {
    labelWidth: 130,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '变更前内容',
            prop: 'changeNotesBefore',
            span: 24,
            placeholder: '请输入变更前内容',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 变更前内容',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '变更后内容',
            prop: 'changeContant',
            span: 24,
            placeholder: '请输入变更后内容',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 变更后内容',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '变更原因',
            prop: 'changeNotes',
            span: 24,
            placeholder: '请输入变更原因',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 变更原因',
                    trigger: 'blur'
                }
            ],
        },
    ]
}
export const refuseOption = {
    labelWidth: 130,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '对进度的影响',
            prop: 'progressEffect',
            span: 24,
            placeholder: '请输入对进度的影响',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 对进度的影响',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '对成本的影响',
            prop: 'costEffect',
            span: 24,
            placeholder: '请输入对成本的影响',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 对成本的影响',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '对资源的影响',
            prop: 'resourceEffect',
            span: 24,
            placeholder: '请输入对资源的影响',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 对资源的影响',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '其他影响',
            prop: 'otherEffort',
            span: 24,
            placeholder: '请输入其他影响',
            type: 'textarea',
            minRows: 3,
            rules: [
                {
                    required: true,
                    message: '请输入 其他影响',
                    trigger: 'blur'
                }
            ],
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
            label: "处理描述",
            prop: "notes",
            width: 200,
        },
    ]
}

export const materialOption = {
    border: true,
    index: false,
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
            label: "材料名称",
            prop: "fileName",
        },
        {
            label: "文件名称",
            prop: "fileUrl",
            slot: true
        },
    ]
}