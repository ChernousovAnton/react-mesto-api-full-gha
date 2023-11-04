import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to="/">Вернуться на главную</Link> 
    </>
  )
}

export default PageNotFound;