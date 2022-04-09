// const frame = new Frame(FIT, 1024, 768);
// frame.on("ready", () => {
//     const stage = frame.stage;
//     let stageW = frame.width;
//     let stageH = frame.height;

//     // put your code here
//     let step = 110;
//     let xPos = 100;
//     let yPos = 210;
//     let blueGroupIds = [];
//     let greenGroupIds = [];
//     let rects = [];
//     let rectsIds = [];
//     let selectedRects = [];

//     function createLatticeG(){
//         //create first row
//         for(let i = 0; i <4; i++) {
//             let rect = new Rectangle(100, 100, "blue").loc(xPos, 100);
//             rects.push(rect);
//             blueGroupIds.push(rect.id);
//             xPos+=step;
//         }
//         //Create blue rects of the left column
//         for(let i = 0; i <3; i++) {
//             let rect = new Rectangle(100, 100, "blue").loc(100, yPos);
//             rects.push(rect);
//             blueGroupIds.push(rect.id);
//             yPos+=step;
//         }
//         rectsIds.push(blueGroupIds);
//         //Create green rects of the left column
//         for(let i= 0; i<1; i++){
//             let rect = new Rectangle(100, 100, "green").loc(100, yPos);
//             rects.push(rect);
//             greenGroupIds.push(rect.id);
//             yPos+=step; 
//         }

//         //Create the bottom row
//         xPos = 210;
//         yPos = 540;
//         for(let i = 0; i <3; i++) {
//             let rect = new Rectangle(100, 100, "green").loc(xPos, yPos);
//             rects.push(rect);
//             greenGroupIds.push(rect.id);
//             xPos+=step;
//         }
//         //Create green rects of the right column
//         xPos = 430;
//         yPos = 430;
//         for(let i = 0; i <2; i++){
//             let rect = new Rectangle(100, 100, "green").loc(xPos, yPos);
//             rects.push(rect);
//             greenGroupIds.push(rect.id);
//             yPos-=step;
//         }
//         //Last inner green rect
//         let rect = new Rectangle(100, 100, "green").loc(xPos-step, yPos+step);
//         rects.push(rect);
//         greenGroupIds.push(rect.id);
//         rectsIds.push(greenGroupIds);
//         console.log(blueGroupIds, greenGroupIds, rects,rectsIds);

//     }
//     createLatticeG();
      
//     function createEventsForRects(){
//         rects.forEach(rect=>{
//             rect.on('click', (e)=>{
//                 rect.color = "red";
//                 stage.update();
//                 selectedRects.push(rect.id);
//             console.log(selectedRects);
//             })
//         })
//     }
//     createEventsForRects();

//     new Button({
//         label: "SUBMIT"
//     }).loc(600, 400).tap(function () {
//         let newCheckArrays = new CheckArrays();
//         newCheckArrays.checkSelection(selectedRects,rectsIds , 7);
//     });

//     stage.update(); 
// });