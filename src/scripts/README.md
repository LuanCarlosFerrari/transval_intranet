# Estrutura de Scripts - Transval Intranet

Esta é a nova estrutura organizacional dos scripts JavaScript/ES6 do projeto, separados por função específica para melhor manutenibilidade e organização.

## 📁 Estrutura de Pastas

### `/src/scripts/core/`
**Scripts principais e de inicialização**
- `main.js` - Script principal que inicializa todos os módulos da aplicação

### `/src/scripts/auth/`
**Scripts relacionados à autenticação**
- `auth.js` - Gerenciamento de autenticação para páginas protegidas
- `login.js` - Modal e funcionalidades de login

### `/src/scripts/ui/`
**Scripts de interface do usuário**
- `clients.js` - Carrossel e exibição de clientes
- `contact.js` - Formulário e funcionalidades de contato
- `presentation.js` - Timeline e apresentação da empresa

### `/src/scripts/features/`
**Scripts de funcionalidades específicas**
- `branch-map.js` - Mapa interativo de filiais com filtros
- `documents.js` - Sistema de gerenciamento de documentos

### `/src/scripts/utils/`
**Scripts utilitários**
- `accessibility.js` - Funções de acessibilidade

## 🔄 Importações

### Páginas que usam os scripts:

#### `index.html`
```html
<script type="module" src="src/scripts/core/main.js?v=5"></script>
```

#### `pages/dashboard.html`
```html
<script type="module" src="../src/scripts/auth/auth.js"></script>
```

#### `pages/documents.html`
```html
<script type="module" src="../src/scripts/auth/auth.js"></script>
<script type="module" src="../src/scripts/features/documents.js"></script>
```

## 📝 Notas

- Todos os scripts usam ES6 modules (`import/export`)
- Os caminhos relativos foram atualizados para refletir a nova estrutura
- A estrutura facilita a manutenção e identificação da função de cada script
- Scripts estão organizados por responsabilidade única
