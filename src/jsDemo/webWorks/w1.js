onmessage = function(e) {
    this.console.log('w1接受主进程发来的消息',e)
    if(e.data === 'from outernal') {
        console.log('w1 通过port1箱worker2发送消息')
        e.ports[0].postMessage('向worker2发送的数据')
        // setTimeout(function() {
        //     e.ports[0].postMessage('向worker2发送的数据')
        // })
    }
}