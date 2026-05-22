# To Do Nest

API REST em [NestJS](https://nestjs.com/) para gerenciar **usuários**, **listas de tarefas** (to-do lists) e **permissões** (RBAC com enum + decorator), com persistência em PostgreSQL, autenticação JWT e documentação Swagger em desenvolvimento.

A organização do código separa controllers finos, use cases com regra de negócio, repositories para acesso a dados e DTOs nas bordas da API.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | NestJS 11 |
| Linguagem | TypeScript |
| Banco | PostgreSQL 16 (TypeORM) |
| Auth | Passport + JWT (`@nestjs/jwt`) |
| Validação | `class-validator` / `class-transformer` |
| Docs | Swagger (`@nestjs/swagger`) |
| Senhas | bcrypt |

## Funcionalidades

- **Usuários**: cadastro público, consulta por ID, listagem paginada com filtros por nome e e-mail, atualização, exclusão permanente, soft delete e restauração de registros excluídos.
- **To-do lists**: CRUD vinculado a um usuário, com título, descrição, status `completed` e listagem paginada com busca.
- **Permissões (RBAC)**: perfis em `permissions` (nome + descrição), enum `Permission`, decorator `@RequirePermission` e assign por usuário.
- **Autenticação**: login com e-mail e senha; access token (1h) e refresh token (7d) em cookies HTTP-only; renovação via `POST /auth/refresh-token`.
- **Proteção global**: `JwtAuthGuard` e `PermissionsGuard` em toda a aplicação; `@Public()` sem JWT; `@RequirePermission` exige perfil com o mesmo `name` do enum (ou perfil `admin`).
- **Swagger**: disponível apenas quando `NODE_ENV=development`.

## Requisitos

- Node.js 18+
- npm
- Docker e Docker Compose

## Início rápido

```bash
cp .sample.env .env
docker compose up -d
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000` (porta configurável via `PORT`).

Em desenvolvimento, o TypeORM usa `synchronize: true` e cria/atualiza o schema automaticamente a partir das entities. Em produção, `synchronize` fica desabilitado — use migrations.

## Variáveis de ambiente

Copie `.sample.env` para `.env` e ajuste conforme necessário:

| Variável | Descrição |
|----------|-----------|
| `NODE_ENV` | `development`, `production` ou `test` |
| `PORT` | Porta HTTP da API (padrão: `3000`) |
| `DB_PG_HOST` | Host do PostgreSQL |
| `DB_PG_PORT` | Porta do PostgreSQL |
| `DB_PG_DATABASE` | Nome do banco |
| `DB_PG_USERNAME` | Usuário do banco |
| `DB_PG_PASSWORD` | Senha do banco |
| `DB_SCHEMA` | Schema PostgreSQL (padrão: `public`) |
| `JWT_SECRET` | Segredo do access token |
| `JWT_REFRESH` | Segredo do refresh token |

Exemplo:

```env
NODE_ENV=development
PORT=3000

DB_PG_DATABASE=to_do_nest
DB_PG_HOST=localhost
DB_PG_PORT=5432
DB_PG_USERNAME=postgres
DB_PG_PASSWORD=postgres
DB_SCHEMA=public

JWT_SECRET=change-me-access-secret
JWT_REFRESH=change-me-refresh-secret
```

> Troque os segredos JWT antes de expor a API em produção.

## Banco de dados (Docker)

O `docker-compose.yml` sobe:

- **PostgreSQL 16** — porta mapeada conforme `DB_PG_PORT` no `.env`
- **pgAdmin** — UI em `http://localhost:8085` (`admin@admin.com` / `admin123`)

A aplicação NestJS roda no host com Node.js; apenas o banco (e o pgAdmin) ficam nos containers.

## Autenticação

Fluxo resumido:

1. `POST /auth/login` com `{ "email", "password" }`.
2. A resposta define cookies `accessToken` e `refreshToken` (HTTP-only, `SameSite=lax`) e retorna `{ user, access_token }`.
3. Nas demais rotas, envie o JWT via cookie **ou** header `Authorization: Bearer <access_token>`.
4. Para renovar: `POST /auth/refresh-token` (lê o cookie `refreshToken` ou aceita `{ "refreshToken" }` no body).

Rotas **públicas** (sem JWT):

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh-token` | Refresh token |
| `POST` | `/users` | Cadastro |

Demais rotas exigem JWT. Rotas com `@RequirePermission` exigem que o usuário tenha um perfil assignado cujo `name` coincide com o enum (ou o perfil `admin`).

## Permissões (RBAC)

Catálogo fixo no enum `Permission` (`src/modules/permissions/constants/permission.enum.ts`). Cada rota protegida usa `@RequirePermission(Permission.X)`. O valor do enum é o mesmo gravado em `permissions.name` no banco.

Fluxo:

1. Garantir o perfil `admin` em `permissions` (`name` = `admin`, id fixo `00000000-0000-4000-8000-000000000001` se você seguir o seed manual).
2. Assign do admin ao seu usuário (`POST /users/:id/permissions` com `{ "permissionId": "00000000-0000-4000-8000-000000000001" }`).
3. `POST /permissions` — `{ "name": "users.read", "description": "..." }` — `name` deve ser um valor do enum; uma linha = um perfil.
4. `POST /users/:id/permissions` — `{ "permissionId" }` — vincula o perfil ao usuário.

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/permissions` | Criar perfil (`name` + `description`) |
| `GET` | `/permissions` | Listar permissões |
| `GET` | `/permissions/:id` | Buscar permissão por ID |
| `DELETE` | `/permissions/:id` | Remover permissão |
| `POST` | `/users/:id/permissions` | Assign de permissão ao usuário |
| `GET` | `/users/:id/permissions` | Permissões do usuário |

## Endpoints

### Auth

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh-token` | Renovar access token |

### Users

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/users` | Criar usuário (público) |
| `GET` | `/users/paginated` | Listagem paginada (`page`, `quantity`, `name`, `email`) |
| `GET` | `/users/:id` | Buscar por ID |
| `PATCH` | `/users/:id` | Atualizar |
| `DELETE` | `/users/:id` | Excluir permanentemente |
| `DELETE` | `/users/:id/soft` | Soft delete (`deleted_at`) |
| `POST` | `/users/:id/restore` | Restaurar usuário soft-deleted |
| `POST` | `/users/:id/permissions` | Assign de permissão |
| `GET` | `/users/:id/permissions` | Permissões do usuário |

### To-do lists

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/to-do-lists` | Criar lista (body inclui `userId`) |
| `GET` | `/to-do-lists/:id` | Buscar por ID |
| `GET` | `/to-do-lists/paginated` | Listagem paginada (`page`, `quantity`, `search`) |
| `PATCH` | `/to-do-lists/:id` | Atualizar |
| `DELETE` | `/to-do-lists/:id` | Excluir |

Detalhes de payloads, validações e exemplos estão no Swagger (modo desenvolvimento).

## Swagger

Com `NODE_ENV=development`:

| Recurso | URL |
|---------|-----|
| UI | `http://localhost:3000/api` |
| OpenAPI JSON | `http://localhost:3000/api-json` |

## Migrations

Scripts TypeORM (CLI usa `src/database/typeorm.datasource.ts`):

```bash
npm run migration:generate   # gera migration a partir das entities
npm run migration:create     # cria migration vazia
npm run migration:run        # aplica migrations pendentes
npm run migration:revert     # reverte a última migration
```

Em **produção**, alterações de schema devem passar por migration (`synchronize: false`). O datasource de migrations também habilita `synchronize` apenas em `development`.

## Scripts npm

| Script | Descrição |
|--------|-----------|
| `npm run start:dev` | Desenvolvimento com watch |
| `npm run start:prod` | Produção (`node dist/main`) |
| `npm run build` | Compila (`nest build` + `tsc-alias`) |
| `npm run lint` | ESLint com fix |
| `npm run test` | Testes unitários (Jest) |
| `npm run test:cov` | Cobertura de testes |
| `npm run test:e2e` | Testes e2e |

## Estrutura do projeto

```text
src/
├── main.ts                 # bootstrap, ValidationPipe, cookies, Swagger
├── app.module.ts           # módulos globais, JwtAuthGuard e PermissionsGuard
├── config/
│   ├── env/                # validação e EnvService
│   ├── swagger.config.ts
│   └── typeorm.config.ts
├── database/
│   ├── migrations/
│   └── typeorm.datasource.ts
├── modules/
│   ├── auth/               # login, refresh, JWT strategy, guards
│   ├── user/               # CRUD, paginação, soft delete e assign de permissões
│   ├── permissions/        # RBAC: enum, decorator, guard e CRUD de perfis
│   ├── permission-user/    # vínculo usuário ↔ permissão (entity + repository)
│   └── to-do-list/         # CRUD e paginação de listas
└── shared/                 # entities base, DTOs e helpers comuns
```

Cada módulo de domínio costuma ter:

- `entities/` — mapeamento TypeORM
- `repositories/` — contrato abstrato + implementação
- `use-cases/` — um caso de uso por pasta (`*.use-case.ts` + `*.controller.ts`)
- `dtos/` e `interfaces/` — contratos de entrada/saída

O módulo `permissions` inclui `constants/permission.enum.ts`, `decorators/require-permission.decorator.ts` e `guards/permissions.guard.ts`.

## Arquitetura

- **Controllers** recebem HTTP, delegam ao use case e retornam DTOs.
- **Use cases** concentram regra de negócio e orquestram repositories.
- **Repositories** acessam o banco; não devem conter regra de negócio.
- **Entities** não são expostas diretamente nas respostas públicas da API.
- **`process.env`** no código da aplicação é evitado; configuração passa por `EnvModule` / `EnvService` (incluindo JWT), exceto no datasource CLI (`typeorm.datasource.ts`). Cookies de auth usam `EnvService.isProduction` para o flag `secure`.

## Modelo de dados

- **`users`**: `id` (UUID), `name`, `email`, `password` (hash bcrypt), `created_at`, `updated_at`, `deleted_at` (soft delete).
- **`to_do_lists`**: `id`, `title`, `description`, `completed`, `user_id`, timestamps.
- **`permissions`**: `id`, `name` (único, igual ao enum `Permission`), `description`, timestamps.
- **`permission_user`**: `id`, `permission_id`, `user_id`, timestamps — vínculo usuário ↔ perfil de permissão.

Relações principais:

- Um usuário possui várias listas (`OneToMany` / `ManyToOne`).
- Um usuário pode ter vários perfis de permissão via `permission_user`.

## Convenções

| Artefato | Padrão |
|----------|--------|
| Pastas e arquivos | `kebab-case` |
| Classes | `PascalCase` |
| Métodos e variáveis | `camelCase` |
| Env vars e tokens DI | `UPPER_SNAKE_CASE` |
| Tabelas e colunas | `snake_case` |
| Rotas HTTP | `kebab-case` |

**Idioma do código**: inglês técnico para classes, métodos, variáveis e artefatos de infraestrutura.

**Path alias**: `@/*` aponta para `src/*` (ver `tsconfig.json`).

## Licença

Projeto privado (`UNLICENSED`).
