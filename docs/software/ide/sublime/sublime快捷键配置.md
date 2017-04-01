# sublime 快捷键配置

---

```json
[
{"keys": ["ctrl+shift+r"], "command": "reindent" , "args": {"single_line": false}},
{ "keys": ["f5"], "command": "open_in_browser" },
{ "keys": ["alt+space"], "command": "auto_complete" },
{ "keys": ["alt+space"], "command": "replace_completion_with_auto_complete", "context":
[
   { "key": "last_command", "operator": "equal", "operand": "insert_best_completion" },
   { "key": "auto_complete_visible", "operator": "equal", "operand": false },
   { "key": "setting.tab_completion", "operator": "equal", "operand": true }
]
},

{ "keys": ["ctrl+alt+d"], "command": "goto_definition" },

{ "keys": ["ctrl+alt+p"], "command": "autoprefixer" },
]
```
