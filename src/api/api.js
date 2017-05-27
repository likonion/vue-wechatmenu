import axios from 'axios'
export default {
  data: axios.get('/api/menu').then(function (resolve) {
    return resolve.data.data
  })
}
