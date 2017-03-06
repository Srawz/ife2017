/**
 * Created by srawz on 2017/2/25.
 */
function Observer(data) {
    this.data = data;
    this.walk(data);
    this.eventsBus = new Event();
}

let p = Observer.prototype;

p.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

p.convert = function (key, val) {
  let _this = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val
        },
        set: function (newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + ' = ' + newVal)

            _this.eventsBus.emit(key, val, newVal);
            val = newVal;

            if(typeof newVal === 'object'){
              new Observer(val);
            }
        }
    })
};

p.$watch = function(attr, callback){
  this.eventsBus.on(attr, callback);
}
function Event(){
  this.events = {};
}
Event.prototype.on = function(attr, callback){
  if(this.events[attr]){
    this.events[attr].push(callback);
  }else{
    this.events[attr] = [callback];
  }
}
Event.prototype.off = function(attr){
  for(let key in this.events){
    if(this.events.hasOwnProperty(key) && key === attr){
      delete this.events[key];
    }
  }
}
Event.prototype.emit = function(attr, ...arg){
  this.events[attr] && this.events[attr].forEach(function(item){
    item(...arg);
  })
}

let data = {
        name: 'youngwind',
        age: 25
};

// let data = {
//     user: {
//         name: "liangshaofeng",
//         age: "24"
//     },
//     address: {
//         city: "beijing"
//     }
// };

let app = new Observer(data);

app.$watch('age', function(oldVal, newVal) {
        console.log(`我的年纪变了，原来是：${oldVal}, 现在已经是：${newVal}岁了`);
});
