var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/7.
 */
var utils;
(function (utils) {
    /**
     * ...键盘管理
     * @author Kanon
     */
    var KeyboardManager = (function () {
        function KeyboardManager() {
        }
        KeyboardManager.init = function () {
            KeyboardManager.keyDownDict = {};
            KeyboardManager.keyUpDict = {};
            document.addEventListener("keydown", KeyboardManager.onKeyDonwHander);
            document.addEventListener("keyup", KeyboardManager.onKeyUpHander);
        };
        KeyboardManager.onKeyDonwHander = function (event) {
            console.log("onKeyDonwHander");
            if (!KeyboardManager.keyDownDict)
                return;
            var key = KeyboardManager.keyCodeToString(event.keyCode);
            var o = KeyboardManager.keyDownDict[key];
            if (o) {
                var fun = o["fun"];
                var thisObj = o["thisObj"];
                var args = o["args"];
                fun.apply(thisObj, args);
            }
        };
        KeyboardManager.onKeyUpHander = function (event) {
            console.log("onKeyUpHander");
            if (!KeyboardManager.keyUpDict)
                return;
            var key = KeyboardManager.keyCodeToString(event.keyCode);
            var o = KeyboardManager.keyUpDict[key];
            if (o) {
                var fun = o["fun"];
                var thisObj = o["thisObj"];
                var args = o["args"];
                fun.apply(thisObj, args);
            }
        };
        /**
         * 注册按键
         * @param	key		键值
         * @param	fun		回调方法
         * @param	type	按键类型 TYPE_KEY_DOWN、TYPE_KEY_UP
         */
        KeyboardManager.registerKey = function (key, fun, thisObj, type) {
            if (type === void 0) { type = 0; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var keyDict = type ? KeyboardManager.keyUpDict : KeyboardManager.keyDownDict;
            keyDict[key] = { "fun": fun, args: args, "thisObj": thisObj };
        };
        /**
         * 注销按键
         * @param	key		键值
         * @param	type	注销的类型
         */
        KeyboardManager.unregisterKey = function (key, type) {
            if (type === void 0) { type = 0; }
            var keyDict = type ? KeyboardManager.keyUpDict : KeyboardManager.keyDownDict;
            delete keyDict[key];
        };
        /**
         * 根据keyCode或charCode获取相应的字符串代号
         * @param	keyCode
         * @return	键盘所指字符串代号
         */
        KeyboardManager.keyCodeToString = function (keyCode) {
            switch (keyCode) {
                case 8:
                    return KeyboardManager.BACK_SPACE;
                case 9:
                    return KeyboardManager.TAB;
                case 13:
                    return KeyboardManager.ENTER;
                case 16:
                    return KeyboardManager.SHIFT;
                case 17:
                    return KeyboardManager.CTRL;
                case 19:
                    return KeyboardManager.PAUSE_BREAK;
                case 20:
                    return KeyboardManager.CAPS_LOCK;
                case 27:
                    return KeyboardManager.ESC;
                case 32:
                    return KeyboardManager.SPACE;
                case 33:
                    return KeyboardManager.PAGE_UP;
                case 34:
                    return KeyboardManager.PAGE_DOWN;
                case 35:
                    return KeyboardManager.END;
                case 36:
                    return KeyboardManager.HOME;
                case 37:
                    return KeyboardManager.LEFT;
                case 38:
                    return KeyboardManager.UP;
                case 39:
                    return KeyboardManager.RIGHT;
                case 40:
                    return KeyboardManager.DOWN;
                case 45:
                    return KeyboardManager.INSERT;
                case 46:
                    return KeyboardManager.DELETE;
                case 91:
                    return KeyboardManager.WINDOWS;
                case 112:
                    return KeyboardManager.F1;
                case 113:
                    return KeyboardManager.F2;
                case 114:
                    return KeyboardManager.F3;
                case 115:
                    return KeyboardManager.F4;
                case 116:
                    return KeyboardManager.F5;
                case 117:
                    return KeyboardManager.F6;
                case 118:
                    return KeyboardManager.F7;
                case 119:
                    return KeyboardManager.F8;
                case 120:
                    return KeyboardManager.F9;
                case 122:
                    return KeyboardManager.F11;
                case 123:
                    return KeyboardManager.F12;
                case 144:
                    return KeyboardManager.NUM_LOCK;
                case 145:
                    return KeyboardManager.SCROLL_LOCK;
                default:
                    return String.fromCharCode(keyCode);
            }
        };
        /**
        * 销毁方法
        */
        KeyboardManager.destroy = function () {
            KeyboardManager.keyDownDict = null;
            KeyboardManager.keyUpDict = null;
            document.removeEventListener("keydown", KeyboardManager.onKeyDonwHander);
            document.removeEventListener("keyup", KeyboardManager.onKeyUpHander);
        };
        /**
         * 键盘事件类型
         */
        KeyboardManager.TYPE_KEY_DOWN = 0;
        KeyboardManager.TYPE_KEY_UP = 1;
        /**
         * 键值字符串枚举
         */
        KeyboardManager.A = "A";
        KeyboardManager.B = "B";
        KeyboardManager.C = "C";
        KeyboardManager.D = "D";
        KeyboardManager.E = "E";
        KeyboardManager.F = "F";
        KeyboardManager.G = "G";
        KeyboardManager.H = "H";
        KeyboardManager.I = "I";
        KeyboardManager.J = "J";
        KeyboardManager.K = "K";
        KeyboardManager.L = "L";
        KeyboardManager.M = "M";
        KeyboardManager.N = "N";
        KeyboardManager.O = "O";
        KeyboardManager.P = "P";
        KeyboardManager.Q = "Q";
        KeyboardManager.R = "R";
        KeyboardManager.S = "S";
        KeyboardManager.T = "T";
        KeyboardManager.U = "U";
        KeyboardManager.V = "V";
        KeyboardManager.W = "W";
        KeyboardManager.X = "X";
        KeyboardManager.Y = "Y";
        KeyboardManager.Z = "Z";
        KeyboardManager.ESC = "Esc";
        KeyboardManager.F1 = "F1";
        KeyboardManager.F2 = "F2";
        KeyboardManager.F3 = "F3";
        KeyboardManager.F4 = "F4";
        KeyboardManager.F5 = "F5";
        KeyboardManager.F6 = "F6";
        KeyboardManager.F7 = "F7";
        KeyboardManager.F8 = "F8";
        KeyboardManager.F9 = "F9";
        KeyboardManager.F10 = "F10";
        KeyboardManager.F11 = "F11";
        KeyboardManager.F12 = "F12";
        KeyboardManager.NUM_1 = "1";
        KeyboardManager.NUM_2 = "2";
        KeyboardManager.NUM_3 = "3";
        KeyboardManager.NUM_4 = "4";
        KeyboardManager.NUM_5 = "5";
        KeyboardManager.NUM_6 = "6";
        KeyboardManager.NUM_7 = "7";
        KeyboardManager.NUM_8 = "8";
        KeyboardManager.NUM_9 = "9";
        KeyboardManager.NUM_0 = "0";
        KeyboardManager.TAB = "Tab";
        KeyboardManager.CTRL = "Ctrl";
        KeyboardManager.ALT = "Alt";
        KeyboardManager.SHIFT = "Shift";
        KeyboardManager.CAPS_LOCK = "Caps Lock";
        KeyboardManager.ENTER = "Enter";
        KeyboardManager.SPACE = "Space";
        KeyboardManager.BACK_SPACE = "Back Space";
        KeyboardManager.INSERT = "Insert";
        KeyboardManager.DELETE = "Page Down";
        KeyboardManager.HOME = "Home";
        KeyboardManager.END = "Page Down";
        KeyboardManager.PAGE_UP = "Page Up";
        KeyboardManager.PAGE_DOWN = "Page Down";
        KeyboardManager.LEFT = "Left";
        KeyboardManager.RIGHT = "Right";
        KeyboardManager.UP = "Up";
        KeyboardManager.DOWN = "Down";
        KeyboardManager.PAUSE_BREAK = "Pause Break";
        KeyboardManager.NUM_LOCK = "Num Lock";
        KeyboardManager.SCROLL_LOCK = "Scroll Lock";
        KeyboardManager.WINDOWS = "Windows";
        return KeyboardManager;
    }());
    utils.KeyboardManager = KeyboardManager;
    __reflect(KeyboardManager.prototype, "utils.KeyboardManager");
})(utils || (utils = {}));
//# sourceMappingURL=KeyboardManager.js.map