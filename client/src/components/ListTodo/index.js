import Field from 'src/components/Field';
import { useState, useEffect } from 'react';
import './styles.scss';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);// all todos
  const [isEdit, setIsEdit] = useState(false);// for toggle Field component
  const [whoIsEdit, setWhoIsEdit] = useState();// to select the todo that should be edited
  const sortTodos = [...todos].sort((a, b) => b.todo_id - a.todo_id); // to sort in descending order
  let status; // status which will be modified to validate a task or not

  /**
   * Get all todos
   * @method {GET}
   */
  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todo');
      const jsonData = await response.json();

      setTodos(jsonData);
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(`getTodos: ${err.message}`);
    }
  };
  /**
   * Delete all todos
   * @method {DELETE}
   * @param {number} // id of the todo you whant delet
   */
  const deleteTodo = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const toDelete = await fetch(`http://localhost:5000/todo/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(`deleteTodo: ${err.message}`);
    }
  };
  /**
   * Change status all todos
   * @method {PUT}
   * @param {number} // id of the todo you whant change the status
   */
  const changeStatus = async (id) => {
    try {
      const body = { status };
      // eslint-disable-next-line no-unused-vars
      const response = await fetch(`http://localhost:5000/todo/status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      getTodos();// get all todo and reload the component
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(`changeStatus: ${err.message}`);
    }
  };
  /**
   * when chekbox input onChange
   * @param {event} e // event
   * @param {number} id // id of the todo that takes the event
   */
  const handlChange = (e, id) => {
    if (e.target.checked === true) {
      status = '1';
      changeStatus(id);
    }
    else {
      status = '0';
      changeStatus(id);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section>
      {sortTodos.map((item) => (
        <div className={item.status === '1' ? 'todos done' : 'todos'} key={item.todo_id}>
          <div className="todos__description">
            <input
              className="todos__checkbox"
              type="checkbox"
              checked={item.status === '1'}
              onChange={(e) => {
                handlChange(e, item.todo_id);
              }}
            />
            {isEdit && whoIsEdit === item.todo_id
              ? <Field todo={item} setIsEdit={setIsEdit} />
              : <p>{item.description}</p> }
          </div>
          <div className="todos__buttons">
            <button
              className="todos__button edit"
              type="button"
              onClick={() => {
                setIsEdit(true);
                setWhoIsEdit(item.todo_id);
              }}
            >
              <i className="fa fa-solid fa-pen-to-square" />
            </button>
            <button
              className="todos__button delete"
              type="button"
              onClick={() => {
                deleteTodo(item.todo_id);
              }}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListTodo;
