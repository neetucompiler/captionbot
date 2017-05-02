var request = require('request');

request({
    url: "https://eastus2.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Faces&language=en",
    method: "POST",
    headers: {
        "content-type": "application/json",  // <--Very important!!!
        'Ocp-Apim-Subscription-Key': '1ab0cd9b2fb94de4b84b9a14fd7f8c0f'
    },
    body: JSON.stringify({url:"https://nameberry.com/blog/wp-content/uploads/2016/10/shutterstock_464300804-776x600.jpg"})
}, function (error, response, body){
    console.log(response);
});