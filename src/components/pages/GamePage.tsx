import { Box, Modal } from '@mui/material';
import AppContext from 'components/context/AppContext';
import Guess from 'components/Guess';
import Hangman from 'components/Hangman';
import Keyboard from 'components/Keyboard';
import ResultModal from 'components/Resultmodal';
import Button from 'components/UI/Button';
import Flex from 'components/UI/Flex';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { modalStyle } from 'styles/modal';

const GameWrapper = styled.div`
    outline: none;
`;

const GamePage = () => {
    const {
        errorCounter,
        difficulty,
        winState,
        selectedWord,
        resetGame,
        clickKeyHandler,
    } = useContext(AppContext);

    const navigate = useNavigate();
    const wrapperDiv = useRef<HTMLDivElement>(document.createElement('div'));
    const [playerName, setPlayerName] = useState('');
    const [openResultModal, setOpenResultModal] = useState(false);
    const navigateHome = () => {
        resetGame();
        navigate('/');
    };

    const saveResult = () => {
        const results = JSON.parse(
            localStorage.getItem('hangmanResults') || '[]'
        );
        if (playerName.length) {
            results.push({ name: playerName, result: errorCounter });
            localStorage.setItem('hangmanResults', JSON.stringify(results));
            resetGame();
        }
    };

    const openResults = () => {
        setOpenResultModal(true);
    };

    const closeResultModal = (bool: boolean) => {
        console.log(bool);
        setOpenResultModal(bool);
    };

    const keyCounter = (e: any) => {
        if (!winState) {
            clickKeyHandler({ key: e.key.toUpperCase(), active: false });
        }
    };

    useEffect(() => {
        wrapperDiv.current.focus();
    }, []);

    return (
        <GameWrapper
            onKeyDown={(e) => keyCounter(e)}
            tabIndex={-1}
            ref={wrapperDiv}
        >
            <Flex column>
                <Flex justifyBetween>
                    <Button onClick={navigateHome} text={'Home'} />
                    <Flex>Difficulty level: {difficulty}</Flex>
                    <Flex>
                        <Button onClick={resetGame} text={'Reset'} />
                        <Button
                            onClick={openResults}
                            text={'Saved results'}
                        ></Button>
                    </Flex>
                </Flex>
                <Guess></Guess>
                <Hangman counter={errorCounter}></Hangman>
                <Keyboard />
                {openResultModal && (
                    <ResultModal
                        open={openResultModal}
                        closeModal={closeResultModal}
                    ></ResultModal>
                )}
                <Modal open={errorCounter === 10}>
                    <Box sx={modalStyle}>
                        <Flex>You lost! </Flex>
                        <Flex>The word was {selectedWord}.</Flex>
                        <Button text={'Try again'} onClick={resetGame}></Button>
                    </Box>
                </Modal>
                <Modal open={winState}>
                    <Box sx={modalStyle}>
                        <Flex>
                            You won the game with {errorCounter} errors.
                        </Flex>
                        <Flex>Wanna save your result?</Flex>
                        <input
                            type="text"
                            onChange={(e) => setPlayerName(e.target.value)}
                        ></input>
                        <Button text={'Save'} onClick={saveResult}></Button>
                        <Button text={'Try again'} onClick={resetGame}></Button>
                    </Box>
                </Modal>
            </Flex>
        </GameWrapper>
    );
};

export default GamePage;
