const options = {
    width: 800,
    height: 600,
    backgroundColor: 0x7193bc,
    targetSelector: "#canvas",
    fontFamilies: ["Roboto", "DS-DIGI"],
    resources: {
        background: "https://i.imgur.com/ITj3TqW.png",
        nextButton: "https://i.imgur.com/SvEwYig.png",
        hitboxWhite: "https://i.imgur.com/P00E9nC.png",
        board: "https://i.imgur.com/RPzI2ra.png",
        character:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/p02-finura/Boneco+com+a+logo+do+LIA.png",
        containerBack: "https://i.imgur.com/kYy3zLe.png",
        containerFront:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/p03-estufa/tanque+frente+com+logo+ajustada.png",
        scale: "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/p03-estufa/balan%C3%A7a+COM+LOGO+LIA.png",
        block: "https://i.imgur.com/GBZtXo5.png",
        blockWet: "https://i.imgur.com/OP3PfKm.png",
        stoveLed: "https://i.imgur.com/RssRKv8.png",
        table1: "https://i.imgur.com/LW3Fuuf.png",
        table2: "https://i.imgur.com/pMGKFoF.png",
        stove: "https://i.imgur.com/KIU12NH.png",
        stoveDoor: "https://i.imgur.com/103D5Sw.png",
        stoveDoorSide: "https://i.imgur.com/tzUpkDN.png",
        clock: "https://i.imgur.com/QYh9hNJ.png",
        yesButton: "https://i.imgur.com/NytEyRG.png",
        nextButton: "https://i.imgur.com/X9lnoM9.png",
        noButton: "https://i.imgur.com/hl2NvwE.png",
        dialogBox: "https://i.imgur.com/MMSWoTi.png",
        card: "https://i.imgur.com/4Mm92B0.png",
    },
};

if (introOptions) {
    Object.keys(introOptions.resources).forEach((id) => {
        options.resources[id] = introOptions.resources[id];
    });
}

// load footer resources
if (typeof footerOptions !== "undefined") {
    Object.keys(footerOptions.resources).forEach((id) => {
        options.resources[id] = footerOptions.resources[id];
    });
}


//generates random numbers
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randomFloatNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

