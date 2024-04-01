import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export function selectActivityNotice(query) {
    return request({
        url: baseUrl + '/ctProjectPlan/selectActivityNotice',
        method: 'get',
        params: query
    })
}

export function exportActivityNote(a,b,c) {
    return request({
        url: baseUrl + '/ctProjectPlan/applyxport?serverDate='+a+"&queryOrgan="+b+"&queryUserId="+c,
        method: 'get'
    })
}

