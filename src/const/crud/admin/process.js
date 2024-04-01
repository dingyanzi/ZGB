import { baseUrl } from '@/config/env';
export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 150,
    menuBtn: true,
    align: 'center',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    menuType: 'menu',
    searchShow: false,
    column: [{
        fixed: true,
        label: '流程ID',
        prop: 'processonDefinitionId'
    },
        {
            fixed: true,
            label: '模型标识',
            prop: 'key',
            search: true,
            editDisabled: true
        },
        {
            label: '模型名称',
            prop: 'name',
            search: true
        },
        {
            label: '流程类别',
            prop: 'category',
            type: 'radio',
            dicUrl: baseUrl+'/common/dict/infoByType?type=work_flow_type',
            rules: [{
                required: true,
                message: '请选择是否锁定',
                trigger: 'blur'
            }],
            search: true
        },
        {
            label: '状态',
            prop: 'suspend',
            slot: true,
            overHidden: true,
            rules: [{
                required: true,
                message: '请选择角色',
                trigger: 'blur'
            }]
        },
        {
            label: '版本号',
            prop: 'revision',
            editDisabled: true,
            addDisplay: false
        }, {
            label: '部署时间',
            prop: 'deploymentTime',
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'timestamp',
            editDisabled: true,
            addDisplay: false
        }]
}
