import { useState } from 'react';
import './styles.scss';

const InputTodo = () => {
  const [description, setDescription] = useState('');
  /**
   * add a new todo
   */
  const addNewTodo = async () => {
    try {
      const body = { description };
      // eslint-disable-next-line no-unused-vars
      const response = await fetch('http://localhost:5000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(`onSubmitForm: ${err.message}`);
    }
  };

  return (
    <section className="inputTodo">
      <form
        className="inputTodo__field"
        onSubmit={(e) => {
          if (description === '') { // if description is empty we don't add todo
            e.preventDefault();
          }
          else {
            addNewTodo();
          }
        }}
      >
        <input
          className="inputTodo__input"
          type="text"
          placeholder="I have to"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="inputTodo__button"
          type="submit"
        >
          Add todo
        </button>
      </form>
    </section>
  );
};

export default InputTodo;
