const express = require("express");

const app = express();

app.use(express.json());

app.get("/courses", (request, response) => {
  const query = request.query;

  console.log(query);

  return response.json(["curso 1", "curso 2", "cursos 3"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;

  console.log(body);

  return response.json(["curso 1", "curso 2", "cursos 3", "curso 4"]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;

  console.log(id);

  return response.json([
    "curso Um",
    "curso 2",
    "cursos 3",
    "curso 4",
  ]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json([
    "curso Um",
    "curso 2",
    "cursos três",
    "curso 4",
  ]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["curso Um", "curso 2", "cursos três"]);
});

app.listen(3333);
