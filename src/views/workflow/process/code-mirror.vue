<template>
    <textarea ref="textarea"></textarea>
</template>

<script type="text/ecmascript-6">
    // 引入全局实例
    import _CodeMirror from 'codemirror'

    // 核心样式
    import 'codemirror/lib/codemirror.css'
    // 引入主题后还需要在 options 中指定主题才会生效
    import 'codemirror/theme/cobalt.css'
    // import 'codemirror/theme/eclipse.css'


    // 需要引入具体的语法高亮库才会有对应的语法高亮效果
    // codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
    // 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/css/css.js'
    import 'codemirror/mode/xml/xml.js'
    import 'codemirror/mode/clike/clike.js'
    import 'codemirror/mode/markdown/markdown.js'
    import 'codemirror/mode/python/python.js'
    import 'codemirror/mode/r/r.js'
    import 'codemirror/mode/shell/shell.js'
    import 'codemirror/mode/sql/sql.js'
    import 'codemirror/mode/swift/swift.js'
    import 'codemirror/mode/vue/vue.js'

    // 尝试获取全局实例
    const CodeMirror = window.CodeMirror || _CodeMirror

    export default {
        name: 'in-coder',
        props: {
            mode: {
                type: String,
                default: 'text/xml'
            },
            height:{
                type:String,
                default: '550'
            }
        },
        data () {
            return {
                // 内部真实的内容
                code: '',
                // 编辑器实例
                coder: null,
                // 默认配置
                options: {
                    mode: this.mode,
                    smartIndent: false,
                    // 缩进格式
                    tabSize: 0,
                    // 主题，对应主题库 JS 需要提前引入
                    theme: 'cobalt',
                    // 显示行号
                    lineNumbers: true,
                    line: true,
                    showCursorWhenSelecting:true
                },
            }
        },
        mounted () {
            // 初始化
            this._initialize()
        },
        methods: {
            // 初始化
            _initialize () {
                // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
                this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
                this.coder.setSize('100%',this.height)
                this.coder.refresh()
                // 编辑器赋值
                this.coder.setValue(this.value || this.code)
                // 支持双向绑定
                this.coder.on('change', (coder) => {
                    this.code = coder.getValue()
                    if (this.$emit) {
                        this.$emit('input', this.code)
                    }
                })
            }
        }
    }
</script>

