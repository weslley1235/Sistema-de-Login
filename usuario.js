import fs from 'node:fs'

const caminho = './usuario.json'

export function listaUsuarios(){
    const dados = fs.readFileSync(caminho, 'utf8')

    return JSON.parse(dados)
}

export function salvarUsu(usuarios){
    fs.writeFileSync(caminho,JSON.stringify(usuarios,null,2))
}

export function cadastrarUsuario(usuario){
    const usuarios = listaUsuarios()

    usuarios.push(usuario)

    salvarUsu(usuarios)
}

export function buscarUsu(email){
    const usuarios = listaUsuarios()

    return usuarios.find(usuario => usuario.email == email)
}