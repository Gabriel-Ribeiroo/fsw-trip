'use client'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

interface Props {
	latitude: number 
	longitude: number
}

export default function TripMap({ latitude, longitude }: Props) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
	})

	const customMapStyles = {
		disableDefaultUI: true,
		zoomControl: true,
		styles: [
			{
				"featureType": "all",
				"elementType": "labels.text",
				"stylers": [{
					"color": "#878787"
				}]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [{
					"color": "#f9f5ed"
				}]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [{
					"color": "#f5f5f5"
				}]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#c9c9c9"
				}]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [{
					"color": "#aee0f4"
				}]
			}
		]
  }

	if (loadError) 
		return <p>Error ao carregar o mapa...</p>
	
	return (
		<div className="w-full h-[480px]">
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={{ width: "100%", height: "100%" }}
					center={{ lat: latitude, lng: longitude }}
					options={customMapStyles}
					zoom={13}
				>
					<Marker 
						position={{ lat: latitude, lng: longitude }}
						icon={{ url: '/map-marker.svg', scaledSize: new window.google.maps.Size(50, 50) }}
					/>
				</GoogleMap>
			)}
			
			{!isLoaded && (
				<div className="w-full h-full bg-slate-200 animate-pulse" />
			)}
		</div>
	)
}