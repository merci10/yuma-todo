import React, { useState, useEffect } from 'react';
import { Todo, TodoForm } from './components';
import { TodoInfo } from './type';
import styles from './index.module.css';

let id = 0;
const getId = () => id = id + 1;

function TodoApp(props: { name: string }) {
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);

  const addTodo = (content: string): void => {
    if (!content) return;

    setTodoList(prev => [...prev, { id: getId(), content, isCompleted: false }]);
  }

  const removeTodo = (id: number): void => {
    setTodoList(prev => prev.filter(todo => todo.id !== id));
  }

  const toggleIsCompleted = (id: number): void => {
    setTodoList(prev => prev.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, isCompleted: !todo.isCompleted }
    }));
  }

  // 初期レンダリング時に値を取得
  useEffect(() => {
    const value = window.localStorage.getItem('todoList');
    if (value === null) return;
    setTodoList(JSON.parse(value));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className={styles.todoApp}>
      <p className={styles.todoAppTitle}>{props.name} のTodoリスト</p>
      <TodoForm addTodo={addTodo} />
      <ul className={styles.todoAppTodos}>
        {todoList.map((todo) => {
          return (
            <li className={styles.todoAppTodo} key={todo.id}>
              <Todo
                todo={todo}
                removeTodo={removeTodo}
                toggleIsCompleted={toggleIsCompleted}
              />
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default TodoApp;
