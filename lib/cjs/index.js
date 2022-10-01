"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
require("./index.css");
var Dragable = function (props) {
    var _a = (0, react_1.useState)(200), width = _a[0], setWidth = _a[1];
    var _b = (0, react_1.useState)(200), height = _b[0], setHeight = _b[1];
    var wrapper = (0, react_1.useRef)(null);
    var canDrag = (0, react_1.useRef)(false);
    var canMoveRight = (0, react_1.useRef)(false);
    var canMoveDown = (0, react_1.useRef)(false);
    var startXPosition = (0, react_1.useRef)(0);
    var startYPosition = (0, react_1.useRef)(0);
    var startWidth = (0, react_1.useRef)(0);
    var startHeight = (0, react_1.useRef)(0);
    var onMouseMove = function (e) {
        if (canDrag.current && canMoveRight.current) {
            setWidth(((startWidth.current + e.clientX - startXPosition.current)));
        }
        if (canDrag.current && canMoveDown.current) {
            setHeight(((startHeight.current + e.clientY - startYPosition.current)));
        }
    };
    var onMouseDown = function (e, axis) {
        var _a, _b;
        canDrag.current = true;
        if (axis.x) {
            canMoveRight.current = true;
            startXPosition.current = e.clientX;
            startWidth.current = ((_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
        }
        if (axis.y) {
            canMoveDown.current = true;
            startYPosition.current = e.clientY;
            startHeight.current = ((_b = wrapper.current) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        }
    };
    var onMouseUp = function () {
        canDrag.current = false;
        canMoveDown.current = false;
        canMoveRight.current = false;
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        return function () {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement("div", { className: "ceros-test-draggable__wrapper", ref: wrapper, style: { width: width + 'px', height: height + 'px', display: "inline-block" } },
            react_2.default.createElement("span", null, "Ceros test dragable library"),
            props.children,
            react_2.default.createElement("div", { className: "ceros-test-draggable__resizer ceros-test-draggable__right", onMouseDown: function (e) { return onMouseDown(e, { x: true, y: false }); } }),
            react_2.default.createElement("div", { className: "ceros-test-draggable__resizer ceros-test-draggable__bottomRight", onMouseDown: function (e) { return onMouseDown(e, { x: true, y: true }); } }),
            react_2.default.createElement("div", { className: "ceros-test-draggable__resizer ceros-test-draggable__bottom", onMouseDown: function (e) { return onMouseDown(e, { x: false, y: true }); } }))));
};
exports.default = Dragable;
