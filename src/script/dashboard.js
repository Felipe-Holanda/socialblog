import { Api } from "./api.js";
import { formtData } from "./metodos.js";

class Article {

    static criarArticle() {
        let article = document.createElement('article')
        let divFigure = document.createElement('div')
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        let h3Mobile = document.createElement('h3')
        h3Mobile.classList.add('ifMobile')
        let navWeb = document.createElement('nav')
        navWeb.classList.add('ifWeb')
        let btnEditweb = document.createElement('button')
        btnEditweb.classList.add('editBtn')
        let btnDelweb = document.createElement('button')
        btnDelweb.classList.add('deleteBtn')
        navWeb.appendChild(btnEditweb)
        navWeb.appendChild(btnDelweb)
        figure.appendChild(img)
        figure.appendChild(h3Mobile)
        figure.appendChild(navWeb)
        divFigure.appendChild(figure)
        let divContent = document.createElement('div')
        divContent.id = 'articleContent'
        let h3Web = document.createElement('h3')
        h3Web.classList.add('ifWeb')
        let p = document.createElement('p')
        let navMobile = document.createElement('nav')
        navMobile.classList.add('ifMobile')
        let btnEditmobile = document.createElement('button')
        btnEditmobile.classList.add('editBtn')
        let btnDelmobile = document.createElement('button')
        btnDelmobile.classList.add('deleteBtn')
        navMobile.appendChild(btnEditmobile)
        navMobile.appendChild(btnDelmobile)
        let small = document.createElement('small')
        divContent.appendChild(h3Web)
        divContent.appendChild(p)
        divContent.appendChild(navMobile)
        divContent.appendChild(small)
        article.appendChild(divFigure)
        article.appendChild(divContent)

        return article
    }

    static preencherArticle(arr) {
        const idLogado = localStorage.getItem('@BlogM2:userId')
        let { avatarUrl, id, username } = arr.user
        let article = Article.criarArticle()
        let [divfigure, content] = article.children
        let [img, nomeMobile, botoesWeb] = divfigure.children[0].children
        img.src = avatarUrl
        img.alt = 'Imagem de perfil do usuário'
        nomeMobile.innerText = username
        botoesWeb.id = id
        let [nomeWeb, post, botoesMobile, data] = content.children
        nomeWeb.innerText = username
        post.id = arr.id
        post.innerText = arr.content
        botoesMobile.id = id
        if (arr.updatedAt == null) {
            data.innerText = formtData.strDate(new Date(arr.createdAt))
        }
        else {
            data.innerText = arr.updatedAt
        }
        if (idLogado != id && window.outerWidth < 966) {
            botoesWeb.classList.add('close')
            botoesMobile.classList.add('close')
            botoesMobile.classList.remove('ifMobile')
        }
        if (idLogado != id) {
            botoesWeb.classList.add('close')
            botoesMobile.classList.add('close')
        }
        else {
            botoesWeb.classList.remove('close')
            botoesMobile.classList.remove('close')
        }

        return article
    }

    static async publicarArticle() {
        const local = document.querySelector('main')
        let response = await Api.displayPost()
        let array = response.data
        array.forEach(element => {
            local.appendChild(Article.preencherArticle(element))
        });
    }

}

class DashboardPage {

    static idLogado = localStorage.getItem('@BlogM2:userId')

    static async carregarInforusuario() {
        let profilePicture = document.getElementById('profilePicture')
        let username = document.getElementById('username')
        let response = await Api.displayUser(this.idLogado)
        profilePicture.src = response.avatarUrl
        username.innerText = response.username
    }

    static publicarPost() {
        const local = document.getElementById('btnPost')
        const localPost = document.getElementById('postText')
        local.addEventListener('click', async () => {
            const post = localPost.value
            const body = {
                'content': post
            }
            await Api.newPost(body)
            post.value = ""
        })
    }

    static deletePost() {
        document.body.addEventListener('click', (obj) => {
            if (obj.target.className === "deleteBtn") {
                const div = document.getElementById('articleContent').children
                const id = div[1].id
                let local = document.querySelector('.delete')
                local.classList.remove('close')
                local.addEventListener('click', async (obj) => {
                    if (obj.target.localName === "button") {
                        await Api.deletePost(id)
                    }
                })
            }
        })

    }

    static editPost() {
        document.body.addEventListener('click', (obj) => {
            if (obj.target.className === "editBtn") {
                const div = document.getElementById('articleContent').children
                const id = div[1].id
                let local = document.querySelector('.edit')
                local.classList.remove('close')
                local.addEventListener('click', async (obj) => {
                    if (obj.target.localName === "button") {
                        let input = document.getElementById('editarea')
                        let body = {
                            content: input.value
                        }
                        console.log(body)
                        await Api.editPost(id, body)
                        input.value = ""
                    }
                })
            }
        })
    }

    static irTopo() {
        document.getElementById('fabBtn').addEventListener('click', () => {
            location.reload()
            window.scroll(0)
        })
    }

    static logout() {
        document.getElementById('btnLogout').addEventListener('click', () => {
            localStorage.removeItem('@BlogM2:token')
            window.location.assign('../../index.html')
        })
    }
}

Article.publicarArticle()
DashboardPage.carregarInforusuario()
DashboardPage.publicarPost()
DashboardPage.deletePost()
DashboardPage.editPost()
DashboardPage.irTopo()
DashboardPage.logout()