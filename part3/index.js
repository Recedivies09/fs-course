const morgan = require("morgan");
const express = require("express");
const app = express();

require("dotenv").config();
const Person = require("./models/Person");

const customMorgan = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(res.req.body),
  ].join(" ");
});

app.use(express.static("build"), customMorgan, express.json());

// :method :url :status :res[content-length] - :response-time ms

const errorHandle = (error, req, res, next) => {
  console.log(error.name);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/info", async (req, res) => {
  const count = await Person.countDocuments();
  const requestDate = new Date();
  res.send(`Phonebook has info for ${count} people <br><br>${requestDate}`);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.statusMessage = `Successfully deleted phonebook with id:${req.params.id}`;
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    let err = "";
    for (let i = 0; i < 2; i++) {
      if (i == 0 && !name) {
        err += "name ";
      }
      if (i == 1 && !number) {
        err += "number ";
      }
    }
    return res.status(400).json({
      error: `${err}field is required`,
    });
  }
  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, newPerson, {
    new: true,
    runValidators: true,
  })
    .then((updatedNumber) => res.json(updatedNumber))
    .catch((error) => next(error));
});

app.use(errorHandle);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
