import {useState}  from 'react'


import Send from '@material-ui/icons/Send'
import {FormControlLabel, makeStyles,FormLabel,FormControl} from '@material-ui/core'
import Back from '@material-ui/icons/Backspace'
import {Typography,Button,Container,TextField,Radio,RadioGroup} from '@material-ui/core'



import {useHistory} from 'react-router-dom'
const useStyles=makeStyles({
  btn:{
    // fontSize:60,
    // backgroundColor:"violet",
    // '&:hover':{
    //   backgroundColor:"blue"
    // }
  },
  title:{
    // textDecoration:"underline",
    // marginBottom:20
  }
  ,
  field:{
    marginTop:20,
    marginBottom:20,
    display:"block"
  }
})
export default function Create() {

  const history=useHistory()
   
  const [title,setTitle]=useState('')
  const [details,setDetails]=useState('')

  const [titleError,setTitleError]=useState(false)
  const [detailsError,setDetailsError]=useState(false)

  const [category,setCategory]=useState('todos')

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    setTitleError(false) 
    setDetailsError(false)

    if(!title) {
      setTitleError(true)
    }
    if(!details){
      setDetailsError(true)
    }
    if(title && details){
      fetch('http://localhost:8000/notes',{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title,details,category})
      })
      .then(()=>history.push('/'))
    }
  }

  const classes=useStyles()
  return (
   <Container>
    <Typography className={classes.title} variant="h6" color="textSecondary" gutterBottom >
      Create a new note
    </Typography>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField onChange={(e)=>setTitle(e.target.value)} className={classes.field} label="Note Title" variant="outlined" color="secondary" fullWidth required error={titleError}/>
      <TextField onChange={(e)=>setDetails(e.target.value)} className={classes.field} label="Details" variant="outlined" color="secondary" multiline rows={4} fullWidth required error={detailsError}/>
     <FormControl className={classes.field}>
      <FormLabel>Note Category</FormLabel>
      <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}> 
        <FormControlLabel value="money" control={<Radio/>} label="Money"/>
        <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
        <FormControlLabel value="reminder" control={<Radio/>} label="Reminder"/>
        <FormControlLabel value="work" control={<Radio/>} label="Work"/>
      </RadioGroup>
     </FormControl> 
    <Button className={classes.btn} variant="contained" type="submit" color="primary">
       SUBMIT
    </Button>
    </form>

    {/* <Button variant="contained" type="submit" color="secondary" startIcon={<Send/>} endIcon={<Back/>}>
       SUBMIT
    </Button> */}

    {/* <AcUnitOutlinedIcon  color="secondary" fontSize="large"/> */}
    </Container>
  )
}
