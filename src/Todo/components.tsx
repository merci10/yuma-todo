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

type TodoProps = {
  todo: TodoInfo,
  removeTodo: (id: number) => void,
  toggleIsCompleted: (id: number) => void
}

export function Todo(props: TodoProps) {
  return (
    <div className={styles.todo}>
      <input className={styles.todoCompletedCheckBox} type="checkbox" onClick={() => props.toggleIsCompleted(props.todo.id)} />
      {props.todo.content}
      <input className={styles.todoRemoveBtn} type="button" value="x" onClick={() => props.removeTodo(props.todo.id)} />
    </div>
  )
}