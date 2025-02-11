'use client';

import {ENV_CONFIG} from '@/constants';
import {useEffect} from 'react';
import {Socket, io} from 'socket.io-client';
import {useAuthContext, useSocketContext} from '../../context';

export const useSocket = (
  onConnect?: (socket: Socket) => void,
  dependencies: string[] = [],
) => {
  const {accessToken} = useAuthContext();

  const {socket, setSocket} = useSocketContext();
  useEffect(() => {
    if (socket && socket.connected) {
      return;
    }
    let _socket: Socket;
    if (!accessToken) return;
    _socket = io(ENV_CONFIG.BASE_SOCKET_URL!, {
      extraHeaders: {
        token: accessToken,
      },
    });

    _socket.on('connect', () => {
      console.log('Socket connected');
      setSocket(_socket);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, socket, ...dependencies]);

  useEffect(() => {
    if (socket) {
      onConnect?.(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!socket]);

  return socket;
};
