import React  from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import { useContext } from 'react';
const Main = () => {
  const classes = useStyles();
  const {balance} = useContext(ExpenseTrackerContext)
  return (
    <Card className = {classes.root}>
      <CardHeader title = "Expense Tracker" subheader ="Powered by Viswa inc"/>
      <CardContent>
        <Typography align = "center" variant = "h5">TOTAL BALANCE ₹ {balance}</Typography>
        <Typography variant = "subtitle1" style = {{lineheight : '1.5em',margintop : '20px'}}>
        </Typography>
        <Divider/>
        <Form/>
      </CardContent>
      <CardContent className = {classes.cardContent}>
        <Grid container spacing ={2}>
          <Grid item xs = {12}>
            <List/>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}

export default Main