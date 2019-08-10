export default {
  _user: '',
  set user (data) {
    this._user = data
    localStorage.setItem('user', data)
  },
  get user () {
    return this._user || localStorage.getItem('username')
  }
}
