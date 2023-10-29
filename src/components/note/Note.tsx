import { type ReactElement, useState } from 'react';

import { editStoredCityNote, deleteStoredCityNote } from '../../utils/storage';
import type { INote } from '../../types';

function Note({ note, city }: { note: INote; city: string }): ReactElement {
  const { text } = note;
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);

  const handleSave = () => {
    editStoredCityNote(city, { id: note.id, text: textValue });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteStoredCityNote(city, note.id);
  };

  return (
    <li>
      {isEditing && (
        <>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button type="button" onClick={handleSave}>
            Save Edited Note
          </button>
        </>
      )}
      <span>{text}</span>
      <button type="button" onClick={() => setIsEditing(true)}>
        edit
      </button>
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </li>
  );
}

export default Note;
