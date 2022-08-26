export class Api {

  static baseUrl = 'https://blog-m2.herokuapp.com'
  static token = localStorage.getItem('@BlogM2:token') || ""
  static headers = {
    'Content-Type': 'application/json',
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

}