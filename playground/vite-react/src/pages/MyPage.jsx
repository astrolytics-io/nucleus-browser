import { Link } from 'react-router-dom';

export default function MyPage() {
  return (
    <div className='my-12'>
      <Link to="/">← Home</Link>
      <h1 className='mt-12'>
        My page
      </h1>
    </div>
  );
}
