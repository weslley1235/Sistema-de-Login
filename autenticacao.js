import bcrypt from 'bcrypt'
import {cadastrarUsuario, buscarUsu} from './usuario.js'

export async function registrar(nome,email,senha){
    if(!nome || !email || !senha){
        return{
            status: 400,
            mensagem: 'Email já está em uso!'
        }
    }

    const usuarioConfirmado = buscarUsu (email)

    if (usuarioConfirmado){
        return{
            status: 409,
            mensagem: 'Esse email já está cadastrado'
        }
    }

    const senhahash = await bcrypt.hash(senha,10)

    await cadastrarUsuario ({
        id: Date.now(),
        nome,
        email,
        senha: senhahash,
    })
    return {
        status: 201,
        mensagem:'Usuario cadastrado com sucesso!'
    }
}

export async function login(email, senha) {
    
    if(!email || !senha){
        return{
            status:400,
            mensagem: 'Preencha todos os campos!'
        }
    }
    const usuario = buscarUsu(email)

    if(!usuario){
        return {
            status: 401,
            mensagem: 'Email ou senha incorretos!'
        }
    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
    )

    if(!senhaCorreta){
        return{
            status:401,
            mensagem: 'Email ou senha incorretos!'
        }
    }

    return{
        status:200,
        mensagem: 'Login realizado com sucesso',
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        }
    }
}