# Transval Intranet

Site corporativo da Transval Transportes LTDA com sistema de autenticação e gestão de documentos.

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, Tailwind CSS, JavaScript ES6+
- **Backend**: Supabase (BaaS)
- **Mapas**: Leaflet.js
- **Ícones**: Font Awesome 5.15.4
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage

## 📁 Estrutura do Projeto

```
transval_intranet/
├── index.html              # Página principal (pública)
├── pages/                  # Páginas protegidas
│   ├── dashboard.html      # Dashboard (área logada)
│   └── documents.html      # Gestão de documentos (área logada)
├── Assets/                 # Recursos estáticos
│   ├── background_Image.jpg # Imagem de fundo principal
│   ├── banner.svg          # Banner decorativo
│   ├── logo-branca-transval.png # Logo da empresa
│   ├── GMP+.png           # Certificação GMP+
│   ├── Sassmaq.png        # Certificação Sassmaq
│   ├── lgpd.pdf           # Documento LGPD
│   └── clients/           # Logos dos clientes
└── src/
    ├── config/
    │   └── supabase.js    # Configuração do Supabase
    └── scripts/
        ├── main.js        # Script principal
        ├── auth.js        # Sistema de autenticação
        ├── login.js       # Modal e lógica de login
        ├── contact.js     # Formulário de contato
        ├── presentation.js # Timeline e apresentação
        ├── clients.js     # Carrossel de clientes
        ├── branch-map.js  # Mapa de filiais
        └── documents.js   # Gestão de documentos
```

## 🎨 Design System

### Padrão de Classes CSS

O projeto utiliza **100% Tailwind CSS** para estilização, garantindo:

- **Consistência visual** em todas as páginas
- **Responsividade** completa (mobile-first)
- **Acessibilidade** aprimorada
- **Performance otimizada**
- **Manutenibilidade** superior

### Cores Principais

- **Azul Principal**: `#1e3a8a` (blue-900)
- **Azul Secundário**: `#01a1ef` (custom blue)
- **Laranja CTA**: `#f97316` (orange-500)
- **Vermelho CTA**: `#dc2626` (red-600)
- **Cinza Texto**: `#374151` (gray-700)

### Componentes Padronizados

#### Botões
```html
<!-- Botão Principal -->
<button class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300">
  Texto do Botão
</button>

<!-- Botão Sistema -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
  Sistema
</button>
```

#### Cards
```html
<div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  <!-- Conteúdo do card -->
</div>
```

#### Formulários
```html
<input class="w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200">
```

## 🔐 Sistema de Autenticação

### Páginas Públicas
- `index.html` - Landing page com informações da empresa

### Páginas Protegidas
- `pages/dashboard.html` - Dashboard principal pós-login
- `pages/documents.html` - Gestão de documentos corporativos

### Fluxo de Autenticação
1. Usuário clica em "Entrar" no header
2. Modal de login é exibido (`login.js`)
3. Credenciais são validadas via Supabase Auth
4. Redirecionamento automático para dashboard
5. Verificação de autenticação em páginas protegidas (`auth.js`)

## 📊 Funcionalidades

### Página Principal (index.html)
- ✅ Hero section responsivo com CTA
- ✅ Timeline interativa da empresa
- ✅ Mapa de cobertura nacional (Leaflet.js)
- ✅ Carrossel de clientes
- ✅ Formulário de contato
- ✅ Botões de sistemas externos
- ✅ Certificações e métricas
- ✅ SEO otimizado com JSON-LD

### Dashboard (pages/dashboard.html)
- ✅ Cards de navegação
- ✅ Acesso rápido a sistemas
- ✅ Informações corporativas
- ✅ Logout seguro

### Documentos (pages/documents.html)
- ✅ Navegação por buckets do Supabase Storage
- ✅ Download de arquivos
- ✅ Interface responsiva
- ✅ Controle de acesso

## 🚀 Otimizações de Performance

### Core Web Vitals
- **LCP**: Preload da imagem de fundo principal
- **FID**: Scripts carregados de forma não-bloqueante
- **CLS**: Header fixo sem layout shifts

### Técnicas Aplicadas
- Preconnect para CDNs externos
- DNS prefetch para recursos
- Lazy loading para imagens não críticas
- CSS crítico inline para header
- Minificação automática do Tailwind

