import React, {useEffect, useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import CodeMirror from "codemirror"
import io from 'socket.io-client'
//import { Controlled as ControlledEditor} from 'react-codemirror2'

const CodeEditor = () => {
  
  useEffect(() => {
    //text editor properties
    const editor = CodeMirror.fromTextArea(
      document.getElementById('codemirror'), 
      {
        lineNumbers: true,
        keymap: 'sublime',
        theme: 'material',
        mode: 'python',
      }
    )
    
    //sends out changes
    editor.on('change', (instance, changes) => {
      const {origin} = changes
      if (origin !== 'setValue') {
        socket.emit('send-changes', instance.getValue())
      }
    })

    //sets websocket
    const socket = io('http://localhost:3001/', {
      transports: ['websocket']
    })

    //recieves changes and inserts them into the doc
    socket.on('receive-changes', delta => {
      editor.setValue(delta)
    })

  }, [])


  return (
    <div>
      <textarea id="codemirror"/>
    </div>
  )
}

export default CodeEditor