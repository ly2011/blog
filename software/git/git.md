## GIT 使用

---

### 常用命令

---

- 检出仓库: `git clone /path/to/repository`

- 获取更新, 并与本地代码进行合并 `git pull`

- 将文件添加到版本控制系统 `git add filePath`

  + `git add .` 添加当前目录下的所有文件

  + `git add -A` 添加当前目录下的所有文件, 如有重命名的文件, 会对重命名的文件进行删除。 `git add .` 不会

- 提交改动代码: `git commit -m filePath "注释"` (注释的必填的)

- 提交所有改动代码: `git commit -am "注释"`

- 查看当前项目代码的状态: `git status`

- 将改动推送到服务器: `git push`

- 将文件的内容替换成上次提交的内容: `git checkout filePath`

- 将还没提交的内容保存起来, 所有的文件内容变成上次提交的样子: `git stash`

- 分支操作

  + 切换到某分支: `git checkout branchName`

  + 创建并切换到某分支: `git checkout -b branchName`。以当前分支的代码为基础。获取远程分支并切换到该分支 `git checkout -b branchName origin/branchName`

  + 将某分支的改动推送到服务器上: `git push origin branchName`

  + 删除本地分支 `git branch -d branchName`

  + 查看本地分支列表 `git branch`。查看远程分支列表 `git branch -r`

  + 将 a 分支的内容合并到 b 分支。 `git checkout b, git merge a`

- 发生冲突时, 文件会用 `>>>>` 和 `<<<<` 来标明冲突的地方。合并好后, `git add` 这个冲突的文件。然后再 `commit, push`

### .gitignore

---

如果项目想让某些文件的版本不受Git管理，可以在项目的根路径创建个文件，名称为 `.gitignore`。内容为不受Git管理的文件名。 如

```javascript
.idea
Desktop.ini
*.log
# 开头表示注释，如果相匹配 #，可以在前面加一个反斜杠，即 \#
```

一些 `.gitignore` 的模板 [https://github.com/github/gitignore](https://github.com/github/gitignore)

## 常见问题

---

### 如何配置Git支持对文件名的大小写敏感

---

```shell
git config core.ignorecase false
```

### 远程代码的地址变了肿么处理

```shell
git remote rm origin
git remote add origin # 新的远程代码库的地址

# 第一次提交时用一下代码
git push --set-upstream origin master
```

## 扩展阅读

- [猴子都能懂的Git入门](http://backlogtool.com/git-guide/cn/)
