import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import moment from 'moment';
import { motion } from 'framer-motion';

import { Table } from 'reactstrap';

import BpmContext from '../../contexts/bpm.context';

import './days.styles.scss';

const Days = ({ days }) => {
    const { entries } = useContext(BpmContext);
    const [prevDays, setPrevDays] = useState(days);
    const [numDays, setNumDays] = useState(days);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [dateFromToday, setDateFromToday] = useState('');
    const history = useHistory();

    // Push to Entries if days is undefined
    useEffect(() => {
        if (!days) {
            history.push('/entries')
        }
    }, [])

    // Calculate date from today
    useEffect(() => {
        const getDateFromToday = async () => {
            let result = await moment().subtract(numDays, 'days');
            setDateFromToday(result);
        }
        getDateFromToday();
    }, [prevDays]);

    // Filter entries by date
    useEffect(() => {
        if (dateFromToday && entries && entries.length) {
            setFilteredEntries(
                entries.filter(entry => moment(entry.date).isSameOrAfter(dateFromToday))
            )
        }
    }, [dateFromToday])

    // Render Days component if sevenDays variable changes
    if (days !== prevDays) {
        setNumDays(days);
        setPrevDays(days);
    }

    // Calculate averages
    const getAverage = (type) => {
        if (filteredEntries.length) {
            const total = filteredEntries.reduce(
                (accumulator, entry) => accumulator + parseInt(entry[type])
                , 0
            );
            return total / filteredEntries.length;
        }
    }

    // Get averages results
    const sysAvg = Math.round(getAverage('systolic'));
    const diaAvg = Math.round(getAverage('diastolic'));
    const glucoseAvg = Math.round(getAverage('glucose'));
    const weightAvg = Math.round(getAverage('weight'));

    if (filteredEntries.length) {
        return (
            <motion.div className="days-container"
                animate={{ y: 10 }} transition={{ duration: 0.5 }}>
                {
                    (days === 7) ?
                        <motion.h5
                            className='bp-average-message'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >7 Days BP Avg:  {sysAvg} / {diaAvg}, Blood Glucose Avg: {glucoseAvg}, Weight Avg: {weightAvg}</motion.h5>
                        :
                        <motion.h5
                            className='bp-average-message'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >30 Days BP Avg:  {sysAvg} / {diaAvg}, Blood Glucose Avg: {glucoseAvg}, Weight Avg: {weightAvg}</motion.h5>
                }
                <Table className='table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>BP</th>
                            <th>Glucose</th>
                            <th>Weight</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredEntries.map(entry => (
                                <React.Fragment key={entry.id}>
                                    <tr>
                                        <td>{
                                            moment(entry.date).format('M/D/YYYY LT')
                                        }</td>
                                        <td><span className={entry.systolic > sysAvg ? 'aboveAvg' : ''}>{entry.systolic}</span>/<span className={entry.diastolic > diaAvg ? 'aboveAvg' : ''}>{entry.diastolic}</span></td>
                                        <td className={entry.glucose > glucoseAvg ? 'aboveAvg' : ''}>{entry.glucose}</td>
                                        <td className={entry.weight > weightAvg ?'aboveAvg' : ''}>{entry.weight}</td>
                                        <td>
                                            <Link className='icon-btn'
                                                to={`/editentryform/${entry.id}`}>
                                                <i className='fas fa-pencil-alt pencil-icon'></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='table-note' colSpan="12">
                                            {entry.notes}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                        }
                    </tbody>
                </Table>
            </motion.div>
        );
    } else {
        return (
            <div className="entries-container">
                <div className='no-entries-message'>
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ y: 25, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        There are no bpm entries in the last {numDays} days
                        </motion.h4>
                </div>
            </div>
        )
    }
};

export default Days;