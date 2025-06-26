# Migração do Supabase para ProjectSend

Este guia te ajudará a configurar e migrar do Supabase para o ProjectSend.

## 📋 Pré-requisitos

1. **Servidor com ProjectSend instalado**
   - Servidor web (Apache/Nginx)
   - PHP 7.4+ com extensões necessárias
   - MySQL/MariaDB
   - HTTPS configurado (recomendado)

2. **ProjectSend configurado**
   - Instalação completa do ProjectSend
   - API habilitada
   - Usuários e grupos criados

## 🔧 Configuração do ProjectSend

### 1. Instalar ProjectSend

```bash
# Download da versão mais recente
wget https://github.com/projectsend/projectsend/releases/latest/download/projectsend.zip

# Extrair para o diretório web
unzip projectsend.zip -d /var/www/html/projectsend

# Configurar permissões
chmod -R 755 /var/www/html/projectsend
chown -R www-data:www-data /var/www/html/projectsend
```

### 2. Configurar Base de Dados

1. Crie um banco de dados MySQL:
```sql
CREATE DATABASE projectsend;
CREATE USER 'projectsend_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON projectsend.* TO 'projectsend_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Acesse `https://seu-dominio.com/projectsend/install` e siga o assistente de instalação.

### 3. Habilitar API

1. Acesse o painel administrativo do ProjectSend
2. Vá em **System Options** > **API**
3. Marque "Enable API"
4. Configure as permissões de API conforme necessário
5. Gere uma API Key para a aplicação

### 4. Configurar Categorias/Grupos

1. No painel admin, vá em **Groups**
2. Crie grupos correspondentes às suas categorias de documentos:
   - Contratos
   - Relatórios
   - Manuais
   - Certificados
   - etc.

## ⚙️ Configuração da Aplicação

### 1. Atualizar Configurações

Edite o arquivo `src/config/projectsend.js` e configure:

```javascript
const PROJECTSEND_URL = 'https://seu-dominio.com/projectsend';
const PROJECTSEND_API_KEY = 'sua-api-key-aqui';
```

### 2. Criar Usuários

No ProjectSend, crie usuários correspondentes aos usuários que tinham acesso via Supabase:

1. Acesse **Clients** > **Add client**
2. Preencha os dados do usuário
3. Defina grupos/categorias que o usuário pode acessar
4. Configure permissões específicas

### 3. Organizar Arquivos

Organize seus arquivos em categorias no ProjectSend:

1. Faça upload dos arquivos via interface web do ProjectSend
2. Ou use a API para migração automática
3. Atribua arquivos aos grupos corretos
4. Configure permissões de acesso

## 🔑 Configuração de Autenticação

### Diferenças do Supabase para ProjectSend:

| Aspecto | Supabase | ProjectSend |
|---------|----------|-------------|
| Autenticação | Email/Senha | Username/Senha |
| Usuários | Auth users | Clients |
| Armazenamento | Buckets | Groups/Categories |
| Permissões | RLS policies | Group permissions |

### Tipos de Usuário no ProjectSend:

1. **Admin**: Acesso total ao sistema
2. **Client**: Acesso limitado aos arquivos permitidos
3. **User**: Usuário interno com permissões específicas

## 📁 Estrutura de Arquivos

### Mapeamento de Buckets para Grupos:

```
Supabase Buckets → ProjectSend Groups
├── documentos-rh → Grupo "RH"
├── contratos → Grupo "Contratos"
├── relatorios → Grupo "Relatórios"
└── manuais → Grupo "Manuais"
```

## 🚀 Migração de Dados

### Script de Migração Exemplo:

```javascript
// Exemplo de migração de arquivos do Supabase para ProjectSend
async function migrateFiles() {
    // 1. Listar arquivos do Supabase
    const supabaseBuckets = await supabase.storage.listBuckets();
    
    for (const bucket of supabaseBuckets) {
        const files = await supabase.storage.from(bucket.name).list();
        
        for (const file of files) {
            // 2. Download do Supabase
            const { data } = await supabase.storage
                .from(bucket.name)
                .download(file.name);
            
            // 3. Upload para ProjectSend
            await projectSend.uploadFile(
                data, 
                file.name, 
                bucket.name // categoria
            );
        }
    }
}
```

## 🔒 Configurações de Segurança

### 1. HTTPS Obrigatório
Configure seu servidor para forçar HTTPS:

```apache
# Apache .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 2. Configurações PHP
No `php.ini`:

```ini
upload_max_filesize = 100M
post_max_size = 100M
max_execution_time = 300
memory_limit = 256M
```

### 3. Permissões de Arquivo
```bash
# Diretório de uploads
chmod 755 /var/www/html/projectsend/upload
chown www-data:www-data /var/www/html/projectsend/upload

# Arquivos de configuração
chmod 644 /var/www/html/projectsend/includes/sys.config.php
```

## 🧪 Testes

### 1. Testar API
```javascript
// No console do navegador
await window.debugStorage.listBuckets();
await window.debugStorage.listFiles('nome-da-categoria');
```

### 2. Testar Upload
Use o componente de upload integrado na aplicação.

### 3. Testar Download
Clique nos arquivos listados para verificar se o download funciona.

## 🔧 Troubleshooting

### Problemas Comuns:

1. **Erro 403 - Forbidden**
   - Verificar permissões de arquivo
   - Verificar configuração do servidor web
   - Verificar API key

2. **Upload falha**
   - Verificar limites de upload PHP
   - Verificar espaço em disco
   - Verificar permissões de diretório

3. **Erro de CORS**
   - Configurar headers CORS no servidor
   - Verificar configurações de segurança

4. **Autenticação falha**
   - Verificar credenciais de usuário
   - Verificar se API está habilitada
   - Verificar status do usuário (ativo/inativo)

## 📞 Suporte

Para mais informações:
- [Documentação ProjectSend](https://www.projectsend.org/documentation/)
- [GitHub ProjectSend](https://github.com/projectsend/projectsend)
- [Fórum da Comunidade](https://www.projectsend.org/support/)

## ✅ Checklist de Migração

- [ ] ProjectSend instalado e configurado
- [ ] Base de dados criada e configurada
- [ ] API habilitada e key gerada
- [ ] Grupos/categorias criados
- [ ] Usuários migrados
- [ ] Arquivos migrados
- [ ] Aplicação configurada (`projectsend.js`)
- [ ] Testes de login realizados
- [ ] Testes de upload realizados
- [ ] Testes de download realizados
- [ ] SSL/HTTPS configurado
- [ ] Backup realizado

## 🔄 Rollback

Se precisar voltar para o Supabase:

1. Altere as importações nos arquivos:
   ```javascript
   // De:
   import { ... } from '../../config/projectsend.js';
   // Para:
   import { ... } from '../../config/supabase.js';
   ```

2. O arquivo `supabase.js` original foi preservado para fallback.
