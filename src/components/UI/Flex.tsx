import { FlexboxInterface } from 'interface/flexbox';
import styled from 'styled-components';

interface FlexType extends FlexboxInterface {
    margin?: string;
    padding?: string;
    color?: string;
    weight?: number;
    size?: number;
    width?: string;
    height?: string;
}

const Flex = styled.div<FlexType>`
    display: flex;
    ${({ row }) => row && 'flex-direction: row;'}
    ${({ column }) => column && 'flex-direction: column;'}

	margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    color: ${(props) => props.color};
    font-weight: ${(props) => props.weight};
    font-size: ${(props) => props.size}px;
    width: ${(props) => props.width};
    height: ${(props) => props.width};

    flex-wrap: ${(props) => {
        if (props.wrapReverse) return 'wrap-reverse';
        else if (props.noWrap) return 'nowrap';
        return 'wrap';
    }};
    justify-content: ${(props) => {
        if (props.justifyStart) return 'flex-start';
        else if (props.justifyCenter) return 'center';
        else if (props.justifyAround) return 'space-around';
        else if (props.justifyBetween) return 'space-between';
        else if (props.justifyEnd) return 'flex-end';
    }};
    align-items: ${(props) => {
        if (props.alignStart) return 'flex-start';
        else if (props.alignStretch) return 'stretch';
        else if (props.alignEnd) return 'flex-end';
        if (props.alignCenter) return 'center';
        else if (props.alignBaseline) return 'baseline';
    }};
    align-content: ${(props) => {
        if (props.contentStart) return 'flex-start';
        else if (props.contentEnd) return 'flex-end';
        else if (props.contentCenter) return 'center';
        else if (props.contentBetween) return 'space-between';
    }};
`;

export default Flex;
