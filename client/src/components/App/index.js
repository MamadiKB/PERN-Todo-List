// == Import
import InputTodo from 'src/components/InputTodo';
import ListTodo from 'src/components/ListTodo';
import './styles.scss';

// == Composant
function App() {
  return (
    <div className="app">
      <header>
        <h1>PERN Todo</h1>
      </header>
      <main>
        <InputTodo />
        <ListTodo />
      </main>
    </div>
  );
}

// == Export
export default App;
