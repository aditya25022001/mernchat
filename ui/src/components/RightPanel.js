import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { ChatConsole } from './ChatConsole'
import { createTheme, styled } from '@mui/material/styles';

export const RightPanel = () => {

    const { leftOpen } = ChatState()

    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 575,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      });

    const Root = styled('div')(() => ({
        [theme.breakpoints.down('sm')]: {
            display: leftOpen ? "none" : ""
        },
      }));

    return (
        <Root className="right">
            <ChatConsole/>    
        </Root>
    )
}
