package com.todo.Backend.service;

import com.todo.Backend.model.todo;
import com.todo.Backend.repository.todoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class todoService {

    private final todoRepository todoRepository;

    public todoService(todoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public todo createTodo(todo todo) {
        return todoRepository.save(todo);
    }

     public void deletetodo(Long id) {
        todoRepository.deleteById(id);
     }

     public todo updateTodo(Long id, todo updatedTodo) {

      todo existingTodo = todoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Todo not found"));

        existingTodo.setTitle(updatedTodo.getTitle());
         existingTodo.setCompleted(updatedTodo.isCompleted());

         return todoRepository.save(existingTodo);
}
}