package com.todo.Backend.controller;

import com.todo.Backend.model.todo;
import com.todo.Backend.service.todoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class todoController {

    private final todoService todoService;

    public todoController(todoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public todo createTodo(@RequestBody todo todo) {
        return todoService.createTodo(todo);
    }

    @DeleteMapping("/{id}")
    public void deletetodo(@PathVariable Long id) {
        todoService.deletetodo(id);
    }

    @PutMapping("/{id}")
    public todo updateTodo(
        @PathVariable Long id,
        @RequestBody todo todo) {

        return todoService.updateTodo(id, todo);
    }
}