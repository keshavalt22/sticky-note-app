import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const addNote = async () => {
        if (newNote.trim() === '') return;

        try {
            if (editingNoteId) {
                // Update existing note
                await axios.put(`http://localhost:5000/notes/${editingNoteId}`, { content: newNote });
                setEditingNoteId(null);
            } else {
                // Add new note
                await axios.post('http://localhost:5000/notes', { content: newNote });
            }

            setNewNote('');
            fetchNotes();
        } catch (error) {
            console.error('Error adding/updating note:', error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const updateNote = async () => {
        if (newNote.trim() === '') return;

        try {
            await axios.put(`http://localhost:5000/notes/${editingNoteId}`, { content: newNote });
            setEditingNoteId(null);
            setNewNote('');
            fetchNotes();
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const startEditingNote = (noteId, noteContent) => {
        setEditingNoteId(noteId);
        setNewNote(noteContent);
    };

    return (
        <div className="App">
            <h1>Sticky Notes</h1>
            <div className='center'>
                <textarea
                    placeholder="Type your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />
                <button className='add-btn' onClick={addNote}>Add Note</button>
            </div>
            <div className="note-container">
                {notes.map((note) => (
                    <div key={note._id} className="note">
                        {editingNoteId === note._id ? (
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                            />
                        ) : (
                            <p>{note.content}</p>
                        )}
                        <div>
                            <button className='delete-button' onClick={() => deleteNote(note._id)}>
                                Delete
                            </button>
                            {editingNoteId === note._id ? (
                                <button className='update-button' onClick={updateNote}>
                                    Update
                                </button>
                            ) : (
                                <button className='edit-button' onClick={() => startEditingNote(note._id, note.content)}>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

