import { Link } from 'react-router-dom'
import './App.css'
import Button from './components/Button'
import { FaGun } from 'react-icons/fa6'

function App() {
  return (
    <div className='absolute inset-0 h-screen w-screen'>
      <Link to={'/landing'}>
        <span className='absolute right-10 bottom-10 flex items-center space-x-5  text-6xl hover:text-stone-300 duration-150'>
          <span className='font-topSecret'>ENTER BUREAU</span>
          <FaGun className='' />
          {/* <Button className=''>ENTER BUREAU</Button> */}
        </span>
      </Link>
    </div>
  )
}

export default App
