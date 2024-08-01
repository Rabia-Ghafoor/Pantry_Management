'use client'

import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from './firebase'; // Adjusted path based on your structure
import { collection, getDocs, query, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [itemName, setItemName] = useState('')
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({ id: doc.id, ...doc.data() })
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updatePantry()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={4}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          position="absolute"
          top="100%"
          left="100%"
          transform="translate(-100%, -100%)"
          width={400}
          bgcolor="background.paper"
          p={4}
          boxShadow={24}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2} mt={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>

      <Box border={'1px solid #333'}>
        <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
          Pantry Items
        </Typography>
      </Box>

      <Stack width="800px" height="600px" spacing={2} overflow={'auto'}>
        {pantry.map((item) => (
          <Box border={'1px solid #333'}
            key={item.id}
            width="100%"
            height="100px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
            p={2}
          >
            <Typography
              variant={'h4'}
              color={'#333'}
              textAlign={'center'}
              fontWeight={'normal'}
            >
              {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
            </Typography>
            <Typography
              variant={'h6'}
              color={'#333'}
              textAlign={'center'}
              fontWeight={'normal'}
            >
              Quantity: {item.quantity}
            </Typography>
            <Stack direction={'row'} spacing={2}>
              <Button variant="contained" color="primary" onClick={() => addItem(item.id)}>
                +
              </Button>
              <Button variant="contained" color="secondary" onClick={() => removeItem(item.id)}>
                -
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