//MAIN
(function virtualLab() {
    setup(options, (app, resources) => {
        /* LOCAL FUNCTIONS SCOPE */

        //defines objects size
        function size(obj, width, height) {
            if (typeof obj == "object") {
                obj.pivot.set(obj.width / 2, obj.height / 2);
                obj.width = width;
                obj.height = height;
            } else if (typeof obj == "array") {
                obj = width;
                obj = height;
            }
            app.stage.addChild(obj);
        }

        //defines objects position and centralize pivot
        function position(obj, x, y) {
            if (typeof obj == "object") {
                obj.pivot.set(obj.width / 2, obj.height / 2);
                obj.x = x;
                obj.y = y;
            } else if (typeof obj == "array") {
                obj = x;
                obj = y;
            }
            app.stage.addChild(obj);
        }
        //automatically sets the position and size of objects
        function configureObject(
            object,
            width,
            height,
            x,
            y,
            moveItem = false
        ) {
            position(object, x, y);
            size(object, width, height);
            if (moveItem) {
                object.interactive = true;
                object.button = true;
                object
                    .on("pointerdown", onDragStart)
                    .on("pointerup", onDragEnd)
                    .on("pointerupoutside", onDragEnd)
                    .on("pointermove", onDragMove);
            }
            app.stage.addChild(object);
        }

        //change srite texture
        function changeTexture(object, newImage) {
            object.texture = newImage;
        }

        //set clock times
        function setTime(h) {
            let time = gsap.timeline({});
            let aux = 5;
            let text = "";
            for (let i = 0; aux < 60; i++) {
                if (aux < 10) {
                    text = "0" + h + ":0" + aux + ":00";
                } else {
                    text = "0" + h + ":" + aux + ":00";
                }
                time.set(displayClock, {
                    pixi: {
                        text: text,
                    },
                    delay: 0.5,
                });
                aux += 5;
            }
            time.set(displayClock, {
                pixi: {
                    text: "0" + (h + 1) + ":00" + ":00",
                },
                delay: 0.5,
            });

            return time;
        }

        /* CREATE ITEMS SCOPE */

        //text default
        const textDefault = new PIXI.TextStyle({
            fontFamily: "Roboto",
            wordWrap: true,
            wordWrapWidth: 175,
            fontSize: 16,
            fill: 0xffffff,
            backgroundColor: 0xffffff,
        });

        const textCharacter = new PIXI.TextStyle({
            fontFamily: "Roboto",
            wordWrap: true,
            wordWrapWidth: 230,
            fontSize: 16,
            fill: 0x000000,
            backgroundColor: 0xffffff,
        });

        //text for all displays
        const displayText = new PIXI.Text("o.oo");
        displayText.anchor.set(0.1, 0);
        displayText.style = new PIXI.TextStyle({
            fontFamily: "DS-DIGI",
            fontSize: 45,
        });

        const displayText2 = new PIXI.Text("o.oo");
        displayText2.anchor.set(0.7, -0.4);
        displayText2.style = new PIXI.TextStyle({
            fontFamily: "DS-DIGI",
            fontSize: 45,
        });

        const fontClock = new PIXI.TextStyle({
            fontFamily: "DS-DIGI",
            wordWrap: true,
            wordWrapWidth: 180,
            fontSize: 60,
            fill: 0xff0000,
            backgroundColor: 0xffffff,
        });

        const displayFont = new PIXI.TextStyle({
            fontFamily: "DS-DIGI",
            wordWrap: true,
            wordWrapWidth: 180,
            fontSize: 23,
            fill: 0xff0000,
            backgroundColor: 0xffffff,
        });

        /* LOCAL FUNCTIONS SCOPE */

        //automatically sets the position and size of objects
        function configureObject(
            object,
            width,
            height,
            x,
            y,
            moveItem = false
        ) {
            position(object, x, y);
            size(object, width, height);
            if (moveItem) {
                object.interactive = true;
                object.buttonMode = true;
                object.on("pointerdown", timelineControl);
            }
            app.stage.addChild(object);
        }

        //change srite texture
        function changeTexture(object, newImage) {
            object.texture = newImage;
        }

        /* CREATE ITEMS SCOPE */

        const board = new PIXI.Sprite(resources.board.texture);
        configureObject(board, 500, 320, -500, 125);

        //create table1
        const table1 = new PIXI.Sprite(resources.table1.texture);
        configureObject(table1, 850, 200, -500, 625);

        //create table2
        const table2 = new PIXI.Sprite(resources.table2.texture);
        configureObject(table2, 800, 250, 1500, 625);

        //create scale
        const scale = new PIXI.Sprite(resources.scale.texture);
        configureObject(scale, 300, 120, -230, 490);

        const scale2 = new PIXI.Sprite(resources.scale.texture);
        configureObject(scale2, 300, 120, 1230, 490);

        //create back of container
        const containerBack = new PIXI.Sprite(resources.containerBack.texture);
        configureObject(containerBack, 246, 192, 1500, 450);

        //create clock
        const clock = new PIXI.Sprite(resources.clock.texture);
        configureObject(clock, 225, 60, -200, 300);

        //create stove
        const stove = new PIXI.Sprite(resources.stove.texture);
        configureObject(stove, 250, 300, -250, 400);

        //create display clock
        const displayClock = new PIXI.Text("00:00:00", fontClock);
        displayClock.x = -260;
        displayClock.y = 276;
        app.stage.addChild(displayClock);

        //create blocksContainer
        const blocksContainer = new PIXI.Container();
        position(blocksContainer, -500, 0);

        let blockPositionX = 420;
        let blockPositionY = 510;
        let blockWidth = 80;
        let blockHeight = 80;

        for (let i = 0; i < 6; i++) {
            const block = new PIXI.Sprite(resources.block.texture);
            configureObject(
                block,
                blockWidth,
                blockHeight,
                blockPositionX,
                blockPositionY
            );
            blocksContainer.addChild(block);

            if (i == 2) {
                blockPositionY -= 60;
                blockPositionX = blocksContainer.children[0].x;
            } else {
                blockPositionX -= 40;
            }
        }

        // create stove door
        const stoveDoor = new PIXI.Sprite(resources.stoveDoor.texture);
        configureObject(stoveDoor, 220, 235, -250, 380);
        stoveDoor.open = -80;
        stoveDoor.close = 150;
        stoveDoor.angle = -90;

        //create stove Door
        //descomentar
        // const stoveDoor = new PIXI.Sprite(resources.stoveDoor.texture);
        // configureObject(stoveDoor, 243, 220, -255, 380);
        // stoveDoor.visible = false

        //create stove door side
        const stoveDoorSide = new PIXI.Sprite(resources.stoveDoorSide.texture);
        configureObject(stoveDoorSide, 20, 220, -255, 380);
        stoveDoorSide.visible = false;

        //create stove led
        const stoveLed = new PIXI.Sprite(resources.stoveLed.texture);
        configureObject(stoveLed, 11, 11, -255, 527);
        stoveLed.visible = false;

        //create character
        const character = new PIXI.Sprite(resources.character.texture);
        size(character, 200, 300);
        position(character, 898, 447);
        character.angle = 8;
        character.anchor.set(0.5, 0.8);

        app.stage.addChild(character);

        //create dialog box
        const dialogBox = new PIXI.Sprite(resources.dialogBox.texture);
        configureObject(dialogBox, 270, 210, 630, 130);
        dialogBox.visible = false;

        const nextButton = new PIXI.Sprite(resources.nextButton.texture);
        configureObject(nextButton, 60, 30, 710, 175, true);
        nextButton.visible = false;

        // dialogue text
        const textDialogue = new PIXI.Text("", textCharacter);
        textDialogue.x = 520;
        textDialogue.y = 40;
        app.stage.addChild(textDialogue);

        //create front of container
        const containerFront = new PIXI.Sprite(
            resources.containerFront.texture
        );
        configureObject(containerFront, 247, 175, 1500, 455);

        //create back of container
        const displayContainer = new PIXI.Sprite(resources.clock.texture);
        displayContainer.anchor.set(0.9, 0.1);
        configureObject(displayContainer, 68, 30, 1500, 457);

        const displayContainerFont = new PIXI.Text("100 °C", displayFont);
        position(displayContainerFont, 1500, 448);
        displayContainerFont.anchor.set(1.1, -0.3);
        app.stage.addChild(displayContainerFont);

        //background
        const background = new PIXI.Sprite(resources.background.texture);
        configureObject(background, 800, 600, 400, 300);
        background.alpha = 0.5;
        background.visible = false;

        position(displayText, -285, 505);
        app.stage.addChild(displayText);

        position(displayText2, 1230, 490);
        app.stage.addChild(displayText2);

        /* ANIMATIONS SCOPE*/

        //set items on initial position
        function initialPosition() {
            let durationAction = 0.8;
            let delayT = 0.4;
            let initial = gsap.timeline({
                delay: 1,
            });

            // call table1 elements
            initial.to(table1, {
                pixi: {
                    x: 400,
                },
                duration: durationAction,
                delay: delayT,
            });

            initial.to(
                scale,
                {
                    pixi: {
                        x: 620,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                0
            );
            initial.to(
                displayText,
                {
                    pixi: {
                        x: 575,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                0
            );
            initial.to(
                blocksContainer,
                {
                    pixi: {
                        x: 0,
                    },
                    duration: durationAction,
                    delay: delayT * 3,
                },
                0
            );
            initial.to(
                clock,
                {
                    pixi: {
                        x: 410,
                    },
                    duration: durationAction,
                    delay: delayT * 4,
                },
                0
            );
            initial.to(
                displayClock,
                {
                    pixi: {
                        x: 310,
                    },
                    duration: durationAction,
                    delay: delayT * 4,
                },
                0
            );
            initial.to(
                stoveLed,
                {
                    pixi: {
                        x: 241,
                    },
                    duration: durationAction,
                    delay: delayT * 4,
                },
                0
            );
            initial.to(
                stove,
                {
                    pixi: {
                        x: 150,
                    },
                    duration: durationAction,
                    delay: delayT * 4,
                },
                0
            );
            initial.to(
                stoveDoor,
                {
                    pixi: {
                        x: 150,
                    },
                    duration: durationAction,
                    delay: delayT * 4,
                },
                0
            );
            initial.to(
                board,
                {
                    pixi: {
                        x: 240,
                    },
                    duration: durationAction,
                    delay: delayT * 5,
                },
                0
            );
            initial.to(
                character,
                {
                    pixi: {
                        angle: -25,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );

            return initial;
        }

        function timelineControl() {
            return timeline.paused(!timeline.paused());

            //timeline.paused(true)
        }

        function insertDialogue(text, pause = false) {
            let durationAction = 1;

            let insert = gsap.timeline();
            insert.to(
                dialogBox,
                {
                    pixi: {
                        visible: true,
                    },
                },
                0
            );
            insert.set(
                textDialogue,
                {
                    pixi: {
                        text: text,
                    },
                },
                0
            );
            //insert.addPause()

            if (pause == true) {
                insert.to(nextButton, {
                    pixi: {
                        visible: true,
                    },
                });

                //insert.add(gsap.delayedCall(0, timelineControl, [true]) )
                insert.call(timelineControl);
                insert.to(nextButton, {
                    pixi: {
                        visible: false,
                    },
                });
            }

            //insert.call(timelineControl())

            //insert.play()

            return insert;
        }

        function removeDialogue() {
            let remove = gsap.timeline();

            remove.to(
                textDialogue,
                {
                    pixi: {
                        text: "",
                    },
                },
                0
            );
            remove.to(
                dialogBox,
                {
                    pixi: {
                        visible: false,
                    },
                },
                0
            );

            return remove;
        }

        function moveBlocksToStove(container) {
            let positionX = 110;
            let positionY = 435;
            const firstBlockPosition = positionX;

            let moveBlock = gsap.timeline({
                delay: 0,
            });
            moveBlock.to(stoveDoor, {
                pixi: {
                    x: stoveDoor.open,
                },
                duration: 2,
            });

            for (let i = 5; i >= 0; i--) {
                moveBlock.to(container.children[i], {
                    pixi: {
                        y: positionY,
                        x: positionX,
                    },
                });

                if (i == 3) {
                    positionY -= 60;
                    positionX = firstBlockPosition;
                } else {
                    positionX += 40;
                }
            }

            moveBlock.to(stoveDoor, {
                pixi: {
                    x: stoveDoor.close,
                },
                duration: 2,
            });

            return moveBlock;
        }

        function moveBlocksToStoveFirst(container) {
            let positionX = 110;
            let positionY = 435;
            const durationAction = 0.5;
            const firstBlockPosition = positionX;
            let number;
            let j = 0;

            let moveBlock = gsap.timeline({
                delay: 0,
            });
            moveBlock.to(stoveDoor, {
                pixi: {
                    x: stoveDoor.open,
                },
                duration: durationAction,
            });

            for (let i = 5; i >= 0; i--) {
                number = randomFloatNumber(2.35, 2.6);
                result = new PIXI.Text(`${number}`, textDefault);
                position(result, 133, 90 + j * 25);
                result.visible = false;
                results[0].push(result);
                numbers[0].push(number);
                app.stage.addChild(result);

                moveBlock.to(container.children[i], {
                    pixi: {
                        y: 410,
                        x: 610,
                    },
                    duration: 1,
                });

                moveBlock.set(displayText, {
                    pixi: {
                        text: number,
                    },
                });

                moveBlock.set(displayText, {
                    pixi: {
                        text: "o.oo",
                    },
                    delay: 2,
                });

                moveBlock.to(results[0][j], {
                    visible: true,
                });

                moveBlock.to(container.children[i], {
                    pixi: {
                        y: positionY,
                        x: positionX,
                    },
                    duration: 1,
                });

                if (i == 3) {
                    positionY -= 60;
                    positionX = firstBlockPosition;
                } else {
                    positionX += 40;
                }

                j++;
            }

            moveBlock.to(stoveDoor, {
                pixi: {
                    x: stoveDoor.close,
                },
                duration: 2,
            });

            return moveBlock;
        }

        // function doorsOpen() {
        //     let doorsAnimation = gsap.timeline({ delay: 1 })
        //     let delayT = 0.2

        //     for (let i = 1; i < 4; i++) {
        //         doorsAnimation.to(stoves[i - 1], {
        //             visible: false,
        //             delay: delayT * i,
        //             duration: 0
        //         }, 0)
        //         doorsAnimation.to(stoves[i], {
        //             visible: true,
        //             delay: delayT * i,
        //             duration: 0.1

        //         }, 0)
        //     }

        //     return doorsAnimation
        // }

        // function doorsClose() {
        //     let doorsAnimation = gsap.timeline({ delay: 1 })
        //     let delayT = 0.2

        //     for (let i = 4; i > 0; i--) {
        //         doorsAnimation.to(stoves[i], {
        //             visible: false,
        //             delay: delayT * (8 - i),
        //             duration: 0
        //         }, 0)
        //         doorsAnimation.to(stoves[i - 1], {
        //             visible: true,
        //             delay: delayT * (8 - i),
        //             duration: 0.1
        //         }, 0)
        //     }

        //     return doorsAnimation
        // }

        function scene1() {
            let scene = gsap.timeline({
                delay: 2,
            });
            const durationAction = 0.8;
            let delayT = 0.4;

            scene.to(table2, {
                pixi: {
                    x: 600 + 1000,
                },
                duration: durationAction,
                delay: delayT * 1,
            });
            scene.to([scale2, displayText2], {
                pixi: {
                    x: 620 + 1000,
                },
            });

            scene.to(
                [
                    containerBack,
                    containerFront,
                    displayContainerFont,
                    displayContainer,
                ],
                {
                    pixi: {
                        x: 200 + 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 1,
                },
                0
            );

            scene.to(
                table1,
                {
                    pixi: {
                        x: 400,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                scale,
                {
                    pixi: {
                        x: 630,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                displayText,
                {
                    pixi: {
                        x: 575,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );

            scene.to(
                blocksContainer,
                {
                    pixi: {
                        x: 0,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                clock,
                {
                    pixi: {
                        x: 360,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                stoveLed,
                {
                    pixi: {
                        x: 241,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                stove,
                {
                    pixi: {
                        x: 150,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                doorFrame1,
                {
                    pixi: {
                        x: 145,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );
            scene.to(
                stoveDoorSide,
                {
                    pixi: {
                        x: 40,
                    },
                    duration: durationAction,
                    delay: delayT * 2,
                },
                1
            );

            return scene;
        }

        function scene2() {
            let scene = gsap.timeline({
                delay: 2,
            });
            let durationAction = 0.8;
            let delayT = 0.4;

            // hide table1 elements
            scene.to(
                table1,
                {
                    pixi: {
                        x: 400 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );
            scene.to(
                scale,
                {
                    pixi: {
                        x: 630 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );
            scene.to(
                displayText,
                {
                    pixi: {
                        x: 575 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );
            scene.set(
                displayClock,
                {
                    pixi: {
                        text: "oo:oo:oo",
                    },
                    delay: delayT * 6,
                },
                0
            );

            scene.to(
                stoveLed,
                {
                    pixi: {
                        x: 241 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );
            scene.to(
                stove,
                {
                    pixi: {
                        x: 150 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );
            scene.to(
                stoveDoor,
                {
                    pixi: {
                        x: 150 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 6,
                },
                0
            );

            // call table2 elements'
            scene.to(
                table2,
                {
                    pixi: {
                        x: 400,
                    },
                    duration: durationAction,
                    delay: delayT * 8,
                },
                1
            );
            scene.to(
                blocksContainer,
                {
                    pixi: {
                        x: 0 - 1000,
                    },
                    duration: durationAction,
                    delay: delayT * 8,
                },
                1
            );
            scene.to(
                [
                    containerBack,
                    containerFront,
                    displayContainerFont,
                    displayContainer,
                ],
                {
                    pixi: {
                        x: 170,
                    },
                    duration: durationAction,
                    delay: delayT * 8,
                },
                1
            );

            scene.to(
                [scale2, displayText2],
                {
                    pixi: {
                        x: 620,
                    },
                    duration: durationAction,
                    delay: delayT * 8,
                },
                1
            );

            return scene;
        }

        //this will store all results
        const results = [[], [], [], [], [], []];
        const numbers = [[], [], [], [], [], []];
        let number;

        function moveBlocksToScale() {
            let positionX = 610;
            let positionY = 410;
            let positionXscene2 = 420;
            let positionYscene2 = 510;
            let durationAction = 0.5;
            const initialPositionXscene2 = positionXscene2;
            let weight = gsap.timeline({ delay: 1 });
            let result;

            for (let i = 0; i <= 3; i++) {
                positionXscene2 = 420;
                positionYscene2 = 510;
                weight.add(setTime(i));

                weight.to(stoveDoor, {
                    pixi: {
                        x: stoveDoor.open,
                    },
                    duration: 2,
                });

                if (i == 0)
                    weight.add(
                        insertDialogue(
                            "Passado 1  hora, vamos realizar a segunda pesagem."
                        )
                    );
                else if (i == 1)
                    weight.add(
                        insertDialogue("Agora, vamos para a terceira pesagem.")
                    );
                else if (i == 2)
                    weight.add(insertDialogue("Pesando mais uma vez..."));

                for (let j = 0; j <= 5; j++) {
                    // 2.2 - 2.3
                    // 2.8 - > seca/ 2.6
                    // 2 - 2.40 perto de 2.200
                    // 3 -4 pesagem não perde massa

                    if (i == 0) {
                        number = randomFloatNumber(2.35, numbers[i][j]);
                    } else if (i == 1) {
                        number = randomFloatNumber(2.3, numbers[i][j]);
                    } else if (i == 2) {
                        number = randomFloatNumber(2.2, 2.3);
                    } else {
                        number = numbers[i][j];
                        if (j == 0)
                            weight.add(
                                insertDialogue(
                                    "Note que o peso do bloco não mudou. Isso significa que chegou ao seu limite de perda de massa.",
                                    true
                                )
                            );
                    }

                    result = new PIXI.Text(`${number}`, textDefault);
                    position(result, 188 + i * 55, 90 + j * 25);
                    result.visible = false;
                    results[i + 1].push(result);
                    numbers[i + 1].push(number);
                    app.stage.addChild(result);

                    weight.to(blocksContainer.children[j], {
                        pixi: {
                            x: positionX,
                            y: positionY,
                        },
                        delay: 1,
                        duration: durationAction,
                    });
                    weight.set(displayText, {
                        pixi: {
                            text: number,
                        },
                    });
                    weight.to(displayText, {
                        pixi: {
                            text: "o.oo",
                        },
                        delay: 1,
                    });
                    weight.to(results[i + 1][j], {
                        visible: true,
                    });

                    if (i == 3) {
                        weight.to(blocksContainer.children[j], {
                            pixi: {
                                x: positionXscene2 + 1000,
                                y: positionYscene2,
                            },

                            duration: durationAction,
                        });
                    } else {
                        weight.to(blocksContainer.children[j], {
                            pixi: {
                                x: positionXscene2,
                                y: positionYscene2,
                            },

                            duration: durationAction,
                        });
                    }

                    if (j == 2) {
                        positionYscene2 -= 60;
                        positionXscene2 = initialPositionXscene2;
                    } else {
                        positionXscene2 -= 40;
                    }
                }
                weight.add(removeDialogue());

                if (i != 3) {
                    weight.add(moveBlocksToStove(blocksContainer));
                } else {
                    weight.to(stoveDoor, {
                        pixi: {
                            x: stoveDoor.close,
                        },
                        duration: 2,
                    });
                }
            }

            return weight;
        }

        //must be hidden when it done
        function moveBlocks(container) {
            let positionX = 420;
            let positionY = 510;
            const rowUp = positionX;

            let weight = gsap.timeline();
            for (let i = 0; i <= 5; i++) {
                weight.to(container.children[i], {
                    pixi: {
                        x: positionX + 1000,
                        y: positionY,
                    },
                });

                if (i == 2) {
                    positionY -= 60;
                    positionX = rowUp;
                } else {
                    positionX -= 40;
                }
            }

            return weight;
        }

        function moveBlocksToContainer(container) {
            let positionX = 1220;
            let positionY = 260;
            const durationActionAction = 0.5;
            const rowUp = positionX;
            let blocks = gsap.timeline();

            for (let i = 5; i >= 0; i--) {
                blocks
                    .to(container.children[i], {
                        pixi: {
                            y: positionY,
                        },
                        duration: durationActionAction,
                    })
                    .to(container.children[i], {
                        pixi: {
                            x: positionX,
                        },
                        duration: durationActionAction,
                    })
                    .to(container.children[i], {
                        pixi: {
                            y: positionY + 240,
                        },
                        duration: durationActionAction + 0.5,
                    })
                    .call(changeTexture, [
                        container.children[i],
                        resources.blockWet.texture,
                    ]);

                if (i == 3) {
                    positionY -= 60;
                    positionX = rowUp;
                } else {
                    positionX -= 40;
                }
            }

            for (let i = 0; i <= 3; i++) {
                //add clock here
                blocks.add(setTime(i));
            }

            return blocks;
        }

        function moveBlocksToScale2(container) {
            let positionX = 1345;
            let positionY = 510;
            const rowUp = positionX;
            const durationAction = 0.5;
            let delayT = 1;
            let blocks = gsap.timeline();
            let j = 0;
            let result;

            for (let i = 5; i >= 0; i--) {
                //open the door of the scale
                blocks
                    .to(container.children[i], {
                        pixi: {
                            y: 260,
                        },
                        duration: durationAction,
                    })
                    .to(container.children[i], {
                        pixi: {
                            x: 1610,
                        },
                        duration: durationAction,
                    })
                    .to(container.children[i], {
                        pixi: {
                            y: 410,
                        },
                        duration: durationAction,
                    });

                number = randomFloatNumber(2.6, 2.8);
                result = new PIXI.Text(`${number}`, textDefault);
                position(result, 410, 215 - i * 25);

                result.visible = false;
                results[5].push(result);
                numbers[5].push(number);
                app.stage.addChild(result);

                blocks.set(displayText2, {
                    pixi: {
                        text: number,
                    },
                });

                blocks.to(container.children[i], {
                    pixi: {
                        x: positionX,
                        y: positionY,
                    },
                    delay: delayT,
                });
                if (i == 3) {
                    positionY -= 60;
                    positionX = rowUp;
                } else {
                    positionX += 40;
                }

                blocks.set(displayText2, {
                    pixi: {
                        text: "o.oo",
                    },
                });
                blocks.to(results[5][j], {
                    visible: true,
                });
                j++;
            }
            return blocks;
        }

        const timeline = gsap.timeline();

         timeline.add(intro(app, resources));
        timeline.add(footer(app, resources));
        // set items on inicial position

        timeline.add(initialPosition());

        timeline.add(
            insertDialogue(
                "Olá! Eu sou o professor NOME_DO_PROFESSOR e, nesta prática, iremos realizar o ensaio de determinação da massa seca e do índice de absorção d`água. Clique em próximo para continuar.",
                true
            )
        );

        timeline.add(
            insertDialogue(
                "Primeiramente, vamos verificar a massa natural de cada um dos elementos. Em seguida, iremos submeter os corpos-de-prova à secagem em estufa a (105 ± 5)ºC m durante intervalos de 1 hora, durante 4 horas.",
                true
            )
        );

        timeline.add(
            insertDialogue(
                "Os resultados serão registrados no quadro à esquerda, conforme cada um dos experimentos em que os blocos serão submetidos. Clique em próximo para continuar.",
                true
            )
        );

        timeline.add(removeDialogue());

        timeline.add(
            insertDialogue("Realizando a pesagem dos corpos ao natural...")
        );

        timeline.add(moveBlocksToStoveFirst(blocksContainer));

        timeline.add(removeDialogue());

        // move the blocks to stove. This process will repeat 4 times
        timeline.add(moveBlocksToScale());
        timeline.add(removeDialogue());

        // in the last step, the function will move all blocks to scene 2
        timeline.add(scene2());
        timeline.add(
            insertDialogue(
                "Agora, vamos subemeter os corpos sob a água, numa temperatura de 100°C durante 4 horas. ",
                true
            )
        );
        timeline.add(removeDialogue());

        //timeline.add(moveBlocks(blocksContainer));

        timeline.add(moveBlocksToContainer(blocksContainer));

        timeline.add(
            insertDialogue(
                "Chegou a hora de verificarmos os pesos dos corpos molhados. Vamos leva-los à balança.",
                true
            )
        );
        timeline.add(removeDialogue());

        timeline.add(moveBlocksToScale2(blocksContainer));
    });
})();
