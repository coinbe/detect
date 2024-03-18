<template>
	<div>
		<input type="file" @change="handleFileChange" />
		<gmap-map :zoom="19" :center="center" style="width: 100%; height: 400px">
			<gmap-marker
				:key="index"
				:animation="ani"
				v-for="(p, index) in locationMarkers"
				:position="p.position"
			></gmap-marker>
			<gmap-polyline
				v-if="polyline"
				:path="polyline.path"
				:options="polyline.options"
			></gmap-polyline>
		</gmap-map>
		<p>
			----------------------------------------------------------------------
		</p>
		<ul>
			<li v-for="(row, index) in extractedData" :key="index">
				{{ row }}
			</li>
		</ul>
	</div>
</template>

<script>
import { readAndExtract } from '@/utils/csvHelper';
export default {
	created() {
		// 파일경로
		console.log('dir : ', `${__dirname}`);
	},
	data() {
		return {
			extractedData: [],
			delayMarkerTime: 1000,
			polyline: null,
			center: {
				lat: 35.8232,
				lng: 127.1535,
			},
			locationMarkers: [
				{
					position: {
						lat: 35.8232,
						lng: 127.1535,
					},
				},
				{
					position: {
						lat: 35.8232,
						lng: 127.1534,
					},
				},
				{
					position: {
						lat: 35.8222,
						lng: 127.1537,
					},
				},
				{
					position: {
						lat: 35.8216,
						lng: 127.15529,
					},
				},
			],
			ani: 1,
			locPlaces: [],
			existingPlace: null,
		};
	},
	methods: {
		async handleFileChange(event) {
			const file = event.target.files[0];
			console.log('file : ', file);
			if (file) {
				try {
					const columnsToExtract = [13, 14];
					this.extractedData = await readAndExtract(file, columnsToExtract);
					console.log('extractedData : ', this.extractedData);
					this.createPolyline();
				} catch (error) {
					console.error('Error reading file : ', error);
				}
			}
		},
		createPolyline() {
			const path = [];
			this.extractedData.forEach(data => {
				console.log('extratedData : ', data);
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
	},
};
</script>

<style></style>
