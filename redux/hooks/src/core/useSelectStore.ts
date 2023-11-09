import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";


export function useSelectStore(reducerName: string) {
  useSelector(state => {
    return state[reducerName];
  });

}
