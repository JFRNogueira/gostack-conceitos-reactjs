import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

/**
 * Componentes
 * Propriedades: parâmetros dos componentes
 * Estado & Imutabilidade: 
 */

function App() {

  const [repositories, setRepositories] = useState([])
  /**
   * useState retorna um array com 2 posições
   * 1. Variável com o seu valor inicial
   * 2. Função para atualizar esse valor
   */

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);
  
  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: `Projeto ${Date.now()}`,
      url: "https://github.com/teste", 
      techs: ["node", "react", "react-native"], 
      likes: 0
    })
    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id)
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }

  async function handleLikeRepository(id) {
    const response = await api.post('repositories/' + id + "/like")
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          <button onClick={() => handleLikeRepository(repository.id)}>Likes: {repository.likes}</button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
