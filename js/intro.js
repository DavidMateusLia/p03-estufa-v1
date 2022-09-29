const introOptions = {
    resources: {
        logoCircle:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/pratica-abertura/piscas+branco.png",
        logoLamp:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/pratica-abertura/lampada.png",
        logoLines:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/pratica-abertura/piscas.png",
        progressBar:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/pratica-abertura/Cinza+arredondado.png",
        progress:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/LIA/%C3%ADcones/pngtree-gaming-blue-technology-sense-progress-bar-png-image_2823080__1_-removebg-preview.png",
    },
};

//MAIN
const intro = (app, resources) => {
    /*logx-imagem, wx-width,hx-height ,x,y*/
    const configObject = (logx, wx, hx, x, y) => {
        logx.width = wx;
        logx.height = hx;
        logx.x = x;
        logx.y = y;
        logx.pivot.set = (logx.width / 2, logx.height / 2);
        app.stage.addChild(logx);
    };

    const introBackground = new PIXI.Graphics();
    introBackground.beginFill(0x050a30);
    introBackground.lineStyle(5, 0x000000);
    introBackground.drawRect(0, 0, 800, 600);
    app.stage.addChild(introBackground);

    //logo
    const logoCircle = new PIXI.Sprite(resources.logoCircle.texture);
    logoCircle.visible=false
    configObject(logoCircle, 180, 180, 400, 200);


    const logoLamp = new PIXI.Sprite(resources.logoLamp.texture);
    configObject(logoLamp, 150, 180, 325, 800);

    const logoLines = new PIXI.Sprite(resources.logoLines.texture);
    configObject(logoLines, 50, 50, 800, 75);

    //title
    const oppeningTextStyle = new PIXI.TextStyle({
        fill: 0xffffff,
    });

    const titleText = new PIXI.Text("Laboratório de Inovações Acadêmicas");
    titleText.x = 180;
    titleText.y = 400;
    titleText.style = oppeningTextStyle;
    app.stage.addChild(titleText);
    titleText.alpha = 0;

    const loadingText = new PIXI.Text('Carregando...');
    loadingText.style = oppeningTextStyle;
    loadingText.pivot.set = (loadingText.width / 2, loadingText.height / 2);
    loadingText.x = 325;
    loadingText.y = 440;
    app.stage.addChild(loadingText);
    loadingText.alpha = 0;


    //animation
    function animation() {
        const blocks = gsap.timeline({
            delay: 1,
        });
        blocks.to([titleText], {
            pixi: {
                alpha: 1,
            },
            duration: 1,
        });
        blocks.to([loadingText], {
            pixi: {
                alpha: 1,
            },
            duration: 1,
        });
        blocks.to(logoLamp, {
            pixi: {
                y: 120,
            },
            delay: 0.5,
            duration: 0.1,
            visible: true,
        });

        blocks.to(logoCircle, {
            delay: 0.3,
            duration: 0.1,
            visible: true,
        });
        blocks.to(logoCircle,{
            width:360,
            height:360,
            duration: 1

        })
        logoCircle.anchor.set(0.5);

        app.ticker.add(() => {
            // just for fun, let's rotate mr rabbit a little
            logoCircle.rotation += 0.01
            
        });
        blocks.to(
            [logoLamp, logoLines, logoCircle, titleText,  loadingText, introBackground],
            {
                pixi: {
                    alpha: 0,
                },
                delay: 6,
            }
        );

        return blocks;
    }

    return animation();
};
