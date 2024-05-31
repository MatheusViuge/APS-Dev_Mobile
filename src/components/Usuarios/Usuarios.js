import React, { useState, useEffect } from 'react'

import Usuario from '../Usuario/Usuario'

function Usuarios() {

// Estado para armazenar a lista de usuários
  const [usuarios, setUsuarios] = useState([])

// useEffect para buscar a lista de usuários na API quando o componente é montado
  useEffect(() => {
    fetch('https://reqres.in/api/users')  // Faz uma requisição GET para a API
      .then(resposta => resposta.json())  // Converte a resposta para JSON
      .then(dados => {
        // Mapeia os dados recebidos para o formato desejado
        const usuarios = dados.data.map(usuario => {
          return {
            id: usuario.id,
            nome: usuario.first_name,
            sobrenome: usuario.last_name,
            email: usuario.email
          }
        })
        // Atualiza o estado com a lista de usuários formatada
        setUsuarios(usuarios)

      })
  }, [])  // O useEffect é executado apenas uma vez quando o componente é montado


// Função para remover um usuário da lista
  const removerUsuario = usuario => {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      // Envia uma requisição DELETE para a API para remover o usuário
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: 'DELETE'
      })
        .then(resposta => {
          if (resposta.ok) {
            // Atualiza o estado para remover o usuário da lista local
            setUsuarios(usuarios.filter(x => x.id !== usuario.id))
          }
        })
    }
  }

  return (
    <>
      {usuarios.map(usuario => (
        <Usuario key={usuario.id}
          usuario={usuario}
          removerUsuario={() => removerUsuario(usuario)}
        />
      ))}
    </>
  )

}

export default Usuarios