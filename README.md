# menu-cms — Mater Burguer

CMS (sistema de gerenciamento de conteúdo) do cardápio digital do restaurante Mater Burguer.
Permite à equipe administrar categorias, produtos e mesas e acompanhar comandas e pedidos.
Todos os dados vêm da API NestJS desenvolvida no primeiro bimestre (`menu-backend`).

## Funcionalidades

| Área | O que faz |
| --- | --- |
| Categorias | Listar, cadastrar, editar e excluir (nome, ícone, ordem de exibição e situação) |
| Produtos | Listar com imagem, categoria, preço em reais e indicadores de vegetariano e novidade; filtrar por categoria; cadastrar, editar e excluir |
| Mesas | Listar, cadastrar, editar e excluir |
| Comandas | Listar as comandas abertas (mesa, abertura, total acumulado) e abrir o detalhe com os pedidos |
| Pedidos | Ver itens (produto, quantidade, preço unitário, subtotal) e total; alterar o status (Novo, Em preparo, Pronto, Entregue) |
| Kanban (bônus) | Uma coluna por status; arrastar um cartão grava o novo status na API |

Todas as telas de leitura tratam carregamento, erro e lista vazia, e toda gravação mostra um toast de sucesso ou erro.

## Stack

Vite · React · Tailwind CSS · shadcn/ui · Axios · TanStack Query (a mesma do `menu-frontend`).

## Como executar

Pré-requisito: o backend (`menu-backend`) rodando, por padrão em `http://localhost:3000`.

```bash
npm install
cp .env.example .env   # no Windows: copy .env.example .env
npm run dev
```

O CMS abre em `http://localhost:5174` (porta fixa para não conflitar com o `menu-frontend`, que usa a 5173).

### Variáveis de ambiente

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `VITE_API_URL` | URL base da API NestJS | `http://localhost:3000` |

## Organização do código

Segue a mesma estrutura do `menu-frontend`: cada entidade tem sua pasta em `src/cases`.

```
src/
├── cases/                 # um módulo por entidade da API
│   ├── categories/
│   │   ├── dtos/          # tipos dos dados da API
│   │   ├── services/      # chamadas HTTP (usam a instância do Axios)
│   │   ├── hooks/         # useQuery / useMutation
│   │   └── components/    # tabela e formulário da entidade
│   ├── products/
│   ├── spots/
│   ├── guest-checks/
│   └── orders/            # inclui o Kanban em components/kanban
├── components/
│   ├── ui/                # componentes do shadcn/ui
│   ├── layout/            # menu lateral e cabeçalho das páginas
│   ├── feedback/          # estados de carregamento, erro, vazio e confirmação
│   └── form/              # pequenos componentes reutilizados nos formulários e tabelas
├── lib/
│   ├── axios.ts           # instância única do Axios (baseURL = VITE_API_URL)
│   ├── query-client.ts    # configuração do TanStack Query
│   ├── api-error.ts       # extrai a mensagem de erro da API
│   └── format.ts          # moeda e datas em pt-BR
└── pages/                 # uma página por rota
```

O fluxo de dados é sempre **página → hook → service → Axios → API**:

- leituras usam `useQuery`;
- gravações (cadastro, edição, exclusão e troca de status) usam `useMutation` e, no sucesso,
  chamam `invalidateQueries` para a tela mostrar o dado atualizado.

## Decisões técnicas

- **Atualização otimista na troca de status.** O hook `useUpdateOrderStatus` altera o cache do
  TanStack Query antes da resposta da API (`onMutate`). Assim o cartão do Kanban fica na nova
  coluna na hora. Se a API recusar, o valor anterior é restaurado (`onError`). No fim, os pedidos são
  sempre recarregados do banco (`onSettled`), então ao recarregar a página cada pedido aparece na
  coluna do status gravado.
- **Filtro de produtos na URL** (`/products?category=<id>`). O filtro sobrevive a um F5 e
  cada categoria tem seu próprio cache, porque o id faz parte da `queryKey`.
- **Formulário montado só com o diálogo aberto.** O estado do formulário reinicia sozinho a cada
  abertura, sem precisar de `useEffect` para limpar campos.
- **Mensagens de erro da API.** As exclusões bloqueadas por vínculo (por exemplo, uma categoria com
  produtos) devolvem 409 com uma mensagem clara, que aparece no toast.

## Dependências fora da stack obrigatória

| Pacote | Por que foi adicionado |
| --- | --- |
| `@dnd-kit/core` | Arrastar e soltar dos cartões no Kanban de pedidos (bônus). É a biblioteca citada no enunciado. |
| `sonner` | Toasts de sucesso e erro. É o componente de toast oficial do shadcn/ui (`npx shadcn add sonner`). |
| `next-themes` | Instalada automaticamente pelo shadcn junto com o `sonner`, que a usa para ler o tema claro ou escuro. |
| `react-router-dom` | Navegação entre as áreas do CMS (já usada no `menu-frontend`). |
| `lucide-react` | Ícones (biblioteca padrão do shadcn/ui, já usada no `menu-frontend`). |

## Alterações feitas no backend

O CMS precisou de algumas rotas e campos que a API ainda não tinha (repositório `menu-backend`):

- `GET /guest-checks?status=OPENED`: lista as comandas com a mesa, a quantidade de pedidos e o total acumulado;
- `GET /orders?guestCheck=<id>&status=<status>`: pedidos com mesa e itens;
- `OrderStatus` passou a usar `DELIVERED`, e as transições de status ficaram livres;
- `isVegetarian`, `isNew` (produto) e `displayOrder`, `icon` (categoria) foram aceitos nos DTOs;
- `GET /products?category=<id>` filtra de fato por categoria;
- exclusões com registros vinculados devolvem 409 com mensagem explicativa.
