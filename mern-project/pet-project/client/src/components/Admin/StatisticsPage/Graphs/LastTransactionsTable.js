import { useDispatch } from "react-redux";
import { Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";

const LastTransactionsTable = ({ lastTransactions }) => {

    const columns = [
        { field: 'timestamp', headerName: 'Date', flex: 1 },
        { field: 'userId', headerName: 'User', flex: 1 },
        { field: 'action', headerName: 'Action', flex: 1 },
        { field: 'petId', headerName: 'Pet', flex: 1 },
    ];


    const rows = lastTransactions.map((transaction) => {
        return { id: transaction._id, timestamp: transaction.timestamp, userId: transaction.userId, action: transaction.action, petId: transaction.petId }
    })

    return (
        <div style={{ height: 500, width: '100%', marginBottom: 80, backgroundColor: '#fff' }}>
            <Typography variant="h3">Last Transactions</Typography>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
}

export default LastTransactionsTable;