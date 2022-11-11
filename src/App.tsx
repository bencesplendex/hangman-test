import './App.css';
import GamePage from 'components/pages/GamePage';
import { AppProvider } from 'components/context/AppContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'components/pages/HomePage';
import Container from 'components/UI/Container';

function App() {
    return (
        <Container>
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index path="/" element={<HomePage />}></Route>
                        <Route path={'/game'} element={<GamePage />}></Route>
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </Container>
    );
}

export default App;
