// ═══════════════════════════════════════════════
//  SUPORTE TI — CETEC PALMAS
//  API Google Apps Script — Gestão de Equipamentos
// ═══════════════════════════════════════════════

const SHEET_NAME = 'Solicitacoes';
const SENHA_GESTOR = 'Ljspqk@2020'; // ← Altere para sua senha

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'nova';

    if (action === 'nova') {
      return salvarSolicitacao(data);
    }
    if (action === 'atualizar') {
      return atualizarStatus(data);
    }

    return resposta({ ok: false, erro: 'Ação desconhecida' });
  } catch (err) {
    return resposta({ ok: false, erro: err.message });
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action || '';
    const senha  = e.parameter.senha  || '';

    if (action === 'listar') {
      if (senha !== SENHA_GESTOR) return resposta({ ok: false, erro: 'Senha incorreta' });
      return listarSolicitacoes();
    }

    return resposta({ ok: true, msg: 'API Suporte TI Cetec Palmas online ✓' });
  } catch (err) {
    return resposta({ ok: false, erro: err.message });
  }
}

// ── Salva nova solicitação ──
function salvarSolicitacao(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  sheet.appendRow([
    data.numero,
    data.data,
    data.nome,
    data.email,
    data.telefone    || '—',
    data.setor,
    data.atendimento,
    data.equipamento,
    data.quantidade,
    data.especificacao || '—',
    data.urgencia,
    data.tempo_uso   || '—',
    data.justificativa,
    'Pendente',  // Status inicial
    '',          // Resposta
    ''           // Data Resposta
  ]);
  return resposta({ ok: true, numero: data.numero });
}

// ── Atualiza status de uma solicitação ──
function atualizarStatus(data) {
  const senha = data.senha || '';
  if (senha !== SENHA_GESTOR) return resposta({ ok: false, erro: 'Senha incorreta' });

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows  = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.numero) {
      sheet.getRange(i + 1, 13).setValue(data.status);
      sheet.getRange(i + 1, 14).setValue(data.resposta || '');
      sheet.getRange(i + 1, 15).setValue(new Date().toLocaleString('pt-BR'));
      return resposta({ ok: true, numero: data.numero, status: data.status });
    }
  }
  return resposta({ ok: false, erro: 'Solicitação não encontrada' });
}

// ── Lista todas as solicitações ──
function listarSolicitacoes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows  = sheet.getDataRange().getValues();
  const headers = rows[0];
  const result  = [];

  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    headers.forEach((h, j) => obj[h] = rows[i][j]);
    result.push(obj);
  }

  return resposta({ ok: true, dados: result });
}

// ── Helper de resposta JSON ──
function resposta(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
