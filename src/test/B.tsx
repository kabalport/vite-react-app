import { useReducer } from 'react';

// 상태 타입 정의
type State = number;

// 액션 타입 정의
type Action = {
  type: 'DECREASE' | 'INCREASE';
  data: number;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'DECREASE':
      return state - action.data;
    case 'INCREASE':
      return state + action.data;
    default:
      throw new Error();
  }
}

export default function B() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
      <div>
        <h4>{count}</h4>
        <div>
          <button onClick={() => dispatch({ type: 'DECREASE', data: 1 })}>-</button>
          <button onClick={() => dispatch({ type: 'INCREASE', data: 1 })}>+</button>
        </div>
      </div>
  );
}
