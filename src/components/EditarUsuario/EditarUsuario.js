import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import './EditarUsuario.css'

function EditarUsuario() {

  const { id } = useParams()

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
	const [usuario, setUsuario] = useState({})


  const onSubmitHandler = event => {
    event.preventDefault()
    setUsuario({
      nome,
      sobrenome,
      email
    })

    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })
      .then(resposta => {
        if(resposta.ok){
          console.log(resposta)
          setNome('')
          setSobrenome('')
          setEmail('')
          alert('Usuário cadastrado com sucesso!')
        }
      })
  }


  return (
    <div className="AdicionarUsuario">
        <h2>Editar Usuário</h2>
      <form onSubmit={onSubmitHandler}>
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

export default EditarUsuario