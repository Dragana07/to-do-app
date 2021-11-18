// import React from 'react';
// import Header from './Header';
// import InputTodo from './InputTodo';
// import TodoList from './TodoList';
// import Navbar from './Navbar';
// import '../App.css';
// import { v4 as uuidv4 } from 'uuid';

// class TodoContainer extends React.Component {
//   state = {
//     todos: [],
//     //   stari todos: [
//     //     {
//     //       id: uuidv4(),
//     //       title: 'Setup development environment',
//     //       completed: true,
//     //     },
//     //     {
//     //       id: uuidv4(),
//     //       title: 'Develop website and add content',
//     //       completed: false,
//     //     },
//     //     {
//     //       id: uuidv4(),
//     //       title: 'Deploy to live server',
//     //       completed: false,
//     //     },
//     //   ],
//   };

//   // funkcija
//   handleChangeCheckBoxaUtodoItem = (id) => {
//     this.setState({
//       todos: this.state.todos.map((todoItem) => {
//         if (todoItem.id === id) {
//           todoItem.completed = !todoItem.completed;
//         }
//         return todoItem;
//       }),
//     });
//   };

//   delTodo = (id) => {
//     this.setState({
//       todos: [
//         ...this.state.todos.filter((todoItem) => {
//           return todoItem.id !== id;
//         }),
//       ],
//     });
//   };

//   addTodoItem = (title) => {
//     const newTodo = {
//       id: uuidv4(),
//       title: title,
//       completed: false,
//     };
//     this.setState({
//       todos: [...this.state.todos, newTodo],
//     });
//   };

//   setUpdate = (updatedTitle, id) => {
//     this.setState({
//       todos: this.state.todos.map((todo) => {
//         if (todo.id === id) {
//           todo.title = updatedTitle;
//         }
//         return todo;
//       }),
//     });
//   };

//   // Na ovaj nacin dobijamo podatke sa backenda
//   // componentDidMount() {
//   //   fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
//   //     .then((response) => response.json())
//   //     .then((data) => this.setState({ todos: data }));
//   // }

//   componentDidMount() {
//     const temp = localStorage.getItem('todos');
//     const loadedTodos = JSON.parse(temp);
//     if (loadedTodos) {
//       this.setState({
//         todos: loadedTodos,
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.todos !== this.state.todos) {
//       const temp = JSON.stringify(this.state.todos);
//       localStorage.setItem('todos', temp);
//       console.log('upp');
//     }
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="inner">
//           <Header />
//           <InputTodo addTodoProps={this.addTodoItem} />
//           {/* <ul>
//                    {this.state.todos.map(todo => (
//                        <li>{todo.title}</li>
//                    ))}
//                </ul>  */}

//           <TodoList
//             stavkeIzNiza={this.state.todos}
//             //     koju saljemo u todo list a hvata funkciju iznad rendera
//             handleChangeCheckBoxaUtodoItemProps={
//               this.handleChangeCheckBoxaUtodoItem
//             }
//             deleteTodoProps={this.delTodo}
//             setUpdate={this.setUpdate}
//           />
//         </div>
//       </div>
//     );
//   }
// }
// export default TodoContainer;

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
