import CodeEditor from './CodeEditor'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'

function App(){
    
    //creates random id document and redirects user to it
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to = {`/documents/${uuidV4()}`} /> 
                </Route>
                <Route path="/documents/:id">
                    <CodeEditor/>
                </Route>
            </Switch>
            
        </Router>
    )
}

export default App