import { STORAGE_KEY } from './mutations'
// import createLogger from '../../../src/plugins/logger'

export const plugins = store => {
  store.subscribe((mutation, { menu }) => {
    console.log('in')
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(menu))
  })
}

// export default process.env.NODE_ENV !== 'production'
//   ? [createLogger(), localStoragePlugin]
//   : [localStoragePlugin]
