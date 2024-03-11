import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
 
function DetalhesUsuario() {
 
  const { id } = useParams()
 
  const [carregando, setCarregando] = useState(true)
 
  const [usuario, setUsuario] = useState({})
 
  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then(resposta => resposta.json())
      .then(dados => {
        if (dados.data) {
          setUsuario({
            id: dados.data.id,
            nome: dados.data.first_name,
            sobrenome: dados.data.last_name,
            email: dados.data.email,
            foto: dados.data.avatar
          });
        }
        setCarregando(false);
      })
  }, [id])
 
  if (carregando) {
    return <h1>Carregando...</h1>
  }
 
  if (usuario.nome !== undefined) {
    return <>
      <h1>{usuario.nome} {usuario.sobrenome}</h1>
      <img src={usuario.foto} alt={usuario.nome} />
      <p> {usuario.email}</p>
      <Link to="/usuarios">Voltar</Link>
    </>
  }
 
  return <h1>Usuário não encontrado!</h1>
}
 
export default DetalhesUsuario