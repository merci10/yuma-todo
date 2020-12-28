import React, {useState } from 'react';
import './index.css';

type todoInfo = {
  id: number,
  content: string,
  isCompleted: boolean,
}

function Todo(props: {name: string}) {
  const [id, setId] = useState(0);
  const [content, setContent] = useState('');
  const [todoList, setTodoList] = useState<todoInfo[]>([]);

  const addTodo = (): void => {
    if (!content) return;

    setId(prev => prev + 1);
    setTodoList(prev => [...prev, {id, content, isCompleted: false}]);
  }

  const removeTodo = (todo: todoInfo): void => {
    const id = todo.id;
    setTodoList(prev => prev.filter(a => a.id !== id));
  }

  const toggleIsCompleted = (todo: todoInfo): void => {
    const id = todo.id;
    setTodoList(prev => prev.map((a) => {
      if (a.id !== id) return a;
      return {...a, isCompleted: !a.isCompleted}
    }));
  }

  return (
    <div>
      <input type="text" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={() => {
        addTodo();
        setContent("");
      }}>
        add
      </button>
      <p>{props.name} のTodoリスト</p>
      <ul>
        {todoList.map(todo => {
          return (
            <li key={todo.id}>
              <input type="checkbox" onClick={() => toggleIsCompleted(todo)}/>
              {todo.content}
              <input type="button" value="x" onClick={() => removeTodo(todo)}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Todo;