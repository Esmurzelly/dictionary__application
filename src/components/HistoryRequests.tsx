import { useSelector, useDispatch } from 'react-redux';
import { addHistoryWord, clearHistoryWord } from '@/store/historyRequests';


type Props = {
  arrWords: Array<string>
}

const HistoryRequests = ({ arrWords }: Props) => {
  const historyWords = useSelector((state: any) => state.history.history);
  const dispatch = useDispatch();

  const addHistoryWordFunction = (item: string) => {
    dispatch(addHistoryWord(item))
}
const clearHistoryWordFunction = () => {
    dispatch(clearHistoryWord())
}

  return (
    <div className='mt-5 max-w-7xl mx-auto'>
      HistoryRequests
      {arrWords.map((item, index) => (
        <p key={index}>{item}</p>
      ))}

      <button
        className='bg-blue-500 w-[200px] py-1 px-2 rounded-sm text-white'
        onClick={() => clearHistoryWordFunction()}
      >
        Очистить историю
      </button>
    </div>
  )
}

export default HistoryRequests