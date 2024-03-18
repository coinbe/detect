// 배열.reduce((누적값, 현재값, 인덱스, 요소) => { return 결과 }, 초기값)

const promiseFactory = time => {
	return new Promise((res, rej) => {
		console.log(time);
		setTimeout(res, time);
	});
};

[1000, 2000, 3000, 4000].reduce((acc, cur) => {
	return acc.then(() => promiseFactory(cur));
}, Promise.resolve());
