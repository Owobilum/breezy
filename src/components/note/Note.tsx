/* eslint-disable jsx-a11y/label-has-associated-control */
import { type ReactElement, useState } from 'react';

import styles from './Note.module.css';
import { editStoredCityNote, deleteStoredCityNote } from '../../utils/storage';
import type { INote } from '../../types';
import { Icon } from '../icons';

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
    <li className={styles.container}>
      {isEditing && (
        <>
          <label htmlFor="create-note" className="sr-only">
            Create Note
          </label>
          <textarea
            id="create-note"
            cols={30}
            rows={10}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className={styles.textarea}
          />
          <button
            type="button"
            onClick={handleSave}
            className={styles.save_btn}
          >
            Save Edited Note
          </button>
        </>
      )}

      {!isEditing && (
        <>
          <span>{text}</span>
          <span className={styles.action_box}>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="ghost_btn"
              aria-label="edit"
            >
              <Icon title="edit" className={styles.edit_icon} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="ghost_btn"
              aria-label="delete"
            >
              <Icon title="close" className={styles.delete_icon} />
            </button>
          </span>
        </>
      )}
    </li>
  );
}

export default Note;
