import { GameTypes } from 'constans/constans';
import { KeyboardInterface } from 'interface/keyboard';
import { createContext, useState } from 'react';
import words from 'assets/words/words.json';
import { keyboard } from 'assets/keyboard';
import { useEffect } from 'react';

const AppContext = createContext<ProviderTypes>({
    keyboardState: [],
    selectedWord: [],
    triedLetters: [],
    errorCounter: 0,
    difficulty: 'Easy',
    winState: false,
    transformKeyboard: () => [],
    clickKeyHandler: () => [],
    startGameHandler: () => [],
    resetGame: () => [],
    checkWin: () => [],
});
interface ProviderTypes {
    keyboardState: any[];
    selectedWord: string[];
    triedLetters: string[];
    errorCounter: number;
    difficulty: string;
    winState: boolean;
    transformKeyboard: (keyboard: string[]) => void;
    clickKeyHandler: (keyboard: KeyboardInterface) => void;
    startGameHandler: (difficulty: string) => void;
    resetGame: () => void;
    checkWin: (isWin: boolean) => void;
}

interface Props {
    children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
    const [keyboardState, setKeyBoardState] = useState<any>({});
    const [difficulty, setDifficulty] = useState('Easy');
    const [selectedWord, setSelectedWord] = useState<string[]>([]);
    const [triedLetters, setTriedLetters] = useState<string[]>([]);
    const [errorCounter, setCounter] = useState(0);
    const [winState, setWinState] = useState(false);

    const transformKeyboard = (keyboard: string[]): void => {
        const transformed = keyboard.map((item) => {
            return { key: item, active: false };
        });
        setKeyBoardState(transformed);
    };

    const clickKeyHandler = (clickedItem: KeyboardInterface) => {
        if (keyboard.includes(clickedItem.key)) {
            setKeyBoardState((state: KeyboardInterface[]) =>
                state.map((item) => {
                    if (item.key === clickedItem.key) {
                        return { key: item.key, active: true };
                    } else {
                        return item;
                    }
                })
            );
            if (!selectedWord.includes(clickedItem.key)) {
                if (errorCounter < 10) {
                    setCounter((count) => count + 1);
                }
            }
            setTriedLetters((oldArray) => [...oldArray, clickedItem.key]);
        }
    };

    const checkWin = (isWin: boolean) => {
        setWinState(isWin);
    };

    const startGameHandler = (difficulty: string) => {
        let limit = [0, 4];

        switch (difficulty) {
            case GameTypes.EASY:
                limit = [0, 5];
                break;
            case GameTypes.MEDIUM:
                limit = [6, 8];
                break;
            case GameTypes.HARD:
                limit = [9, Number.MAX_VALUE];
                break;
        }

        const selectedWords = words.filter(
            (item) => item.length > limit[0] && limit[1] > item.length
        );

        const wordArray = selectedWords[
            Math.floor(Math.random() * selectedWords.length)
        ]
            .toUpperCase()
            .split('');

        setSelectedWord(wordArray);
        setDifficulty(difficulty);
    };

    const resetGame = () => {
        startGameHandler(difficulty);
        setTriedLetters([]);
        setCounter(0);
        transformKeyboard(keyboard);
        setWinState(false);
    };

    return (
        <AppContext.Provider
            value={{
                keyboardState,
                selectedWord,
                triedLetters,
                errorCounter,
                difficulty,
                winState,
                transformKeyboard,
                clickKeyHandler,
                startGameHandler,
                resetGame,
                checkWin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;
