import express from "express";
import { v4 as uuidV4 } from "uuid";

const app = express();

const customers = [];

app.use(express.json());

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - array
 */

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

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  return response.json(customer.statement);
});

app.listen(3333);
