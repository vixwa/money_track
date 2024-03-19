import React,{useState,useContext} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';
import{v4 as uuidv4} from 'uuid';
import  formatDate  from '../../../utils/formatDate';
import { incomeCategories,expenseCategories } from '../../../constants/categories';
import CustomizedSnackbar from '../../Snackbar/Snackbar';
const initialState = {
  amount :'',
  category: '',
  type: '',
  date: formatDate(new Date()),
}
const Form = () => {
  const [open,setOpen] = useState(false);
  const classes = useStyles();
  const [formData,setFormData] = useState (initialState);
  const {addTransaction}= useContext(ExpenseTrackerContext);
  
  const createTransaction =( )=> {
    const transaction = {...formData,amount: Number(formData.amount),id:uuidv4()}
    setOpen(true);
    addTransaction(transaction);
    setFormData(initialState)
  }
  console.log(formData);
  const selectedCategories = formData.type === 'Income' ? incomeCategories: expenseCategories;
  return (
  <Grid container spacing ={2}>
    <CustomizedSnackbar open = {open} setOpen = {setOpen}/>
    <Grid item xs ={12}>
      <Typography align = "center" variant ="subtitle2" gutterBottom >
        ...
      </Typography>
    </Grid>
    <Grid item xs ={6}>
      <FormControl fullWidth>
       <InputLabel>Type</InputLabel>
       <Select value ={formData.type} onChange={(e) => setFormData({ ...formData,type : e.target.value})}>
        <MenuItem value = "Income">Income</MenuItem>
        <MenuItem value = "Expense">Expense</MenuItem>
       </Select>
      </FormControl>
    </Grid>
    <Grid item xs ={6}>
      <FormControl fullWidth>
        <InputLabel>Catergory</InputLabel>
        <Select value={formData.category}onChange={(e) => setFormData({...formData,category:e.target.value})}>
          { selectedCategories.map((c) =><MenuItem key = {c.type} value = {c.type}>{c.type}</MenuItem>)}
       </Select>
      </FormControl>
    </Grid>
    <Grid item xs ={6}>
      <TextField type ="number" label= "Amount" fullWidth value = {formData.amount}  onChange={(e) => setFormData({...formData,amount: e.target.value})}/>
    </Grid>
    <Grid  item xs ={6}>
      <TextField type ="date" label= " " fullWidth value = {formData.date}  onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
    </Grid>
    <Button className={classes.button} variant="outlined" fullWidth  onClick={createTransaction}>Log Action</Button>
  </Grid>
  )
}

export default Form