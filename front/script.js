function gerarCaptcha() {

  return Math.floor(1000 + Math.random() * 9000);

}

                          //////////////////// FAZER LOGIN///////////////////////

async function fazerLogin() {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const captcha = gerarCaptcha();
  const respostaCaptcha = prompt(
    "Digite o código abaixo:\n\n" + captcha
  );

  if (respostaCaptcha != captcha) {
    alert("Código incorreto!");
    return;

  }

  const resposta = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,

    }),
  });

  const resultado = await resposta.json();
  document.getElementById("mensagem").innerText = resultado.mensagem;

  if (resposta.ok) {
    alert("Login realizado com sucesso!");
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    
    window.location.href = "pg_inicial.html";

  }

}

                          //////////////////// FAZER CADASTRO///////////////////////

async function fazerCadastro() {

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;


  const captcha = gerarCaptcha();
  const respostaCaptcha = prompt(
    "Digite o código abaixo:\n\n" + captcha
  );

  if (respostaCaptcha != captcha) {
    alert("Código incorreto!");
    return;

  }

  const resposta = await fetch("/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      nome,
      email,
      senha,

    }),

  });

  const resultado = await resposta.json();
  document.getElementById("mensagem").innerText = resultado.mensagem;

  if (resposta.ok) {
    alert("Cadastro finalizado!");

  document.getElementById("nome").value = "";
  document.getElementById("emailCadastro").value = "";
  document.getElementById("senhaCadastro").value = "";

  }

}