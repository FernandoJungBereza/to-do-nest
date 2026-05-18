# To Do Nest

Projeto NestJS gerado com o padrão arquitetural Pormade.

## Idioma do código

Este projeto usa **inglês técnico** para código, classes, métodos, variáveis e artefatos de infraestrutura.

## Requisitos

- Node.js 18+
- npm
- Docker e Docker Compose

## Configuração inicial

```bash
cp .sample.env .env
docker compose up -d
npm install
npm run start:dev
```

## Banco de dados

O Docker Compose sobe apenas o PostgreSQL. A aplicação roda localmente com Node.js.

Variáveis principais:

```env
DB_PG_HOST=localhost
DB_PG_PORT=5432
DB_PG_DATABASE=to_do_nest
DB_PG_USERNAME=postgres
DB_PG_PASSWORD=postgres
DB_SCHEMA=public
```

## Migrations

```bash
npm run migration:generate
npm run migration:run
npm run migration:revert
```

O projeto usa `synchronize: false`. Toda alteração estrutural do banco deve ser feita por migration.

## Swagger

Em ambiente de desenvolvimento:

- UI: `/api`
- JSON: `/api-json`

## Estrutura

```text
src/
├── config/
│   ├── env/
│   ├── swagger.config.ts
│   └── typeorm.config.ts
├── database/
│   ├── migrations/
│   └── typeorm.datasource.ts
└── modules/
```

## Convenções

- Pastas e arquivos: `kebab-case`
- Classes: `PascalCase`
- Métodos e variáveis: `camelCase`
- Env vars e tokens: `UPPER_SNAKE_CASE`
- Tabelas e colunas: `snake_case`
- Rotas: `kebab-case`

## Arquitetura

- Controllers recebem input HTTP, chamam use cases e retornam DTOs.
- Use cases concentram regra de negócio.
- Repositories acessam o banco e não devem conter regra de negócio.
- Entities não devem ser retornadas diretamente em respostas públicas.
- `process.env` só deve ser usado em `src/database/typeorm.datasource.ts`.
