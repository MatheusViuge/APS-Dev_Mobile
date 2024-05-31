import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './EditarUsuario.css';

// Definição do componente funcional EditarUsuario
function EditarUsuario() {

  // Obtém o parâmetro 'id' da URL usando useParams do react-router-dom
  const { id } = useParams();

  // Estados para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState({});

  // Função para lidar com o envio do formulário
  const onSubmitHandler = event => {
    event.preventDefault();  // Previne o comportamento padrão do formulário de recarregar a página

    // Atualiza o estado usuario com os valores dos campos
    setUsuario({
      nome,
      sobrenome,
      email
    });

    // Envia uma requisição PUT para a API para atualizar o usuário
    fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })
      .then(resposta => {
        if(resposta.ok){
          console.log(resposta);  // Log da resposta da API no console
          setNome('');  // Reseta o campo nome
          setSobrenome('');  // Reseta o campo sobrenome
          setEmail('');  // Reseta o campo email
          alert('Usuário atualizado com sucesso!');  // Alerta de sucesso
        }
      });
  };

  return (
    <div className="AdicionarUsuario">
      <h2>Editar Usuário</h2>
      <form onSubmit={onSubmitHandler}>  {/* Associa a função de envio ao evento onSubmit do formulário*/}
        <div className="Linha">
          <div className="Coluna">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={event => setNome(event.target.value)}  // Atualiza o estado nome quando o valor do input muda
              required>
            </input>
          </div>
          <div className="Coluna">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={sobrenome}
              onChange={event => setSobrenome(event.target.value)}  // Atualiza o estado sobrenome quando o valor do input muda
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
              onChange={event => setEmail(event.target.value)}  // Atualiza o estado email quando o valor do input muda
              required>
            </input>
          </div>
        </div>
        <button type="submit">
          Atualizar
        </button>
      </form>
    </div>
  );
}

// Exporta o componente para ser usado em outros lugares da aplicação
export default EditarUsuario;