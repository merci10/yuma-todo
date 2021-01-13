import React, { useState } from 'react';
import { TodoInfo } from './type';
import styles from './components.module.css';

/* =====================================================

TodoForm

===================================================== */

type TodoFormProps = {
  addTodo: (content: string) => void,
}

export function TodoForm(props: TodoFormProps) {
  const [content, setContent] = useState('');

  return (
    <form className={styles.todoForm}
      onSubmit={(e) => {
      e.preventDefault();
      props.addTodo(content);
      setContent("");
    }}>
      <input className={styles.todoFormInput} type="text" value={content} onChange={e => setContent(e.target.value)} />
      <button className={styles.todoFormSubmit}>add</button>
    </form>
  )
}

/* =====================================================

Todo

===================================================== */

type TodosProps = {
  todoList: TodoInfo[],
  removeTodo: (id: number) => void,
  toggleIsCompleted: (id: number) => void
}

export function Todos(props: TodosProps) {
  return (
    <ul className={styles.todos}>
      {props.todoList.map((todo) => {
        return (
          <li className={`${styles.todosTodo} ${todo.isCompleted ? styles.todosCompleted : ''}`} key={todo.id}>
            <input
              className={styles.todosCompletedCheckBox}
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => props.toggleIsCompleted(todo.id)}
            />
            <div className={styles.todosContent}>{todo.content}</div>
            <input
              className={styles.todosRemoveBtn}
              type="button"
              value="x"
              onClick={() => props.removeTodo(todo.id)}
            />
          </li>
        )
      })}
    </ul>

  )
}