// class based component

// import React from 'react';
// import styles from '../TodoItem.module.css';

// class TodoItem extends React.Component {
//   state = {
//     editing: false,
//   };

//   handleEditing = () => {
//     if (!this.props.todo.completed) {
//       this.setState({
//         editing: true,
//       });
//     } else {
//       alert('Ne mere!');
//     }
//   };

//   handleUpdateDone = (event) => {
//     if (event.key === 'Enter') {
//       this.setState({ editing: false });
//     }
//   };

//   componentWillUnmount() {
//     console.log('Cleaning up...');
//   }

//   render() {
//     const completedStyle = {
//       fontStyle: 'italic',
//       color: '#595959',
//       opacity: 0.4,
//       textDecoration: 'line-through',
//     };

//     let viewMode = {};
//     let editMode = {};

//     if (this.state.editing) {
//       viewMode.display = 'none';
//     } else {
//       editMode.display = 'none';
//     }

//     return (
//       <li className={styles.item}>
//         <div onDoubleClick={this.handleEditing} style={viewMode}>
//           <input
//             className={styles.checkbox}
//             type="checkbox"
//             checked={this.props.todo.completed}
//             // onChange poziva promenjivu iz todo liste
//             onChange={() => this.props.handleChangeProps(this.props.todo.id)}
//           />
//           <button
//             onClick={() => this.props.handleDeleteProps(this.props.todo.id)}
//           >
//             Delete
//           </button>

//           <span style={this.props.todo.completed ? completedStyle : null}>
//             {this.props.todo.title}
//           </span>
//         </div>
//         <input
//           type="text"
//           style={editMode}
//           value={this.props.todo.title}
//           className={styles.textInput}
//           onChange={(e) => {
//             this.props.setUpdate(e.target.value, this.props.todo.id);
//           }}
//           onKeyDown={this.handleUpdateDone}
//         />
//       </li>
//     );
//   }
// }
// export default TodoItem;

// HOOKS

import React, {useEffect, useState} from 'react';
import styles from '../TodoItem.module.css';

const TodoItem =(props)=>{
  const [editing, setEditing] = useState('');

  const  handleEditing = (e) => {
        if (!props.todo.completed) {
          setEditing(true);
        } else {
          alert('Ne mere!');
        }
  }

  const handleUpdateDone = (event) => {
      if (event.key === 'Enter') {
        setEditing(false);
      }
  };

    const completedStyle = {
            fontStyle: 'italic',
            color: '#595959',
            opacity: 0.4,
            textDecoration: 'line-through',
          };
      
          let viewMode = {};
          let editMode = {};
      
          if (editing) {
            viewMode.display = 'none';
          } else {
            editMode.display = 'none';
          }
    
    useEffect(()=> {
    console.log('Cleaning up...');
    })

    return (
            <li className={styles.item}>
              <div onDoubleClick={handleEditing} style={viewMode}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={props.todo.completed}
                  // onChange poziva promenjivu iz todo liste
                  onChange={() => props.handleChangeProps(props.todo.id)}
                />
                <button
                  onClick={() => props.handleDeleteProps(props.todo.id)}
                >
                  Delete
                </button>
      
                <span style={props.todo.completed ? completedStyle : null}>
                  {props.todo.title}
                </span>
              </div>
              <input
                type="text"
                style={editMode}
                value={props.todo.title}
                className={styles.textInput}
                onChange={(e) => {
                  props.setUpdate(e.target.value, props.todo.id);
                }}
                onKeyDown={handleUpdateDone}
              />
            </li>
          );
        }
      
      export default TodoItem;