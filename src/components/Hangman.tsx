import styled from 'styled-components';

interface Props {
    counter: number;
}

const StyledHangman = styled.img`
    height: 100%;
`;

const HangmanContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 20px;
    margin: 20px 0px;
`;

const Hangman = ({ counter }: Props) => {
    return (
        <HangmanContainer>
            <div>{counter} / 10</div>

            {counter > 0 && (
                <StyledHangman
                    src={require(`assets/images/hangman-${counter}.svg`)}
                />
            )}
        </HangmanContainer>
    );
};

export default Hangman;
