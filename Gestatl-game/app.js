// === PART I === FUNDAMENTAL GESTALT PRINCIPLES === //

//setting up the canvas

window.addEventListener('load', () => {

    const modalLevel1 = document.querySelector('.modal-level-1');
    const nextLevelBtn = document.querySelector('.next-level-btn');
    const level4Container = document.querySelector('.level-4-buttons-wrapper');
    // const closeModalBtn = document.querySelector('.close-modal');


    const levelDisplay = document.querySelector('.level');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    lineCords = [];
    let collided;
    wrong = false;
    let correct = false;
    let level = 0;
    let imagesData = [];
    let numberOfLattices = -1;


    // canvas.height = window.innerHeight;
    // canvas.width = window.innerWidth;
    canvas.height = 500;
    canvas.width = 900;
    //  window.addEventListener('resize', ()=>{
    //     canvas.height = window.innerHeight;
    //     canvas.width = window.innerWidth;
    //  });

 
    // === Setting up painting functionality === //

    // isPainting is set to false by defualt
    let isPainting = false;

   // When user starts painting, isPainting is set to true and lineCords array is initialized
    function startposition() {
        isPainting = true;
        lineCords = [];
    }

   // When user finished painting, isPainting is set to false and the line cords are printed to console. 
    function finishedPosition() {
        isPainting = false;
        ctx.beginPath();
        console.log(lineCords);
        checkUserSelection();

        imagesData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        console.log(imagesData);
    }

    function draw(e) {
        if (!isPainting) {
            return;
        } else {
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';

            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);

            //Store curve cords in array
            lineCords.push({
                x: Number(e.clientX),
                y: Number(e.clientY)
            });
        }
    }

    //eventListeners for the canvas
    canvas.addEventListener('mousedown', startposition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    let latticesCords = [];

    // nextLevelBtn.addEventListener('click', () =>{
    //     level++;
    //     console.log("level: " + level);
    //     // modalLevel1.style.display = 'none';
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     // if(level===2){
    //     //     createLattice(380, 270, 4, 4, 50, 'green');
    //     //     createLattice(380, 70, 4, 4, 50, 'red');
    //     // }else if(level===3){
    //     //     createSquareLattice(430, 160, 4, 4, 50, 'green');
    //     //     createLattice(240, 170, 4, 4, 50, 'green');
    //     // }

    //     switch(level){
    //         case 2:  
    //             createLattice(380, 270, 4, 4, 50, 'green');
    //             createLattice(380, 70, 4, 4, 50, 'red');
    //             break;
    //         case 3: 
    //              createSquareLattice(430, 160, 4, 4, 50, 'green');
    //              createLattice(240, 170, 4, 4, 50, 'green'); 
    //              break;
    //         case 4: 
    //              level4Container.classList.remove('d-none');
    //              level4Container.classList.add('d-flex');
    //              canvas.classList.add('d-none');
    //             createButtons();
    //             break;

    //     }

        

    // })


    // switch(level){
    //     case 1: 
    //         createLattice(100, 200, 6, 4, 50, 'green');
    //         createLattice(450, 100, 6, 4, 50, 'green');
    //         break;
    //     case 2:
    //             createLattice(380, 270, 4, 4, 50, 'green');
    //             createLattice(380, 70, 4, 4, 50, 'red');
    // }





     // === LEVEL 1 === PROXIMITY ===//
    // To initialize this level: uncomment createLattice functions bellow and 
    // checkUserSelection function in finishedPosition function above
    function createLattice(Xstart, Ystart, rows, columns, step, color) {
        let initialValueX = Xstart;
        let initialValueY = Ystart;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                ctx.beginPath();
                ctx.arc(Xstart, Ystart, 10, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.stroke();
                Xstart += step;
            }
            Xstart = initialValueX;
            Ystart += step;

        }
        ctx.beginPath();


        latticesCords.push({
            x1: initialValueX - 10,
            x2: initialValueX + (columns * step) - 40,
            y1: initialValueY - 10,
            y2: initialValueY + (rows * step) - 30
        });

        imagesData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        console.log(latticesCords);
        numberOfLattices++

    }

    // -- create lattices for level 1 -- //
    // createLattice(100, 200, 6, 4, 50, 'green');
    // createLattice(450, 100, 6, 4, 50, 'green');

    function checkUserSelection() {

        let highestY = Math.max.apply(Math, lineCords.map(function (o) {
            return o.y;
        }));
        let lowestY = Math.min.apply(Math, lineCords.map(function (o) {
            return o.y;
        }));

        let highestX = Math.max.apply(Math, lineCords.map(function (o) {
            return o.x;
        }));
        let lowestX = Math.min.apply(Math, lineCords.map(function (o) {
            return o.x;
        }));

        let meanY = (highestY + lowestY) / 2;
        let meanX = (highestX + lowestX) / 2;

        console.log(meanX, meanY);

        for (let i = 0; i < latticesCords.length; i++) {
            lineCords.forEach(element => {
                if (Number(element.x) > Number(latticesCords[i].x1) &&
                    Number(element.x) < Number(latticesCords[i].x2) &&
                    Number(element.y) > Number(latticesCords[i].y1) &&
                    Number(element.y) < Number(latticesCords[i].y2)) {
                    collided = true;
                    console.log("Collided");
                }
            });

            if (!collided &&
                meanX > latticesCords[i].x1 &&
                meanX < latticesCords[i].x2 &&
                meanY > latticesCords[i].y1 &&
                meanY < latticesCords[i].y2) {
                correct = true;
                console.log("Correct is now " + true);
            }
        }

        if (correct) {
            // alert("Correct!")
            modalLevel1.style.display = "block"
        } else {
            alert("Wrong");
        }

        collided = false;
        correct = false;
        console.log("Correct is now " + correct)

        ctx.putImageData(imagesData[numberOfLattices], 0, 0);
        console.log(imagesData.length);
        imagesData.pop();
    }

    // === LEVEL 2 === SIMILARITY - COLOR ===//
    // To initialize this level: uncomment the checkUserSelection above and the createLattice call bellow
    // -- Create lattices for level 2 -- //
    // createLattice(380, 270, 4, 4, 50, 'green');
    // createLattice(380, 70, 4, 4, 50, 'red');

    //A line for adjusting settings
    //     ctx.beginPath();
    // ctx.moveTo(370, 260);
    // ctx.lineTo(370, 410);
    // ctx.stroke();


    // === LEVEL 3 === SIMILARITY-SHAPE//
    //To initialize this level: uncomment checkUserSelection above and createLattice bellow

    function createSquareLattice(Xstart, Ystart, rows, columns, step, color) {
        let initialValueX = Xstart;
        let initialValueY = Ystart;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                ctx.fillStyle = color;
                ctx.fillRect(Xstart, Ystart, 20, 20);
                Xstart += step;
            }
            Xstart = initialValueX;
            Ystart += step;

        }
        latticesCords.push({
            x1: initialValueX,
            x2: initialValueX + (columns * step) - 30,
            y1: initialValueY,
            y2: initialValueY + (rows * step) - 30
        });

        imagesData.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        console.log(latticesCords);
        numberOfLattices++

    }

    // -- create lattices for level 3 -- //
    // createSquareLattice(430, 160, 4, 4, 50, 'green');
    // createLattice(240, 170, 4, 4, 50, 'green');


    // === LEVEL 4 === CONTINUITY ===//

    // initial level varaibles
    // let horizontalBtns = [];
    // let verticalBtns = [];
    let counter = 1;
    const verticalBtnContainer = document.querySelector('.vertical-buttons-container');
    const horizontalBtnContainer = document.querySelector('.horizontal-buttons-container');
    const submitBtn = document.querySelector('.check-level-4-selection');


    // a function to create the level's lattice
    function createButtons() {
        for (let i = 0; i < 5; i++) {
            let button = document.createElement('button');
            button.style.cssText = "height: 20px; width: 20px; margin: 10px; border-radius:10px;";

            // When a user presses a vertical button, it changes to blue and pushed to a vertical array
            button.addEventListener('click', () => {
                button.style.backgroundColor = "blue";
                verticalBtns.push(button);
                console.log(verticalBtns);
            });
            verticalBtnContainer.appendChild(button);
            for (let j = 0; j < 3; j++) {
                let horizontalButton = document.createElement('button');
                horizontalButton.style.cssText = "height: 20px; width: 20px; margin: 10px; border-radius:10px;";
                horizontalButton.setAttribute('id', `horizontal-button-${counter}`);
                counter++;

                // When a user presses a horizontal button, it changes to blue and pushed to a horizontal array
                horizontalButton.addEventListener('click', () => {
                    horizontalButton.style.backgroundColor = "blue";
                    horizontalBtns.push(horizontalButton);
                    console.log(horizontalBtns);
                })
                horizontalBtnContainer.appendChild(horizontalButton);

            }
        }

        // Pivot button is one that can associate with two different groups. If selected, it is pushed to both arrays
        let pivotButton = document.getElementById('horizontal-button-8');
        pivotButton.addEventListener('click', () => {
            pivotButton.style.backgroundColor = "blue";
            verticalBtns.push(pivotButton);
            console.log(horizontalBtns, verticalBtns);
        })
    }

    // Creating the lattice
    // createButtons();

    // a function to check user's answer based on the arrays lengths
    function checkSelectionLevel4() {
        if (horizontalBtns.length === 15 && verticalBtns.length === 6) {
            alert("Also correct!")
        } else if (horizontalBtns.length === 15 || verticalBtns.length === 6) {
            alert("Correct!")
        } else {
            alert("Wrong");
        }
    }

    // User's selection is checked once the user submits the selection
    submitBtn.addEventListener('click', checkSelectionLevel4);




