import AppContext from 'components/context/AppContext';
import Button from 'components/UI/Button';
import Flex from 'components/UI/Flex';
import { gameTypes } from 'constans/constans';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { startGameHandler } = useContext(AppContext);
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('Easy');

    const startGame = () => {
        navigate('/game');
        startGameHandler(difficulty);
    };

    const changeDifficulty = (item: string) => {
        setDifficulty(item);
    };

    return (
        <Flex height={'100vh'} column alignCenter justifyCenter>
            <select onChange={(e) => changeDifficulty(e.target.value)}>
                {gameTypes.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <Flex margin={'40px 0px'}>
                <Button
                    text={'Start game'}
                    onClick={() => startGame()}
                ></Button>
            </Flex>
            <Flex>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
            </Flex>
        </Flex>
    );
};

export default HomePage;
