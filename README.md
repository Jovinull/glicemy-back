# Glicemy - API para Gerenciamento de Diabetes

**Glicemy** é uma API desenvolvida para ajudar pessoas com Diabetes a monitorar sua glicemia, administrar medicamentos, configurar lembretes e gerar relatórios. A API oferece funcionalidades como autenticação JWT, criptografia de dados sensíveis, integração com dispositivos de medição e muito mais.

---

## **Índice**
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Autenticação](#-autenticação)
- [Segurança](#-segurança)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## **Tecnologias Utilizadas**
O backend da API foi desenvolvido com as seguintes tecnologias:
- **Node.js** + **Express.js** - Servidor backend
- **Prisma ORM** - Gerenciamento de banco de dados PostgreSQL
- **bcrypt** - Hashing de senhas
- **jsonwebtoken (JWT)** - Autenticação segura
- **crypto** - Criptografia AES-256
- **swagger-jsdoc + swagger-ui-express** - Documentação da API
- **cors** - Habilitação de CORS
- **dotenv** - Gerenciamento de variáveis de ambiente
- **helmet** - Segurança para headers HTTP
- **express-rate-limit** - Limitação de requisições

---

## **Pré-requisitos**
Antes de instalar, certifique-se de ter instalado:
- [Node.js (v18+)](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

## **Instalação e Configuração**
Clone o repositório e instale as dependências:
```bash
git clone https://github.com/seuusuario/glicemy-back.git
cd glicemy-back
npm install
```

### **Configuração do Banco de Dados**
1. **Crie um banco PostgreSQL** chamado `glicemydb`.
2. **Renomeie o arquivo `.env.example` para `.env`**:
```bash
cp .env.example .env
```
3. **Edite o `.env` com suas credenciais do PostgreSQL**:
```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/glicemydb?schema=public"
JWT_SECRET="sua_chave_jwt_super_segura"
ENCRYPTION_KEY="sua_chave_de_criptografia_de_32_caracteres"
```

---

## **Como Rodar o Projeto**
### **Inicializar o banco de dados e rodar migrations**
```bash
npm run db:init
```
Isso criará as tabelas e adicionará dados iniciais para testes.

### **Rodar o servidor**
```bash
npm run dev
```
O servidor será iniciado na porta `3000`:
```
Servidor rodando na porta 3000!
Swagger disponível em: http://localhost:3000/api/docs
```

---

## **Endpoints da API**
A API segue a seguinte estrutura de rotas:

| Método  | Endpoint                         | Descrição                                | Autenticação |
|---------|----------------------------------|------------------------------------------|--------------|
| `POST`  | `/api/auth/register`            | Registrar um novo usuário                | - |
| `POST`  | `/api/auth/login`               | Fazer login                              | - |
| `GET`   | `/api/users`                     | Obter todos os usuários                 | X |
| `GET`   | `/api/users/{id}`                | Obter um usuário pelo ID                | X |
| `PUT`   | `/api/users/{id}`                | Atualizar um usuário                    | X |
| `DELETE`| `/api/users/{id}`                | Deletar um usuário                      | X |
| `POST`  | `/api/medications`               | Criar um novo medicamento               | X |
| `GET`   | `/api/medications`               | Obter todos os medicamentos             | X |
| `GET`   | `/api/medications/{id}`          | Obter um medicamento pelo ID            | X |
| `PUT`   | `/api/medications/{id}`          | Atualizar um medicamento                | X |
| `DELETE`| `/api/medications/{id}`          | Deletar um medicamento                  | X |

**Para ver a documentação completa, acesse:**  
**Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## **Autenticação**
A API usa **JWT (JSON Web Token)** para autenticação.  
- Após o login (`POST /api/auth/login`), o servidor retorna um `token`.
- Para acessar rotas protegidas, envie o `token` no cabeçalho:
  ```bash
  Authorization: Bearer {TOKEN}
  ```

---

## **Segurança**
- **Criptografia AES-256** para dados sensíveis.
- **Senhas armazenadas com hashing bcrypt**.
- **Proteção contra ataques de força bruta** com `express-rate-limit`.
- **Cabeçalhos HTTP seguros** via `helmet`.

---

## **Contribuição**
Quer contribuir com o projeto?  
1. Faça um **fork** do repositório
2. Crie uma **branch** com a feature desejada (`git checkout -b feature/nova-feature`)
3. Faça o **commit** (`git commit -m "Adiciona nova feature"`)
4. Envie um **pull request**

---

## **Licença**
Projeto sob a licença **MIT**.  
Sinta-se à vontade para utilizar e modificar.