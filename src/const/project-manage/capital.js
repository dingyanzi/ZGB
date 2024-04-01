import { baseUrl } from "@/config/env";

export const option = {
    addBtn: false,
    delBtn: false,
    addRowBtn: false,
    editBtn: false,
    cellBtn: false,
    stripe: true,
    columnBtn: false,
    refreshBtn: false,
    menuWidth: 100,
    disabled: false,
    menu: true,
    column: [
        {
            label: "预算科目",
            prop: "subject",
            type: "select",
            props: {
                label: "label",
                value: "value"
            },
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_subject_cz',
            cell: true,
            width: 300,
        },
        {
            label: "预算内容",
            prop: "content",
            placeholder: "请输入费用具体说明",
            cell: true,
        },
        {
            label: "单价",
            prop: "price",
            cell: true,
        },
        {
            label: "数量",
            prop: "number",
            cell: true,
        },
        {
            label: "小计",
            prop: "subtotal",
            disabled: true,
            formatter: (row, value, label) => {
                let str = Number(row.price) * Number(row.number)
                return row.subtotal = str.toFixed(2)
            },
            cell: true,
        },
    ],
};
export const options = {
    addBtn: false,
    editBtn: false,
    delBtn: false,
    addRowBtn: false,
    cellBtn: false,
    stripe: true,
    columnBtn: false,
    refreshBtn: false,
    menuWidth: 100,
    disabled: false,
    menu: true,
    column: [
        {
            label: "预算科目",
            prop: "subject",
            type: "select",
            props: {
                label: "label",
                value: "value"
            },
            dicUrl: baseUrl + '/common/dict/infoByType?type=ct_subject_sh',
            cell: true,
            width: 300,
        },
        {
            label: "预算内容",
            prop: "content",
            placeholder: "请输入费用具体说明",
            cell: true,
        },
        {
            label: "单价",
            prop: "price",
            cell: true,
        },
        {
            label: "数量",
            prop: "number",
            cell: true,
        },
        {
            label: "小计",
            prop: "subtotal",
            disabled: true,
            formatter: (row, value, label, column) => {
                let str = Number(row.price) * Number(row.number)
                return row.subtotal = str.toFixed(2)
            },
            cell: true,
        },
    ],
};
