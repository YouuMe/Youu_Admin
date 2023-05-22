/*
 * @Author: Youu
 * @Date: 2023-05-22 11:27:59
 * @LastEditTime: 2023-05-22 11:27:59
 * @LastEditors: Youu
 * @Description: 代理服务器设置
 * @FilePath: \Youu_Admin\src\util\proxy.js
 * Copyright (c) 2023 by Youu_Admin, All Rights Reserved. 
 */
const httpsReg = /^https:\/\//

export function createProxy(list = []) {
    const rst = {}
    for (const [prefix, target] of list) {
        const isHttps = httpsReg.test(target)

        // https://github.com/http-party/node-http-proxy#options
        rst[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            // https is require secure=false
            ...(isHttps ? { secure: false } : {}),
        }
    }
    return rst
}
