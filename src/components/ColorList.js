import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import EditMenu from './EditMenu';
import { axiosWithAuth } from '../helpers/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        setEditing(false);
        axiosWithAuth()
          .get('/colors')
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        history.push('/bubble-page');
        console.log(err.response);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        setEditing(false);
        axiosWithAuth()
          .get('/colors')
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        history.push('/bubble-page');
        console.log(err.response);
      });
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <EditMenu
          colorToEdit={colorToEdit}
          saveEdit={saveEdit}
          setColorToEdit={setColorToEdit}
          setEditing={setEditing}
          initialColor={initialColor}
        />
      )}
    </div>
  );
};

export default ColorList;


//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.