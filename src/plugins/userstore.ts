import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


function setUserToken (token: string): void {
  Storage.set({
    key: 'user_token',
    value: JSON.stringify({token})
  });
}

function getUserToken (): Promise<string> {
  return new Promise((resolve) => {
    Storage.get({ key: 'user_token' })
      .then((ret) => JSON.parse(ret.value || ''))
      .then((ret) => { console.log(ret); return ret })
      .then((ret) => {
        if (ret.token) {
          return ret.token.token
        } else {
          return ''
        }
      })
      .then(resolve)
      .catch((err) => {
        console.log(err)
        resolve('')
      })
  })
}


export { setUserToken, getUserToken }