import express from "express";
import { v4 as uuidV4 } from "uuid";

const app = express();

const customers = [];

app.use(express.json());

// Middleware
const verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }

  request.customer = customer;

  next();
};

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response
      .status(400)
      .json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidV4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get(
  "/statement",
  verifyIfExistsAccountCPF,
  (request, response) => {
    const { customer } = request;
    return response.json(customer.statement);
  }
);

app.post(
  "/deposit",
  verifyIfExistsAccountCPF,
  (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }
);

app.listen(3333);