// === LEVEL 4 CONTINUITY === //


    //Set the canvas using ZIM.js
    const frame = new Frame(FIT, 1024, 768);
    frame.on("ready", () => {
        const stage = frame.stage;
        let stageW = frame.width;
        let stageH = frame.height;
        console.log(frame)

        frame.on("click", () => {
            console.log('click')
        })

        let ZIMCanvas = stage.canvas;

        const myCanvas = document.querySelector('#myCanvas');
        // ZIMCanvas.classList.add('d-none');

        // nextLevelBtn.addEventListener('click', () =>{
        //     level++;
        //     console.log("level: " + level);
        //     // modalLevel1.style.display = 'none';
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        //     // if(level===2){
        //     //     createLattice(380, 270, 4, 4, 50, 'green');
        //     //     createLattice(380, 70, 4, 4, 50, 'red');
        //     // }else if(level===3){
        //     //     createSquareLattice(430, 160, 4, 4, 50, 'green');
        //     //     createLattice(240, 170, 4, 4, 50, 'green');
        //     // }
    
        //     switch(level){
        //         case 1:
        //             // ZIMCanvas.classList.add('d-none');
        //             createLattice(100, 200, 6, 4, 50, 'green');
        //             createLattice(450, 100, 6, 4, 50, 'green');
        //             break;
        //         case 2:  
        //             createLattice(380, 270, 4, 4, 50, 'green');
        //             createLattice(380, 70, 4, 4, 50, 'red');
        //             break;
        //         case 3: 
        //              createSquareLattice(430, 160, 4, 4, 50, 'green');
        //              createLattice(240, 170, 4, 4, 50, 'green'); 
        //              break;
        //         case 4: 
        //             //  level4Container.classList.remove('d-none');
        //             //  level4Container.classList.add('d-flex');
        //             //  canvas.classList.add('d-none');
        //             // createButtons();
        //             canvas.classList.add('d-none');
        //             myCanvas.style.display = 'block';
        //             // createLevel4Btns();        
        //             // createLevel5Btns();

        //             break;
        //         case 5: 

    
        //     }
    
            
    
        // })

        let horizontalBtns = [];
let verticalBtnsIds = [];
let horizonalBtnsIds = [];
let XPosVertical = 430;
let YPosVertical = 550;
let level4XPos = 80;
let level4YPos =600;
let level4Step = 50;
let level4Btns = [];
let level4UserSelectedBtns = [];

function createLevel4Btns(){
    for(let i=0; i<5; i++){
        let verticalButton = new Circle({
            radius:10,
            color: red
        }).loc(XPosVertical, YPosVertical).cur();
        verticalBtnsIds.push(verticalButton.id);
        
        for(let j= 0; j<3; j++){
            let horizontalButton = new Circle({
                radius:10,
                color: red
            }).loc(level4XPos, level4YPos);
            level4XPos+=level4Step;
            horizonalBtnsIds.push(horizontalButton.id);
            if(horizonalBtnsIds.length === 8){
                verticalBtnsIds.push(horizontalButton.id);
            }
        }
        YPosVertical-=level4Step;
    }
    console.log(horizonalBtnsIds, verticalBtnsIds);
}

      function createLevel4Bg(){
        new Button({
            label: "SUBMIT"
        }).loc(400, 650).tap(function () {
                let newCheckArrays = new CheckArrays();
                newCheckArrays.checkSelection(userSelectedbtns,possibleAnswers, 6);
            
        });

           new Label({
            text:"Level 4",
            align:CENTER,
            font:"verdana"
         }).loc(500,50)
      }
    //   createLevel4Btns();
    //   createLevel4Bg();

        // === LEVEL 5 CONTINUITY === //

        //Create the level's ZIM page
        var level5 = new Page(stageW, stageH, red, pink)
        level5.title = new Label("Level 5").loc(100,100,level5);

      // Declare initial variables
        let possibleAnswers = [];
        let userSelectedbtns = [];
        let level5Buttons = [];
        let level5XPos = 80;
        let level5YPos = 400;
        let level5Step = 30;
        let level5Counter = 3;
        let level5BtnGroup = [];

        //A function to create level5 dot lattice
        function createLevel5Btns() {
        
            let level5Button = new Circle({
                radius:10,
                color: red
            }).loc(level5XPos-level5Step, level5YPos-level5Step, level5).cur();
            level5Buttons.push(level5Button);
            level5BtnGroup.push(level5Button.id);

                    new Button({
            label: "SUBMIT"
        }).loc(400, 650, level5).tap(function () {
                let newCheckArrays = new CheckArrays();
                newCheckArrays.checkSelection(userSelectedbtns,possibleAnswers, 6, page2);
            
        });

            for (let i = 0; i < 6; i++) {  
                if(level5Counter > 3){
                    level5BtnGroup = [];
                    level5BtnGroup.push(possibleAnswers[possibleAnswers.length - 1][possibleAnswers[possibleAnswers.length-1].length-1]);
                }
                
                for (let j = 0; j < 5; j++) {
                    let level5Button = new Circle({
                        radius:10,
                        color: red
                    }).loc(level5XPos, level5YPos, level5).cur();
                    level5Buttons.push(level5Button);
                    level5BtnGroup.push(level5Button.id);

                    if(level5Counter % 2 === 0){    
                        level5YPos-=level5Step;
                    }else{
                        level5YPos+=level5Step;
                    }                    
                    level5XPos+=level5Step;
                }

                if(level5Counter % 2 === 0){
                    level5YPos+=level5Step*2;
                }else{
                    level5YPos-=level5Step*2;
                }
                possibleAnswers.push(level5BtnGroup);
                level5Counter++;
            }
            return level5Buttons;
        }
        createLevel5Btns();
        // a function for creating the level's lattice
        // function createLevel5Btns() {
           
        //     let level5Button = new Circle({
        //         radius:10,
        //         color: red
        //     }).loc(level5XPos-level5Step, level5YPos-level5Step).cur();
        //     level5Buttons.push(level5Button);
        //     level5BtnGroup.push(level5Button.id);

        //     for (let i = 0; i < 6; i++) {  
        //         if(level5Counter > 3){
        //             level5BtnGroup = [];
        //             level5BtnGroup.push(possibleAnswers[possibleAnswers.length - 1][possibleAnswers[possibleAnswers.length-1].length-1]);
        //         }
                
        //         for (let j = 0; j < 5; j++) {
        //             let level5Button = new Circle({
        //                 radius:10,
        //                 color: red
        //             }).loc(level5XPos, level5YPos).cur();
        //             level5Buttons.push(level5Button);
        //             level5BtnGroup.push(level5Button.id);

        //             if(level5Counter % 2 === 0){    
        //                 level5YPos-=level5Step;
        //             }else{
        //                 level5YPos+=level5Step;
        //             }                    
        //             level5XPos+=level5Step;
        //         }

        //         if(level5Counter % 2 === 0){
        //             level5YPos+=level5Step*2;
        //         }else{
        //             level5YPos-=level5Step*2;
        //         }
        //         possibleAnswers.push(level5BtnGroup);
        //         level5Counter++;
        //     }
        // }
        // createLevel5Btns();

        function createLevel5EventListeners(){
            level5Buttons.forEach(button=>{
                button.addEventListener('click', ()=>{
                    button.color = blue;
                    console.log(button.id);
                    if(!userSelectedbtns.includes(button.id)){
                        userSelectedbtns.push(button.id);
                    }
                    console.log(userSelectedbtns);
                    stage.update();
                });
            });
        }
        // createLevel5EventListeners();


    //A class object that compares the array of the user's selected buttons with a possible correct answer array
        class CheckArrays {
            constructor(controlArr = [], isCorrect = false) {
                this.controlArr = controlArr;
                this.isCorrect = isCorrect;
                this.checkSelection = function (a, b, num, page) {
                    if (a.length === 0) {
                        alert("Wrong, no element selected");
                    } else {
                        for (let i = 0; i < b.length; i++) {
                            for (let j = 0; j < a.length; j++) {
                                if (b[i].includes(a[j])) {
                                    this.controlArr.push("true");
                                } else {
                                    this.controlArr.push("false");
                                }
                            }
                            console.log(this.controlArr);
                            if (this.controlArr.length == num && !this.controlArr.includes("false")) {
                                this.isCorrect = true;
                            }
                            this.controlArr = [];
                        }
                        if (this.isCorrect == true) {
                            alert("Correct");
                            pages.go(page)
                            // level5.removeFrom();
                            // page2.addTo();
                            // stage.update();
                        } else {
                            alert("Worng");
                        }
                    }
                }
            }
        }

        // new Button({
        //     label: "SUBMIT"
        // }).loc(400, 650).tap(function () {
        //         let newCheckArrays = new CheckArrays();
        //         newCheckArrays.checkSelection(userSelectedbtns,possibleAnswers, 6);
            
        // });

        //    new Label({
        //     text:"Level 5",
        //     align:CENTER,
        //     font:"verdana"
        //  }).loc(500,50)

        // === LEVEL 6 === //
        var page2 = new Page(stageW, stageH, green, blue);
        page2.title = new Label("Level 6").loc(100,100,page2);
        var page3 = new Page(stageW, stageH, green, blue);
        page3.title = new Label("Level 7").loc(100,100,page3);
        var page4 = new Page(stageW, stageH, green, blue);
        page4.title = new Label("Level 8").loc(100,100,page4);

        let level6Step = 230;
        let level6Xpos = 150;
        let level6DotXpos = 80;
        let level6DotStep = 140;
        let leve6DotsIdGroup = [];
        let level6DotsIds = [];
        let level6SelectedDots = [];
        let level6Dots = [];
        
        function createLevel6Lattice(){
            // let level6Step = 230;
            // let level6Xpos = 150;
            // let level6DotXpos = 80;
            // let level6DotStep = 140;
            // let leve6DotsIdGroup = [];
            // let level6DotsIds = [];
            // let level6SelectedDots = [];
            // let level6Dots = [];
        for(let i = 0; i <4; i++){
        let circle = new Blob({
            points:[[1,-42.6,0,0,-50,0,50,0,"mirror"],[100,0,0,0,1,-40.3,-1,40.3,"mirror"],[1,42.6,0,0,50,0,-50,0,"mirror"],[-100,0,0,0,0,40.3,0,-40.3,"mirror"]],
            interactive: false,
            borderColor: red
         }).loc(level6Xpos, 500, page2);  

         for (let j = 0; j <2; j++){
             var dot = new Circle({
                 radius: 10
             }).loc(level6DotXpos, 500, page2);
          
             level6DotXpos+=level6DotStep;
             level6Dots.push(dot);
             leve6DotsIdGroup.push(dot.id);
         }
         level6Xpos+=level6Step;
         level6DotXpos-=50;
         level6DotsIds.push(leve6DotsIdGroup);
         leve6DotsIdGroup = [];
        }

                   new Button({
            label: "SUBMIT"
        }).loc(200, 600, page2).tap(function () {
            if(selectedRects.length === 1){
                alert("Correct! That's the lowest level group");
            }else{
                let newCheckArrays = new CheckArrays();
                newCheckArrays.checkSelection(level6SelectedDots,level6DotsIds, 2, page3);
            } 
        });
        console.log(level6DotsIds);

        level6Dots.forEach(dot =>{
            dot.addEventListener("click", ()=>{
                dot.color = red;
                level6SelectedDots.push(dot.id);
                stage.update();
            })
        })
        return level6Dots;
        }
        createLevel6Lattice();


        level5.title.on("click", function(){
            pages.go(page2);
        })
        page2.title.on("click", function(){
            pages.go(page3);
        })
        page3.title.on("click", function(){
            pages.go(page4);
        })
        page4.title.on("click", function(){
            pages.go(level5);
        })
        createLevel5EventListeners();

        // var page2 = new Page(stageW, stageH, green, blue);
        // page2.title = new Label("Level 6").loc(100,100,page2);
    //    let page2Content = new Rectangle(400,400,purple);
    //    page2Content.center(page2);
    //    page2Content.on("click", ()=> pages.go(level5))
        // page2.content = createLevel6Lattice();
        console.log(level5, page2);

        level5.name = "level 5";
        page2.name = "level 6";
        page3.name = "level 7";
        page4.name = "level 8";
 

        let pages = new Pages({
            pages: [
                {page: level5},
                {page: page2},
                {page: page3},
                {page: page4}
            ],
            transition: "slide",
            speed: 1
        }).addTo()

        pages.on("page", function() {
            zog(pages.page.name); // now we know which page we are on
         })
            // === LEVEL 7 === PARALLELISM ===//
    //To initialize this level: comment line 448 and uncomment createSquiggles() and the new Button() bellow

        // Set initial level variables
        let squigglesId = [];
        let selectedSquiggles = [];
        let squiggles = [];
        let level7Points = [
            [
                [92.5, -52.6, 0, 0, -94.2, -28.2, 94.2, 28.2],
                [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
                [98.4, 70.1, 0, 0, -57.3, -20.4, 57.3, 20.4],
                [99.4, 134, 0, 0, -56.3, -41.9, 56.3, 41.9],
                [98.5, 190.8, 0, 0, -77.7, -7.8, 77.7, 7.8]
            ],
            [
                [92.5, -52.6, 0, 0, -94.2, -28.2, 94.2, 28.2],
                [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
                [98.4, 70.1, 0, 0, -57.3, -20.4, 57.3, 20.4],
                [99.4, 134, 0, 0, -56.3, -41.9, 56.3, 41.9],
                [98.5, 190.8, 0, 0, -77.7, -7.8, 77.7, 7.8]
            ],
            [
                [92.5, -52.6, 0, 0, 66.4, -19.5, -66.4, 19.5],
                [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
                [78.9, 70.1, 0, 0, -73.8, -23.4, 58, 18.3, "straight"],
                [68.3, 138.8, 0, 0, -56.3, -41.9, 56.3, 41.9],
                [56.7, 183, 0, 0, 48.8, 6.8, -48.8, -6.8]
            ],
            [
                [92.5, -52.6, 0, 0, 66.4, -19.5, -66.4, 19.5],
                [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
                [78.9, 70.1, 0, 0, -73.8, -23.4, 58, 18.3, "straight"],
                [68.3, 138.8, 0, 0, -56.3, -41.9, 56.3, 41.9],
                [56.7, 183, 0, 0, 48.8, 6.8, -48.8, -6.8]
            ],
            [
                [92.5, -52.6, 0, 0, -72.8, -11.7, 72.8, 11.7],
                [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
                [78, 61.3, 0, 0, -48.5, -31.1, 51.2, 32.9, "straight"],
                [94.6, 135, 0, 0, -56.3, -41.9, 56.3, 41.9],
                [83.9, 182, 0, 0, -10.5, -43.8, 10.5, 43.8]
            ],
            [
                [92.5, -52.6, 0, 0, -72.8, -11.7, 72.8, 11.7],
                [100.3, 8.4, 0, 0, -63.1, -24.3, 63.1, 24.3],
                [78, 61.3, 0, 0, -48.5, -31.1, 51.2, 32.9, "straight"],
                [94.6, 135, 0, 0, -56.3, -41.9, 56.3, 41.9],
                [83.9, 182, 0, 0, -10.5, -43.8, 10.5, 43.8]
            ],
        ];
        let xPosLevel7 = [80, 150, 250, 330, 390, 450];
        let yPosLevel7 = 100;
        //     //A function to create squiggles lattice
        function createSquiggles(num, levelPoints, yPos, xPos, pageNum) {
            let squiggleIdGroup = []
            for (let i = 0; i < num; i++) {
                var squiggle = new Squiggle({
                    interactive: false,
                    color: red,
                    thickness: 5,
                    points: levelPoints[i]
                }).loc(xPos[i], yPos, pageNum).cur();
                squiggles.push(squiggle);

                if (squiggleIdGroup.length < 2) {
                    squiggleIdGroup.push(squiggle.id);
                    if (squigglesId.length == num / 2 - 1) {
                        squigglesId.push(squiggleIdGroup);
                    }
                } else if (squiggleIdGroup.length === 2) {
                    squigglesId.push(squiggleIdGroup);
                    squiggleIdGroup = [];
                    squiggleIdGroup.push(squiggle.id);
                }
            }
        }
        createSquiggles(6,level7Points,yPosLevel7, xPosLevel7, page3);

        //Create click event listeners for all the squiggles that store their id's in an array
        function createEventListenersForSquiggles() {
            squiggles.forEach(squiggle => {
                squiggle.on('click', function () {
                    squiggle.color = blue;
                    squiggle.thickness = 10;
                    zog(squiggle.id);
                    if (!selectedSquiggles.includes(squiggle.id)) selectedSquiggles.push(squiggle.id);
                    stage.update();
                })
            })
        }
        createEventListenersForSquiggles();

        // a button to submit the user's answer and fire the checkSelection method of the CheckArrays class
        new Button({
            label: "SUBMIT"
        }).loc(100, 400, page3).tap(function () {
            zog(selectedSquiggles);
            let newCheckArrays = new CheckArrays();
            newCheckArrays.checkSelection(selectedSquiggles, squigglesId, 2, page4);
        });

        // var label = new Label({
        //     text:"Level 7",
        //     align:CENTER,
        //     font:"verdana"
        //  }).loc(400,10)

        // === LEVEL 8 === SYMMETRY === //

        let level8Points = [
            [
                [137.7, 176.4, 0, 0, -70.1, -1.5, 70.1, 1.5],
                [138.1, 101.6, 0, 0, -84.5, 1.4, 84.5, -1.4],
                [148.5, 27.2, 0, 0, -81.6, -4.3, 81.6, 4.3],
                [146.1, -41.8, 0, 0, -75.9, -8.6, 75.9, 8.6],
                [145.1, -104.7, 0, 0, -78.8, -5.7, 54.8, 4, "straight"]
            ],
            [
                [137.7, 176.4, 0, 0, 73.3, -4.4, -73.3, 4.4],
                [138.1, 101.6, 0, 0, 83.3, -1.5, -83.3, 1.5],
                [148.5, 27.2, 0, 0, 73.3, -4.3, -73.3, 4.3],
                [146.1, -41.8, 0, 0, 70.4, -4.3, -70.4, 4.3],
                [145.1, -104.7, 0, 0, 89, -11.4, -54.5, 7, "straight"]
            ],
            [
                [137.7, 176.4, 0, 0, -68.6, 28.6, 68.6, -28.6],
                [138.1, 101.6, 0, 0, -44.4, 5.7, 44.4, -5.7],
                [148.5, 27.2, 0, 0, -106, -30.1, 106, 30.1],
                [146.1, -41.8, 0, 0, -64.4, 45.9, 64.4, -45.9],
                [145.1, -104.7, 0, 0, -76, 41.7, 48.1, -26.4, "straight"]
            ],
            [
                [137.7, 176.4, 0, 0, 67.6, 45.8, -67.6, -45.8],
                [138.1, 101.6, 0, 0, 41.7, 10, -41.7, -10],
                [148.5, 27.2, 0, 0, 91.9, -35.9, -91.9, 35.9],
                [146.1, -41.8, 0, 0, 48.9, 45.9, -48.9, -45.9],
                [145.1, -104.7, 0, 0, 71.8, 43.1, -47.1, -28.3, "straight"]
            ],
            [
                [137.7, 176.4, 0, 0, -113.1, 104.7, 113.1, -104.7],
                [138.1, 101.6, 0, 0, -146.2, 30.1, 146.2, -30.1],
                [148.5, 27.2, 0, 0, -106, -30.1, 106, 30.1],
                [137.5, -53.3, 0, 0, -87.4, 34.4, 87.4, -34.4],
                [145.1, -104.7, 0, 0, -110.3, 77.5, 45, -31.6, "straight"]
            ],
            [
                [137.7, 176.4, 0, 0, 38.9, 88.9, -38.9, -88.9],
                [138.1, 101.6, 0, 0, 116.3, 31.5, -116.3, -31.5],
                [148.5, 27.2, 0, 0, 94.8, -18.6, -94.8, 18.6],
                [137.5, -53.3, 0, 0, 71.8, 43, -71.8, -43],
                [145.1, -104.7, 0, 0, 87.6, 90.4, -38.2, -39.5, "straight"]
            ],
        ]
        let yPosLevel8 = 200;
        let xPosLevel8 = [80, 160, 240, 320, 400, 495, 590, 700];


        createSquiggles(6, level8Points, yPosLevel8, xPosLevel8, page4);
        createEventListenersForSquiggles();


        new Button({
            label: "SUBMIT"
        }).loc(100, 400, page4).tap(function () {
            zog(selectedSquiggles);
            let newCheckArrays = new CheckArrays();
            newCheckArrays.checkSelection(selectedSquiggles, squigglesId, 2, level5);
        });


        // === LEVEL 9 === //

        let step = 110;
        let xPos = 100;
        let yPos = 210;
        let blueGroupIds = [];
        let greenGroupIds = [];
        let rects = [];
        let rectsIds = [];
        let selectedRects = [];

        function createLatticeG() {
            //create first row
            for (let i = 0; i < 4; i++) {
                let rect = new Rectangle(100, 100, "blue").loc(xPos, 100);
                rects.push(rect);
                blueGroupIds.push(rect.id);
                xPos += step;
            }
            //Create blue rects of the left column
            for (let i = 0; i < 3; i++) {
                let rect = new Rectangle(100, 100, "blue").loc(100, yPos);
                rects.push(rect);
                blueGroupIds.push(rect.id);
                yPos += step;
            }
            rectsIds.push(blueGroupIds);
            //Create green rects of the left column
            for (let i = 0; i < 1; i++) {
                let rect = new Rectangle(100, 100, "green").loc(100, yPos);
                rects.push(rect);
                greenGroupIds.push(rect.id);
                yPos += step;
            }

            //Create the bottom row
            xPos = 210;
            yPos = 540;
            for (let i = 0; i < 3; i++) {
                let rect = new Rectangle(100, 100, "green").loc(xPos, yPos);
                rects.push(rect);
                greenGroupIds.push(rect.id);
                xPos += step;
            }
            //Create green rects of the right column
            xPos = 430;
            yPos = 430;
            for (let i = 0; i < 2; i++) {
                let rect = new Rectangle(100, 100, "green").loc(xPos, yPos);
                rects.push(rect);
                greenGroupIds.push(rect.id);
                yPos -= step;
            }
            //Last inner green rect
            let rect = new Rectangle(100, 100, "green").loc(xPos - step, yPos + step);
            rects.push(rect);
            greenGroupIds.push(rect.id);
            rectsIds.push(greenGroupIds);
            console.log(blueGroupIds, greenGroupIds, rects, rectsIds);

        }
        // createLatticeG();

        function createEventsForRects() {
            rects.forEach(rect => {
                rect.on('click', (e) => {
                    rect.color = "red";
                    stage.update();
                    if (!selectedRects.includes(rect.id)) selectedRects.push(rect.id);

                    console.log(selectedRects);
                })
            })
        }
        // createEventsForRects();

        // new Button({
        //     label: "SUBMIT"
        // }).loc(600, 400).tap(function () {
        //     if(selectedRects.length === 1){
        //         alert("Correct! That's the lowest level group");
        //     }else{
        //         let newCheckArrays = new CheckArrays();
        //         newCheckArrays.checkSelection(selectedRects,rectsIds, 7);
        //     } 
        // });

        // var label = new Label({
        //     text:"Level 9",
        //     align:CENTER,
        //     font:"verdana"
        //  }).loc(400,10)


        stage.update();
    }, null, true);
});

// const frame2 = new Frame(FIT, 1024, 768);
// frame2.on("ready",  ()=> {
//     const stage2 = frame2.stage;
//     let stag2eW = frame2.width;
//     let stage2H = frame.height;
// })
