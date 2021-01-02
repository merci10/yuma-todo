import React, { useState } from 'react';
import { TodoInfo } from './type';

type TodoFormProps = {
  addTodo: (content: string) => void,
}

export function TodoForm(props: TodoFormProps) {
  const [content, setContent] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.addTodo(content);
      setContent("");
    }}>
      <input type="text" value={content} onChange={e => setContent(e.target.value)} />
      <button>add</button>
    </form>
  )
}

type TodoProps = {
  todo: TodoInfo,
  removeTodo: (id: number) => void,
  toggleIsCompleted: (id: number) => void
}

export function Todo(props: TodoProps) {
  return (
    <div>
      <input type="checkbox" onClick={() => props.toggleIsCompleted(props.todo.id)} />
      {props.todo.content}
      <input type="button" value="x" onClick={() => props.removeTodo(props.todo.id)} />
    </div>
  )
}