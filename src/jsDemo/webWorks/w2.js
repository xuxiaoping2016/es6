onmessage = function(e) {
    console.log('W2接受主线程发来的消息');
    if (e.data === 'from outernal') {
        e.ports[0].onmessage = function(e) {
            console.log('w2')
            postMessage(e.data)
        }
    }
}