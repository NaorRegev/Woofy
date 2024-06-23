import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { RouterLink } from '../../routes/components';
import woofyLogo from '/assets/logo.png';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
        textAlign: 'left',
        fontSize: '28px',
        color: 'black',
        fontFamily: 'Volkhov',
        ...sx,
      }}
      ref={ref}
      {...other}
    >
      <Box
        sx={{
          width: 168,
          height: 40,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box
            component="img"
            src={woofyLogo}
            alt="Woofy Logo"
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              objectFit: 'cover',
              position: 'relative',
              top: '-10px',
            }}
          />
        </Box>
        <Box sx={{ width: 121, height: 31, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '-9.74px',
              left: '6px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5px',
            }}
          >
            <h1
              id="logo-text"
              style={{
                margin: 0,
                fontSize: 'inherit',
                lineHeight: '35.2px',
                fontWeight: 'bold',
                fontFamily: 'inherit',
              }}
            >
              Woofy
            </h1>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
