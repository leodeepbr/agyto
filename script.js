const BASE_URL = "https://script.google.com/macros/s/AKfycbzt0pM_uSdBowPEWngM3ffyjN8ubvvXRxVWXJi5BR34awOpND4jT5I2pcvWoXkK3M0/exec";

/**
 * Lista todos os eventos da planilha
 * @returns {Promise<Array>} array de eventos
 */
async function listarEventos() {
  const response = await fetch(`${BASE_URL}?action=listar`);
  const data = await response.json();
  if (data.success) {
    return data.eventos;
  } else {
    throw new Error(data.message || "Erro ao listar eventos");
  }
}

/**
 * Salva um novo evento na planilha
 * @param {Object} evento - objeto evento com campos data, tema, line, bebida, cervejas, pecas, obs
 * @returns {Promise<string>} ID do evento criado
 */
async function salvarEvento(evento) {
  const response = await fetch(`${BASE_URL}?action=salvar`, {
    method: "POST",
    body: JSON.stringify(evento),
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();
  if (data.success) {
    return data.id;
  } else {
    throw new Error(data.message || "Erro ao salvar evento");
  }
}

/**
 * Exclui um evento pelo ID
 * @param {string|number} id - ID do evento para excluir
 * @returns {Promise<boolean>} sucesso ou falha
 */
async function excluirEvento(id) {
  const response = await fetch(`${BASE_URL}?action=excluir&id=${id}`);
  const data = await response.json();
  if (data.success) {
    return true;
  } else {
    throw new Error(data.message || "Erro ao excluir evento");
  }
}

/**
 * Edita um evento existente pelo ID
 * @param {Object} evento - objeto evento com id e campos atualizados
 * @returns {Promise<boolean>} sucesso ou falha
 */
async function editarEvento(evento) {
  const response = await fetch(`${BASE_URL}?action=editar`, {
    method: "POST",
    body: JSON.stringify(evento),
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();
  if (data.success) {
    return true;
  } else {
    throw new Error(data.message || "Erro ao editar evento");
  }
}
