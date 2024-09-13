import { store } from "./app/store"
import Todo from "./components/Todo"
import { Provider } from "react-redux"
import "./index.css"

function App() {
  return (
    <>
      <Provider store={store}>
        <Todo/>
      </Provider>
    </>
  )
}

export default App
