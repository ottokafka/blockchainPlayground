//TODO: add a run button for javascript
//todo: add a button for submit for js

// Base template
var baseTemplate =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";

function prepareSource() {

    var js = js_editor.getValue();
    //console.log(js + " works"); //function () { alert()
    var src = '';

    js = '<script>' + js + '<\/script>';
    //console.log(js);
    //src = baseTemplate.replace('</body>', js + '</body>');
    //src = baseTemplate.replace('</html>', js + '</html>');
    src = js;
    //console.log(src);

    return src;
}


function render() {
    var source = prepareSource();
    console.log(source);

    var iframe = document.getElementById('output');
    var iframeDoc = iframe.contentDocument;
    //console.log(iframeDoc);

    iframeDoc.open();
    //console.log(iframeDoc.open())
    iframeDoc.write(source);

    //iframeDoc.getElementById("output").innerHTML = "fuck"
    //--- the iframe needs a write needs a script tag with javascript input in the middle
    //console.log(iframeDoc.write('<script>' + 'alert("this works")' + '<\/script>'));
    iframeDoc.close();
}

// EDITORS
var js_editor = CodeMirror(document.getElementById("js"),{
    value: "function test() { \n\talert('Hello Nebulas');\n\t \n}" + "test()",
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true
});


function runJavascript() {
    js_editor.on(render())
}


//document.getElementById("output").innerHTML = "Bitch"




//---- the code below is to load javascript code on text input which become annoying
//js_editor.on('change', function (inst, changes) {
//this will just render code to the display
//render()
//});


// RENDER CALL ON PAGE LOAD
// NOT NEEDED ANYMORE, SINCE WE RELY
// ON CODEMIRROR'S onChange OPTION THAT GETS
// TRIGGERED ON setValue
// render();




