const opencage = require('opencage-api-client');


const getLocation = async (adrs) => {
    const location = await opencage.geocode({q: adrs})
    // console.log(location);
    // console.log(location);
        // console.log(`doooooooooooooo`);
        // console.log(JSON.stringify(location));
        if (location.status.code == 200) {
            if (location.results.length > 0) {
            var place = location.results[0];
            console.log(place.formatted);
            console.log(place.geometry);
            // console.log(place.annotations.timezone.name);
            }
        } else if (location.status.code == 402) {
            console.log('hit free-trial daily limit');
            // console.log('become a customer: https://opencagedata.com/pricing'); 
        } else {
            console.log('error', location.status.message);
        }
        
    // .then(data => {
    //     console.log(data);
    //     console.log(`daaaattttaaaaaaaa`);
    //     console.log(JSON.stringify(data));
    //     if (data.status.code == 200) {
    //         if (data.results.length > 0) {
    //         var place = data.results[0];
    //         console.log(place.formatted);
    //         console.log(place.geometry);
    //         console.log(place.annotations.timezone.name);
    //         }
    //     } else if (data.status.code == 402) {
    //         console.log('hit free-trial daily limit');
    //         console.log('become a customer: https://opencagedata.com/pricing'); 
    //     } else {
    //         console.log('error', data.status.message);
    //     }
    // }).catch(error => {
    // console.log('error', error.message);
    // });

}
getLocation('Meir Park, Tel Aviv-Yafo, Israel')


// opencage.geocode({q: 'Yom Tov 28, Tel Aviv'}).then(data => {
// if (data.status.code == 200) {
//     if (data.results.length > 0) {
//         var place = data.results[0];
//         console.log(place.formatted);
//         console.log(place.geometry);
//     }
//     } else if (data.status.code == 402) {
//         console.log('hit free-trial daily limit');
//     } else {
//         console.log('error', data.status.message);
//     }
// }).catch(error => {
//     console.log('error', error.message);
// });
    
