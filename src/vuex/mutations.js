export const STORAGE_KEY = 'menu'
export const state = {
  menu: []
}
export const mutations = {
  getData (state, {data}){
    state.menu = data
  },
  showChild (state, {index1}) {
    state.menu.openSide = true
    state.menu.level.splice(0, 2, index1, null)
    state.menu.item.forEach((item, index) => {
      item.showChild = index === index1
    })
  },
  childClick (state, {index1, index2}) {
    state.menu.openSide = true
    state.menu.level.splice(1, 1, index2)
    state.menu.item[index1].childItem.forEach((item, index) => {
      item.active = index === index2
    })
  },
  addFirstItem (state) {
    let newItem = {'name': '请输入', 'showChild': false, 'type': state.menu.item.length, 'childItem': []}
    state.menu.item.push(newItem)
  },
  addSecondItem (state) {
    let item = state.menu.item[state.menu.level[0]].childItem
    let newItem = {'name': '请输入', 'active': false}
    item.push(newItem)
  },
  dellMenu (state) {
    state.menu.openSide = false
    let level = state.menu.level
    if (level[1] === null) {
      state.menu.item.splice(level[0], 1)
    } else {
      state.menu.item[level[0]].childItem.splice(level[1], 1)
    }
  }
}
