import React from 'react'

import './Usuario.css'
import { Link } from 'react-router-dom'

function Usuario(props) {
  return (
    <div className="Usuario">
      <ul>
        <li><strong>ID:</strong> {props.usuario.id}</li>
        <li><strong>Nome:</strong> {props.usuario.nome} {props.usuario.sobrenome}</li>
        <li><strong>Email:</strong> {props.usuario.email}</li>
        <li><Link to={`/APS-Dev_Mobile/usuarios/${props.usuario.id}`}>Detalhes</Link></li>
        <li><Link to={`/APS-Dev_Mobile/usuarios/${props.usuario.id}/edit`}>Editar</Link></li>
      </ul>
      <button onClick={props.removerUsuario}>&times;</button>
    </div>
  )
}

export default Usuario