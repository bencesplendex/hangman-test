import { keyboard } from 'assets/keyboard';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import AppContext from './context/AppContext';
import Flex from './UI/Flex';

const KeyButton = styled.button`
    width: 40px;
    height: 40px;
    margin: 10px;
`;

const Keyboard = () => {
    const { keyboardState, transformKeyboard, clickKeyHandler } =
        useContext(AppContext);

    useEffect(() => {
        transformKeyboard(keyboard);
    }, []);

    return (
        <Flex>
            {keyboardState.length &&
                keyboardState.map((item, i) => (
                    <KeyButton
                        disabled={item.active}
                        key={i}
                        onClick={() => clickKeyHandler(item)}
                    >
                        {item.key}
                    </KeyButton>
                ))}
        </Flex>
    );
};

export default Keyboard;
