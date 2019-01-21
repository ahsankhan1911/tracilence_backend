const mongoose = require('mongoose'),
	randomstring = require('randomstring');

function isValidEmail(email){
	var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
	return new RegExp(pattern).test(email);
}

function isValidPassword(password){
	var pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/;
	return new RegExp(pattern).test(password);
}

function _convertToObjectIds(_id){
	return mongoose.Types.ObjectId(_id);
}


function getRandomNumber(){
	return randomstring.generate({charset:'numeric', length:11});
}

function capitalizeFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function getRandomOtp(){
	return randomstring.generate({charset:'numeric', length:4});
}

//========================== Export Module Start ==========================
module.exports = {
	isValidEmail,
	isValidPassword,
	_convertToObjectIds,
	getRandomNumber,
	capitalizeFirstLetter,
	getRandomOtp
}
//========================== Export Module End ============================