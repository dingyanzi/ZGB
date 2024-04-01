import { baseUrl } from '@/config/env';
export const tableOption = {
  index: true,
  searchShow:false,
  border: true,
  align: 'center',
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  delBtn:false,
  headerAlign: 'center',
  props: {
    label: 'label',
    value: 'value'
  },
  column: [
    {
      label: '标题',
      prop: 'title'
    },
    {
    label: '日志状态',
    prop: 'type',
    type: 'select',
    dicUrl: baseUrl+'/common//dict/infoByType?type=log_type',
    search: true
  }, {
    label: 'IP地址',
    prop: 'remoteAddr'
  },
    {
      label: '请求URL',
      overHidden:true,
      prop: 'requestUri'
    },
    {
    label: '请求方式',
    prop: 'method'
  }, {
    label: '请求终端',
    overHidden:true,
    prop: 'userAgent'
  },
    {
      label: '操作人',
      prop: 'createBy',
      overHidden:true,
    },
    {
    width: 80,
    label: '请求时间',
    prop: 'time'
  }, {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  },
    {
      hide:true,
      label: '异常信息',
      placeholder:' ',
      type:'textarea',
      overHidden:true,
      prop: 'exception'
    }
  ]
}
