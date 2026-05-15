# 🖥️ Suporte TI — Cetec Palmas
### Sistema de Gestão de Equipamentos

Sistema web para solicitação e gestão de equipamentos de TI, desenvolvido para uso interno da **Cetec Palmas**. Permite que colaboradores solicitem equipamentos através de um formulário online, enquanto o técnico de TI gerencia os pedidos por uma interface dedicada.

---

## ✨ Funcionalidades

### 👤 Portal do Colaborador (`index.html`)
- Formulário em 3 etapas com validação em tempo real
- Seleção de equipamentos: Notebook/Computador, Projetor, Mouse, Teclado, Óculos de Realidade Aumentada, Fone de Ouvido e Outros
- Seleção de setor, tipo de atendimento e nível de urgência
- Limite de 5 itens por solicitação
- Geração automática de número de protocolo (`SOLI-YYYYMMDD-XXXX`)
- Envio de e-mail automático ao técnico de TI
- Confirmação de recebimento enviada ao solicitante
- Registro automático na planilha Google Sheets

### 🔧 Área do Técnico (`gestor.html`)
- Login com usuário e senha
- Dashboard com contadores por status (Pendente, Em Análise, Aprovado, Reprovado)
- Listagem de todas as solicitações com filtros e busca
- Modal de detalhes com todas as informações do pedido
- Resposta ao solicitante com atualização de status
- Notificação automática por e-mail ao solicitante após resposta

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 / CSS3 / JavaScript | Interface do sistema |
| [EmailJS](https://www.emailjs.com) | Envio de e-mails sem backend |
| Google Sheets | Banco de dados das solicitações |
| Google Apps Script | API REST para leitura e escrita na planilha |
| GitHub Pages | Hospedagem gratuita |

---

## 📁 Estrutura do Projeto

```
gest-o-de-equipamentos-cetec/
│
├── index.html       # Portal do colaborador (formulário de solicitação)
├── gestor.html      # Área do técnico (dashboard de gestão)
├── Code.gs          # Google Apps Script (API da planilha)
└── README.md        # Documentação do projeto
```

---

## ⚙️ Configuração e Instalação

### 1. Google Sheets
1. Crie uma planilha no [Google Sheets](https://sheets.google.com)
2. Renomeie a aba para `Solicitacoes`
3. Adicione os seguintes cabeçalhos na linha 1:

```
Número | Data | Nome | Email | Telefone | Setor | Tipo Atendimento | Equipamento | Quantidade | Especificação | Urgência | Justificativa | Status | Resposta | Data Resposta
```

### 2. Google Apps Script
1. Na planilha, acesse **Extensões → Apps Script**
2. Cole o conteúdo do arquivo `Code.gs`
3. Clique em **Implantar → Nova implantação**
   - Tipo: **App da Web**
   - Executar como: **Eu mesmo**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize as permissões e copie a **URL gerada**
5. Substitua a constante `API_URL` nos arquivos `index.html` e `gestor.html`

### 3. EmailJS
1. Crie uma conta gratuita em [emailjs.com](https://www.emailjs.com)
2. Conecte seu serviço de e-mail (**Email Services**) e anote o `Service ID`
3. Crie um template de e-mail (**Email Templates**) com as variáveis `{{name}}` e `{{message}}` e anote o `Template ID`
4. Copie sua **Public Key** em **Account → API Keys**
5. Substitua as constantes nos arquivos `index.html` e `gestor.html`:
   - `EMAILJS_KEY`
   - `EMAILJS_SVC`
   - `EMAILJS_TPL`

### 4. GitHub Pages
1. Suba os arquivos `index.html` e `gestor.html` no repositório
2. Acesse **Settings → Pages**
3. Selecione a branch `main` e pasta `/ (root)`
4. Salve e aguarde o deploy

---

## 🔗 Acesso

| Página | URL |
|---|---|
| Portal do Colaborador | `https://andressonmds1996.github.io/gest-o-de-equipamentos-cetec` |
| Área do Técnico | `https://andressonmds1996.github.io/gest-o-de-equipamentos-cetec/gestor.html` |

---

## 📊 Fluxo do Sistema

```
Colaborador preenche o formulário
        ↓
Protocolo gerado automaticamente
        ↓
Dados salvos no Google Sheets
        ↓
E-mail enviado ao Técnico de TI
E-mail de confirmação enviado ao Colaborador
        ↓
Técnico acessa a Área do Técnico
        ↓
Analisa o pedido e registra a resposta
        ↓
Status atualizado na planilha
E-mail com a decisão enviado ao Colaborador
```

---

## 🔒 Segurança

- A Área do Técnico é protegida por usuário e senha
- A API do Google Apps Script valida a senha em todas as operações de leitura e escrita
- Credenciais do EmailJS utilizadas apenas via chave pública (client-side seguro)
- Repositório público — não armazene senhas diretamente no código em produção

---

## 📅 SLA — Prazo de Resposta

| Prioridade | Prazo |
|---|---|
| 🔴 Alta | 1 dia útil |
| 🟡 Média | 3 dias úteis |
| 🟢 Baixa | 5 dias úteis |

---

## 👨‍💻 Desenvolvido por

**Andresson Mouzinho de Sousa**  
Suporte TI — Cetec Palmas  
Sistema desenvolvido com auxílio de IA — Claude (Anthropic)
