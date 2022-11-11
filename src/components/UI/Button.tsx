import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background: var(--button);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: 16px;
`;

interface Props {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, onClick }: Props) => {
    return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
