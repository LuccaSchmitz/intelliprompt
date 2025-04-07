/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/demo-usage/route";
exports.ids = ["app/api/demo-usage/route"];
exports.modules = {

/***/ "(rsc)/./app/api/demo-usage/route.ts":
/*!*************************************!*\
  !*** ./app/api/demo-usage/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/demo-limit */ \"(rsc)/./lib/demo-limit.ts\");\n\n\n/**\n * Get the client IP from request headers\n */ function getClientIP(request) {\n    // Try to get the IP from various headers\n    const forwardedFor = request.headers.get(\"x-forwarded-for\");\n    if (forwardedFor) {\n        // Get the first IP if there are multiple in the header\n        return forwardedFor.split(\",\")[0].trim();\n    }\n    const realIP = request.headers.get(\"x-real-ip\");\n    if (realIP) {\n        return realIP;\n    }\n    // Fall back to a placeholder if no IP is found\n    return \"unknown-ip\";\n}\n/**\n * GET: Check demo usage for the current user\n */ async function GET(request) {\n    const ip = getClientIP(request);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        usageCount: _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.getUsageCount(ip),\n        remainingCount: _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.getRemainingCount(ip),\n        hasReachedLimit: _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.hasReachedLimit(ip),\n        limit: _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.DEMO_LIMIT\n    });\n}\n/**\n * POST: Increment demo usage for the current user\n */ async function POST(request) {\n    const ip = getClientIP(request);\n    // Check if user already reached limit\n    if (_lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.hasReachedLimit(ip)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Demo limit reached\"\n        }, {\n            status: 403\n        });\n    }\n    // Increment usage\n    const newCount = _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.incrementUsage(ip);\n    const hasReachedLimit = newCount >= _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.DEMO_LIMIT;\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        usageCount: newCount,\n        remainingCount: _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.getRemainingCount(ip),\n        hasReachedLimit,\n        limit: _lib_demo_limit__WEBPACK_IMPORTED_MODULE_1__.demoLimitUtil.DEMO_LIMIT\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2RlbW8tdXNhZ2Uvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUNQO0FBRWpEOztDQUVDLEdBQ0QsU0FBU0UsWUFBWUMsT0FBb0I7SUFDdkMseUNBQXlDO0lBQ3pDLE1BQU1DLGVBQWVELFFBQVFFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQ3pDLElBQUlGLGNBQWM7UUFDaEIsdURBQXVEO1FBQ3ZELE9BQU9BLGFBQWFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDQyxJQUFJO0lBQ3hDO0lBRUEsTUFBTUMsU0FBU04sUUFBUUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7SUFDbkMsSUFBSUcsUUFBUTtRQUNWLE9BQU9BO0lBQ1Q7SUFFQSwrQ0FBK0M7SUFDL0MsT0FBTztBQUNUO0FBRUE7O0NBRUMsR0FDTSxlQUFlQyxJQUFJUCxPQUFvQjtJQUM1QyxNQUFNUSxLQUFLVCxZQUFZQztJQUV2QixPQUFPSCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1FBQ3ZCQyxZQUFZWiwwREFBYUEsQ0FBQ2EsYUFBYSxDQUFDSDtRQUN4Q0ksZ0JBQWdCZCwwREFBYUEsQ0FBQ2UsaUJBQWlCLENBQUNMO1FBQ2hETSxpQkFBaUJoQiwwREFBYUEsQ0FBQ2dCLGVBQWUsQ0FBQ047UUFDL0NPLE9BQU9qQiwwREFBYUEsQ0FBQ2tCLFVBQVU7SUFDakM7QUFDRjtBQUVBOztDQUVDLEdBQ00sZUFBZUMsS0FBS2pCLE9BQW9CO0lBQzdDLE1BQU1RLEtBQUtULFlBQVlDO0lBRXZCLHNDQUFzQztJQUN0QyxJQUFJRiwwREFBYUEsQ0FBQ2dCLGVBQWUsQ0FBQ04sS0FBSztRQUNyQyxPQUFPWCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVTLE9BQU87UUFBcUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDMUU7SUFFQSxrQkFBa0I7SUFDbEIsTUFBTUMsV0FBV3RCLDBEQUFhQSxDQUFDdUIsY0FBYyxDQUFDYjtJQUM5QyxNQUFNTSxrQkFBa0JNLFlBQVl0QiwwREFBYUEsQ0FBQ2tCLFVBQVU7SUFFNUQsT0FBT25CLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7UUFDdkJDLFlBQVlVO1FBQ1pSLGdCQUFnQmQsMERBQWFBLENBQUNlLGlCQUFpQixDQUFDTDtRQUNoRE07UUFDQUMsT0FBT2pCLDBEQUFhQSxDQUFDa0IsVUFBVTtJQUNqQztBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvY3R3MDQwOTUvUHJvamVjdHMvaW50ZWxsaXByb21wdC9hcHAvYXBpL2RlbW8tdXNhZ2Uvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZGVtb0xpbWl0VXRpbCB9IGZyb20gXCJAL2xpYi9kZW1vLWxpbWl0XCI7XG5cbi8qKlxuICogR2V0IHRoZSBjbGllbnQgSVAgZnJvbSByZXF1ZXN0IGhlYWRlcnNcbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50SVAocmVxdWVzdDogTmV4dFJlcXVlc3QpOiBzdHJpbmcge1xuICAvLyBUcnkgdG8gZ2V0IHRoZSBJUCBmcm9tIHZhcmlvdXMgaGVhZGVyc1xuICBjb25zdCBmb3J3YXJkZWRGb3IgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KFwieC1mb3J3YXJkZWQtZm9yXCIpO1xuICBpZiAoZm9yd2FyZGVkRm9yKSB7XG4gICAgLy8gR2V0IHRoZSBmaXJzdCBJUCBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgaW4gdGhlIGhlYWRlclxuICAgIHJldHVybiBmb3J3YXJkZWRGb3Iuc3BsaXQoXCIsXCIpWzBdLnRyaW0oKTtcbiAgfVxuXG4gIGNvbnN0IHJlYWxJUCA9IHJlcXVlc3QuaGVhZGVycy5nZXQoXCJ4LXJlYWwtaXBcIik7XG4gIGlmIChyZWFsSVApIHtcbiAgICByZXR1cm4gcmVhbElQO1xuICB9XG5cbiAgLy8gRmFsbCBiYWNrIHRvIGEgcGxhY2Vob2xkZXIgaWYgbm8gSVAgaXMgZm91bmRcbiAgcmV0dXJuIFwidW5rbm93bi1pcFwiO1xufVxuXG4vKipcbiAqIEdFVDogQ2hlY2sgZGVtbyB1c2FnZSBmb3IgdGhlIGN1cnJlbnQgdXNlclxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IGlwID0gZ2V0Q2xpZW50SVAocmVxdWVzdCk7XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICB1c2FnZUNvdW50OiBkZW1vTGltaXRVdGlsLmdldFVzYWdlQ291bnQoaXApLFxuICAgIHJlbWFpbmluZ0NvdW50OiBkZW1vTGltaXRVdGlsLmdldFJlbWFpbmluZ0NvdW50KGlwKSxcbiAgICBoYXNSZWFjaGVkTGltaXQ6IGRlbW9MaW1pdFV0aWwuaGFzUmVhY2hlZExpbWl0KGlwKSxcbiAgICBsaW1pdDogZGVtb0xpbWl0VXRpbC5ERU1PX0xJTUlULFxuICB9KTtcbn1cblxuLyoqXG4gKiBQT1NUOiBJbmNyZW1lbnQgZGVtbyB1c2FnZSBmb3IgdGhlIGN1cnJlbnQgdXNlclxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCBpcCA9IGdldENsaWVudElQKHJlcXVlc3QpO1xuXG4gIC8vIENoZWNrIGlmIHVzZXIgYWxyZWFkeSByZWFjaGVkIGxpbWl0XG4gIGlmIChkZW1vTGltaXRVdGlsLmhhc1JlYWNoZWRMaW1pdChpcCkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJEZW1vIGxpbWl0IHJlYWNoZWRcIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICB9XG5cbiAgLy8gSW5jcmVtZW50IHVzYWdlXG4gIGNvbnN0IG5ld0NvdW50ID0gZGVtb0xpbWl0VXRpbC5pbmNyZW1lbnRVc2FnZShpcCk7XG4gIGNvbnN0IGhhc1JlYWNoZWRMaW1pdCA9IG5ld0NvdW50ID49IGRlbW9MaW1pdFV0aWwuREVNT19MSU1JVDtcblxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgIHVzYWdlQ291bnQ6IG5ld0NvdW50LFxuICAgIHJlbWFpbmluZ0NvdW50OiBkZW1vTGltaXRVdGlsLmdldFJlbWFpbmluZ0NvdW50KGlwKSxcbiAgICBoYXNSZWFjaGVkTGltaXQsXG4gICAgbGltaXQ6IGRlbW9MaW1pdFV0aWwuREVNT19MSU1JVCxcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZGVtb0xpbWl0VXRpbCIsImdldENsaWVudElQIiwicmVxdWVzdCIsImZvcndhcmRlZEZvciIsImhlYWRlcnMiLCJnZXQiLCJzcGxpdCIsInRyaW0iLCJyZWFsSVAiLCJHRVQiLCJpcCIsImpzb24iLCJ1c2FnZUNvdW50IiwiZ2V0VXNhZ2VDb3VudCIsInJlbWFpbmluZ0NvdW50IiwiZ2V0UmVtYWluaW5nQ291bnQiLCJoYXNSZWFjaGVkTGltaXQiLCJsaW1pdCIsIkRFTU9fTElNSVQiLCJQT1NUIiwiZXJyb3IiLCJzdGF0dXMiLCJuZXdDb3VudCIsImluY3JlbWVudFVzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/demo-usage/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/demo-limit.ts":
/*!***************************!*\
  !*** ./lib/demo-limit.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   demoLimitUtil: () => (/* binding */ demoLimitUtil)\n/* harmony export */ });\n// Store demo usage by IP address\nconst demoUsageByIP = new Map();\n// Maximum number of demo prompts for unregistered users\nconst DEMO_LIMIT = 3;\n/**\n * Utility for managing demo usage limits by IP address\n */ const demoLimitUtil = {\n    /**\n   * Check if a user has reached their demo limit\n   */ hasReachedLimit: (ipAddress)=>{\n        const usageCount = demoUsageByIP.get(ipAddress) || 0;\n        return usageCount >= DEMO_LIMIT;\n    },\n    /**\n   * Get the number of demo prompts a user has used\n   */ getUsageCount: (ipAddress)=>{\n        return demoUsageByIP.get(ipAddress) || 0;\n    },\n    /**\n   * Increment usage count for an IP address\n   */ incrementUsage: (ipAddress)=>{\n        const currentCount = demoUsageByIP.get(ipAddress) || 0;\n        const newCount = currentCount + 1;\n        demoUsageByIP.set(ipAddress, newCount);\n        return newCount;\n    },\n    /**\n   * Get remaining demo prompts for an IP address\n   */ getRemainingCount: (ipAddress)=>{\n        const usedCount = demoUsageByIP.get(ipAddress) || 0;\n        return Math.max(0, DEMO_LIMIT - usedCount);\n    },\n    // Export the demo limit constant\n    DEMO_LIMIT\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGVtby1saW1pdC50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUNBQWlDO0FBQ2pDLE1BQU1BLGdCQUFnQixJQUFJQztBQUUxQix3REFBd0Q7QUFDeEQsTUFBTUMsYUFBYTtBQUVuQjs7Q0FFQyxHQUNNLE1BQU1DLGdCQUFnQjtJQUMzQjs7R0FFQyxHQUNEQyxpQkFBaUIsQ0FBQ0M7UUFDaEIsTUFBTUMsYUFBYU4sY0FBY08sR0FBRyxDQUFDRixjQUFjO1FBQ25ELE9BQU9DLGNBQWNKO0lBQ3ZCO0lBRUE7O0dBRUMsR0FDRE0sZUFBZSxDQUFDSDtRQUNkLE9BQU9MLGNBQWNPLEdBQUcsQ0FBQ0YsY0FBYztJQUN6QztJQUVBOztHQUVDLEdBQ0RJLGdCQUFnQixDQUFDSjtRQUNmLE1BQU1LLGVBQWVWLGNBQWNPLEdBQUcsQ0FBQ0YsY0FBYztRQUNyRCxNQUFNTSxXQUFXRCxlQUFlO1FBQ2hDVixjQUFjWSxHQUFHLENBQUNQLFdBQVdNO1FBQzdCLE9BQU9BO0lBQ1Q7SUFFQTs7R0FFQyxHQUNERSxtQkFBbUIsQ0FBQ1I7UUFDbEIsTUFBTVMsWUFBWWQsY0FBY08sR0FBRyxDQUFDRixjQUFjO1FBQ2xELE9BQU9VLEtBQUtDLEdBQUcsQ0FBQyxHQUFHZCxhQUFhWTtJQUNsQztJQUVBLGlDQUFpQztJQUNqQ1o7QUFDRixFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvY3R3MDQwOTUvUHJvamVjdHMvaW50ZWxsaXByb21wdC9saWIvZGVtby1saW1pdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdG9yZSBkZW1vIHVzYWdlIGJ5IElQIGFkZHJlc3NcbmNvbnN0IGRlbW9Vc2FnZUJ5SVAgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4vLyBNYXhpbXVtIG51bWJlciBvZiBkZW1vIHByb21wdHMgZm9yIHVucmVnaXN0ZXJlZCB1c2Vyc1xuY29uc3QgREVNT19MSU1JVCA9IDM7XG5cbi8qKlxuICogVXRpbGl0eSBmb3IgbWFuYWdpbmcgZGVtbyB1c2FnZSBsaW1pdHMgYnkgSVAgYWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgZGVtb0xpbWl0VXRpbCA9IHtcbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdXNlciBoYXMgcmVhY2hlZCB0aGVpciBkZW1vIGxpbWl0XG4gICAqL1xuICBoYXNSZWFjaGVkTGltaXQ6IChpcEFkZHJlc3M6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IHVzYWdlQ291bnQgPSBkZW1vVXNhZ2VCeUlQLmdldChpcEFkZHJlc3MpIHx8IDA7XG4gICAgcmV0dXJuIHVzYWdlQ291bnQgPj0gREVNT19MSU1JVDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBudW1iZXIgb2YgZGVtbyBwcm9tcHRzIGEgdXNlciBoYXMgdXNlZFxuICAgKi9cbiAgZ2V0VXNhZ2VDb3VudDogKGlwQWRkcmVzczogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gZGVtb1VzYWdlQnlJUC5nZXQoaXBBZGRyZXNzKSB8fCAwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbmNyZW1lbnQgdXNhZ2UgY291bnQgZm9yIGFuIElQIGFkZHJlc3NcbiAgICovXG4gIGluY3JlbWVudFVzYWdlOiAoaXBBZGRyZXNzOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IGRlbW9Vc2FnZUJ5SVAuZ2V0KGlwQWRkcmVzcykgfHwgMDtcbiAgICBjb25zdCBuZXdDb3VudCA9IGN1cnJlbnRDb3VudCArIDE7XG4gICAgZGVtb1VzYWdlQnlJUC5zZXQoaXBBZGRyZXNzLCBuZXdDb3VudCk7XG4gICAgcmV0dXJuIG5ld0NvdW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgcmVtYWluaW5nIGRlbW8gcHJvbXB0cyBmb3IgYW4gSVAgYWRkcmVzc1xuICAgKi9cbiAgZ2V0UmVtYWluaW5nQ291bnQ6IChpcEFkZHJlc3M6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdXNlZENvdW50ID0gZGVtb1VzYWdlQnlJUC5nZXQoaXBBZGRyZXNzKSB8fCAwO1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBERU1PX0xJTUlUIC0gdXNlZENvdW50KTtcbiAgfSxcblxuICAvLyBFeHBvcnQgdGhlIGRlbW8gbGltaXQgY29uc3RhbnRcbiAgREVNT19MSU1JVCxcbn07XG4iXSwibmFtZXMiOlsiZGVtb1VzYWdlQnlJUCIsIk1hcCIsIkRFTU9fTElNSVQiLCJkZW1vTGltaXRVdGlsIiwiaGFzUmVhY2hlZExpbWl0IiwiaXBBZGRyZXNzIiwidXNhZ2VDb3VudCIsImdldCIsImdldFVzYWdlQ291bnQiLCJpbmNyZW1lbnRVc2FnZSIsImN1cnJlbnRDb3VudCIsIm5ld0NvdW50Iiwic2V0IiwiZ2V0UmVtYWluaW5nQ291bnQiLCJ1c2VkQ291bnQiLCJNYXRoIiwibWF4Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/demo-limit.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-usage%2Froute&page=%2Fapi%2Fdemo-usage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-usage%2Froute.ts&appDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-usage%2Froute&page=%2Fapi%2Fdemo-usage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-usage%2Froute.ts&appDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_ctw04095_Projects_intelliprompt_app_api_demo_usage_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/demo-usage/route.ts */ \"(rsc)/./app/api/demo-usage/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/demo-usage/route\",\n        pathname: \"/api/demo-usage\",\n        filename: \"route\",\n        bundlePath: \"app/api/demo-usage/route\"\n    },\n    resolvedPagePath: \"/Users/ctw04095/Projects/intelliprompt/app/api/demo-usage/route.ts\",\n    nextConfigOutput,\n    userland: _Users_ctw04095_Projects_intelliprompt_app_api_demo_usage_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkZW1vLXVzYWdlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZkZW1vLXVzYWdlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZGVtby11c2FnZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmN0dzA0MDk1JTJGUHJvamVjdHMlMkZpbnRlbGxpcHJvbXB0JTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmN0dzA0MDk1JTJGUHJvamVjdHMlMkZpbnRlbGxpcHJvbXB0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2N0dzA0MDk1L1Byb2plY3RzL2ludGVsbGlwcm9tcHQvYXBwL2FwaS9kZW1vLXVzYWdlL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9kZW1vLXVzYWdlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZGVtby11c2FnZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZGVtby11c2FnZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9jdHcwNDA5NS9Qcm9qZWN0cy9pbnRlbGxpcHJvbXB0L2FwcC9hcGkvZGVtby11c2FnZS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-usage%2Froute&page=%2Fapi%2Fdemo-usage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-usage%2Froute.ts&appDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-usage%2Froute&page=%2Fapi%2Fdemo-usage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-usage%2Froute.ts&appDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fctw04095%2FProjects%2Fintelliprompt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();