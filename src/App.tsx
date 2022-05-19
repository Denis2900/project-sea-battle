import FieldControl from './components/FieldControl/FieldControl';
import Header from './components/Header/Header';
import ModalWindow from './components/modal-window/ModalWindow';
import './style.css'
function App() {
  return (
    <div className='container'>
      <ModalWindow></ModalWindow>
      <Header></Header>
      <FieldControl></FieldControl>
    </div>
  );
}
export default App;
