```json
// 将设置放入此文件中以覆盖默认设置
{
    // 控制字体系列。
    "editor.fontFamily": "'Source Code Pro', 'Dejavu Sans Mono', Monaco, Consolas, 'Courier New', monospace",

    // 控制字体粗细。
    "editor.fontWeight": "normal",
    // 一个制表符等于的空格数。该设置在 `editor.detectIndentation` 启用时根据文件内容进行重写。
    "editor.tabSize": 2,
    // 控制在多少个字符后编辑器会自动换到下一行。将其设置为 0 则将打开视区宽度换行(自动换行)。将其设置为 -1 则将强制编辑器始终不换行。
    "editor.wrappingColumn": 80,
    // 控制是否应换行。换行依据为 min(editor.wrappingColumn, viewportWidthInColumns)。
    "editor.wordWrap": true,
    // 控制延迟多少毫秒后将显示快速建议
    "editor.quickSuggestionsDelay": 2,
    // 通过使用鼠标滚轮同时按住 Ctrl 可缩放编辑器的字体
    "editor.mouseWheelZoom": true,
    // 默认行尾字符。
    "files.eol": "\n",
    // 启用后，将在保存文件时剪裁尾随空格。
    "files.trimTrailingWhitespace": true,
    // 在“打开的编辑器”窗格中显示的编辑器数量。将其设置为 0 可隐藏窗格。
    "explorer.openEditors.visible": 0,
    // 自动更新扩展
    "extensions.autoUpdate": true,
    // 执行文字相关的导航或操作时将用作文字分隔符的字符
    "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
    // 配置文件路径的 glob 模式以从文件监视排除。更改此设置要求重启。如果在启动时遇到 Code 消耗大量 CPU 时间，则可以排除大型文件夹以减少初始加载。
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true,
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    // 配置 glob 模式以在搜索中排除文件和文件夹。从 files.exclude 设置中继承所有 glob 模式。
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true,
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    // 配置 glob 模式以排除文件和文件夹。
    "files.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true,
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    // 终端在 Windows 上使用的 shell 的路径。使用随 Windows 一起提供的 shell 时(cmd、PowerShell 或 Ubuntu 上的 Bash)，相对 C:WindowsSystem32，首选 C:Windowssysnative 以使用 64 位版本。
    "terminal.integrated.shell.windows": "D:\\Program Files\\Git\\git-bash.exe",
    "typescript.tsdk": "C:\\Users\\baby\\AppData\\Roaming\\npm\\node_modules\\typescript\\lib",
    "files.autoSave": "off",
    "fileheader.Author": "fengyun2",
    "fileheader.LastModifiedBy": "fengyun2",
    "window.zoomLevel": 0,
    "emmet.syntaxProfiles": {
        "javascript": "html",
        "javascriptReact": "html"
    },
    // Beautify config
    // Automatically beautify files on save. Set to true to run for JSON, javascript, html, css and sass. Use array to set indiviaul types to beautify: ["js", "json", "html", "css", "sass"]
    // "beautify.onSave": false,
    // Set path/file matchers to ignore when attempting to beautify on save. Uses glob path matching.
    "beautify.onSaveIgnore": [
      "**/*+(.|_|-)min.*"
    ],
    // File extensions that can be beautified as javascript or JSON.
    "beautify.JSfiles": [
      "js",
      "json",
      "jsbeautifyrc",
      "jshintrc",
      "jsx",
      "ts",
      "tsx"
    ],
    // File extensions that can be beautified as HTML.
    "beautify.HTMLfiles": [
      "htm",
      "html",
      "vue",
      "tag"
    ],
    // File extensions that can be beautified as CSS.
    "beautify.CSSfiles": [
      "css",
      "scss",
      "less",
      "styl"
    ]
}
```
