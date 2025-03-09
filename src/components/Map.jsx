"use client";

import { GoogleMap, Marker, InfoBox } from "@react-google-maps/api";

export const defaultMapContainerStyle = {
  width: "w-[450px]",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const MapComponent = () => {
  const defaultMapCenter = {
    lat: 59.3249394,
    lng: 18.0681603,
  };

  const defaultMapZoom = 19;

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    mapTypeId: "roadmap",
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Marker position={{ lat: 59.3249394, lng: 18.0681603 }}>
          <InfoBox
            //onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div
              style={{
                backgroundColor: `yellow`,
                opacity: 0.75,
                padding: `12px`,
              }}
            >
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                Hello, Kaohsiung!
              </div>
            </div>
          </InfoBox>
        </Marker>
      </GoogleMap>
    </>
  );
};

export { MapComponent };
