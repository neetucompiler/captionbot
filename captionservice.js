

var request = require('request').defaults({ encoding: null });

var VISION_URL = 'https://eastus2.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Faces&language=en';
/** 
 *  Gets the caption of the image from an image stream
 * @param {stream} stream The stream to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
module.exports.getCaptionFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_URL,
                encoding: 'binary',
                headers: { 
                'content-type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': '1ab0cd9b2fb94de4b84b9a14fd7f8c0f'
                }
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(extractCaption(JSON.parse(body)));
                }
            }));
        }
    );
};

/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with caption string if succeeded, error otherwise
 */
module.exports.getCaptionFromUrl = function (myurl) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_URL,
                headers: { 
                'content-type': 'application/json',
                'Ocp-Apim-Subscription-Key': '1ab0cd9b2fb94de4b84b9a14fd7f8c0f'
                },
                body: JSON.stringify({url:"https://nameberry.com/blog/wp-content/uploads/2016/10/shutterstock_464300804-776x600.jpg"})
            };

            request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(extractCaption(body));
                }
            });
        }
    );
};

/**
 * Extracts the caption description from the response of the Vision API
 * @param {Object} body Response of the Vision API
 * @return {string} Description if caption found, null otherwise.
 */
function extractCaption(body) {
    if (body && body.description && body.description.captions && body.description.captions.length) {
        return body.description.captions[0].text;
    }

    return null;
}