async function fazerLogin() {

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const resposta = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            senha
        })
    })

    const resultado = await resposta.json()

    document.getElementById('mensagem').innerText = resultado.mensagem
}

async function fazerCadastro() {

    const nome = document.getElementById('nome').value
    const email = document.getElementById('emailCadastro').value
    const senha = document.getElementById('senhaCadastro').value

    const resposta = await fetch('/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            email,
            senha
        })
    })

    const resultado = await resposta.json()

    document.getElementById('mensagem').innerText = resultado.mensagem
}