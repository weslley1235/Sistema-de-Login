import {fastify} from 'fastify'
import fastifyStatic from '@fastify/static'
import {registrar, login} from './autenticacao.js'

const server = fastify()

server.register(fastifyStatic, {
     root: '/Users/weslley/Documents/Projetos/projeto_sistema_login/front'
})

server.post('/cadastro', async (request, reply) =>{
    const { nome, email, senha} = request.body

    const resultado = await registrar(nome, email, senha)

    return reply.status(resultado.status).send({
        mensagem: resultado.mensagem,
    })
})

server.post('/login', async ( request, reply) => {
    const {email, senha} = request.body

    const resultado = await login(email, senha)

    const {status, ...dados} = resultado

    return reply.status(status).send(dados)
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
}).then(() => {
    console.log('Servidor rodando!')
})