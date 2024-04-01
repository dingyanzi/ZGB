import { baseUrl } from '@/config/env';
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  column: [
    {
      accept:['image/jpeg','image/jpg','image/png'],
      label: '头像',
      prop: 'avatar',
      type: 'upload',
      filesize:512000,
      span: 20,
      imgWidth: 40,
      tip: '只能上传jpg/jpg/png用户头像，且不超过500kb',
      imgFullscreen: true,
      listType: 'picture-img',
      action: baseUrl+'/os/file/upload?bucketName=image',
      canvasOption: {
        text: 'zhuxiang',
        ratio: 0.1,
        color:'red',
        fontSize:'30',
        bottom:'5',
        right:'5'
      },
      rules: [{
        required: true,
        message: '请选择头像',
        trigger: 'blur'
      }]
    },
    {
    width: 150,
    label: '用户姓名',
    prop: 'username',
    align: 'center',
    sortable: true,
    search: true,
    rules: [{
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }]
  }, {
    label: '用户账号',
    prop: 'useraccount',
    search: true,
    align: 'center',
    sortable: true,
    overHidden: true,
    width: 120,
    rules: [{
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }]
  },
    {
      label: '密码',
      prop: 'password',
      type:'password',
      align: 'center',
      rules: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }]
    }, {
      label: '手机号码',
      prop: 'phone',
      align: 'center',
      rules: [{
        required: true,
        message: '请输入手机号码',
        trigger: 'blur'
      }]
    },
    {
      label: '角色',
      prop: 'roleIdList',
      formslot: true,
      slot: true,
      overHidden: true,
      rules: [{
        required: true,
        message: '请选择角色',
        trigger: 'blur'
      }]
    },
    {
      label: '是否锁定',
      prop: 'lockFlag',
      type: 'radio',
      dicUrl: baseUrl+'/common//dict/infoByType?type=is_flag',
      rules: [{
        required: true,
        message: '请选择是否锁定',
        trigger: 'blur'
      }],
      search: true
    },
    {
      label: '修改时间',
      prop: 'updateTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: false,
      addDisplay: false,
      span: 24
    },
    {
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    editDisplay: false,
    addDisplay: false,
    span: 24
  }]
}
