# go 搭建最简单的http server服务器

---

```go

package main

import (
	"io"
	"net/http"
	"log"
)
// hello world, the web server
func HelloServer(w http.ResponseWriter,req *http.Request) {
	io.WriteString(w, "Hello, world!\n")
}
func main()  {
	http.HandleFunc("/hello", HelloServer)
	err := http.ListenAndServe(":12345",nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

```
