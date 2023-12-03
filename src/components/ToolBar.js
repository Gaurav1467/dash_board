import React from 'react'
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete';

// Toolbar components for select the display element and delete the selected elements.

    function ToolBar(props) {
    const { selected, setSelected,  rows, setRows } = props;


    const handelDelete = ( arr ) =>{

        setRows(rows.filter((item) => !selected.includes(item.id)));

    setSelected([]);
    }
    return (

        <>

            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(selected.length > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                    
                }}
            >
                {selected.length > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {selected.length} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Employees
                    </Typography>
                )}

                {selected.length > 0 && (
                    <Tooltip title="Delete" onClick={()=> handelDelete(selected)}>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </>
    )
}

export default ToolBar