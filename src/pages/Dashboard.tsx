import Board from '../components/board/Board';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const Dashboard = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Board />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
