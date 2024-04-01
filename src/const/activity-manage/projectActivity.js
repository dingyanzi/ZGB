import { baseUrl } from "@/config/env";
import { number } from "echarts/lib/export";

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
            label: '活动/服务主题',
            prop: 'serverTitleSearch',
            searchLabelWidth: 110,
            search: true,
            searchPlaceholder: '活动/服务主题',
            hide: true
        },
        {
            label: "项目编号",
            search: true,
            width: 120,
            prop: "projectNo",
        },
        {
            label: '开展月份',
            prop: "startAndEndTime",
            type: "monthrange",
            format: "yyyy-MM",
            valueFormat: "yyyy-MM",
            search: true,
            searchRange: true,
            searchPlaceholder: '请选择月份范围',
            hide: true
        },
        {
            label: '项目信息',
            prop: 'nameOrNoOrTeam',
            search: true,
            searchPlaceholder: '项目名称/执行团队',
            hide: true
        },
        {
            label: '活动/服务主题',
            prop: 'serverTitle',
            width: 200,
            overHidden: true
        },
        {
            label: '开展月份',
            prop: 'serverDate',
        },
        {
            label: "项目名称",
            prop: "projectName",
            width: 200,
            overHidden: true
        },
        {
            label: "执行团队",
            prop: "executeTeam",
            width: 200,

        },
        {
            label: "状态",
            prop: "status",
            type: "select",
            multiple: true,
            dicData: [
                // {
                //     label: "待审核",
                //     value: "1"
                // },
                // {
                //     label: "待修改",
                //     value: "2"
                // },
                {
                    label: "已提交",
                    value: "3"
                },
                {
                    label: "未提交",
                    value: "4"
                }
            ],
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

export const serverOption = {
    labelWidth: 100,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '项目名称',
            prop: 'projectId',
            span: 12,
            type: "select",
            multiple: false,
            props: {
                label: 'project_name',
                value: 'project_id'
            },
            dicUrl: `${baseUrl}/ctProjectPlan/getProjectIdAndName`,
            rules: [
                {
                    required: true,
                    message: '请选择 项目名称',
                    trigger: 'change'
                }
            ],
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
            label: '活动/服务主题',
            prop: 'serverTitle',
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
            label: '活动/服务日期',
            prop: 'serverDate',
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请选择 日期',
                    trigger: 'change'
                }
            ],
        },
        {
            label: '活动/服务时间',
            prop: 'serverTime',
            span: 8,
            type: "timerange",
            format: "HH:mm",
            valueFormat: "HH:mm",
            rules: [
                {
                    required: true,
                    message: '请选择 时间范围',
                    trigger: 'change'
                }
            ],
        },
        {
            label: '活动/服务地点',
            prop: 'serverAddress',
            span: 8,
            rules: [
                {
                    required: true,
                    message: '请输入 活动/服务地点',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '服务对象类型',
            prop: 'objectType',
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
            label: '服务对象人数',
            prop: 'objectNumber',
            span: 8,
            type: "number",
            rules: [
                {
                    required: true,
                    message: '请输入 服务对象人数',
                    trigger: 'change'
                }
            ],
        },
        {
            label: '执行团队',
            prop: 'executeTeam',
            span: 8,
            disabled: true,
            rules: [
                {
                    required: true,
                    message: '请输入 执行团队',
                    trigger: 'blur'
                }
            ],
        },
        {
            label: '活动报道/推文链接',
            prop: 'activityReport',
            span: 8,
        }
    ]
}

export const targetOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '目标',
            prop: 'target',
            span: 24,
            type: 'textarea',
            rules: [
                {
                    required: true,
                    message: '请输入 目标',
                    trigger: 'blur'
                }
            ],
        }
    ]
}

export const situationOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '实施情况概述',
            prop: 'situation',
            span: 24,
            type: 'textarea',
            placeholder: '请输入 实施情况概述(活动主要内容、实施情况;服务对象满意度、活动效果;活动中的发现,活动意义总结,今后活动的展望等。)',
            rules: [
                {
                    required: true,
                    message: '请输入 实施情况概述',
                    trigger: 'blur'
                }
            ],
        }
    ]
}

export const assessOption = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    column: [
        {
            label: '反思与自我评估',
            prop: 'assess',
            span: 24,
            type: 'textarea',
            placeholder: '请输入 反思与自我评估(亮点、不足、原因、收获经验、改进思路。活动开展的实际内容与活动主题是否一致,本次活动目标是否达成,实际参与活动的人员与服务对象是否一致,有哪些环节或者流程可以优化等。)',
            rules: [
                {
                    required: true,
                    message: '请输入 反思与自我评估',
                    trigger: 'blur'
                }
            ],
        }
    ]
}

