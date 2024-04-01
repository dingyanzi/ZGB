import { rule } from "@/util/validateRules";
export const tableOption = {
  searchShow:false,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  viewBtn: true,
  column: [{
    label: '角色名称',
    prop: 'roleName',
    search:true,
    span: 24,
    rules: [
      { required: true, message: '角色名称不能为空', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ]
  }, {
    width: 120,
    label: '角色标识',
    prop: 'roleCode',
    span: 24,
    editDisabled: true,
    rules: [
      { required: true, message: '角色标识不能为空', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
      { validator: rule.validatorKey, trigger: 'blur'}
    ]
  }, {
    width: 150,
    label: '角色描述',
    prop: 'roleDesc',
    overHidden: true,
    type: 'textarea',
    span: 24,
    row: true,
    minRows: 2,
    rules: [
      { max: 128, message: '长度在 128 个字符内', trigger: 'blur' }
    ]
  }, {
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
