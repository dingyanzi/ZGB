import { baseUrl } from '@/config/env';
export const tableOption = {
    searchShow:false,
    border: true,
    index: true,
    align: 'center',
    addBtn: true,
    editBtn: false,
    viewBtn: false,
    delBtn: false,
    menuWidth:150,
    headerAlign: 'center',
    props: {
        label: 'label',
        value: 'value'
    },
    column: [
        {
            span: 24,
            label: '模型XML',
            prop: 'modelUrl',
            hide:true,
            limit: 1,
            tip: '如果不上传，表示新增流程。如果导入流程，请上传XML文件格式',
            type: 'upload',
            action: baseUrl+'/upms-center/common/authority/file/upload?bucketName=file',
        },
        {
            label: '流程名称',
            prop: 'name',
            'search': true,
            rules: [{
                required: true,
                message: '请输入流程名称',
                trigger: 'blur'
            }]
        },
        {
            label: '模型标识',
            'search': true,
            prop: 'key',
            rules: [{
                required: true,
                message: '请输入模型标识',
                trigger: 'blur'
            }]
        },
        {
            label: '流程类别',
            prop: 'category',
            type: 'select',
            dicUrl: baseUrl+'/common/dict/infoByType?type=work_flow_type',
            rules: [{
                required: true,
                message: '请选择是否锁定',
                trigger: 'blur'
            }],
            search: true
        },
        {
            label: '版本',
            prop: 'version',
            editDisplay: false,
            addDisplay: false,
        },
        {
            label: '模版描述',
            prop: 'desc',
            hide:true,
            type:'textarea',
            editDisplay: true,
            addDisplay: true,
            rules: [{
                required: true,
                message: '请输入模版描述',
                trigger: 'blur'
            }]
        },
        {
            label: '创建时间',
            prop: 'createTime',
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            editDisplay: false,
            addDisplay: false,
        },
        {
            label: '最后更新时间',
            prop: 'lastUpdateTime',
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            editDisplay: false,
            addDisplay: false,
        }
    ]
}