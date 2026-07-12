# Vitrine Digital

Um site moderno e minimalista para vender seus produtos com integração WhatsApp.

## 🎨 Características

- ✨ Design minimalista estilo Apple
- 📸 Carrossel de imagens para cada produto
- 🛒 Carrinho de compras funcional
- 💬 Integração com WhatsApp para pedidos
- 💰 Preços em Real Brasileiro (R$)
- 📱 Totalmente responsivo
- 🎯 Painel Admin para gerenciar produtos

## 🚀 Como Começar

### Pré-requisitos
- Node.js 16+ instalado

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/ricardorosenberg/vitrine-digital.git
cd vitrine-digital
```

2. Instale as dependências
```bash
npm install
```

3. Configure seu número de WhatsApp
   - Abra o arquivo `src/components/Cart.jsx`
   - Procure por `SEUCELULARAQUI` (linha ~13)
   - Substitua por seu número no formato: `55` + DDD + Número
   - Exemplo: `5511987654321`

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Estrutura do Projeto

```
vitrine-digital/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho com carrinho
│   │   ├── ProductCard.jsx     # Card do produto com carrossel
│   │   ├── ProductGrid.jsx     # Grid de produtos
│   │   ├── Cart.jsx            # Página do carrinho e WhatsApp
│   │   └── Admin/
│   │       ├── AdminHeader.jsx      # Header do painel admin
│   │       ├── AdminDashboard.jsx   # Dashboard de gerenciamento
│   │       └── ProductForm.jsx      # Formulário de produtos
│   ├── context/
│   │   ├── CartContext.jsx     # Gerenciamento de estado do carrinho
│   │   └── AdminContext.jsx    # Gerenciamento de estado do admin
│   ├── hooks/
│   │   └── useProducts.js      # Hook para gerenciar produtos
│   ├── data/
│   │   └── products.js         # Dados dos produtos
│   ├── utils/
│   │   └── whatsapp.js         # Geração de mensagens WhatsApp
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛍️ Adicionando Produtos

### Via Painel Admin (Recomendado)

1. Clique no botão **"Painel"** (canto superior direito)
2. Clique em **"Novo Produto"**
3. Preencha:
   - Nome do Produto
   - Descrição
   - Preço (R$)
   - URLs das fotos (pode adicionar múltiplas)
4. Clique em **"Adicionar Produto"**

### Editar/Deletar Produtos

1. Clique em **"Painel"**
2. Cada produto tem botões para:
   - 📝 **Editar** - Modifica o produto
   - 🗑️ **Deletar** - Remove o produto

## 📸 Hospedando Imagens

Você pode usar:
- **Cloudinary**: cloudinary.com (gratuito)
- **Imgur**: imgur.com (simples)
- **Google Drive**: Upload → Compartilhar → Copiar link
- **OneDrive/Dropbox**: Links públicos

## 🚀 Deploy

### Vercel (Recomendado)
1. Push seu código para GitHub
2. Vá para [vercel.com](https://vercel.com)
3. Clique "New Project" e selecione seu repositório
4. Deploy automático!

### Netlify
1. Faça build do projeto
```bash
npm run build
```
2. Vá para [netlify.com](https://netlify.com)
3. Arraste a pasta `dist` para upload

## 💾 Como os Dados são Salvos

Os produtos são salvos no **localStorage** do navegador:
- ✅ Persistem quando você recarrega a página
- ✅ Não precisa de banco de dados
- ✅ Funciona totalmente offline
- ⚠️ Salvos apenas no navegador/dispositivo

## 📱 Configuração do WhatsApp

1. Abra `src/components/Cart.jsx`
2. Procure por `SEUCELULARAQUI` (linha ~13)
3. Substitua pelo seu número:
   - Formato: `55` (código Brasil) + DDD + Número
   - Exemplo: `5511987654321`

## 🎯 Próximas Melhorias

- [ ] Autenticação do admin
- [ ] Dashboard com estatísticas
- [ ] Upload de imagens direto
- [ ] Histórico de pedidos
- [ ] Analytics de vendas
- [ ] Temas customizáveis
- [ ] Integração com pagamento

## 📄 Licença

MIT - Sinta-se livre para usar e modificar!

## 💬 Suporte

Precisa de ajuda? Abra uma issue no repositório!
