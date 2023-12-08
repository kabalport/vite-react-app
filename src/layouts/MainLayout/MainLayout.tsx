import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const MainLayout = (props: any) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <MainHeader />
            <Box component="main" >
                {props.children}
            </Box>
            <MainFooter />
        </Box>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,  // Updated to 'node' which is more appropriate for children
    location: PropTypes.object,
}

export default MainLayout;
