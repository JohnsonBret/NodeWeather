var somePromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('Promise Fullfilled - It worked'); 
        // reject('Promise Rejected - Unable to fullfill promise');
    }, 2500);
   
});

somePromise.then((message) => {
    console.log('Success', message);
}, (errorMessage) => {
    console.log("Error : ", errorMessage);
})