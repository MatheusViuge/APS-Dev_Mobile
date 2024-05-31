import React, { useState } from 'react'

import './AdicionarUsuario.css'

function AdicionarUsuario() {

// Estados para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')

// Função para lidar com o envio do formulário
  const onSubmitHandler = event => {
    event.preventDefault()    // Previne o comportamento padrão do formulário de recarregar a página

// Cria um objeto usuário com os valores dos campos
    const usuario = { nome, sobrenome, email }

// Envia uma requisição POST para a API para adicionar um novo usuário
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })
      .then(resposta => {
        if(resposta.ok){  
          console.log(resposta) // Log da resposta da API no console
          setNome('') // Reseta o campo nome
          setSobrenome('')  // Reseta o campo sobrenome
          setEmail('')  // Reseta o campo email
          alert('Usuário cadastrado com sucesso!')  // Alerta de sucesso
        }
      })
  }


  return (
    <div className="AdicionarUsuario">
      <h2>Adicionar Usuário</h2>
      <form onSubmit={onSubmitHandler}> {/* Associa a função de envio ao evento onSubmit do formulário*/}
        <div className="Linha">
          <div className="Coluna">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={event => setNome(event.target.value)}
              required>
            </input>
          </div>
          <div className="Coluna">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={sobrenome}
              onChange={event => setSobrenome(event.target.value)}
              required>
            </input>
          </div>
        </div>
        <div className="Linha">
          <div className="Coluna">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required>
            </input>
          </div>
        </div>
        <button type="submit">
          Adicionar
        </button>
      </form>
    </div>
  )
}

export default AdicionarUsuario