import { Button,  Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import * as api from '../../../../api'
import ProfileInfo from "../../../UserProfile/ProfileInfo/ProfileInfo";
import UserFormForAdmin from "./UserFormForAdmin";
import { useDispatch } from "react-redux";
import { UPDATE_USER } from "../../../../constants/actionTypes";
import useStyles from './style'

const DataGridOfUser = ({ user, setSelectedUser }) => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
    const classes = useStyles()

    const getsPetsOfUser = async (user) => {
        const { data } = await api.getPetsByUserId(user._id)
        const { listOfPetsAdopted, listOfPetsFostered } = data
        return [...listOfPetsAdopted, ...listOfPetsFostered]
    }

    useEffect(() => {
        setIsLoading(true)
        setRows([])
        getsPetsOfUser(user)
            .then((allPetsOfUser) => {
                // eslint-disable-next-line array-callback-return
                allPetsOfUser.map((pet) => {
                    const rowPet = { id: pet._id, idPokedex: pet.idPokedex, type: pet.type.join(', '), name: pet.name, adoptionStatus: pet.adoptionStatus }
                    setRows((prev) => [...prev, rowPet])
                })
                setIsLoading(false)
            })

    }, [user._id])


    const columns = [
        { field: 'idPokedex', headerName: 'Pokedex', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'adoptionStatus', headerName: 'Adoption Status', flex: 1 },
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

                return <Button onClick={onClick} variant='contained'>See pet</Button>;
            }
        },
    ];

    const closeProfile = () => { dispatch({ type: UPDATE_USER, payload: null }) }
    return (
        <>
            {rows && !isLoading &&
                <div className={classes.paperProfile}>
                    <Typography variant="h3">Selected User:</Typography>
                    <div className={classes.headerProfilInfo}>
                        <Button variant="contained" onClick={closeProfile}>Close</Button>
                    </div>
                    <Grid container className={classes.containerInfoProfile}>
                        <Grid item md={12} xl={rows.length > 0 ? 6 : 12}>
                            <div>
                                <UserFormForAdmin user={user} />
                                <ProfileInfo user={user} />
                            </div>
                        </Grid>

                        {rows.length > 0 &&
                            <Grid item md={12} xl={6} style={{ height: 500, width: '100%', backgroundColor: '#fff' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Grid>}
                    </Grid>
                </div>
            }

        </>
    );
}

export default DataGridOfUser;