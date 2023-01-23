import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"


export default function App() {
 
    const [notes, setNotes] = React.useState(()=>JSON.parse( localStorage.getItem("note")) 
    || []) 
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
       React.useEffect(
    ()=>{
      
      localStorage.setItem("note",JSON.stringify(notes))
    }
   ,[notes])
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

     function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    
    
    setNotes(oldNotes=>{
        let newArr=[]
        for (let i = 0; i < oldNotes.length; i++) {
           if ( oldNotes[i].id === currentNoteId) {
            newArr.unshift(oldNotes[i])
        } else{
            newArr.push(oldNotes[i])
        }     
        }
        return newArr;
     })
}

    function deleteNote(event, noteId) {
        event.stopPropagation();
            setNotes( oldNotes=>oldNotes
                .filter(note=>note.id !== currentNoteId)  
          
            )
          
        }
   
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
