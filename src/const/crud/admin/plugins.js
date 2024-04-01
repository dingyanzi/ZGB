import { baseUrl } from '@/config/env';
export const tableOption = {
  searchShow:false,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: true,
  showClomnuBtn: false,
  searchSize: 'mini',
  column: [{
    label: '插件名称',
    prop: 'pluginsName',
    'search': true,
    rules: [{
      required: true,
      message: '请输入插件名称',
      trigger: 'blur'
    }]
  },
   {
          label: '插件id',
          prop: 'pluginsId',
          'search': true,
          rules: [{
              required: true,
              message: '请输入插件id',
              trigger: 'blur'
          }]
    },
    {
    label: '系统默认',
    prop: 'isSystem',
    type: 'select',
    dicUrl: baseUrl+'/common//dict/infoByType?type=is_flag',
    rules: [{
      required: true,
      message: '请选择系统默认',
      trigger: 'blur'
    }],
    search: true
  }
  , {
      label: '是否启用',
      prop: 'isFlag',
      type:'select',
      dicUrl: baseUrl+'/common//dict/infoByType?type=is_flag',
      rules: [{
        required: true,
        message: '请选择是否启用',
        trigger: 'blur'
      }],
     'search': true,
    },
  {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    addDisplay: false,
    editDisabled: true,
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }]
}

export const tablePluginsItemOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  showClomnuBtn: false,
  searchSize: 'mini',
  column: [ {
    width: 150,
    label: 'key',
    prop: 'pluginsKey',
    rules: [{
      required: true,
      message: '请输入key',
      trigger: 'blur'
    }]
  }, {
    label: 'value',
    prop: 'pluginsValue',
    rules: [{
      required: true,
      message: '请输入值',
      trigger: 'blur'
    }]
  }, {
    label: '描述',
    prop: 'description',
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }]
}
