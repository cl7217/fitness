import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useSelector } from 'react-redux';

export default function LetterAvatars() {
const { name } = useSelector((state) => state.user.currentUser)
const acronym = name[0]
  
  return (
    <Stack direction="row" spacing={2}>

      <Avatar sx={{ bgcolor: deepOrange[400] }}>{acronym}</Avatar>
  
    </Stack>
  );
}
