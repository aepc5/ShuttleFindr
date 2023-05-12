import './App.css';
import MapComponent from './components/MapComponent';
import Interface from './components/Interface';
import { ContextProvider } from './helper/context'


function App() {
  return (
    <div className="App">
      <div className="page-wrapper">
        <h1 className='header'>Harvard ShuttleFindr</h1>
        <ContextProvider>
          <Interface />
          <MapComponent />
        </ContextProvider>
      </div>
    </div>
  );
}

export default App;