import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SocketContextVal } from '../context/SocketContext';
import notificationsound from '../assets/sound/notificationsound.mp3'
import { setMessages, toggleRefresh } from '../store/conversationSlice';

const useListenMessage = () => {

    const socket = SocketContextVal()?.socket;

    const messages = useSelector(state => state.conversationDetails.messages);

    const dispatch = useDispatch();



    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            newMessage.shouldshake = true;
            const sound = new Audio(notificationsound);
            sound.play();
            dispatch(setMessages([...messages, newMessage]))
            dispatch(toggleRefresh());
        })
        return () => {
            socket?.off("newMessage");
        }
    }, [socket, messages])
}

export default useListenMessage