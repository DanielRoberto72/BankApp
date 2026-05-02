<h1 align="center">BankApp</h1>

<p align="center">
  Backend de aplicativo bancário em <strong>Node.js</strong> + <strong>Express</strong> + <strong>Sequelize</strong> + <strong>MySQL</strong>,
  com autenticação JWT e operações básicas de conta.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sequelize-6-52B0E7?style=flat-square&logo=sequelize&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
</p>

---

## Visão geral

API REST para um app bancário hipotético, expondo recursos de cadastro de usuário, autenticação e operações de conta. Foco em demonstrar fluxo de auth com JWT e ORM relacional.

## Stack

- **Runtime**: Node.js + Express 4
- **ORM**: Sequelize 6
- **Banco**: MySQL (driver `mysql2`)
- **Auth**: `jsonwebtoken` + `bcrypt`
- **Dev**: nodemon

## Estrutura

```
backend/
└── api/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/
    └── index.js     # entry point
```

## Como rodar

```bash
cd backend
npm install

# Configurar .env (DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET)
cp .env.example .env

# Rodar migrações Sequelize
npx sequelize-cli db:migrate

# Modo dev
npm start
```

## Licença

[MIT](LICENSE)

## Status

Projeto formativo (2022). Mantido público como referência de backend Node + Express + Sequelize com autenticação JWT.
