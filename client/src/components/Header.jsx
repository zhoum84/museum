import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const onPress = () =>{
    navigate('/');
  }
  return (
    <header className='header'>
      <div className='logo'>
      Museums
      </div>
      <ul>
          <li>
              <button className='btn hovPurp' onClick={onPress}> 
                <FaHome /> Home
              </button>
            </li>
      </ul>
    </header>
  )
}

export default Header