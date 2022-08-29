export class Api {

  static baseUrl = 'https://blog-m2.herokuapp.com'
  static token = localStorage.getItem('@BlogM2:token') || ""
  static headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${this.token}`
  }

  static async login(body){

    const userLogin = await fetch(`${this.baseUrl}/users/login`,{
      method:'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('@BlogM2:token', res.token)
      localStorage.setItem('@BlogM2:userId', res.userId)
      window.location.assign('src/pages/dashboard.html')
      return res
    })
    .catch(err => console.log(err))

    return userLogin
  }

  static async createUser(body){
    const newUser = await fetch(`${this.baseUrl}/users/register`,{
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      window.location.assign('../../index.html')
      return res
    })
    .catch(err => console.log(err))

    return newUser
  }

  static async displayPost(){
    let endPoint = '/posts'
    let arrPost = await fetch(`${this.baseUrl}${endPoint}`,{
      method: 'GET',
      headers: this.headers
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return arrPost
  }

  static async displayUser(id){
    let endPoint = `/users/${id}`
    let user = await fetch(`${this.baseUrl}${endPoint}`,{
      method: 'GET',
      headers: this.headers
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return user
  }

  static async newPost(body){
    let endPoint = '/posts'
    let infoPost = await fetch(`${this.baseUrl}${endPoint}`,{
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      location.reload()
      return res
    })
    .catch(err => console.log(err))

    return infoPost
  }

  static async deletePost(id){
    let endPoint = `/posts/${id}`
    await fetch(`${this.baseUrl}${endPoint}`,{
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      location.reload()
      return res
    })
    .catch(err => console.log(err))
  }

  static async editPost(id,body){
    let endPoint = `/posts/${id}`
    let infoPost = await fetch(`${this.baseUrl}${endPoint}`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      location.reload()
      return res
    })
    .catch(err => console.log(err))

    return infoPost
  }

}