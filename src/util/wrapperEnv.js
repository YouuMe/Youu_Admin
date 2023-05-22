/*
 * @Author: Youu
 * @Date: 2023-05-22 11:15:17
 * @LastEditTime: 2023-05-22 11:17:11
 * @LastEditors: Youu
 * @Description: 配置项
 * @FilePath: \Youu_Admin\src\util\wrapperEnv.js
 * Copyright (c) 2023 by Youu_Admin, All Rights Reserved. 
 */

export function wrapperEnv(envOptions) {
    if (!envOptions) return {}
    const rst = {}

    for (const key in envOptions) {
        let val = envOptions[key]
        if (['true', 'false'].includes(val)) {
            val = val === 'true'
        }
        if (['VITE_PORT'].includes(key)) {
            val = +val
        }
        if (key === 'VITE_PROXY' && val) {
            try {
                val = JSON.parse(val.replace(/'/g, '"'))
            } catch (error) {
                val = ''
            }
        }
        rst[key] = val
        if (typeof key === 'string') {
            process.env[key] = val
        } else if (typeof key === 'object') {
            process.env[key] = JSON.stringify(val)
        }
    }
    return rst
}
