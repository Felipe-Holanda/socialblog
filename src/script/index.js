import { Api } from "./api.js";

class IndexPage{
    static renderLoginPage(){
        const token = localStorage.getItem('@BlogM2:token')

        if(token){
            window.location.assign('src/pages/dashboard.html')
        }

        const emailInput = document.getElementById('email')
        const passwordInput = document.getElementById('password')
        const btnLogin = document.getElementById('btnLogin')

        btnLogin.addEventListener('click',(event) => {
            event.preventDefault()

            const data = {
                email: emailInput.value,
                password: passwordInput.value
            }

            Api.login(data)
        })
    }
    static createNewUser(){
        const nameInput = document.getElementById('usernameInput')
        const emailInput = document.getElementById('emailInput')
        const pictureInput = document.getElementById('profilePictureInput')
        const passInput = document.getElementById('passwordInput')
        const btnSignup = document.getElementById('btnSignup')

        btnSignup.addEventListener('click', async (event) => {
            event.preventDefault()

            const data = {
                username: nameInput.value,
                email: emailInput.value,
                avatarUrl: pictureInput.value,
                password: passInput.value
            }

            await Api.createUser(data)
        })
    }
}

IndexPage.renderLoginPage()
IndexPage.createNewUser()
