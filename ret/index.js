'use strict';

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _desc, _value, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function dec(id) {
    console.log('evaluated', id);
    return function (target, property, descriptor) {
        return console.log('executed', id);
    };
}

var Example = (_dec = dec(1), _dec2 = dec(2), (_class = function () {
    function Example() {
        (0, _classCallCheck3.default)(this, Example);
    }

    (0, _createClass3.default)(Example, [{
        key: 'method',
        value: function method() {}
    }]);
    return Example;
}(), (_applyDecoratedDescriptor(_class.prototype, 'method', [_dec, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'method'), _class.prototype)), _class));


var r = new Example();