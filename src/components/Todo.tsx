import { useRef, useState, useEffect } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Item } from '@/types';

interface TodoProps {
  item: Item;
  onUpdate: (id: string, newValue: string) => void;
  onDelete: (id: string) => Item[];
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
  const itemRef = useRef<HTMLLIElement>(null)

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
      itemRef.current?.classList.add("deleted");
      //necesito un array con los elemento que estan debajo del item que estoy borrando

      setTimeout(() => {
        onDelete(item.id); // Eliminar el elemento después de la animación
      }, 300); // Esperar 300ms (0.3 segundos) para que la animación se complete
    };

    const handleComplete = () => {
      onCompleted(item.id);
    };

    return (
      <div className="item">
        <div className='itemCheckText'>
          <input
            type="checkbox"
            id={item.id}
            checked={item.completed}
            onChange={handleComplete}
          />
          <label htmlFor={item.id} className={item.completed ? 'completed' : ''}>
            {item.task}
          </label>
        </div>

        <div className='itemButtons'>
          <button onClick={handleEdit}>
            <FaEdit className='itemButtonsIconEdit' />
          </button>
          <button onClick={handleDelete}>
            <MdDeleteOutline className='itemButtonsIconDelete' />
          </button>
        </div>
      </div>
    );
  }

  function FormEdit() {
    const [taskValue, setTaskValue] = useState(item.task);

    const handleUpdate = () => {
      //recoger el nuevo valor de la tarea y modificarla en el array de items)
      if (taskValue) {
        onUpdate(item.id, taskValue);
        setIsEditing(false);
      } else {
        alert("El Item no puede quedar vacio")
      }

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
      <div className='editFormContainer'>
        <input
          className='editFormContainerInput'
          type="text"
          value={taskValue}
          id={item.id}
          ref={editInputRef}
          onChange={handleChange}
          onKeyDown={handleUpdateEnter}
        />
        <span className='itemButtons'>
          <button  onClick={handleUpdate}>
            <FaCheck className='itemButtonsIconEdit' />
          </button>
          <button onClick={handleCancel}>
            <GiCancel className='itemButtonsIconDelete' />
          </button>
        </span>
      </div>
    );
  }

  return <li className='todoItemContainer' ref={itemRef}>{isEditing ? <FormEdit /> : <Task />}</li>;
}
