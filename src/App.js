import logo from './logo.svg';
import './styles/App.scss';
import Navigator from './storage/routes';


function App() {

  // sessionStorage.setItem("isLoggedIn", false)

  return (
    <div className="App">
      <Navigator/>
    </div>
  );
}

export default App;
