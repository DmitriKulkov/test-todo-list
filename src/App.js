import { BrowserRouter } from 'react-router-dom';
import classes from './App.less';
import AppRoutes from './pages/AppRoutes';

function App() {

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;

