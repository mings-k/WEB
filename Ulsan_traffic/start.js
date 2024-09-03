require('dotenv').config()
var request = require('request');

var url = 'http://apis.data.go.kr/6310000/citsapi/service/signal';
var queryParams = '?' + encodeURIComponent('serviceKey') + process.env.REACT_APP_TrafficLight_API_KEY; /* Service Key*/
queryParams += '&' + encodeURIComponent('linkId') + '=' + encodeURIComponent('1930002300'); /* */


request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});