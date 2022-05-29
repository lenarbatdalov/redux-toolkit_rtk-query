import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {countSlice} from "./store/reducers/CountSlice";
import {fetchUsers} from "./store/reducers/ActionCreators";
import PostContainer from "./components/PostContainer";

function App() {
  const dispatch = useAppDispatch()

  const {count} = useAppSelector(state => state.countReducer)
  const {increment} = countSlice.actions

  const {users, isLoading, error} = useAppSelector(state => state.userReducer)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  return (
    <div className="App">
      <div className='counter'>
        <h1>{count}</h1>
        <button
          onClick={() => dispatch(increment(1))}
        >Increment</button>
      </div>
      <hr/>
      <div className='users'>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>{error}</h1>}
        {users.map(user =>
          <div
            key={user.id}
          >{user.name} - {user.email}</div>
        )}
      </div>
      <hr/>
      <PostContainer/>
    </div>
  );
}

export default App;
