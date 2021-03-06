// HOOKS

import React, { useState } from 'react';

const InputTodo = (props) => {
  const [title, setTitle] = useState('');
  // const [subTitle, setSubTitle] = useState('');

  const onChange = (e) => {
    // definisanje state-a
    setTitle(e.target.value);
  };

  // const onChangeSubTitle = (e) => {
  //   // definisanje drugog state-a
  //   setSubTitle(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      props.addTodoProps(title);
      setTitle('');
    } else {
      alert('Please write item');
    }
  };

  return (
    // u returnu uvek html
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={title}
        name="title"
        onChange={onChange}
      />
      {/* <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={subTitle}
        name="subTitle"
        onChange={onChangeSubTitle}
      /> */}
      <button className="input-submit">Submit</button>
    </form>
  );
};

export default InputTodo;
