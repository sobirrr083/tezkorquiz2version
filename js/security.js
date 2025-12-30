(function(){
const _0x5a3c=[
'addEventListener','keydown','toLowerCase','includes','preventDefault','contextmenu','⚠️ Tizim xavfsizligi: ruxsatsiz amal aniqlandi.','⚠️ Tizim xavfsizligi: Developer Tools aniqlandi.','replace','about:blank'
];
function _0x1d9f(i){ return _0x5a3c[i]; }
function _0x7b2e(msgIndex){
alert(_0x1d9f(msgIndex));
location[_0x1d9f(8)](_0x1d9f(9));
}
document[_0x1d9f(0)](_0x1d9f(1),function(e){
let k=(e.key||'')[_0x1d9f(2)]();
if(e.ctrlKey&&e.shiftKey&&['i','j','c','k'][_0x1d9f(3)](k)){
e[_0x1d9f(4)](); _0x7b2e(6);
}
if(e.key==='F12'){
e[_0x1d9f(4)](); _0x7b2e(6);
}
if(e.ctrlKey&&k==='u'){
e[_0x1d9f(4)](); _0x7b2e(6);
}
});
document[_0x1d9f(0)](_0x1d9f(5),function(e){
e[_0x1d9f(4)]();
});
const _isMobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if(!_isMobile){
const LIMIT=160;
setInterval(function(){
const dw=window.outerWidth-window.innerWidth;
const dh=window.outerHeight-window.innerHeight;
if(dw>LIMIT||dh>LIMIT){
_0x7b2e(7);
}
},700);
}
})();