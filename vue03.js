/**
 * Created by srawz on 2017/2/25.
 */
function Observer(data) {
    this.data = data;
    this.walk(data);
    this.eventsBus = new Event();
    this.setData = null;
}

let p = Observer.prototype;

p.walk = function(obj , parents = []) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            // if (typeof val === 'object') {
            //     new Observer(val);
            // }
            this.convert(key, val,parents);
        }
    }
};

p.convert = function(key, val, parents) {
    let _this = this;
    if (p.toString.call(val) === '[object Object]') {
        _this.setData = val
        _this.walk(val, [
            ...parents,
            key
        ]);
        _this.setData = null;
    }
    Object.defineProperty(this.setData || this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('你访问了' + key);
            return val
        },
        set: function(newVal) {
            if (p.toString.call(newVal) === '[object Object]') {
                _this.setData = newValue;
                _this.walk(newValue);
                _this.setData = null;
            }
            parents.forEach(item => {
                _this.eventsBus.emit(item, _this.data[item])
            })
            _this.eventsBus.emit(key, newVal);

            console.log('你设置了' + key);
            console.log('新的' + key + ' = ' + newVal)

            // _this.eventsBus.emit(key, val, newVal);
            // val = newVal;
            //
            // if (typeof newVal === 'object') {
            //     new Observer(val);
            // }
        }
    })
};

p.$watch = function(attr, callback) {
    this.eventsBus.on(attr, callback);
}
function Event() {
    this.events = {};
}
Event.prototype.on = function(attr, callback) {
    if (this.events[attr]) {
        this.events[attr].push(callback);
    } else {
        this.events[attr] = [callback];
    }
}
Event.prototype.off = function(attr) {
    for (let key in this.events) {
        if (this.events.hasOwnProperty(key) && key === attr) {
            delete this.events[key];
        }
    }
}
Event.prototype.emit = function(attr, ...arg) {
    this.events[attr] && this.events[attr].forEach(function(item) {
        item(...arg);
    })
}

// let data = {
//     name: 'youngwind',
//     age: 25
// };

let data = {
    user: {
        name: "liangshaofeng",
        age: "24"
    },
    address: {
        city: "beijing"
    }
};

let app = new Observer(data);


app.$watch('user', function(oldVal, newVal) {
    console.log('我的姓名发生了变化，可能是年龄变了，也可能是名字变了。');
});
