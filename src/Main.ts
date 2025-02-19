//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
       
        new TestRandom();
        // new TestString();
        // new TestArrayUtil();
        // new EnterFrameTest();
        // new KeyboardManagerTest();
        // new TimeFormatTest();
        // new MathUtilTest(this.stage);
        // new CubicBezierCurveTest(this.stage);
        // new QuadraticBezierCurveTest(this.stage);
        // new LineCurveTest(this.stage);
        // new SplineCurveTest(this.stage);
        // new EllipseCurveTest(this.stage);
        // new TimeUtilTest();
        // new Vector2DTest(this);

        // let o = {"a":1, "b":true, "c":[1,{"d":111,"aaa":[12,12,12]},1], "e":{"aa":1,"bb":false}};
        // console.log(utils.ObjectUtil.clone(o));

        // this.addChild(new ChainTest());
        // this.addChild(new RopeTest());
        // this.addChild(new TreeTest());
        // this.addChild(new OilPaintingTest());
        // this.addChild(new BloodSplatterTest());
        // this.addChild(new RadarMapTest());
        // this.addChild(new SnakeTest());
        // this.addChild(new BeeBehaviorTest());
        // this.addChild(new BlackHoleTest());
        // this.addChild(new TextEffectTest());
        // this.addChild(new WaterWaveTest());
        // this.addChild(new RotationEasingTest());
        // this.addChild(new WingmanMotionTest());
        // this.addChild(new SlotsTest());
        // this.addChild(new ResidueShadowTest());
        // this.addChild(new FlameGunTest());
        // console.log(utils.StringUtil.padStart("aaa", 8, 1));
        // console.log(utils.StringUtil.padEnd("aaa", 8, 1));
        // console.log(utils.StringUtil.sumInteger("90000000000000000000000000000", "90000000000000000000000000001"));
    }
}