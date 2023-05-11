import React from 'react';
import { TextField, Select, MenuItem, Button, Grid, Box, Typography } from '@mui/material';

function ProfileView(props){
  const greeting = `Hello, ${props.firstName ? props.firstName : 'Guest'}!`;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{ marginTop: "2em", marginLeft: "25%", marginRight: "25%" }}
    >  
      <Grid item xs={12}>
        <Box direction="row" justifyContent="center" alignItems="center">
          <Typography variant="h4" sx={{ fontFamily: "inherit", fontWeight: "bold", color: "black" }}>{greeting}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center">
          <TextField label={'Firstname'} name={'firstName'} value={props.firstName || ''} sx={{ width: '50%' }} onChange={props.onFirstNameChange} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center">
          <TextField label={'Lastname'} name={'lastName'} value={props.lastName || ''} sx={{ width: '50%' }} onChange={props.onLastNameChange} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center">
          <TextField label={'Email'} name={'email'} value={props.email || ''} sx={{ width: '50%' }} onChange={props.onEmailChange} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="center" alignContent="center">
        <TextField
            labelid="gender-select-label"
            id="gender-select"
            value={props.gender}
            label="Gender"
            onChange={(e) => props.setGender(e.target.value)}
            sx={{ width: '50%' }}
          select>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center">
          <TextField label={'Password'} name={'password'} variant="filled" type="password" sx={{ width: '50%' }} onChange={props.onPasswordChange} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="center" alignItems="center">
          <TextField label={'Confirm Password'} name={'confirmPassword'} variant="filled" type="password" sx={{ width: '50%' }} onChange={props.onConfirmPasswordChange} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="start">
          <Grid item>
          <Button variant='contained' color='primary' size='large' onClick={props.onSaveChanges}>Save changes</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileView;
