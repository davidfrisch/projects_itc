import { Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";

const LastConnectionsTable = ({ lastConnections }) => {
    
    const columns = [
        { field: 'lastConnection', headerName: 'Last Connection', flex: 1 },
        { field: 'ip', headerName: 'IP address', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'signUpDate', headerName: 'Sign Up date', flex: 1 },
    ];

    const rows = lastConnections.map((log) => {
        return {
            id: log._id,
            ip: log.ip || 'No IP yet',
            lastConnection: log.lastConnection || 'Not available',
            signUpDate: log.signUpDate || 'Not available',
            email: log.email,
        }
    })

    return (
        <div style={{ height: 500, width: '100%', marginBottom: 80, backgroundColor: '#fff' }}>
            <Typography variant="h3">Abour users</Typography>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
}

export default LastConnectionsTable;