import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import { motion } from 'framer-motion';

import { Table } from 'reactstrap';

import Loader from '../loader/loader.component';

import BpmContext from '../../contexts/bpm.context';
import './entries.styles.scss';

const Entries = ({ isLoading }) => {
    const { entries } = useContext(BpmContext);

    if (!isLoading && entries) {
        return (
            <motion.div className="entries-container"
                animate={{ y: -25 }} transition={{ duration: 0.5 }}
            >
                {!entries.length ? (
                    <div className='no-entries-message'>
                        <h3>You currently have no bpm entries</h3>
                        <h3>Click the plus sign to add an entry</h3>
                    </div>
                ) : (
                        <Table className='table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Blood Pressure</th>
                                    <th>Blood Glucose</th>
                                    <th>Weight</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entries.map(entry => (
                                        <React.Fragment key={entry.id}>
                                            <tr>
                                                <td>{
                                                    moment(entry.date).format('M/D/YYYY LT')
                                                }</td>
                                                <td>{entry.systolic}/{entry.diastolic}</td>
                                                <td>{entry.glucose}</td>
                                                <td>{entry.weight}</td>
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
                    )}
            </motion.div>
        )
    } else {
        return (
            <div className='homepage'>
                <Loader />
            </div>
        )
    }
}

export default Entries;