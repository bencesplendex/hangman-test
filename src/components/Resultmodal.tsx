import {
    Box,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { modalStyle } from 'styles/modal';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import Flex from './UI/Flex';

interface Props {
    open: boolean;
    closeModal: any;
}

const CloseWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const ResultModal = ({ open, closeModal }: Props) => {
    const results = JSON.parse(localStorage.getItem('hangmanResults') || '[]');

    const handleCloseModal = () => {
        closeModal(false);
    };

    return (
        <Modal open={open}>
            <Box sx={modalStyle}>
                <CloseWrapper>
                    <CloseIcon onClick={handleCloseModal}></CloseIcon>
                </CloseWrapper>
                {!!results.length && (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Error</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((row: any, i: number) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.result}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {!results.length && (
                    <Flex>No results yet, play first and then save it :)</Flex>
                )}
            </Box>
        </Modal>
    );
};

export default ResultModal;
