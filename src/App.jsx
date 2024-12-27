import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className=''>
      <Link to={'/landing'} className='text-4xl text-white'>
        START
      </Link>
    </main>
  )
}

export default App
