import { useEffect, useRef, useState } from "react";
import React from 'react';
import './index.css';
var Dragable = function (props) {
    var _a = useState(200), width = _a[0], setWidth = _a[1];
    var _b = useState(200), height = _b[0], setHeight = _b[1];
    var wrapper = useRef(null);
    var canDrag = useRef(false);
    var canMoveRight = useRef(false);
    var canMoveDown = useRef(false);
    var startXPosition = useRef(0);
    var startYPosition = useRef(0);
    var startWidth = useRef(0);
    var startHeight = useRef(0);
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
    useEffect(function () {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        return function () {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "ceros-test-draggable__wrapper", ref: wrapper, style: { width: width + 'px', height: height + 'px', display: "inline-block" } },
            React.createElement("span", null, "Ceros test dragable library"),
            props.children,
            React.createElement("div", { className: "ceros-test-draggable__resizer ceros-test-draggable__right", onMouseDown: function (e) { return onMouseDown(e, { x: true, y: false }); } }),
            React.createElement("div", { className: "ceros-test-draggable__resizer ceros-test-draggable__bottomRight", onMouseDown: function (e) { return onMouseDown(e, { x: true, y: true }); } }),
            React.createElement("div", { className: "ceros-test-draggable__resizer ceros-test-draggable__bottom", onMouseDown: function (e) { return onMouseDown(e, { x: false, y: true }); } }))));
};
export default Dragable;
