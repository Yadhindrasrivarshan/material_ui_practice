import React from 'react'

import {AppBar,Toolbar, makeStyles,Drawer,Typography,List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons'

import {format} from 'date-fns'
import {useHistory, useLocation} from 'react-router-dom'


import {Avatar} from '@material-ui/core'

import mario from './mario.jpg'
const drawerWidth=200

const useStyles=makeStyles((theme)=>{
   return{
    page:{
        background:"#f9f9f9",
        width:"100%",
        padding:theme.spacing(3)
    },
    draw:{
     width:drawerWidth,
    },
    drawerPaper:{
        width:drawerWidth
    },
    root:{
        display:"flex"
    },
    active:{
        background:'#f4f4f4'
    },
    title:{
        padding:theme.spacing(2)
    },
    app:{
        width:`calc(100% - ${drawerWidth}px)`,

    },
    toolbar:theme.mixins.toolbar,
    date:{
        flexGrow:1
    },
    avatar:{
        marginLeft:theme.spacing(2)
    }
   }
})
const Layout = ({children}) => {
    const classes=useStyles()
    const history=useHistory()
    const location=useLocation()
    const menuItems=[
        {
            text:'My notes',
            icon:<SubjectOutlined color="secondary"/>,
            path:'/'
        },
        {
            text:'Create Note',
            icon:<AddCircleOutlined color="secondary"/>,
            path:'/create'
        }
    ]
    return (
        <div className={classes.root}>
            <AppBar className={classes.app} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                       Today is the  {format(new Date(),'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src={mario} className={classes.avatar}/>
                </Toolbar>
            </AppBar>
            <Drawer
            className={classes.draw}
            variant="permanent"
            anchor="left"
            classes={{paper:classes.drawerPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Notes Ninja
                    </Typography>
                </div>
                {/* <List>
                    <ListItem>
                        <ListItemText primary="hello"/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="hello"/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="hello"/>
                    </ListItem>
                </List> */}

                <List>
                    {menuItems.map(item=>(
                        <ListItem button className={location.pathname==item.path?classes.active:null} key={item.text} onClick={()=>history.push(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout
