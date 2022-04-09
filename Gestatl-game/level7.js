
// //Set the canvas
// const frame = new Frame(FIT, 1024, 768);
// frame.on("ready", () => {
//     const stage = frame.stage;
//     let stageW = frame.width;
//     let stageH = frame.height;

//     canvas = stage.canvas;

// // canvas.classList.add('d-none');
// // Set initial level variables
//     let squiggleGroups = [
//         [4, 43],
//         [82, 121],
//         [160, 199]
//     ]
//     let squigglesId = [];
//     let selectedSquiggles = [];
//     let squiggles = [];
//     let points = [
//         [
//             [92.5, -52.6, 0, 0, -94.2, -28.2, 94.2, 28.2],
//             [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
//             [98.4, 70.1, 0, 0, -57.3, -20.4, 57.3, 20.4],
//             [99.4, 134, 0, 0, -56.3, -41.9, 56.3, 41.9],
//             [98.5, 190.8, 0, 0, -77.7, -7.8, 77.7, 7.8]
//         ],
//         [
//             [92.5, -52.6, 0, 0, -94.2, -28.2, 94.2, 28.2],
//             [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
//             [98.4, 70.1, 0, 0, -57.3, -20.4, 57.3, 20.4],
//             [99.4, 134, 0, 0, -56.3, -41.9, 56.3, 41.9],
//             [98.5, 190.8, 0, 0, -77.7, -7.8, 77.7, 7.8]
//         ],
//         [
//             [92.5, -52.6, 0, 0, 66.4, -19.5, -66.4, 19.5],
//             [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
//             [78.9, 70.1, 0, 0, -73.8, -23.4, 58, 18.3, "straight"],
//             [68.3, 138.8, 0, 0, -56.3, -41.9, 56.3, 41.9],
//             [56.7, 183, 0, 0, 48.8, 6.8, -48.8, -6.8]
//         ],
//         [
//             [92.5, -52.6, 0, 0, 66.4, -19.5, -66.4, 19.5],
//             [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
//             [78.9, 70.1, 0, 0, -73.8, -23.4, 58, 18.3, "straight"],
//             [68.3, 138.8, 0, 0, -56.3, -41.9, 56.3, 41.9],
//             [56.7, 183, 0, 0, 48.8, 6.8, -48.8, -6.8]
//         ],
//         [
//             [92.5, -52.6, 0, 0, -72.8, -11.7, 72.8, 11.7],
//             [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
//             [78, 61.3, 0, 0, -48.5, -31.1, 51.2, 32.9, "straight"],
//             [94.6, 135, 0, 0, -56.3, -41.9, 56.3, 41.9],
//             [83.9, 182, 0, 0, -10.5, -43.8, 10.5, 43.8]
//         ],
//         [
//             [92.5, -52.6, 0, 0, -72.8, -11.7, 72.8, 11.7],
//             [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
//             [78, 61.3, 0, 0, -48.5, -31.1, 51.2, 32.9, "straight"],
//             [94.6, 135, 0, 0, -56.3, -41.9, 56.3, 41.9],
//             [83.9, 182, 0, 0, -10.5, -43.8, 10.5, 43.8]
//         ],
//     ];
//     let xPos = [80, 150, 250, 330, 390, 450];
// //     //A function to create squiggles lattice
//     function createSquiggles(num) { 
//         let squiggleIdGroup = []
//         for (let i = 0; i < num; i++) {
//                 var squiggle = new Squiggle({
//                     interactive: false,
//                     color: red,
//                     thickness: 5,
//                     points: points[i]
//                 }).pos(xPos[i], 100).cur();
//                 squiggles.push(squiggle);

//                 if(squiggleIdGroup.length < 2){
//                     squiggleIdGroup.push(squiggle.id);
//                     if(squigglesId.length == num/2 -1){
//                         squigglesId.push(squiggleIdGroup);
//                     }
//                 }else if(squiggleIdGroup.length === 2){
//                     squigglesId.push(squiggleIdGroup);
//                     squiggleIdGroup = [];
//                     squiggleIdGroup.push(squiggle.id);
//                 }
//         }
//     }
//     createSquiggles(6);

// //     //Create click event listeners for all the squiggles that store their id's in an array
//     function createEventListeners() {
//         squiggles.forEach(squiggle => {
//             squiggle.on('click', function() {
//         squiggle.color = blue;
//         squiggle.thickness = 10;
//         zog(squiggle.id);
//         selectedSquiggles.push(squiggle.id);
//         })
//         })
//     }
//     createEventListeners();


//  // a class object that checks the selected suiggle groups with all possiblt correct solutions
//     class CheckArrays{
//         constructor(controlArr = [], isCorrect = false){
//             this.controlArr = controlArr;
//             this.isCorrect = isCorrect;
//             this.checkSelection = function(a,b){
//                 for(let i=0; i<b.length; i++){
//                     for(let j=0; j<a.length; j++){
//                         if(b[i].includes(a[j])){
//                             this.controlArr.push("true");
//                         }else{
//                             this.controlArr.push("false");
//                         }
//                     }
//                     console.log(this.controlArr);
//                     if(this.controlArr.length == 2 && this.controlArr[0] == "true" && this.controlArr[1] == "true"){
//                         this.isCorrect = true;
//                     }
//                         this.controlArr = [];
//                 }
//                 if(this.isCorrect == true){
//                     alert("Correct");
//                 }else{
//                     alert("Worng");
//                 }
//             }
//         }
//     }
    

// //     // a button to submit the user's answer and fire the checkSelection method of the CheckArrays class
//     new Button({
//         label: "SUBMIT"
//     }).loc(100, 400).tap(function () {
//         zog(selectedSquiggles);
//         let newCheckArrays = new CheckArrays();
//         newCheckArrays.checkSelection(selectedSquiggles, squigglesId, 2);
//     });

    
// stage.update();
// }, null, true);