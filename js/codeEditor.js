
var editorCountNum = 0;

var js_editor = CodeMirror(document.getElementById("js"), {
    value: "function test() { \n\talert('Hello Blockchain World');\n\t \n}" + "\n\t \n"+"test()",
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true
});


var js = js_editor.getValue();
js = '<script>' + js + '<\/script>';


    function render() {
        //var source = js;
        //console.log(source);

        var iframe = document.getElementById('output');
        var iframeDoc = iframe.contentDocument;
        //console.log(iframeDoc);

        iframeDoc.open();
        iframeDoc.write(js);
        iframeDoc.close();
    }



function runJavascript() {
    js_editor.on(render())
}


function loadEditor() {

         js_editor = CodeMirror(document.getElementById("js"), {
             value: "function test() { \n\talert('Hello Blockchain World');\n\t \n}" + "\n\t \n"+"test()",
             mode: "javascript",
             theme: "dracula",
             lineNumbers: true
         });

}




