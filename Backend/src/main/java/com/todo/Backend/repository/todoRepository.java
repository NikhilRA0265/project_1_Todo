package com.todo.Backend.repository;

import com.todo.Backend.model.todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface todoRepository extends JpaRepository<todo, Long> {
}