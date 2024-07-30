// app/page.js
import { Box,Stack, Typography } from '@mui/material';

const items = ['salt', 'potatoes', 'garlic', 'vinegar', 'cakes', 'cookies', 'oil','onions', 'almonds', 'walnuts'];

export default function Home() {
  return (
    <Box 
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'right'}
      alignItems={'right'}
      flexDirection={'column'}
    >
      <Box width="800px" height="70px" bgcolor={'#ADD8E6'}>
        <Typography variant={'h4'} color={'#333'} textAlign={'center'} >
          Pantry Items

        </Typography>
      </Box>

      <Stack width="800px" height="600px" spacing={2} overflow={'auto'}>
        {/* You can use a Stack from MUI here if needed */}

       {items.map((i)=> (
        <Box
        key={i}
        width="100%"
        height="100px"
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={'f0f0f0'}
        >

          <Typography
          variant={'h4'}
          color={'#333'}
          textAlign={'center'}
          fontWeight={'normal'}
          >
            {
              // capitalize the first letter of the item
            i.charAt(0).toUpperCase() + i.slice(1) 
            }
          </Typography>

          
        </Box>
       ))}
      </Stack>
    </Box>
  )
}