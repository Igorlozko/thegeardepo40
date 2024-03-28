import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import { getReservations } from '../../../actions/reservation';
import isAdmin from '../utils/isAdmin';
import { grey } from '@mui/material/colors';
import isEditor from '../utils/isEditor';

const Reservations = ({ setSelectedLink, link }) => {
  const { state: { reservations, gears, currentUser }, dispatch } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (reservations.length === 0) getReservations(dispatch);
  }, []);

  const columns = useMemo(() => [
    { field: 'resId', headerName: 'Reservation Id', width: 250 },
    { field: 'rName', headerName: 'Buyer Name', width: 150 },
    { field: 'phone', headerName: 'Buyer Phone', width: 150 },
    { field: 'gearId', headerName: 'Gear Id', width: 250 },
    { field: 'gearTitle', headerName: 'Gear Title', width: 200 }, // New column for gear title
    {
      field: 'images',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => params.row.gearPhoto ? <Avatar src={params.row.gearPhoto} alt="Gear" style={{ maxWidth: '150px', maxHeight: '150px' }} /> : null,
      sortable: false,
      filterable: false,
    },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'endDate', headerName: 'End Date', width: 200 },
    { field: 'totalPrice', headerName: 'Total Price', width: 110 },
    { field: 'purpose', headerName: 'Purpose', width: 200 },
    { field: 'addinfo', headerName: 'Add Info', width: 200 },
  ], []);

  const filteredReservations = useMemo(() => {
    if (isAdmin(currentUser)) {
      return reservations.map((reservation, index) => ({
        ...reservation,
        gearTitle: gears.find((gear) => gear._id === reservation.gearId)?.title || 'Unknown',
        gearPhoto: gears.find((gear) => gear._id === reservation.gearId)?.images?.[0] || '',
        _id: index + 1, // Assign a unique id to each reservation
      }));
    }
  
    if (isEditor(currentUser)) {
      const editorGearIds = gears
        .filter(gear => gear.uid === currentUser.id)
        .map(gear => gear._id);
      return reservations.map(reservation => ({
        ...reservation,
        gearTitle: gears.find(gear => gear._id === reservation.gearId)?.title || 'Unknown',
        gearPhoto: gears.find(gear => gear._id === reservation.gearId)?.images?.[0] || '' // Ensure images array exists and access the first image
      })).filter(reservation => 
        editorGearIds.includes(reservation.gearId) || reservation.rName === currentUser.name
      );
    }
  
    // For basic users, filter reservations based on their name
    return reservations.map(reservation => ({
      ...reservation,
      gearTitle: gears.find(gear => gear._id === reservation.gearId)?.title || 'Unknown',
      gearPhoto: gears.find(gear => gear._id === reservation.gearId)?.images?.[0] || '' // Ensure images array exists and access the first image
    })).filter(reservation => reservation.rName === currentUser.name);
  }, [currentUser, reservations, gears]);
  
  

  return (
    <Box
      sx={{
        height: 800,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 3,
        }}
      >
        Manage Reservations
      </Typography>
      <DataGrid
        columns={columns}
        rows={filteredReservations}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Reservations;