export const fileOption = {
    emptyBtn: false,
    submitBtn: false,
    column: [
        {
            label: '签到表',
            prop: 'signUrl',
            // type: 'upload',
            span: 24,
            rules: [
                {
                    required: true,
                    message: '请上传 签到表',
                    trigger: 'blur'
                }
            ],
            // // propsHttp: {
            // //   url:'url',
            // //   name:'name',
            // //   res: 'data'
            // // },
            // action: baseUrl+'/os/file/upload?bucketName=zyz',
            // fileText:'选择文件',
            // loadText:'上传中...',
            // accept:".doc,.docx,.pdf,.jpg,.jpeg,.png",
            // fileSize:20000,
            // tip: '支持格式：.doc/.docx/.pdf/.jpg/.jpeg/.png,单个文件不能超过20MB',
        },
        {
            label: '现场照片',
            prop: 'imgUrl',
            // type: 'upload',
            // multiple:true,
            span: 24,
            rules: [
                {
                    required: true,
                    message: '请上传 现场照片',
                    trigger: 'blur'
                }
            ],
            // propsHttp: {
            //   url:'url',
            //   name:'name',
            //   res: 'data'
            // },
            // action: baseUrl+'/os/file/upload?bucketName=zyz',
            // fileText:'选择文件',
            // loadText:'上传中...',
            // accept:'.jpg,.jpeg,.png',
            // fileSize:20000,
            // tip: '支持格式：.jpg/.jpeg/.png,单个文件不能超过20MB',
        },
        {
            label: '现场视频',
            prop: 'videoUrl',
            // type: 'upload',
            // multiple:true,
            span: 24,
            // propsHttp: {
            //   url:'url',
            //   name:'name',
            //   res: 'data'
            // },
            // action: baseUrl+'/os/file/upload?bucketName=zyz',
            // fileText:'选择文件',
            // loadText:'上传中...',
            // accept:'.mp4',
            // fileSize:500000,
            // tip: '支持格式：.mp4,单个文件不能超过500MB',
        },
    ]
}

export const serverOption1 = {
    labelWidth: 100,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: true,
    column: [
        {
            label: '项目名称',
            prop: 'projectName',
            span: 12,

        },
    ]
}
export const infoOption1 = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: true,
    column: [
        {
            label: '活动/服务主题',
            prop: 'serverTitle',
            span: 8,
        },
        {
            label: '活动/服务日期',
            prop: 'serverDate',
            span: 8,
        },
        {
            label: '活动/服务时间',
            prop: 'serviceTimeCalculated',
            span: 8,
        },
        {
            label: '活动/服务地点',
            prop: 'serverAddress',
            span: 8,
        },
        {
            label: '服务对象类型',
            prop: 'objectType',
            span: 8,
        },
        {
            label: '服务对象人数',
            prop: 'objectNumber',
            span: 8,
        },
        {
            label: '执行团队',
            prop: 'executeTeam',
            disabled: true,
            span: 8,
            dicUrl: `${baseUrl}/ctProjectPlan/getProjectIdAndName`,
        },
        {
            label: '活动报道/推文链接',
            prop: 'activityReport',
            span: 8,
        }
    ]
}

export const targetOption1 = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: true,
    column: [
        {
            label: '目标',
            prop: 'target',
            span: 24,
            type: 'textarea',
        }
    ]
}

export const situationOption1 = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: true,
    column: [
        {
            label: '实施情况概述',
            prop: 'situation',
            span: 24,
            type: 'textarea',
            placeholder: '请输入 实施情况概述(活动主要内容、实施情况;服务对象满意度、活动效果;活动中的发现,活动意义总结,今后活动的展望等。)',
        }
    ]
}

export const assessOption1 = {
    labelWidth: 155,
    submitBtn: false,
    emptyBtn: false,
    menuBtn: false,
    detail: false,
    disabled: true,
    column: [
        {
            label: '反思与自我评估',
            prop: 'assess',
            span: 24,
            type: 'textarea',
            placeholder: '请输入 反思与自我评估(亮点、不足、原因、收获经验、改进思路。活动开展的实际内容与活动主题是否一致,本次活动目标是否达成,实际参与活动的人员与服务对象是否一致,有哪些环节或者流程可以优化等。)',
        }
    ]
}

export const fileOption1 = {
    emptyBtn: false,
    submitBtn: false,
    disabled: true,
    column: [
        {
            label: '签到表',
            prop: 'signUrl',
            // type: 'upload',
            span: 24,

            // // propsHttp: {
            // //   url:'url',
            // //   name:'name',
            // //   res: 'data'
            // // },
            // action: baseUrl+'/os/file/upload?bucketName=zyz',
            // fileText:'选择文件',
            // loadText:'上传中...',
            // accept:".doc,.docx,.pdf,.jpg,.jpeg,.png",
            // fileSize:20000,
            // tip: '支持格式：.doc/.docx/.pdf/.jpg/.jpeg/.png,单个文件不能超过20MB',
        },
        {
            label: '现场照片',
            prop: 'imgUrl',
            // type: 'upload',
            // multiple:true,
            span: 24,

            // propsHttp: {
            //   url:'url',
            //   name:'name',
            //   res: 'data'
            // },
            // action: baseUrl+'/os/file/upload?bucketName=zyz',
            // fileText:'选择文件',
            // loadText:'上传中...',
            // accept:'.jpg,.jpeg,.png',
            // fileSize:20000,
            // tip: '支持格式：.jpg/.jpeg/.png,单个文件不能超过20MB',
        },
        {
            label: '现场视频',
            prop: 'videoUrl',
            // type: 'upload',
            // multiple:true,
            span: 24,
            // propsHttp: {
            //   url:'url',
            //   name:'name',
            //   res: 'data'
            // },
            // action: baseUrl+'/os/file/upload?bucketName=zyz',
            // fileText:'选择文件',
            // loadText:'上传中...',
            // accept:'.mp4',
            // fileSize:500000,
            // tip: '支持格式：.mp4,单个文件不能超过500MB',
        },
    ]
}

export const sjOption1 = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    menu: false,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    columnBtn: false,
    column: [
        {
            label: '操作人姓名',
            prop: 'createName',
        },
        {
            label: '操作人类别',
            prop: 'type',
        },
        {
            label: '操作时间',
            prop: 'createTime',
        },
        {
            label: '状态',
            prop: 'status',
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_activity_manager_status',
        },
        {
            label: '处理描述',
            prop: 'notes',
        }
    ]
}
