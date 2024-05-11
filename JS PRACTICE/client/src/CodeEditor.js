import React, {useEffect, useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import CodeMirror from "codemirror"
import io from 'socket.io-client'
import {useParams} from 'react-router-dom'

const CodeEditor = () => {
  const {id: documentId} = useParams()
 
  useEffect(() => {
    //text editor properties
    const editor = CodeMirror.fromTextArea(
      document.getElementById('codemirror'), 
      {
        lineNumbers: true,
        keymap: 'sublime',
        theme: 'material',
        autoCloseTags: true,
        autoCloseBrackets: true,
        mode: 'python',
      }
    )
    
    editor.setSize(null, "100%")

    //sets websocket
    const socket = io('http://localhost:3001/', {
      transports: ['websocket']
    })

    if (socket == null) return

    //if a document is on the same id it will set the data
    socket.once("load-document", data => {
      editor.setValue(data)
      
    })
    //sends out document id
    socket.emit('get-doc', documentId)


    //sends out changes
    editor.on('change', (instance, changes) => {
      const {origin} = changes
      if (origin !== 'setValue') {
        socket.emit('send-changes', instance.getValue())
      }
    })

    
    //recieves changes and inserts them into the doc
    socket.on('receive-changes', delta => {
      editor.setValue(delta)
    })

  }, [])

  return (
    <div className = "editor_container">
      <div className = "editor-Title">
        Using python
      </div>
      <div style = {{height: "600px"}}>
        <textarea id="codemirror"></textarea>
      </div>
    </div>
    
  )
}

export default CodeEditor