Arquitetura recomendada
Estrutura completa
src/app
│
├── core/
│ ├── guards/
│ ├── interceptors/
│ ├── services/
│ ├── models/
│ └── utils/
│
├── layouts/
│ ├── public-layout/
│ └── dashboard-layout/
│
├── pages/
│ │
│ ├── public/
│ │ ├── home/
│ │ ├── login/
│ │ └── register/
│ │
│ └── dashboard/
│ ├── agendamentos/
│ ├── oficinas/
│ ├── relatorios/
│ └── perfil/
│
├── shared/
│ ├── components/
│ ├── ui/
│ ├── directives/
│ └── pipes/
│
├── features/
│ ├── marketing/
│ ├── oficinas/
│ ├── agendamentos/
│ └── auth/
│
└── app.routes.ts
Separação estratégica

1. pages/public

Área institucional.

Responsável por:

marketing
SEO
captação
credenciamento
apresentação 2. pages/dashboard

Área operacional.

Responsável por:

CRUD
relatórios
agendamentos
gestão 3. shared

Tudo reutilizável.

Exemplo:

button
card
modal
input
table
badge
loading 4. features

Separação por domínio de negócio.

Muito importante conforme o projeto crescer.

Estrutura da HOME

Sua home não deve ser:

uma página

Ela deve ser:

uma landing page profissional
Estrutura ideal da Home
Home
│
├── Hero
├── Benefícios
├── Serviços
├── Como Funciona
├── Oficinas Parceiras
├── Depoimentos
├── Credenciamento
├── FAQ
└── CTA Final
Organização Angular da Home
pages/public/home/
│
├── home.component.ts
│
├── sections/
│ ├── hero/
│ ├── benefits/
│ ├── services/
│ ├── workshops/
│ ├── testimonials/
│ ├── faq/
│ └── cta/
Fluxo visual ideal
HERO

Objetivo:

impacto
posicionamento premium
Deve ter:
título forte
CTA
imagem premium
gradiente azul
BENEFÍCIOS

Objetivo:

convencimento
Cards:
segurança
agilidade
oficinas verificadas
histórico
suporte
SERVIÇOS

Objetivo:

explicar claramente
Mostrar:
revisão
suspensão
elétrica
alinhamento
troca de óleo
OFICINAS

Objetivo:

prova social
Cards:
imagem
nome
bairro
especialidade
CREDENCIAMENTO

Objetivo:

captação
CTAs:
Quero ser associado
Quero credenciar minha oficina
Paleta de cores aplicada corretamente
Variáveis globais
styles.css
:root {
--navy: #0A2647;
--gold: #D4AF37;
--white: #FFFFFF;
--charcoal: #1A1A1A;
--sky: #87CEEB;

--bg: #F5F7FA;
--text: #1A1A1A;
}
Estratégia visual
Cor Uso
Navy header, hero, títulos
Gold CTA, destaque
White cards
Charcoal textos
Sky detalhes tecnológicos
Tailwind recomendado
Hero
bg-gradient-to-r from-[#0A2647] to-[#173B73]
Botão principal
bg-[#D4AF37]
hover:bg-yellow-500
text-[#0A2647]
font-semibold
rounded-xl
Cards
bg-white rounded-2xl shadow-md
hover:shadow-xl transition-all
Layouts
PublicLayout

Responsável por:

Header
Footer
páginas públicas
DashboardLayout

Responsável por:

Sidebar
Navbar interna
Router outlet privado
Estrutura futura do dashboard
DashboardLayout
│
├── Sidebar
├── Topbar
├── RouterOutlet
└── Notifications
Componentização recomendada
NÃO FAÇA
welcome-card.component

gigante com tudo dentro.

FAÇA

Componentes pequenos e especializados.

Exemplo:

hero-section
services-grid
workshop-card
testimonial-card
cta-banner
Resultado final esperado

Você terá:

Área pública

Visual premium estilo:

concessionária
plataforma SaaS
tecnologia automotiva
Área interna

Visual:

administrativo
produtivo
rápido
organizado
Melhor decisão futura

Quando o sistema crescer:

mobile app
APIs
multi oficinas
multi tenants
planos
pagamentos

essa arquitetura vai suportar sem refatoração pesada.
