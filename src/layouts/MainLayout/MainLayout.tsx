import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const MainLayout = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'  // 전체 레이아웃의 최소 높이를 화면 높이의 100%로 설정
        }}>
            <MainHeader  sx={{ flex: 1 }} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {props.children}
            </Box>
            <MainFooter  sx={{ flexGrow: 1 }} />
        </Box>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
}

export default MainLayout;
