import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPets } from "../../../actions/pet";
import useStyles from '../styles'

const DataGridOfPets = ({ handleOpenModal }) => {

    const { pets } = useSelector(state => state.pets)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const classes = useStyles()
    useEffect(() => {
        if (pets.length > 0) {
            let newRows = pets.map((pet) => {
                return { id: pet._id, picture: pet.picture, idPokedex: pet.idPokedex, type: pet.type.join(', '), name: pet.name, adoptionStatus: pet.adoptionStatus, adoptionOwner: pet.adoptionOwner }
            })
            setRows(newRows)
        } else {
            dispatch(getPets(''))
        }
    }, [pets.length])

    const columns = [
        { field: 'idPokedex', headerName: 'Pokedex', flex: 0.1 },
        {
            field: "picture",
            headerName: "Picture",
            sortable: false,
            renderCell: (params) => {
                const api = params.api;
                const thisRow = {};

                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );
                return <img src={thisRow.picture} alt='pokemon' height="50px" width="50px" />;
            }
        },
        { field: 'name', headerName: 'Name', flex: .2 },
        { field: 'adoptionStatus', headerName: 'Adoption Status', flex: .1 },
        { field: 'adoptionOwner', headerName: 'Owner', flex: .1 },

        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    navigate('/pet/' + thisRow.idPokedex)
                };

                return <Button onClick={onClick} >See pet</Button>;
            }
        },
    ];

    return (

        <div className={classes.petsAdminContainer}>
            <Typography variant="h2">All Pets</Typography>
            <Grid item md={12} style={{ height: 650, width: '100%', backgroundColor: '#fff', marginBottom: '10px' }}>
                {rows.length > 0 &&
                    (<DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />)
                }
            </Grid>
            <Button variant="contained" onClick={handleOpenModal}> Create Pet </Button>
        </div>);
}

export default DataGridOfPets;