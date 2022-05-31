import Board from '../components/board/Board';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { ListContextProvider } from '../context/ListContext';
import { TaskContextProvider } from '../context/TaskContext';

const Dashboard = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <ListContextProvider>
          <TaskContextProvider>
            <Board />
          </TaskContextProvider>
        </ListContextProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
