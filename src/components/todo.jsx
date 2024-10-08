import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMessage, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Todo() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate =useNavigate()


  useEffect(()=>{
  const savedItems=localStorage.getItem("todoItems")
  if(savedItems){
    setItems(JSON.parse(savedItems))
  }
  },[])
   useEffect(()=>{
    localStorage.setItem("todoItems",JSON.stringify(items))
   },[items])

  function handleList(e) {
    setNewItem(e.target.value);
  }

  function addItem() {
    if (newItem.trim() !== "") {
      setItems((prevItems) => [
        ...prevItems,
        { text: newItem, completed: false },
      ]);
      setNewItem("");
    }
  }

  function deleteItem(index) {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    if (editIndex === index) {
      setEditIndex(null); // Reset edit mode if the item being edited is deleted
      setEditText("");
    }
  }

  function handleCheck(index) {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function handleMessageIcon(){
    navigate('/Sticky-Notes')
  }

  function startEditing(index) {
    setEditIndex(index);
    setEditText(items[index].text);
  }

  function handleEditChange(e) {
    setEditText(e.target.value);
  }

  function saveEdit(index) {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, text: editText };
      }
      return item;
    });
    setItems(updatedItems);
    setEditIndex(null);
    setEditText("");
  }

  return (
    <div>
      <div className="todo-container">
        <h1>Task List</h1>
        <input type="text"  className="inputbox" onChange={handleList} value={newItem}></input>
        <button className="addbutton" onClick={addItem}>ADD</button>
        <ol>
          {items.map((item, index) => (
            <li key={index} id="listItem">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheck(index)}
                />
                <span className={`checkmark ${item.completed ? "checked" : ""}`}></span>
              </label>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    className="edit edit-item-input inputbox"
                  />
                   <FontAwesomeIcon
              className="savebutton"
              onClick={() => saveEdit(index)}
              icon={faCheck}
            />
      
                </>
              ) : (
                <>
                  <span className={`text ${item.completed ? "linetext" : ""}`}>
                    {item.text}
                  </span>
                  <FontAwesomeIcon
              className="editbutton"
              onClick={() => startEditing(index)}
              icon={faPenToSquare}
            />
                </>
              )}
              <FontAwesomeIcon
              className="deletebutton"
              onClick={() => deleteItem(index)}
              icon={faTrash}
            />
    
            </li>
          ))}
        </ol>
     
        <FontAwesomeIcon className="notes" onClick={handleMessageIcon} icon={faMessage} />

      </div>
    </div>
  );
}

export default Todo;
