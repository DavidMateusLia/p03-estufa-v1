const footerOptions = {
    resources: {
        infoButton:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/_general/infoWhite.png",
        footerButton:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/p04-dimensao-tijolo/INFO.png",
        creditBox:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/_general/op%C3%A7%C3%A3o+de+caixa+de+texto.png",
        logo: "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/_general/logoLia.png",
        esctButton:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/_general/bot%C3%A3o+vermelho+fechar.png",
        dialogBox:
            "https://lia-labv.s3.sa-east-1.amazonaws.com/praticas/_general/caixa+de+texto.png",
    },
};


const footer = (app, resources) => {
    const configureObject = (app,logx, wx, hx, x, y) => {
        logx.width = wx;
        logx.height = hx;
        logx.x = x;
        logx.y = y;
        logx.pivot.set (logx.width / 2, logx.height / 2);
        app.stage.addChild(logx);
    };
    //Função criada para fazer aparecer o botão de info e a caixa de dialogo
    let logoFlag = true;
    // function onLogo() {
    //     if (logoFlag) {
    //         footerBox.visible = true;
    //         footerButton.visible = true;
    //         logoFlag = false;
    //     } else {
    //         footerBox.visible = false;
    //         footerButton.visible = false;
    //         logoFlag = true;
    //     }
    // }

    //Faz aparecer o card de credito e suas informações
    function credit() {
        creditBox.visible = true;
        logoLia.visible = true;
        creditDialogue.visible = true;
        escCredit.visible = true;
        footerBox.visible = false;
        footerButton.visible = false;
        creditBackground.visible = true;
    }
    // Faz com que a caixa de credito seja fechada
    function esc() {
        creditDialogue.visible = false;
        creditBox.visible = false;
        logoLia.visible = false;
        escCredit.visible = false;
        creditBackground.visible = false;
    }

    const textCharacter = new PIXI.TextStyle({
        fontFamily: "Roboto",
        wordWrap: true,
        wordWrapWidth: 230,
        fontSize: 16,
        fill: 0x000000,
        backgroundColor: 0xffffff,
    });

    //cria um "footer" na parte inferior da animação
    const footerBackground = new PIXI.Graphics();
    footerBackground.beginFill(0x192c4c);
    footerBackground.lineStyle(5, 0x192c4c);
    footerBackground.drawRect(0, 570, 800, 30);
    app.stage.addChild(footerBackground);
    footerBackground.visible = false;

    //cria a sprite da caixa de credito
    const creditBackground = new PIXI.Graphics();
    creditBackground.beginFill(0x050a30);
    creditBackground.lineStyle(5, 0x000000);
    creditBackground.drawRect(0, 0, 800, 600);
    app.stage.addChild(creditBackground);
    creditBackground.visible = false;

    const creditBox = new PIXI.Sprite(resources.creditBox.texture);
    configureObject(app, creditBox, 500, 500, 430, 300);
    creditBox.visible = false;

    //cria o botão da logo do lia no footer
    const logoFooter = new PIXI.Sprite(resources.infoButton.texture);
    configureObject(app, logoFooter, 28, 28, 770, 575);
    logoFooter.interactive = true;
    logoFooter.buttonMode = true;
    logoFooter.on("pointerdown", credit);
    logoFooter.visible = false;

    //cria caixa onde vai ficar o botão informações
    const footerBox = new PIXI.Sprite(resources.dialogBox.texture);
    configureObject(app, footerBox, 130, 70, 700, 530);
    footerBox.visible = false;

    //cria o botão de informações
    const footerButton = new PIXI.Sprite(resources.footerButton.texture);
    configureObject(app, footerButton, 60, 30, 700, 525);
    footerButton.interactive = true;
    footerButton.buttonMode = true;
    footerButton.visible = false;
    footerButton.on("pointerdown", credit);

    //Cria o botão de esc que fica dentro do card de creditos
    const escCredit = new PIXI.Sprite(resources.esctButton.texture);
    configureObject(app, escCredit, 28, 28, 220, 100);
    escCredit.interactive = true;
    escCredit.buttonMode = true;
    escCredit.on("pointerdown", esc);
    escCredit.visible = false;

    const logoLia = new PIXI.Sprite(resources.logo.texture);
    configureObject(app, logoLia, 70, 70, 580, 450);
    logoLia.visible = false;

    // insere o dialogo
    const creditDialogue = new PIXI.Text(texts.footer.credits, textCharacter);
    configureObject(app, creditDialogue, 400, 350, 600, 300);
    app.stage.addChild(creditDialogue);
    creditDialogue.visible = false;

    function showFooter() {
        const showFooter = gsap.timeline();

        showFooter.to([footerBackground, logoFooter], {
            visible: true,
        });

        return showFooter;
    }

    return showFooter;
};
