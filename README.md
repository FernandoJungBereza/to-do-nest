# To Do Nest

API REST em [NestJS](https://nestjs.com/) para gerenciar **usuários**, **listas de tarefas** (to-do lists) e **permissões por rota** (RBAC), com persistência em PostgreSQL, autenticação JWT e documentação Swagger em desenvolvimento.

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
- **Permissões (RBAC)**: perfis com slugs de rota (`permissions` + `permissions_slugs`), assign por usuário, manifest em memória para o guard, descoberta automática de rotas e endpoint para slugs disponíveis.
- **Autenticação**: login com e-mail e senha; access token (1h) e refresh token (7d) em cookies HTTP-only; renovação via `POST /auth/refresh-token`.
- **Proteção global**: `JwtAuthGuard` e `PermissionsGuard` aplicados em toda a aplicação; rotas com `@Public()` ficam sem JWT; rotas registradas no manifest exigem slug correspondente (ou slug `admin`).
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

Demais rotas exigem JWT. Rotas com slug cadastrado no manifest exigem que o usuário possua esse slug (via permissão assignada) ou o slug especial `admin`.

## Permissões (RBAC por rota)

O módulo `permissions` descobre controllers em `src/modules` (exceto `auth`), monta um manifest rota → slug e valida acesso no `PermissionsGuard`.

Fluxo sugerido para o primeiro acesso administrativo:

1. Criar permissão **Administrator** com slug `admin` e assign ao seu usuário (pgAdmin ou API).
2. `GET /permissions/available-slugs` — slugs sugeridos agrupados por módulo (`modules[].name`, `modules[].routes`).
3. `POST /permissions` — `{ "name", "description", "permissionSlug": ["user.create", ...] }` — persiste a permissão, os slugs e remonta o manifest.
4. `POST /users/:id/permissions` — `{ "permissionId" }` — vincula permissão ao usuário.
5. `POST /permissions/reload` — remonta o manifest manualmente (requer slug `admin`).

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/permissions/available-slugs` | Slugs sugeridos para montar permissões |
| `POST` | `/permissions` | Criar permissão com slugs |
| `GET` | `/permissions` | Listar permissões |
| `GET` | `/permissions/:id` | Buscar permissão por ID |
| `DELETE` | `/permissions/:id` | Remover permissão |
| `POST` | `/permissions/reload` | Rebuild do manifest (admin) |
| `POST` | `/users/:id/permissions` | Assign de permissão ao usuário |
| `GET` | `/users/:id/permissions` | Permissões do usuário (com slugs) |

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
│   ├── permissions/        # RBAC, manifest, descoberta de rotas e slugs
│   ├── permission-user/    # vínculo usuário ↔ permissão (entity + repository)
│   └── to-do-list/         # CRUD e paginação de listas
└── shared/                 # entities base, DTOs e helpers comuns
```

Cada módulo de domínio costuma ter:

- `entities/` — mapeamento TypeORM
- `repositories/` — contrato abstrato + implementação
- `use-cases/` — um caso de uso por pasta (`*.use-case.ts` + `*.controller.ts`)
- `dtos/` e `interfaces/` — contratos de entrada/saída

O módulo `permissions` inclui ainda `authorization/` (manifest, descoberta de rotas e resolução de slugs por usuário).

## Arquitetura

- **Controllers** recebem HTTP, delegam ao use case e retornam DTOs.
- **Use cases** concentram regra de negócio e orquestram repositories.
- **Repositories** acessam o banco; não devem conter regra de negócio.
- **Entities** não são expostas diretamente nas respostas públicas da API.
- **`process.env`** no código da aplicação é evitado; configuração passa por `EnvModule` / `EnvService` (incluindo JWT), exceto no datasource CLI (`typeorm.datasource.ts`). Cookies de auth usam `EnvService.isProduction` para o flag `secure`.

## Modelo de dados

- **`users`**: `id` (UUID), `name`, `email`, `password` (hash bcrypt), `created_at`, `updated_at`, `deleted_at` (soft delete).
- **`to_do_lists`**: `id`, `title`, `description`, `completed`, `user_id`, timestamps.
- **`permissions`**: `id`, `name`, `description`, timestamps.
- **`permissions_slugs`**: `id`, `permission_id`, `slug` (único) — slugs de rota vinculados a uma permissão.
- **`permission_user`**: `id`, `permission_id`, `user_id`, timestamps — N:N entre usuários e permissões.

Relações principais:

- Um usuário possui várias listas (`OneToMany` / `ManyToOne`).
- Um usuário pode ter várias permissões; cada permissão agrupa vários slugs de rota.

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
