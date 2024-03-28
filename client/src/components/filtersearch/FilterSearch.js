import { Box, Divider, Drawer, IconButton, Typography, styled } from '@mui/material'
import {ChevronLeft, ChevronLeftRounded, ChevronRight} from '@mui/icons-material'
import React from 'react'
import PriceSlider from './PriceSlider'
import { useValue } from '../../context/ContextProvider'
import SearchByTitle from './SearchByTitle'

const DrawerHeader = styled('div')(({theme})=>({
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding:theme.spacing(0,1),
  ...theme.mixins.toolbar,
}))

const FilterSearch = ({isOpen, setIsOpen}) => {

  const {searchRef} = useValue();
  const {searchTerm} = useValue();

  return (
    <Drawer
      variant='persistent'
      hideBackdrop={true}
      open={isOpen}
      //anchor="top" // Set anchor to top
    >
      
      <DrawerHeader>
        <Typography sx={{ml:4}}>Search and Filter</Typography>
        <IconButton onClick={()=> setIsOpen(false)}> {/*action of the button when arrow is clicked closes the drawer*/}
          <ChevronLeftRounded fontSize='large'/> {/*direction of the arrow*/}
        </IconButton>
      </DrawerHeader>  

      <Box
        sx ={{width:240, p:5}}
      >      
        <Typography>Title</Typography>
        <SearchByTitle /> 
        <Typography sx={{ marginTop: '20px' }}>Location</Typography>
        <Box ref ={searchRef}>

        </Box>
        <PriceSlider/>
      </Box>                                                                      
    </Drawer>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  )
}                                                                                                                                                                                                                           
                                                                                                                                        
export default FilterSearch;                                                                                                                        