import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
  const {
    state: {
      details: { title, description, price, contactEmail, contactPhone },
    },
    dispatch,
  } = useValue();

  const [costType, setCostType] = useState(price ? 1 : 0);

  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value);
    setCostType(costType);
    if (costType === 0) {
      dispatch({ type: 'UPDATE_DETAILS', payload: { price: 0 } });
    } else {
      dispatch({ type: 'UPDATE_DETAILS', payload: { price: 15 } });
    }
  };

  const handlePriceChange = (e) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { price: e.target.value } });
  };

  return (
    <Stack
      spacing={3}
      alignItems='stretch'
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        borderRadius: 8,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant='h5'>Add Details</Typography>
      <Typography variant='subtitle1'>1. Price</Typography>
      <FormControl>
        <RadioGroup
          name="costType"
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          {/*<FormControlLabel value={0} control={<Radio />} label="Free Rental" />*/}
          <FormControlLabel value={1} control={<Radio />} label="Paid Rental" />
          {Boolean(costType) && (
            <TextField
              variant="standard"
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
              inputProps={{ type: 'number', min: 1, max: 10000 }}
              value={price}
              onChange={handlePriceChange}
              name="price"
            />
          )}
        </RadioGroup>
      </FormControl>
      <Typography variant='subtitle1'>2. Gear Details</Typography>
      <InfoField
        mainProps={{ name: 'title', label: 'Title', value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: 'description',
          label: 'Description',
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 8 }}
      />
      <Typography variant='subtitle1'>3. Contact Details</Typography>
      <InfoField
        mainProps={{ name: 'contactPhone', label: 'Contact Phone', value: contactPhone }}
        minLength={5}
      />
      <InfoField
        mainProps={{ name: 'contactEmail', label: 'Contact Email', value: contactEmail }}
        minLength={5}
      />
    </Stack>
  );
};

export default AddDetails;
