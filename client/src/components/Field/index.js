import PropTypes from 'prop-types';
import { useState } from 'react';

const Field = ({ todo, setIsEdit }) => {
  const [description, setDescription] = useState(todo.description);
  /**
   * when chekbox input onChange
   * @param {event} e // event
   */
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      // eslint-disable-next-line no-unused-vars
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      window.location = '/';
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  };
  return (
    <div>
      <form>
        <input className="edit__input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button
          className="edit__button"
          type="submit"
          onClick={(e) => {
            if (description !== todo.description && description !== '') {
              updateDescription(e);
            }
            else {
              setIsEdit(false);
              e.preventDefault();
            }
          }}
        >ok
        </button>
      </form>
    </div>
  );
};

Field.propTypes = {
  todo: PropTypes.object.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};

export default Field;
