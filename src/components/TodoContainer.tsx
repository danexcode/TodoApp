import { useState } from 'react';
import { Item } from '@/types';
import Todo from '@/components/Todo';

export default function TodoContainer() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const createItem = () => {
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      task: value,
      completed: false,
    };

    setItems([newItem, ...items]);
    setValue('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleUpdate = (id: string, newValue: string) => {
    const index = items.findIndex((item) => item.id === id);
    const temp = [...items];
    temp[index].task = newValue;
    setItems(temp);
  };

  const handleDelete = (id: string) => {
    const index = items.findIndex((item) => item.id === id);
    const temp = [...items];
    temp.splice(index, 1);
    setItems(temp);
    return temp.slice(index)
  };

  const handleCompleted = (id: string) => {
    const index = items.findIndex((item) => item.id === id);
    const temp = [...items];
    temp[index].completed = !temp[index].completed;
    setItems(temp);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      createItem()
    }
  }

  return (
    <section className="container">
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input className='addTodoInput' id='inputTodo' type="text" value={value} onChange={handleChange} onKeyDown={handleEnter} />
      </form>

      <article className={items.length ? 'listContainer' : 'listContainerEmpty'}>
        {items.length ? (
          <ul>
            {items.map((item) => (
              <Todo
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onCompleted={handleCompleted}

              />
            ))}
          </ul>
        ) : (
          <label htmlFor='inputTodo' className='addMessage'>Añade una tarea y presiona Enter</label>
        )}
      </article>
    </section>
  );
}
