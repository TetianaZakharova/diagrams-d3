import { NavTabs } from "./nav/NavTabs";
import { RoutesComponent } from './routes/RoutesComponent';
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="tab-container">
        <NavTabs />
        <RoutesComponent />      
      </div>
    </div>
  );
}

export default App;
