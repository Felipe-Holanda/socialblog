import { Api } from "./api.js";
import { formtData } from "./metodos.js";

class Article{

    static criarArticle(){
        let article = document.createElement('article')
        let divFigure = document.createElement('div')
            let figure = document.createElement('figure')
                let img = document.createElement('img')
                let h3Mobile = document.createElement('h3')
                h3Mobile.classList.add('ifMobile')
                let navWeb = document.createElement('nav')
                navWeb.classList.add('ifWeb')
                    let btnEditweb = document.createElement('button')
                    btnEditweb.id = 'editBtn'
                    let btnDelweb = document.createElement('button')
                    btnDelweb.id = 'deleteBtn'
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
                btnEditmobile.id = 'editBtn'
                let btnDelmobile = document.createElement('button')
                btnDelmobile.id = 'deleteBtn'
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

    static preencherArticle(arr){
        const idLogado = localStorage.getItem('@BlogM2:userId')
        let {avatarUrl,id,username} = arr.user
        let article = Article.criarArticle()
        let [divfigure,content] = article.children
        let [img,nomeMobile,botoesWeb] = divfigure.children[0].children
        img.src = avatarUrl
        img.alt = 'Imagem de perfil do usuário'
        nomeMobile.innerText = username
        botoesWeb.id = id
        let [nomeWeb,post,botoesMobile,data] = content.children
        nomeWeb.innerText = username
        post.id = arr.id
        post.innerText = arr.content
        botoesMobile.id = id
        if(arr.updatedAt==null){
            data.innerText = formtData.strDate(new Date(arr.createdAt))
        }
        else{
            data.innerText = arr.updatedAt
        }
        if(idLogado != id){
            botoesWeb.classList.add('close')
            botoesMobile.classList.add('close')
        }
        else{
            botoesWeb.classList.remove('close')
            botoesMobile.classList.remove('close')
        }
    
        return article
    }

    static async publicarArticle(){
        const local = document.querySelector('main')
        let response = await Api.displayPost()
        let array = response.data
        array.forEach(element => {
            local.appendChild(Article.preencherArticle(element))
        });
    }
    
}

class DashboardPage{

    static 
}

Article.publicarArticle()