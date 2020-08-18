const utils = {
	// 计算两个经纬度间的距离
	getDistance(lat1, lng1, lat2, lng2) {
		const Rad = d => d * Math.PI / 180 //经纬度转换成三角函数中度分表形式。
		var radLat1 = Rad(lat1);
		var radLat2 = Rad(lat2);
		var a = radLat1 - radLat2;
		var b = Rad(lng1) - Rad(lng2);
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
			Math.sin(b / 2), 2)));
		s = s * 6378.137;
		s = (Math.round(s * 10000) / 10000) //输出为公里
		return s
	},

	// 减去数组最后一项
	truncate(arr) {
		let m = []
		for (var i = 0; i < arr.length - 1; i++) {
			m.push(arr[i])
		}
		return m
	},
	// 数组去重
	repObject(obj) {
		var uniques = [];
		var stringify = {};
		for (var i = 0; i < obj.length; i++) {
			var keys = Object.keys(obj[i]);
			keys.sort(function(a, b) {
				return (Number(a) - Number(b));
			});
			var str = '';
			for (var j = 0; j < keys.length; j++) {
				str += JSON.stringify(keys[j]);
				str += JSON.stringify(obj[i][keys[j]]);
			}
			if (!stringify.hasOwnProperty(str)) {
				uniques.push(obj[i]);
				stringify[str] = true;
			}
		}
		return uniques;
	},
	// 时间转化--秒转化成时分秒
	formateSeconds(value) {
		let secondTime = parseInt(value) //将传入的秒的值转化为Number
		let min = 0 // 初始化分
		let h = 0 // 初始化小时
		let result = ''
		if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
			min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
			secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
			if (min > 60) { //如果分钟大于60，将分钟转换成小时
				h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
				min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
			}
		}
		result =
			`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
		return result
	},

	// 时间转化---时分秒转化成分钟
	formateMin(value) {
		let secondTime = parseInt(value) //将传入的秒的值转化为Number
		let min = 0 // 初始化分
		let h = 0 // 初始化小时
		let result = ''
		if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
			min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
			secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
			if (min > 60) { //如果分钟大于60，将分钟转换成小时
				h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
				min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
			}
		}
		result = h * 60 + min + secondTime / 60 //时间换算成分钟
		return result
	},
	// 数组去重
	repObject(obj) {
		var uniques = [];
		var stringify = {};
		for (var i = 0; i < obj.length; i++) {
			var keys = Object.keys(obj[i]);
			keys.sort(function(a, b) {
				return (Number(a) - Number(b));
			});
			var str = '';
			for (var j = 0; j < keys.length; j++) {
				str += JSON.stringify(keys[j]);
				str += JSON.stringify(obj[i][keys[j]]);
			}
			if (!stringify.hasOwnProperty(str)) {
				uniques.push(obj[i]);
				stringify[str] = true;
			}
		}
		return uniques;
	},

	// 转小时和分钟
	ChangeHourMinutestr(str) {
		var theTime = parseInt(str); // 秒
		var middle = 0; // 分
		var hour = 0; // 小时
		if (theTime > 60) {
			middle = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (middle > 60) {
				hour = parseInt(middle / 60);
				middle = parseInt(middle % 60);
			}
		}
		var result = "" + parseInt(theTime) + "秒";
		if (middle > 0) {
			result = "" + parseInt(middle) + "分" + result;
		}
		if (hour > 0) {
			result = "" + parseInt(hour) + "小时" + result;
		}
		return result;
	},
	// 米转千米
	Changedistance(str) {
		if (str > 1000) {
			str = (str / 1000).toFixed(1) + '千米';
		} else {
			str = str + '米';
		}
		return str;
	}
}

export default utils;
