import React, { ChangeEventHandler, EventHandler, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import './Notes.css'

type NotesProps = {

}

export const Notes = ({ }: NotesProps) => {
    const [notes, setNotes] = useState("")

    marked.setOptions({
        breaks: true,
        gfm: true
    })

    marked.use({
        renderer: {
            heading(text, level) {
                const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

                return `<input class="h${level}" value="${text}"/>`;
            }
        }
    })

    const markdown = DOMPurify.sanitize(marked.parse(notes))

    const onTextInput: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setNotes(event.target.value)
    }

    return (
        <div>
            <textarea onChange={onTextInput} />
            <div className="notes-container" dangerouslySetInnerHTML={{ __html: markdown }} />
            <h1>text</h1>
            <div>
                {markdown}
            </div>
        </div>
    )
}
