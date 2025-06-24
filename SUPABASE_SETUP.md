# Configuração da Autenticação Supabase

Este projeto agora inclui autenticação através do Supabase. Siga os passos abaixo para configurar a autenticação.

## Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase

## Configuração

### 1. Obter as credenciais do Supabase

1. Acesse seu projeto no Supabase
2. Vá para **Settings** > **API**
3. Copie a **URL** do projeto
4. Copie a **anon/public key**

### 2. Configurar as credenciais

Edite o arquivo `src/config/supabase.js` e substitua:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL' // Ex: https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'
```

Por suas credenciais reais:

```javascript
const SUPABASE_URL = 'https://seuprojetoid.supabase.co'
const SUPABASE_ANON_KEY = 'sua_chave_anonima_aqui'
```

### 3. Configurar a autenticação no Supabase

1. No painel do Supabase, vá para **Authentication** > **Settings**
2. Configure as URLs permitidas em **Site URL**:
   - Para desenvolvimento local: `http://localhost:3000` ou `http://127.0.0.1:5500`
   - Para produção: sua URL de produção

### 4. Criar usuários

Você pode criar usuários de duas formas:

#### Via painel do Supabase:
1. Vá para **Authentication** > **Users**
2. Clique em **Add user**
3. Insira email e senha

#### Via código (opcional):
Se você quiser permitir registro de novos usuários, adicione uma função de registro.

## Funcionalidades Implementadas

### Sistema de Login
- Modal de login responsivo
- Validação de campos
- Feedback de erro personalizado
- Loading state durante autenticação

### Sistema de Autenticação
- Verificação automática de autenticação
- Redirecionamento baseado no status de autenticação
- Proteção de rotas (dashboard só acessível com login)
- Logout seguro

### Funcionalidades de Segurança
- Sessões automáticas do Supabase
- Tokens JWT para autenticação
- Listeners para mudanças no estado de autenticação

## Estrutura dos Arquivos

```
src/
├── config/
│   └── supabase.js          # Configuração e funções do Supabase
└── scripts/
    ├── login.js             # Sistema de login
    └── auth.js              # Proteção de rotas e logout
```

## Como Testar

1. **Configure as credenciais do Supabase** no arquivo `src/config/supabase.js`
2. **Crie um usuário no painel do Supabase**
3. **Abra `index.html` no navegador** (preferencialmente através de um servidor local)
4. **Abra o Console do Navegador** (F12) para ver os logs de debug
5. **Clique no botão "Login"**
6. **Insira as credenciais do usuário criado**
7. **Verifique se é redirecionado para o dashboard**
8. **Teste o logout no dashboard**

### Verificando se os Scripts Estão Carregando

Se abrir o Console do Navegador, você deve ver mensagens como:
- `"Login script carregado"`
- `"DOM carregado, iniciando sistema de login"`
- `"Modal de login criado"`
- `"✅ Supabase configurado com sucesso"` (somente se as credenciais estiverem configuradas)

### Scripts Incluídos Automaticamente

O projeto já inclui o Supabase via CDN nos arquivos HTML:
- `index.html`: Inclui `@supabase/supabase-js@2`
- `dashboard.html`: Inclui `@supabase/supabase-js@2`

## Solução de Problemas

### Erro de CORS
Se encontrar erros de CORS, verifique se a URL do seu site está configurada corretamente nas configurações do Supabase.

### Usuário não consegue fazer login
1. Verifique se o usuário existe no painel do Supabase
2. Confirme se o email foi verificado (se a verificação estiver habilitada)
3. Verifique as credenciais no arquivo de configuração

### Redirecionamento não funciona
Certifique-se de que os arquivos `index.html` e `dashboard.html` estão no mesmo diretório.

## Próximos Passos (Opcional)

- Implementar recuperação de senha
- Adicionar registro de novos usuários
- Implementar perfis de usuário
- Adicionar diferentes níveis de acesso
- Implementar autenticação via Google/GitHub
