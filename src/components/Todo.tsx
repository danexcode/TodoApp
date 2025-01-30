import { Item } from '@/types';
import { useRef, useState, useEffect } from 'react';

interface TodoProps {
  item: Item;
  onUpdate: (id: string, newValue: string) => void;
  onDelete: (id: string) => void;
  onCompleted: (id: string) => void;
}

export default function Todo({
  item,
  onUpdate,
  onDelete,
  onCompleted,
}: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  function Task() {
    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleDelete = () => {
      onDelete(item.id);
    };

    const handleComplete = () => {
      onCompleted(item.id);
    };

    return (
      <div className="task">
        <input
          type="checkbox"
          id={item.id}
          checked={item.completed}
          onChange={handleComplete}
        />
        <label htmlFor={item.id} className={item.completed ? 'completed' : ''}>
          {item.task}
        </label>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }

  function FormEdit() {
    const [taskValue, setTaskValue] = useState(item.task);

    const handleUpdate = () => {
      //recoger el nuevo valor de la tarea y modificarla en el array de items)
      onUpdate(item.id, taskValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      //Cancelar operacion y devolver el item a su estado original
      setTaskValue(item.task);
      setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskValue(e.target.value);
    };

    const handleUpdateEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleUpdate();
      }
    };

    return (
      <div>
        <input
          type="text"
          value={taskValue}
          id={item.id}
          ref={editInputRef}
          onChange={handleChange}
          onKeyDown={handleUpdateEnter}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return <li>{isEditing ? <FormEdit /> : <Task />}</li>;
}
