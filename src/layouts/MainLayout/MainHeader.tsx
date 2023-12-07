import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from "@mui/material/Link";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {NavLink} from "react-router-dom";

function MainHeader() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };


    const navLinks = ['About', 'Services'];

    const mobileMenu = (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                {navLinks.map((text) => (
                    <ListItem key={text} onClick={toggleDrawer(false)}>
                        <NavLink to={`/${text.toLowerCase()}`}>
                            <ListItemText primary={text} />
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );

    return (
        <React.Fragment>
            <Toolbar sx={{
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: '#f0f0f0',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
                padding: '10px',
                justifyContent: 'space-between'
            }}>

                <Link color="inherit" href="/">
                    <img
                        src="/images/TarotMate_logo.png"
                        alt="TarotMate Logo"
                        style={{ height: '50px' }}
                    />
                </Link>

                {isMobile ? (
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <div>
                        {navLinks.map((text) => (
                            <Link color="inherit" href={`/${text.toLowerCase()}`} key={text}>
                            <Button color="inherit">{text}</Button>
                            </Link>
                        ))}
                    </div>
                )}

                {isMobile && mobileMenu}
            </Toolbar>
        </React.Fragment>
    );
}

export default MainHeader;
