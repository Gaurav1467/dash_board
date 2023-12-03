import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ToolBar from './ToolBar';
import DisplayBar from './DisplayBar';
import Spinner from './Spinner';
import Navbar from './Navbar';







export default function Home({rows,setRows}) {

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [check, setCheck] = useState(false);
  const [load, setLoad] = useState(false);



  
  const handleDelete = (targetIndex) => {
    
    setRows(rows.filter((item) => item.id !== targetIndex));
    // console.log(rows.filter((item) => item.id !== targetIndex));
  };

  const handleEdit = (obj) => {
    console.log(obj);
  }




  // Function to get employees according to page size. 
  function trimArray(array) {
    const out = array.map((el, index) => [el, index]);

    return out.map((el) => el[0]);
  }




  // Function for select all display elements.
  const handleSelectAllClick = (event) => {
    if (event.target.checked && check === false) {
      const newSelected = visibleRows.map((n) => n.id);
      setSelected(newSelected);
      setCheck(true);
    }
    else {
      setCheck(false);
      setSelected([]);
    }
    return;
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows =
    trimArray(rows).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )



  return (
    load === true ? <Spinner /> :
    <div>
      <Navbar rows = {rows} setRows = {setRows} />
      <Box sx={{ width: '100%', margin: '35px 0px', marginTop: '70px' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <ToolBar selected={selected} setSelected={setSelected}rows = {rows} setRows = {setRows} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <DisplayBar
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          hover = 'true'
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align='left'>
                        <button onClick={()=>{handleEdit(row)}}><i className="fa-solid fa-pen-to-square fa-lg" ></i></button>
                        <button onClick={() => handleDelete(row.id)}><i className="fa-solid fa-trash fa-lg  "></i></button>
                      </TableCell>
                    </TableRow>



                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <footer style={{ position: "fixed", bottom: "0", backgroundColor :"white", left : '0', right : '0' }}><TablePagination
            rowsPerPageOptions={[5, 10, 25, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /></footer>
        </Paper>
      </Box>
    </div>

  );
}








