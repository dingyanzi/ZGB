import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'
let p = '8%2Ce%2C10%2Cc%2C16%2C15%2C15%2C11%2C8%2Cd%2C12%2Ca%2C15%2C10%2Ce%2Cb'
var inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export const confidential = () => {
    let a = unescape(p), arr = a.split(',')
    arr = arr.map(item => {
        if (!isNaN(Number(item))) {
            item -= 8
        }
        return item
    })
    return arr.join('')
}