import { useState } from 'react';
import { Item } from '@/types';
import Todo from '@/components/Todo';

export default function TodoContainer() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: Item = {
      id: crypto.randomUUID(),
      task: value,
      completed: false,
    };

    setItems([newItem, ...items]);
    setValue('');
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
  };

  const handleCompleted = (id: string) => {
    const index = items.findIndex((item) => item.id === id);
    const temp = [...items];
    temp[index].completed = !temp[index].completed;
    setItems(temp);
  };

  return (
    <section className="container">
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
      </form>
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

      {items.length ? '' : <span>Añade una tarea</span>}
    </section>
  );
}
