import { AddLocationAlt, GridView, LocationOn, PostAdd } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ClusterMap from './map/ClusterMap';
import Gears from './gear/Gears';
import AddGear from './addGear/AddGear';
import Protected from './protected/Protected'; // Assuming this provides role-based protection
import { useValue } from '../context/ContextProvider';
import BasicMes from './protected/BasicMes';

const BottomNav = () => {
    const { state: { section, currentUser }, dispatch } = useValue(); // Access currentUser from context
    const ref = useRef();

    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [section]);

    const isAdminOrEditor = currentUser && (currentUser.role === 'admin' || currentUser.role === 'editor');

    return (
        <Box ref={ref}>
            {{
                0: <ClusterMap />,
                1: <Gears />,
                2: isAdminOrEditor ? <AddGear /> : <Protected /> && <BasicMes />, // Render AddGear if isAdminOrEditor, otherwise Protected
            }[section]}
            <Paper
                elevation={3}
                sx={{ position: 'fixed', boxShadow: 'none', bottom: 0, left: 0, right: 0, zIndex: 2 }}
            >
                <BottomNavigation
                    showLabels
                    value={section}
                    onChange={(e, newValue) => dispatch({ type: 'UPDATE_SECTION', payload: newValue })}
                >
                    <BottomNavigationAction
                        label='Map'
                        icon={<LocationOn />}
                    />
                    <BottomNavigationAction
                        label='Gear'
                        icon={<GridView />}
                    />
                    <BottomNavigationAction
                        label='Add'
                        icon={<PostAdd />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomNav;
