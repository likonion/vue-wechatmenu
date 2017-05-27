export const getMenus = function (commit) {
  return this.$http.get('/api/menu').then((response) => {
    if (response.statusText === 'OK') {
      commit('MENU_LIST', response.body.data)
    }
  }).catch((error) => {
    console.log(error)
  })
}
