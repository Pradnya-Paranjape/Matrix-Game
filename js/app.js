define([
    '../matrix/matrix'
], function(MatrixModule){
        return {
            init: init
        };
    
        function init() {
            console.log("main init....");
            MatrixModule.init();
        }
});