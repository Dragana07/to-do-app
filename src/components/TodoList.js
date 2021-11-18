// class based 

// import React from 'react';
// import '../App.css';
// import TodoItem from './TodoItem';

// class TodoList extends React.Component {
//   render() {
//     return (
//       <div className="todoListContainer">
//         <ul>
//           {this.props.stavkeIzNiza.map((element) => (
//             // <li key={todo.id}>{todo.title}</li>
//             <TodoItem
//               key={element.id}
//               todo={element}
//               // promennljiva koju saljemo u todo item a poziva promenljivu iz containera koja poziva funkciju
//               handleChangeProps={this.props.handleChangeCheckBoxaUtodoItemProps}
//               handleDeleteProps={this.props.deleteTodoProps}
//               setUpdate={this.props.setUpdate}
//             />
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
// export default TodoList;

// HOOKS

import React from 'react';
import '../App.css';
import TodoItem from './TodoItem';

const TodoList = (props)=>{
  return(
    <div className="todoListContainer">
      <ul>
        {props.stavkeIzNiza.map(element=>(
          <TodoItem 
            key={element.id}
            todo={element}
            handleChangeProps={props.handleChangeCheckBoxaUtodoItemProps}
            handleDeleteProps={props.deleteTodoProps}
            setUpdate={props.setUpdate}
          />
        ))

        }
      </ul>

    </div>
  )
}
export default TodoList;


