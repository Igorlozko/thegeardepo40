import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getGears } from '../../actions/gear';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Box, IconButton, Paper, Tooltip } from '@mui/material';
import GeocoderInput from '../filtersearch/GeocoderInput';
import WindowGear from './WindowGear';
import { GridCloseIcon } from '@mui/x-data-grid';

const supercluster = new Supercluster({
  radius: 40,
  maxZoom: 16,
});

const ClusterMap = () => {
  const {
    state: { filteredGears },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    getGears(dispatch);
  }, []);

  useEffect(() => {
    const points = filteredGears.map((gear) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        gearId: gear._id,
        price: gear.price,
        title: gear.title,
        description: gear.description,
        lng: gear.lng,
        lat: gear.lat,
        images: gear.images,
        uPhoto: gear.uPhoto,
        uName: gear.uName,
        contactEmail: gear.contactEmail,
        contactPhone: gear.contactPhone,
        createdAt: gear.createdAt,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(gear.lng), parseFloat(gear.lat)],
      },
    }));
    setPoints(points);
  }, [filteredGears]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <Box sx={{ height: 900, position: 'relative' }}>
      <ReactMapGL
        initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/igorlozko/clskovgwk01oe01qsbhb6f5f7"
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties;
          const [longitude, latitude] = cluster.geometry.coordinates;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (points.length > 0 ? point_count / points.length : 0) * 20}px`,
                    height: `${10 + (points.length > 0 ? point_count / points.length : 0) * 20}px`,
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1,
                    });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`gear-${cluster.properties.gearId}`}
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={cluster.properties.uName}>
                <Avatar
                  src={cluster.properties.uPhoto}
                  component={Paper}
                  elevation={2}
                  onClick={() => setPopupInfo(cluster.properties)}
                />
              </Tooltip>
            </Marker>
          );
        })}
        <GeocoderInput />
        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth='auto'
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={() => setPopupInfo(null)}
          >
             <Box sx={{ position: 'absolute', top: '1px', right: '1px', zIndex: 2 }}>
                <IconButton 
                  size="small" 
                  onClick={() => setPopupInfo(null)} 
                  sx={{ 
                    backgroundColor: '#ff4e53', // Light gray background color
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#ff4e53', // Light gray background color on hover
                    }
                  }}
                >
                  <GridCloseIcon fontSize="small" sx={{ color: 'white' }} /> {/* White "X" icon */}
                </IconButton>
              </Box>
            <WindowGear popupInfo={popupInfo} />
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  );
};

export default ClusterMap;
