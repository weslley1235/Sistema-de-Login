import {fastify} from 'fastify'
import fastifyStatic from '@fastify/static'
import {registrar, login} from './autenticacao.js'

//////////////////// CRIANDO SERVIDOR //////////////////////

const server = fastify()

//////////////////// CONFIGURAÇÃO DO FASTIFY COM FRONT //////////////////////

server.register(fastifyStatic, {
     root: '/Users/weslley/Documents/Projetos/projeto_sistema_login/front'
})

///////////////// ROTA PARA CADASTRO ///////////////////

server.post('/cadastro', async (request, reply) =>{
    const { nome, email, senha} = request.body
    const resultado = await registrar(nome, email, senha)
    return reply.status(resultado.status).send({
        mensagem: resultado.mensagem,
    })
})

//////////////////// ROTA PARA LOGIN //////////////////////

server.post('/login', async ( request, reply) => {
    const {email, senha} = request.body
    const resultado = await login(email, senha)
    const {status, ...dados} = resultado
    return reply.status(status).send(dados)
})

//////////////////// INICIAR SERVIDOR //////////////////////

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
}).then(() => {
    console.log('Servidor rodando!')
})