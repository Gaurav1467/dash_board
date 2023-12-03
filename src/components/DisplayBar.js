import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';


function DisplayBar(props) {
    const { onSelectAllClick, numSelected, rowCount } =
        props;

    const headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'role',
            numeric: false,
            disablePadding: false,
            label: 'Role',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: true,
            label: 'Action',
        },
    ];

    


    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align="left"
                            padding="normal"

                        >
                            {headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </>
    );
}

export default DisplayBar