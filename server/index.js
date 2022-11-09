const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo
app.post("/todo", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//get all todos
app.get("/todo", async(req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );

        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//get a todo
app.get("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", [id]
            );

        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//update description
app.put("/todo/description/:id",async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateDescription = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description,id]
            );

        res.json("todo was updated !");
    } catch (err) {
        console.log(err.message);
    }
})

//update status
app.put("/todo/status/:id",async(req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;
      const updateStatus = await pool.query(
          "UPDATE todo SET status = $1 WHERE todo_id = $2", [status,id]
          );

      res.json("status was updated !");
  } catch (err) {
      console.log(err.message);
  }
})

//delete a todo
app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", [id]
            );

        res.json("todo was delete !")        
    } catch (err) {
        console.log(err.message);
    }
})


app.listen(5000, () => {
    console.log("server is on 5000");
});