
    $(document).ready(function() {
        hljs.configure({
            "tabReplace" : "&nbsp;&nbsp;&nbsp;&nbsp;"
        });
        hljs.initHighlightingOnLoad();
                      
        var requestId = 0 ,
            info = $("#info"),
            html = "",
            secs = 0;
            
        if(!("requestIdleCallback" in window)){
            info.html("您的浏览器还不支持requestIdleCallback方法哦，建议使用chrome浏览器尝试~");
            return "";
        }
        
        var rAF = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();
        
        function add(t ,className){
            info.append( '<span class = "'+(className || "")+'">'+ t +'</span><br/>');
        }
        
        function cb(deadline){
            var t = "didTimeout="+deadline.didTimeout+";<br/>timeRemaining="+deadline.timeRemaining()+";<br/>waitTime="+((new Date()).getTime() - secs);
            add(t,"c-f00");
        }
        
        function rIC(){
            requestId = requestIdleCallback(cb,{
                timeout : 100
            });
        }
        
        function _reset(){
            secs = new Date().getTime();
            info.html("");
        }
        
        function _cb1(){
            _reset();
            var i = 0,
                len = 5;
                      
            function _s(){
                if(i < len){
                    add("i="+i);
                    rAF(_s);
                    i++;
                }
            }
            
            rIC();
            
            //rAF(_s);
            _s();
        }
        $("#btn1").on("click",_cb1);
        

        function _cb2(){
            _reset();
            var i = 0,
                len = 10000;
                
            rIC();
                
            add("循环了10000次，1000的倍数才会显示！");
            for(i;i<len;i++){
                if(i%1000 == 0){
                    add("i="+i);
                }
                console.log("i="+i);
            }
            
            
                      
        }
        $("#btn2").on("click",_cb2);
        
    });
