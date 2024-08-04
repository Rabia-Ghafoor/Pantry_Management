import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore, auth } from './firebase'; 
import { collection, getDocs, query, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styles from './pantrytracker.module.css'; 

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [itemName, setItemName] = useState('');
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        updatePantry();
      } else {
        setPantry([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    try {
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPantry(pantryList);
    } catch (error) {
      console.error('Error updating pantry:', error);
    }
  };

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'pantry'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      updatePantry();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'pantry'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      updatePantry();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const filteredPantry = pantry.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={4}
        className="container"
      >
        <Typography variant="h4" color="#333" textAlign="center">
          Please Sign In to Manage Pantry Items
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      className={styles.page}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={400}
          bgcolor="background.paper"
          p={4}
          boxShadow={24}
        >
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2} mt={2}>
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
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Stack spacing={10} mt={4} alignItems="center">
        <TextField
          label="Search Pantry Items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />
        <Button variant="contained" onClick={handleOpen} className={styles.addButton}>
          Add
        </Button>
      </Stack>

      <Box border="2px solid #333" width="800px" p={2} mt={4}>
        <Typography variant="h4" color="#333" textAlign="center" background-color>
          Pantry Items
        </Typography>
      </Box>

      <Stack width="800px" spacing={2} className={styles.pantryItems}>
        {filteredPantry.map((item) => (
          <Box
            border="1px solid #333"
            key={item.id}
            width="100%"
            height="100px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#f0f0f0"
            p={2}
            className={styles.item}
          >
            <Typography
              variant="h4"
              color="#333"
              textAlign="center"
              fontWeight="normal"
            >
              {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
            </Typography>
            <Typography
              variant="h6"
              color="#333"
              textAlign="center"
              fontWeight="normal"
            >
              Quantity: {item.quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
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
  );
}
