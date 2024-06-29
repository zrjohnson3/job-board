'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import { forwardRef } from 'react'
import { EditorProps } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Dynamic import of the Editor component from react-draft-wysiwyg - forces the component to be rendered client-side only
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

export default forwardRef<Object, EditorProps>(function RichTextEditor(
    props, ref
) {
    return (
        <Editor
            {...props}
            editorClassName='border border-black bg-white px-2 rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focys-within:ring-offset-2 '
            toolbar={{
                options: ['inline', 'list', 'textAlign', 'link', 'history'],
            }}
        />
    )
}
)
