import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
 
function DetalhesUsuario() {
  // Obtém o parâmetro 'id' da URL usando useParams do react-router-dom
  const { id } = useParams()
  // Estado para controlar o carregamento dos dados
  const [carregando, setCarregando] = useState(true)
  // Estado para armazenar os dados do usuário
  const [usuario, setUsuario] = useState({})
  // useEffect para buscar os dados do usuário na API quando o componente é montado ou o 'id' muda
  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)      // Faz uma requisição GET para a API
      .then(resposta => resposta.json())            // Converte a resposta para JSON
      .then(dados => {
        if (dados.data) {                           // Verifica se os dados do usuário estão presentes
          setUsuario({
            id: dados.data.id,
            nome: dados.data.first_name,
            sobrenome: dados.data.last_name,
            email: dados.data.email,
            foto: dados.data.avatar
          });
        }
        setCarregando(false);                       // Define carregando como falso após a obtenção dos dados
      })
  }, [id])                                          // O useEffect é executado novamente se o 'id' mudar
 
  if (carregando) {
    return <h1>Carregando...</h1>                   // Renderiza um texto de carregamento enquanto os dados estão sendo buscados
  }
 
  if (usuario.nome !== undefined) {                 // Renderiza os detalhes do usuário se os dados foram obtidos com sucesso
    return <>
      <h1>{usuario.nome} {usuario.sobrenome}</h1>
      <img src={usuario.foto} alt={usuario.nome} />
      <p> {usuario.email}</p>
      <Link to="/APS-Dev_Mobile/usuarios">Voltar</Link>
    </>
  }
  // Renderiza uma mensagem de erro se o usuário não foi encontrado
  return <h1>Usuário não encontrado!</h1>
}
 
export default DetalhesUsuario