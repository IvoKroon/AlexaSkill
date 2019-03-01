console.log(
    require("./index").handler({}));

// console.log(handler.handler);
// //Call your exports function with required params
// //In AWS lambda these are event, content, and callback
// //event and content are JSON object and callback is a function
// //In my example i'm using empty JSON
// handler.handler( {}, //event
//     {}, //content
//     function(data,ss) {  //callback function with two arguments
//         console.log(data);
//     });
