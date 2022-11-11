import { useEffect } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import AppContext from './context/AppContext';
import Flex from './UI/Flex';

const StyledLetters = styled.div`
    border-bottom: 1px solid black;
    width: 40px;
    margin: 10px;
`;
const Guess = () => {
    const { selectedWord, triedLetters, checkWin } = useContext(AppContext);

    const checker = (arr: string[], target: string[]) =>
        target.every((v) => arr.includes(v));

    useEffect(() => {
        checkWin(checker(triedLetters, selectedWord));
    }, [triedLetters, selectedWord]);

    return (
        <Flex margin={'50px 0px'} justifyCenter>
            {selectedWord.map((letter, i) => (
                <StyledLetters key={i}>
                    {triedLetters.includes(letter) ? letter : ''}
                </StyledLetters>
            ))}
        </Flex>
    );
};

export default Guess;
