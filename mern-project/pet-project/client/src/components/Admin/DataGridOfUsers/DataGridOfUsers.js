import { Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux';
import { UPDATE_USER } from '../../../constants/actionTypes';
import { ROLE } from '../../../constants/roles'



const DataGridOfUsers = ({ users }) => {
    const dispatch = useDispatch()

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
        },
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
                    const selectedUser = users.find((user) => user._id === thisRow.id)
                    dispatch({ type: UPDATE_USER, payload: selectedUser })
                };

                return <Button onClick={onClick}>Open</Button>;
            }
        },
    ];


    const rows = users.map((user) => {

        let roleName;
        switch (user.role) {
            case ROLE.USER:
                roleName = 'USER'
                break
            case ROLE.ADMIN:
                roleName = 'ADMIN'
                break
            default:
                roleName = 'NOT SET'
        }

        return { id: user._id, role: roleName, firstName: user.firstName, lastName: user.lastName, email: user.email }
    })

    return (
        <div style={{ height: 500, width: '100%',  marginBottom: 80, backgroundColor: '#fff' }}>
            <Typography variant="h2">All Users</Typography>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
}

export default DataGridOfUsers;