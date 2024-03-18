// const fs = require('fs');

export function readAndExtract(file, columns) {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		console.log(reader);
		reader.onload = e => {
			console.log('onload:: e : ', e);
			const lines = e.target.result.split('\n');
			const data = lines.map(line => line.split(','));

			const extractedData = data.reduce((result, row) => {
				let isValidRow = true;

				columns.forEach(colIndex => {
					if (!row[colIndex]) {
						isValidRow = false;
					}
				});

				if (isValidRow) {
					const extractedRow = {};
					columns.forEach(colIndex => {
						console.log('colIndex : ');
						extractedRow[colIndex] = row[colIndex];
					});
					result.push(extractedRow);
				}

				return result;
			}, []);

			res(extractedData);
		};

		reader.onerror = error => {
			rej(error);
		};

		reader.readAsText(file);
	});
}

export function read() {
	// const filePath = '/DetectionLogs_RfPatrol Mk2_0350198542021_4.5.0_Q4-2023';
	// console.log(fs, filePath);
}
