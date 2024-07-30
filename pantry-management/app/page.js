// app/page.js
'use client'

import { Box,Stack, Typography } from '@mui/material'
import { firestore } from './firebase'; // Adjusted path based on your structure
import {collection, getDocs, query} from 'firebase/firestore'
import {useEffect, useState} from 'react'



export default function Home() {
  const [pantry, setPantry] = useState([])

  useEffect(() => {
    const updatePantry = async ()=> {
    const snapshot =query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc)=> {
    pantryList.push(doc.id)
     
    })
    console.log(pantryList)
    setPantry(pantryList)
  }
  updatePantry()
  },[])
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

       {pantry.map((i)=> (
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