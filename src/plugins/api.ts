import * as config from '../../api.config.json'

import { getUserToken } from '../plugins/userstore'

async function call(path: string, body: Record<string, any>, method: string, includeUserToken: boolean): Promise<Record<string, any>> {
  const token = await getUserToken()
  return new Promise((resolve, reject) => {
    const protocol = config.secure ? 'https' : 'http'

    const mark = path.includes('?') ? '&' : '?'
    const tokenargs = includeUserToken ? `${mark}token=${token}` : ''

    const url = `${protocol}://${config.host}/${path}${tokenargs}`

    fetch(url, {
          method: method,
          body: method !=='GET' ? JSON.stringify(body) : undefined,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then((data) => {
          console.log(`<<< recieved data[${JSON.stringify(data)}]`)
          return data
        })
        .then(d => resolve(d))
        .catch(e => reject(e))
  })
}

export { call }