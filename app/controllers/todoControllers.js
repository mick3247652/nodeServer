import { Database } from "../db";
import {ObjectID} from 'mongodb'

class TodosController {
  getAllTodos(req, res) {
    Database.database.collection("todos").find({}, (err, result) => {
      const todos = result.toArray()
      console.log(todos);
      if (err) {
        return res.status(404).send({ error: "An error has occurred" });
      } else {
        return res.status(200).send(todos);
      }
    });
  }
  
    getTodo(req, res) {
      //const id = parseInt(req.params.id, 10);
      const details = { '_id': new ObjectID(req.params.id) };
      console.log(details)
      Database.database.collection('todos').findOne(details, (err, item) => {
        if (err) {
          return res.status(404).send({'error':'An error has occurred'});
        } else {
          console.log(item)
          return res.status(200).send(item);
        }
      });
    }
  
  createTodo(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: "false",
        message: "title is required"
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: "false",
        message: "description is required"
      });
    }
    const todo = {
      title: req.body.title,
      description: req.body.description
    };
    Database.database.collection("todos").insertOne(todo, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  }
  /*
    updateTodo(req, res) {
      const id = parseInt(req.params.id, 10);
      let todoFound;
      let itemIndex;
      db.map((todo, index) => {
        if (todo.id === id) {
          todoFound = todo;
          itemIndex = index;
        }
      });
  
      if (!todoFound) {
        return res.status(404).send({
          success: 'false',
          message: 'todo not found',
        });
      }
  
      if (!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required',
        });
      } else if (!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required',
        });
      }
  
      const newTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
      };
  
      db.splice(itemIndex, 1, newTodo);
  
      return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        newTodo,
      });
    }
  
    deleteTodo(req, res) {
      const id = parseInt(req.params.id, 10);
      let todoFound;
      let itemIndex;
      db.map((todo, index) => {
        if (todo.id === id) {
          todoFound = todo;
          itemIndex = index;
        }
      });
  
      if (!todoFound) {
        return res.status(404).send({
          success: 'false',
          message: 'todo not found',
        });
      }
      db.splice(itemIndex, 1);
  
      return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfuly',
      });
    }*/
}

const todoController = new TodosController();
export default todoController;
