import styleLogTable from './LogTable.module.css';
import { useEffect, useState } from 'react';
import { getLogs, createLog, deleteLog } from '../../services/firebase-services';

export function LogTable() {
    const [logs, setLogs] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        async function fetchLogs() {
            const data = await getLogs();
            if (data) {
                setLogs(data);
            }
        }
        fetchLogs();

        const interval = setInterval(fetchLogs, 2000);
        
        return () => clearInterval(interval);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            await createLog(newMessage);
            const data = await getLogs();
            setLogs(data);
            setNewMessage("");
        }
    };

    const handleDelete = async (id) => {
        await deleteLog(id);
        const data = await getLogs();
        setLogs(data);
    };

    return (
        <div className={styleLogTable.logsComponent}>
            <h1>Logs</h1>
            <form onSubmit={onSubmit} className={styleLogTable.form}>
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Enter log message" 
                    required 
                    className={styleLogTable.input}
                />
                <button type="submit" className={`${styleLogTable.btn} ${styleLogTable.btnOrange}`}>Aggiungi Log</button>
            </form>
            <table className={styleLogTable.table}>
                <thead className={styleLogTable.thead}>
                    <tr>
                        <th>ID</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody className={styleLogTable.tbody}>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.message}</td>
                            <td>{log.date}</td>
                            <td>
                                <button onClick={() => handleDelete(log.id)} className={`${styleLogTable.btn} ${styleLogTable.btnDelete}`}>Elimina</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}