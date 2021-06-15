import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { setIds } from '../store/reducers/ids.reducer';
import { setIdsCookie } from '../utils/IdsCookie';

const IdTable: VFC = () => {
  const dispatch = useAppDispatch();
  const ids = useSelector((state: RootState) => state.ids);

  const handleRemove = (value: string) => {
    const newIds = ids.filter(({ value: _value }) => _value !== value);

    dispatch(setIds(newIds));
    setIdsCookie(newIds);
  };

  if (!ids.length) return <div className='text-center'>No IDs found.</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align='right' />
          </TableRow>
        </TableHead>
        <TableBody>
          {ids.map(({ type, value }) => (
            <TableRow key={value}>
              <TableCell>{value}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell align='right'>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => handleRemove(value)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IdTable;
