# Transval Intranet

Site corporativo da Transval Transportes LTDA com sistema de autenticação e gestão de documentos.

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, Tailwind CSS, JavaScript ES6+
- **Backend**: Supabase (BaaS)
- **Mapas**: Leaflet.js com Clustering
- **Ícones**: Font Awesome 5.15.4
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage
- **Performance**: Preload, DNS Prefetch, Lazy Loading
- **SEO**: JSON-LD, Open Graph, Twitter Cards

## 📁 Estrutura do Projeto

```
transval_intranet/
├── index.html              # Página principal (pública)
├── README.md              # Documentação do projeto
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
│   └── clients/           # Logos dos clientes (25 empresas)
└── src/
    ├── config/
    │   └── supabase.js    # Configuração do Supabase
    └── scripts/
        ├── core/
        │   └── main.js    # Coordenador principal dos módulos
        ├── auth/
        │   ├── auth.js    # Sistema de autenticação
        │   └── login.js   # Modal e lógica de login
        ├── features/
        │   ├── branch-map.js  # Mapa interativo de filiais
        │   └── documents.js   # Gestão de documentos
        ├── ui/
        │   ├── clients.js     # Carrossel de clientes
        │   ├── contact.js     # Formulário de contato
        │   └── presentation.js # Timeline e apresentação
        └── utils/
            └── accessibility.js # Utilitários de acessibilidade
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
- ✅ Hero section responsivo com CTA otimizado
- ✅ Timeline interativa da empresa (6 marcos históricos)
- ✅ Mapa de cobertura nacional com filtros (12 estados, 200+ rotas)
- ✅ Carrossel infinito de clientes (25 empresas)
- ✅ Formulário de contato integrado
- ✅ Botões de acesso a sistemas externos (3 sistemas)
- ✅ Seção de certificações padronizada (GMP+, Sassmaq)
- ✅ Indicadores de performance (200+ caminhões, 10k+ veículos)
- ✅ SEO completo com JSON-LD estruturado
- ✅ Acessibilidade WCAG AA compliant
- ✅ Performance otimizada (Core Web Vitals)

### Dashboard (pages/dashboard.html)
- ✅ 13 cards de navegação organizados por categoria
- ✅ Acesso direto a formulários da plataforma Weeke
- ✅ Interface responsiva e intuitiva
- ✅ Sistema de logout seguro
- ✅ Links para sistemas corporativos

### Documentos (pages/documents.html)
- ✅ Navegação por buckets do Supabase Storage
- ✅ Download seguro de arquivos
- ✅ Interface de browser de arquivos responsiva
- ✅ Modal para visualização de pastas
- ✅ Controle de acesso baseado em autenticação
- ✅ Suporte a múltiplos tipos de arquivo

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
- Header com menu hambúrguer no mobile e navegação horizontal no desktop
- Timeline em carrossel touch-friendly no mobile, linha horizontal no desktop
- Cards em grid responsivo (1 col mobile → 4 cols desktop)
- Mapa com controles adaptativos e filtros responsivos
- Formulários com layout flexível e validação em tempo real
- Certificações com cards padronizados (256px × 192px)
- Botões de navegação otimizados para touch e mouse

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

### core/main.js
Coordena inicialização de todos os módulos:
```javascript
import { initFiliaisMap } from '../features/branch-map.js';
import { generateClientCards } from '../ui/clients.js';
import { initPresentation } from '../ui/presentation.js';
import { initContact } from '../ui/contact.js';
import '../auth/login.js';
```

### auth/auth.js
Gerencia autenticação e proteção de rotas:
- Verificação de status de login
- Redirecionamento automático para páginas protegidas
- Logout seguro com limpeza de sessão

### auth/login.js
Modal de login e autenticação:
- Interface modal responsiva
- Validação de formulário em tempo real
- Integração com Supabase Auth
- Tratamento de erros e feedbacks

### ui/clients.js
Carrossel infinito de logos dos clientes:
- Animação marquee CSS pura (60s de duração)
- 25 logos de clientes principais
- Duplicação automática para loop contínuo
- Cards responsivos com hover effects

### features/branch-map.js
Mapa interativo de filiais com Leaflet.js:
- 200+ pontos de cobertura em 12 estados
- Filtros por região, estado e unidade
- Clustering de markers para performance
- Popups informativos com coordenadas
- Controles adaptativos mobile/desktop

### ui/presentation.js
Timeline da empresa e apresentação corporativa:
- 6 marcos históricos (1987-Hoje)
- Carrossel mobile com navegação touch
- Timeline horizontal no desktop
- Seção "Nossos Princípios" com 7 valores
- Animações CSS customizadas

### ui/contact.js
Formulário de contato integrado:
- Validação em tempo real
- Máscaras para telefone/celular
- Integração com EmailJS
- Feedback visual de envio
- Acessibilidade completa

### features/documents.js
Sistema de gestão de documentos:
- Integração com Supabase Storage
- Browser de arquivos por buckets
- Download seguro via signed URLs
- Modal para visualização de pastas
- Suporte a múltiplos tipos de arquivo

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
- [x] Performance Score > 90 (Lighthouse)
- [x] Accessibility Score > 95 (WCAG AA)
- [x] SEO Score > 95 (JSON-LD implementado)
- [x] Validação HTML sem erros
- [x] Responsive em todos dispositivos
- [x] Core Web Vitals otimizados
- [x] Progressive Enhancement aplicado
- [x] Cross-browser compatibility testado

## 📞 Contato e Suporte

**Transval Transportes LTDA**
- **Endereço**: Rua Luiz Wolff, 7 – Rinópolis/SP
- **CEP**: 17920-000
- **Telefone**: (18) 3583-1016
- **WhatsApp**: (18) 99710-5537
- **Site**: https://transval.com.br

### Redes Sociais
- **Facebook**: [Transval Transportes](https://www.facebook.com/p/Transval-Transp-Valmir-100022314004814/)
- **Instagram**: [@transvaltransp](https://www.instagram.com/transvaltransp/)
- **LinkedIn**: [Transval Transportadora Valmir LTDA](https://www.linkedin.com/company/transval-transportadora-valmir-ltda/)

### Sistemas Corporativos
- **Validação CF**: Sistema de validação de Conhecimento de Frete
- **Validação CH**: Sistema de validação de Conhecimento de Transporte
- **SiteSat**: Sistema de rastreamento e monitoramento

---

**Última atualização**: Dezembro 2024  
*Desenvolvido com ❤️ para Transval Transportes LTDA*

## 🎯 Melhorias Recentes (Dezembro 2024)

### ✨ Funcionalidades Adicionadas
- **Certificações Padronizadas**: Cards de certificação com tamanho fixo (256px × 192px)
- **Timeline Aprimorada**: 6 marcos históricos com ícones e animações
- **Mapa Avançado**: Filtros por região/estado/unidade com clustering
- **Carrossel Otimizado**: 25 logos de clientes com animação infinita
- **Formulário Inteligente**: Máscaras e validação em tempo real

### 🛠️ Otimizações Técnicas
- **Estrutura Modular**: Reorganização em core/, auth/, features/, ui/, utils/
- **Performance**: Preload LCP, DNS prefetch, lazy loading implementados
- **Acessibilidade**: ARIA labels, focus management, screen reader support
- **SEO**: JSON-LD estruturado, Open Graph, Twitter Cards
- **Mobile-First**: Design responsivo com breakpoints otimizados

### 📊 Estatísticas do Sistema
- **Cobertura**: 12 estados brasileiros
- **Rotas**: 200+ rotas ativas
- **Clientes**: 25 empresas parceiras
- **Formulários**: 13 sistemas integrados via Weeke
- **Certificações**: 2 principais (GMP+, Sassmaq)
- **Colaboradores**: 600+ funcionários
- **Frota**: 200+ caminhões próprios
- **Veículos**: 10.000+ veículos gerenciados
