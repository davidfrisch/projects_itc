import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import FavoritePetsBarPlot from './Graphs/FavoritePetsBarPlot';
import LastConnectionsTable from './Graphs/LastConnectionsTable';
import LastTransactionsTable from './Graphs/LastTransactionsTable';
import PetsAdoptionStatusChart from './Graphs/PetsAdoptionStatusChart';
import { useStatistics } from './useStatistics';
import useStyles from '../styles'

const processDataForStats = (data) => {
    //x-axis - timestamp from to 
    const dataPerDate = data.map((transaction) => ({ ...transaction, timestamp: transaction.timestamp.split('T')[0] }))

    const dataPerCountDate = dataPerDate.map((transaction) => {
        const countAdoptFosterPerDay = dataPerDate.filter((tempTra) => tempTra.timestamp === transaction.timestamp && ['adopt', 'foster'].includes(tempTra.action)).length
        const countReturnedPetsPerDay = dataPerDate.filter((tempTra) => tempTra.timestamp === transaction.timestamp && 'return' === tempTra.action).length
        return { timestamp: transaction.timestamp, countAdoptFosterPerDay, countReturnedPetsPerDay }
    })

    const uniques = dataPerCountDate.filter((v, i, a) => a.findIndex(t => (t.timestamp === v.timestamp)) === i)

    for (let i = 0; i < uniques.length; i++) {
        if (i === 0) {
            uniques[i]['diff'] = uniques[i].countAdoptFosterPerDay - uniques[i].countReturnedPetsPerDay
        } else {
            uniques[i]['diff'] = uniques[i - 1].diff + (uniques[i].countAdoptFosterPerDay - uniques[i].countReturnedPetsPerDay)
        }
    }

    return uniques
}

const getTodayConnections = (lastConnections) => {
    const dataPerDate = lastConnections.map((transaction) => ({ ...transaction, lastConnection: transaction.lastConnection.split('T')[0] }))
    const today = new Date().toISOString()
    return dataPerDate.filter((user) => user.lastConnection === (today.split('T')[0]))

}

const StatisticsPage = () => {

    const { getStatistics, response, isPending, error } = useStatistics()
    const [dataForLineChart, setDataForLineChart] = useState(null)
    const [numberOfConnectionsToday, setNumberOfConnectionsToday] = useState(0)

    const classes = useStyles()
    useEffect(() => {
        getStatistics()
    }, [])

    useEffect(() => {
        if (!response.data) return

        const data = processDataForStats([...response.data.adoptedOrFosteredPets, ...response.data.returnedPets])
        setNumberOfConnectionsToday(() => getTodayConnections(response.data.lastConnections).length)
        setDataForLineChart(data)
    }, [response.data])

    return (<div>
        <Typography variant="h2">Statistics</Typography>
        <Container className={classes.todaySummary}>
            <Typography variant="h3">Today's summary</Typography>

            {!isPending &&
                <Container>
                    {dataForLineChart ? (
                        <>
                            <Typography variant="body">Number of pets adopted or fostered today: {dataForLineChart?.at(-1).countAdoptFosterPerDay} </Typography>
                            <br />
                            <Typography variant="body">Number of pets returned today: {dataForLineChart?.at(-1).countReturnedPetsPerDay}</Typography>
                            <br />
                            <Typography variant="body">Number of user connected today: {numberOfConnectionsToday}</Typography>
                        </>

                    ) : (
                        <Typography variant="body">Data not retrieved</Typography>

                    )}
                </Container>}

        </Container>

        {/* {error !== {} & <div>error.toString()</div>} */}
        {/* {!isPending && <div>{response.toString()}</div>}
        {!isPending && <div>{error}</div>} */}
        <Container>
            <Typography variant="h3">Graphs</Typography>

            {!isPending && dataForLineChart && <PetsAdoptionStatusChart data={dataForLineChart} />}
            {!isPending && response?.data?.favoritePets && <FavoritePetsBarPlot favoritePets={response.data.favoritePets} />}
            {!isPending && response?.data?.lastTransactions && <LastTransactionsTable lastTransactions={response.data.lastTransactions} />}
            {!isPending && response?.data?.lastConnections && <LastConnectionsTable lastConnections={response.data.lastConnections} />}

        </Container>
    </div>);
}

export default StatisticsPage;