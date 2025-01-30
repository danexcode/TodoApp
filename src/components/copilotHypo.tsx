import { useState } from 'react';
import { Item } from '@/types';
import Todo from '@/components/Todo';

const useTodo = () => {
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
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, task: newValue } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCompleted = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return {
    value,
    items,
    handleChange,
    handleSubmit,
    handleUpdate,
    handleDelete,
    handleCompleted,
  };
};

const TodoForm = ({ value, onChange, onSubmit }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
  </form>
);

const TodoList = ({ items, onUpdate, onDelete, onCompleted }: { items: Item[]; onUpdate: (id: string, newValue: string) => void; onDelete: (id: string) => void; onCompleted: (id: string) => void }) => (
  <ul>
    {items.map((item) => (
      <Todo
        key={item.id}
        item={item}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCompleted={onCompleted}
      />
    ))}
  </ul>
);

export default function TodoContainer() {
  const {
    value,
    items,
    handleChange,
    handleSubmit,
    handleUpdate,
    handleDelete,
    handleCompleted,
  } = useTodo();

  return (
    <section className="container">
      <h1>Lista de Tareas</h1>
      <TodoForm value={value} onChange={handleChange} onSubmit={handleSubmit} />
      <TodoList
        items={items}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCompleted={handleCompleted}
      />
      {items.length ? '' : <span>Añade una tarea</span>}
    </section>
  );
}
