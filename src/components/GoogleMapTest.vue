<template>
	<div>
		<gmap-map
			:zoom="mapZoom"
			:center="mapCenter"
			style="width: 100%; height: 800px"
		>
			<gmap-marker
				:key="index"
				:position="marker.position"
				:animation="index === markers.length - 1 ? ani : null"
				:icon="
					index === 0
						? redMarkerIcon
						: index === markers.length - 1
						? greenMarkerIcon
						: defaultMarkerIcon
				"
				v-for="(marker, index) in markers"
			></gmap-marker>
			<gmap-polyline
				v-if="polyline"
				:path="polyline.path"
				:options="polyline.options"
			></gmap-polyline>
		</gmap-map>
		<br />
		<input type="file" @change="handleFileChange" />
	</div>
</template>

<script>
import { readAndExtract } from '@/utils/csvHelper';

export default {
	data() {
		return {
			extractedData: [],
			delayMarkerTime: 1000,
			polyline: null,
			mapZoom: 16, // 기본 값은 16으로 설정
			mapCenter: { lat: 35.8232, lng: 127.1535 },
			markers: [],
			ani: 1,
			locPlaces: [],
			existingPlace: null,
			redMarkerIcon: {
				url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
			},
			greenMarkerIcon: {
				url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			},
			defaultMarkerIcon: {
				url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			},
		};
	},
	methods: {
		async handleFileChange(event) {
			const file = event.target.files[0];
			// console.log('file : ', file);
			if (file) {
				try {
					const columnsToExtract = [13, 14];
					this.extractedData = await readAndExtract(file, columnsToExtract);
					// console.log('extractedData : ', this.extractedData);
					this.createPolyline();
					this.createMarkers();
					// 마커의 마지막 위치로 지도를 이동하고 mapZoom 값을 20으로 변경
					const lastMarker = this.markers[this.markers.length - 1];
					this.mapCenter = lastMarker.position;
					this.mapZoom = 20;
				} catch (error) {
					console.error('Error reading file : ', error);
				}
			}
		},
		createPolyline() {
			const path = [];
			this.extractedData.forEach(data => {
				const latitude = parseFloat(data['13']);
				const longitude = parseFloat(data['14']);
				if (!isNaN(latitude) && !isNaN(longitude)) {
					path.push({
						lat: latitude,
						lng: longitude,
					});
				}
			});
			this.polyline = {
				path: path,
				options: {
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 2,
				},
			};
		},
		createMarkers() {
			this.markers = this.extractedData
				// eslint-disable-next-line
				.map((data, index) => {
					const latitude = parseFloat(data['13']);
					const longitude = parseFloat(data['14']);
					if (!isNaN(latitude) && !isNaN(longitude)) {
						return {
							position: {
								lat: latitude,
								lng: longitude,
							},
						};
					}
				})
				.filter(marker => marker);
		},
	},
};
</script>

<style>
/* 필요한 스타일링을 추가할 수 있습니다. */
</style>
