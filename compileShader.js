/**
 * 编译着色器模板代码
 * 创建并编译一个着色器
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {string} shaderSource GLSL格式的着色器代码。
 * @param {number} shaderType 着色器类型，VERTEX_SHADER 或 FRAGMENT_SHADER。
 * @return {!WelGLShader}  着色器。
 */
function compileShader(gl, shaderSource, shaderType) {
    // 创建着色器程序
    var shader = gl.createShader(shaderTYpe);
    // 设置着色器的源码
    gl.shaderSource(shader, shaderSource);
    // 编译着色器
    gl.compileShader(shader);
    // 检测编译是否成功
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(!success) {
        // 编译出错，获取错误信息
        throw("could not compile shader:" + gl.getShaderInfoLog(shader));
    }
    return shader;
}

/**
 * 链接2个着色器到一个着色程序
 * 从2个着色器中创建一个程序
 *
 * @param {!WebGLRenderingContext} gl WebGL上下文
 * @param {!WebGLSahder} vertexShader 一个顶点着色器
 * @param {!WebGLShader} fragmentShader 一个片断着色器
 * @return {!WegGLProgram} 程序
 */
function createProgram(gl, vertexShader, fragmentShader) {
    // 创建一个程序
    var program = gl.createProgram();

    // 附上着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 链接到程序
    gl.linkProgram(program);
    
    // 检查链接是否成功
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // 链接过程出现问题
        throw("program failed to link:" + gl.getProgramInfoLog(program));
    }
    return program;
}


/**
 * 用script标签的内容创建着色器
 *
 * @param {!WebGLRenderingContext} gl WebGL上下文。
 * @param {string} scriptId script标签的id。
 * @param {string} opt_shaderType 要创建的着色器类型。如果没有定义，就使用script标签的type属性。
 * @return {!WebGLShader} 着色器。
 */
function createShaderFromScript(gl, scriptId, opt_shaderType) {
    // 通过id找到script标签
    var shaderScript = document.getElementById(scriptId);
    if(!shaderScript) {
        throw("*** Error: unknown script element" + scriptId);
    }
    // 提取标签内容
    var shaderSource = shaderScript.textContent;
    // 如果没有传着色器类型，就使用标签'type'属性
    if(!opt_shaderType) {
        if(shaderScript.type == "x-shader/x-vertex") {
            opt_shaderType = gl.VERTEX_SHADER;
        } else if(shaderScript.type == "x-shader/x-fragment") {
            opt_shaderType = gl.FRAGMENT_SHADER;
        } else if(!opt_shaderType) {
            throw("*** Error: shader type not set");
        }
    }
    return compileShader(gl, shaderSource, opt_shaderType);
}
// 示例：编译着色器
var shader = createShaderFromScript(gl, "someScriptTagId");



