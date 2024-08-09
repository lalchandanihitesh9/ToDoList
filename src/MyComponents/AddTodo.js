import React from 'react'

const AddTodo = (props) => {
    const myStyle = 
    {
        width : "100%"
    }
    const submit = () =>
    {
        // e.preventDefault();
        let title1 = document.getElementById('title').value;
        let desc1 = document.getElementById('desc').value;
        if(!title1 || !desc1)
        {
            alert("Title or description can not be empty");
        }
        else
        {
            props.addIt(title1,desc1);
        }
        document.getElementById('title').value = "";
        document.getElementById('desc').value = "";

    }
  return (
    <div>
        <h3>Add Todo</h3>
        <label>Title</label>
        <input style ={myStyle} type = "text" id='title'></input>
        <label>Description</label>
        <input style ={myStyle} type = "text" id='desc'></input>
        <button style={{padding : "5px", backgroundColor : "green", marginTop :"8px"}} onClick={submit}>Submit</button>
    </div>
  )
}

export default AddTodo