## 📱 Responsividade

### Breakpoints Tailwind
- **Mobile**: < 640px (`sm:`)
- **Tablet**: 640px - 768px (`md:`)
- **Desktop**: 768px - 1024px (`lg:`)
- **Large**: 1024px - 1280px (`xl:`)
- **XL**: > 1280px (`2xl:`)

### Componentes Adaptativos
- Header com menu hambúrguer no mobile
- Timeline em carrossel no mobile, linha horizontal no desktop
- Cards em grid responsivo
- Formulários com layout flexível

## ♿ Acessibilidade

### Recursos Implementados
- **ARIA Labels**: Todos os elementos interativos
- **Foco Visível**: Outline laranja consistente
- **Contraste**: WCAG AA compliant
- **Navegação por Teclado**: Totalmente funcional
- **Screen Readers**: Texto alternativo em imagens
- **Semântica HTML**: Tags apropriadas

### Classes de Acessibilidade
```html
<!-- Screen Reader Only -->
<span class="sr-only">Texto para leitores de tela</span>

<!-- Foco Visível -->
<button class="focus:outline-none focus:ring-2 focus:ring-orange-500">
  Botão Acessível
</button>
```

## 🔧 Configuração do Ambiente

### 1. Clonagem do Repositório
```bash
git clone https://github.com/username/transval_intranet.git
cd transval_intranet
```

### 2. Configuração do Supabase
1. Criar projeto no [Supabase](https://supabase.com)
2. Configurar `src/config/supabase.js`:
```javascript
const supabaseUrl = 'SUA_URL_SUPABASE'
const supabaseKey = 'SUA_CHAVE_PUBLICA_SUPABASE'
```

### 3. Configuração de Storage
1. Criar buckets no Supabase Storage
2. Configurar políticas de acesso (RLS)
3. Upload de documentos

### 4. Servidor Local
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando Live Server (VS Code)
# Instalar extensão Live Server
```

## 🌐 Deploy

### Opções Recomendadas
- **Vercel**: Deploy automático via Git
- **Netlify**: CI/CD integrado
- **GitHub Pages**: Para projetos públicos
- **Servidor próprio**: Apache/Nginx

### Configurações de Deploy
```html
<!-- Atualizar URLs em produção -->
<meta property="og:url" content="https://seudominio.com.br">
<link rel="canonical" href="https://seudominio.com.br">
```

## 📝 Scripts Principais

### main.js
Coordena inicialização de todos os módulos:
```javascript
import { initBranchMap } from './branch-map.js';
import { generateClientCards } from './clients.js';
import { initPresentation } from './presentation.js';
import { initContact } from './contact.js';
```

### auth.js
Gerencia autenticação e proteção de rotas:
- Verificação de login
- Redirecionamento automático
- Logout seguro

### clients.js (renomeado)
Gera carrossel de logos dos clientes:
- Animação marquee CSS
- Logos responsivos
- Duplicação automática para loop infinito

### branch-map.js (renomeado)
Mapa interativo de filiais:
- Integração com Leaflet.js
- Filtros por região/estado
- Markers clusterizados
- Popups informativos

## 🔍 SEO

### Meta Tags Implementadas
- Title e Description otimizados
- Open Graph para redes sociais
- Twitter Cards
- JSON-LD para dados estruturados
- Canonical URLs
- Meta tags geográficas

### Estrutura de Dados
```json
{
  "@type": "Organization",
  "name": "Transval Transportes LTDA",
  "description": "Empresa especializada em transporte e logística...",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [...]
  }
}
```

## 🧪 Testes

### Ferramentas Recomendadas
- **Lighthouse**: Performance e acessibilidade
- **WAVE**: Validação de acessibilidade
- **Validator.nu**: Validação HTML
- **GTmetrix**: Performance geral

### Checklist de Qualidade
- [ ] Performance Score > 90
- [ ] Accessibility Score > 95
- [ ] SEO Score > 95
- [ ] Validação HTML sem erros
- [ ] Responsive em todos dispositivos

## 📞 Contato e Suporte

**Transval Transportes LTDA**
- **Endereço**: Rua Luiz Wolff, 7 – Rinópolis/SP
- **Telefone**: (18) 3583-1016
- **Site**: https://transval.com.br

---

*Desenvolvido com ❤️ para Transval Transportes LTDA*
