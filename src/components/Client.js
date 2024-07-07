import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { io } from 'socket.io-client';

const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    CODE_CHANGE: 'code_change',
    SYNC_CODE: 'sync_code',
    DISCONNECTED: 'disconnected'
};

const Client = ({ username }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            console.log('Connected to server');


            newSocket.emit(ACTIONS.JOIN, { roomId: 'defaultRoom', username });
        });

        newSocket.on(ACTIONS.JOINED, (data) => {
            console.log('Joined event received:', data);
        });

        newSocket.on(ACTIONS.CODE_CHANGE, (data) => {
            console.log('Code change received:', data);
        });

        newSocket.on(ACTIONS.DISCONNECTED, (data) => {
            console.log('Disconnected event received:', data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [username]);

    return (
        <div className="client">
            <Avatar name={username} size={50} round="14px" />
            <span className="userName">{username}</span>
        </div>
    );
};

export default Client;
