import React, { useState, useEffect } from 'react';
import Header from './Header';
import InputTodo from './InputTodo';
import TodoList from './TodoList';
import Navbar from './Navbar';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import { Route, Switch } from 'react-router-dom';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());

  const handleChangeCheckBoxaUtodoItem = (id) => {
    setTodos((prevSate) =>
      prevSate.map((todoItem) => {
        if (todoItem.id === id) {
          return { ...todoItem, completed: !todoItem.completed };
        }
        return todoItem;
      })
    );
  };

  // const handleChangeCheckBoxaUtodoItem = (id) => {
  //   setTodos([
  //     todos.map((todoItem) => {
  //       if (todoItem.id === id) {
  //         todoItem.completed = !todoItem.completed;
  //       }
  //       return todoItem;
  //     }),
  //   ]);
  // };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todoItem) => {
        return todoItem.id !== id;
      }),
    ]);
  };
  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos({
      todos: todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  // ovako napisan zamenjuje didMount
  // useEffect(() => {
  //   console.log('test run');

  //   //getting stored items
  //   const temp = localStorage.getItem('todos');
  //   const loadedTodos = JSON.parse(temp);

  //   if (loadedTodos) {
  //     setTodos(loadedTodos);
  //   }
  // }, []);

  // drugi nacin za componentDidMount
  function getInitialTodos() {
    //getting stored items
    const temp = localStorage.getItem('todos');
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }

  // umesto componentDidUpdate
  useEffect(() => {
    //storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <div className="inner">
              <Header />
              <InputTodo addTodoProps={addTodoItem} />
              {/* <ul>
                         {this.state.todos.map(todo => (
                             <li>{todo.title}</li>
                         ))}
                     </ul>  */}

              <TodoList
                stavkeIzNiza={todos}
                //     koju saljemo u todo list a hvata funkciju iznad rendera
                handleChangeCheckBoxaUtodoItemProps={
                  handleChangeCheckBoxaUtodoItem
                }
                deleteTodoProps={delTodo}
                setUpdate={setUpdate}
              />
            </div>
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </>
  );
};
export default TodoContainer;
