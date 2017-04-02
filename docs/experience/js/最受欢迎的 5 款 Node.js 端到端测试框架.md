# 最受欢迎的 5 款 Node.js 端到端测试框架

测试，尤其是自动化测试在现代 WEB 工程中有着非常重要的角色，与交付过程集成良好的自动化测试流程可以在新版发布时帮你快速回归产品功能，也可以充当产品文档。测试因粒度不同又可以分为单元测试、接口测试、功能测试。在 WEB 领域，功能测试亦称为端到端测试（[End to End Test**](http://link.zhihu.com/?target=https%3A//www.tutorialspoint.com/software_testing_dictionary/end_to_end_testing.htm)，简称 E2E 测试），笔者在本文中会结合自身实践和 GitHub 趋势对比最受欢迎的 Node.js E2E 测试解决方案，首先我们按 GitHub 的 star 总数量排序，取前 5 名列举如下（注意：你阅读本文时 star 的数量可能已经不是最新的）。

- CasperJS — 6460 个 star，[官网**](http://link.zhihu.com/?target=http%3A//casperjs.org/)，[代码**](http://link.zhihu.com/?target=https%3A//github.com/casperjs/casperjs)，最近更新于 7 天前；
- Protractor — 6408 个 star，[官网**](http://link.zhihu.com/?target=http%3A//www.protractortest.org/)，[代码**](http://link.zhihu.com/?target=https%3A//github.com/angular/protractor)，最近更新于 10 天前；
- Nightwatch.js — 6121 个 star，[官网**](http://link.zhihu.com/?target=http%3A//nightwatchjs.org/)，[代码**](http://link.zhihu.com/?target=https%3A//github.com/nightwatchjs/nightwatch)，最近更新于 6 天前；
- TestCafe — 2268 个 star，[官网**](http://link.zhihu.com/?target=https%3A//devexpress.github.io/testcafe/)，[代码**](http://link.zhihu.com/?target=https%3A//github.com/DevExpress/testcafe)，最近更新于 1 天前；
- CodeceptJS — 1087 个 star，[官网**](http://link.zhihu.com/?target=http%3A//codecept.io/)，[代码**](http://link.zhihu.com/?target=https%3A//github.com/Codeception/CodeceptJS)，最近更新于 7 天前；

然后分别从环境搭建、测试编写、测试报告等方面来直观展示这 5 个 E2E 测试框架，期望能够对做测试框架选型的同学有帮助。为了更客观的体现各测试框架的特点，笔者设计了一些包含 E2E 测试中常用操作的测试用例，分别使用不同的框架来编写。E2E 测试的常用操作如下：

- 打开网页，跳转网页：打开 Github 的首页；
- 填写输入框，提交表单：键入搜索词，提交搜索表单；
- 元素单击等操作：单击搜索结果的第一项；
- 元素数量、属性检视：确认搜索结果展示了 10 条；
- 页面运行环境检视：确认页面的地址是正确的；

### CasperJS

[CasperJS**](http://link.zhihu.com/?target=http%3A//casperjs.org/) 是 star 数最高的测试框架，也是笔者最早开始采用的 E2E 测试框架，使用 Python 编写，虽不算是严格意义上的原生 Node.js 解决方案，但因为能够使用 npm 安装，且能够很好的与 Node.js 工具链组合使用，笔者还是把它列在了这里。其特别之处在于只能与无界面浏览器（Headless Browser）组合使用，比如 [PhantomJS**](http://link.zhihu.com/?target=http%3A//phantomjs.org/) 和 [SlimerJS**](http://link.zhihu.com/?target=https%3A//slimerjs.org/)，这也让 CasperJS 的优势显而易见：测试运行速度比真实浏览器快不少，且你不需要在持续集成系统中安装各种浏览器或者某个浏览器的不同版本；潜在的坑在于，无界面浏览器的表现有时和真实浏览器不完全相同，会带来某些难以排查解决的浏览器兼容问题。

#### 安装步骤

- 安装 Python 2.6 或更高版本
- 安装 PhantomJS：npm install -g phantomjs
- 安装 CasperJS：npm install -g casperjs

#### 编写测试

如果使用 ES6 之前的风格来编写 CasperJS 测试，代码看起来会显得非常臃肿，而实际上 CasperJS 也不支持任何 ES6/ES7 的新语法，除非你在运行测试之前自己对代码进行预编译，实际代码如下：

```
casper.test.begin('Github Search', function suite(test) {
    casper.start('https://github.com', function () {    // 打开首页
        test.assertVisible('.js-site-search-form', 'should search input visible');
        this.fill('.js-site-search-form', { q: 'casperjs' }, true); // 键入搜索词、并提交
    });

    casper.then(function () {
        test.assertEval(function() {    // 确认搜索结果是 10
            return __utils__.findAll('.repo-list-item').length >= 10;
        }, 'should show 10 results');
    });

    casper.then(function () {
        this.click('.repo-list-item h3 a'); // 点击第1条结果
    });

    var location = null;

    casper.then(function () {   // 这里是取环境变量
        test.assertVisible('.repository-content', 'should repo detail visible');
        location = this.evaluate(function () {
            return window.location;
        });
    });

    casper.then(function () {   // 确认目前跳转到了 casperjs 官方仓库
        test.assertEquals(location.pathname, '/casperjs/casperjs', 'should casperjs repo found');
    });

    casper.run(function () {
        test.done();
    });
});

```

因为 CasperJS 对 [CoffeeScript**](http://link.zhihu.com/?target=http%3A//coffeescript.org/) 有天然的支持，熟悉 CoffeeScript 的同学可以尝试使用 CoffeeScript 编写测试，或者使用[这个工具**](http://link.zhihu.com/?target=https%3A//devexpress.github.io/testcafe/documentation/test-api/assertions/)转换为 CoffeScript。

#### 运行测试

```
casperjs test casperjs/test.js

```

#### 查看报告

测试通过

测试失败

### Protractor

[Protractor**](http://link.zhihu.com/?target=http%3A//www.protractortest.org/) 是 [Angular**](http://link.zhihu.com/?target=https%3A//angular.io/) 官方正在使用的 E2E 测试框架，可以说是专门为 Angular 定制，内置了各种可以选择、操作 Angular 元素的便捷方法，如果你的应用基于 Angular 开发，使用它可以减少很多重复代码（显然类似的便利在其他框架中也有支持）。对于 Angular 的重度使用者，Protractor 会是非常明智的选择，不同于 CasperJS 的是 Protractor 在真实浏览器中运行测试代码。此外，Protractor 内置的页面加载等待的功能，在 CasperJS 中需要自己设置合理的超时。相比于本文列出的其他框架，Protractor 的明显优势是测试用例的组织方式可以自由使用 [Jasmine**](http://link.zhihu.com/?target=https%3A//jasmine.github.io/) 或者 [Mocha**](http://link.zhihu.com/?target=https%3A//mochajs.org/)。

#### 安装步骤

- 安装 JDK
- 安装 Protractor：npm install –g protractor
- 初始化 WebDriver Manager：webdriver-manager update
- [创建配置文件**](http://link.zhihu.com/?target=https%3A//github.com/angular/protractor/blob/master/lib/config.ts)

#### 编写测试

Protractor 默认开启了等待 Angular 加载并初始化完成的功能，如果你测试的不是 Angular 应用，则需要关闭这个功能，测试代码示例如下：

```
describe('angularjs homepage todo list', function () {
    browser.ignoreSynchronization = true;   // 不启用智能等待，因为 github 不是用 angluar 编写的
    browser.get('https://github.com');

    it('should search input visible', function () {
        var searchInput = element(by.className('js-site-search-focus'));
        var searchForm = element(by.className('js-site-search-form'));
        expect(searchInput.isDisplayed()).toEqual(true);
        searchInput.sendKeys('protractor');
        searchForm.submit();
    });

    it('should show 10 results', function () {
        var searchList = element.all(by.className('repo-list-item'));
        expect(searchList.count()).toEqual(10);
        element(by.css('.repo-list-item h3 a')).click();
    });

    it('should repo detail visible', function () {
        var repoContent = element.all(by.className('repository-content'));
        expect(repoContent.isDisplayed()).toEqual([true]);
    });

    it('should protractor repo found', function (done) {
        browser.executeScript(function () {
            return window.location;
        }).then(function (location) {
            expect(location.pathname).toEqual('/angular/protractor');
            done();
        });
    });
});
```

#### 运行测试

- 运行 WebDriver Manager: webdriver-manager start
- 运行测试：protractor protractor.config.js

#### 查看报告

测试通过

测试失败

### Nightwatch

同样流行的 [Nightwatch**](http://link.zhihu.com/?target=http%3A//nightwatchjs.org/)，可以认为是 Protractor 的主要竞争对手，使用 Nigthwatch 编写的代码非常简洁，但是你需要手动在测试代码中添加合适的等待来保障测试的稳定，而 Protractor 和 TestCafe 则提供了内置的支持；Nightwatch 的主要劣势在于繁琐的安装步骤，可能部分同学看到这个[安装文档**](http://link.zhihu.com/?target=http%3A//nightwatchjs.org/gettingstarted%23installation)或者下面的安装步骤就知难而退了。

#### 安装步骤

- 安装 JDK，版本 7 以上
- 下载 Selenium: [selenium-server-standalone-{VERSION}.jar**](http://link.zhihu.com/?target=http%3A//selenium-release.storage.googleapis.com/index.html)，复制到测试目录
- 下载 [WebDriver for Google Chrome**](http://link.zhihu.com/?target=https%3A//sites.google.com/a/chromium.org/chromedriver/downloads)，复制到测试目录
- 安装 Nightwatch: npm install -g nightwatch
- [创建配置文件**](http://link.zhihu.com/?target=http%3A//nightwatchjs.org/getingstarted)，需要在配置中声明 chromewebdriver 的地址；

#### 编写测试

```
module.exports = {
    'Github Search': function (browser) {
        browser // 打开首页、填写搜索词、提交搜索表单
            .url('https://github.com')
            .assert.visible('.js-site-search-focus', 'should search input visible')
            .setValue('.js-site-search-focus', 'nightwatch')
            .submitForm('.js-site-search-form')
            .pause(1000);

        browser.execute(function () {   // 确认展示 10 条搜索结果
            return document.querySelectorAll('.repo-list-item').length;
        }, function (args) {
            browser.assert.equal(args.value, 10, 'should show 10 results');
        });

        browser.click('.repo-list-item h3 a').pause(1000);

        browser.assert.visible('.repository-content', 'should repo detail visible');

        browser.execute(function () {
            return window.location;
        }, function (args) {    // 确认打开了 nightwatch 官网
            browser.assert.equal(args.value.pathname, '/nightwatchjs/nightwatch', 'should nightwatch repo found');
        });

        browser.end();
    }
};

```

#### 运行测试

- 运行 Selenium：java -jar selenium-server-standalone-3.0.0.jar
- nightwatch test.js

#### 查看报告

测试通过

测试失败

### ![img](https://pic3.zhimg.com/v2-4fcc1947bab50367edb4a1dab1229656_b.png)TestCafe

[TestCafe**](http://link.zhihu.com/?target=https%3A//devexpress.github.io/testcafe/) 是非常年轻但很受开发者欢迎的测试框架，因为不需要依赖 [WebDriver**](http://link.zhihu.com/?target=http%3A//webdriver.io/) 之类的东西，TestCafe 环境只需一键即可完成，这也意味着，你可以在任何安装了浏览器应用的物理设备上运行测试。TestCafe 对 ES6/ES7 语法的天然支持让它更具前瞻性，命令行工具产生的测试报告简洁但不失完整。由于开源的时间较短，相比于其他测试框架 TestCafe 的社区和生态还不够成熟。尽管如此，不断出现的各种 TestCafe 功能扩展也证明了它的社区和生态在不断壮大。对于站在 WEB 技术风口浪尖的同学，TestCafe 无疑是非常值得留意的 E2E 测试解决方案，开箱即用的特性极大的降低了使用者的成本。

#### 安装步骤

npm install testcafe -g

#### 编写测试

TestCafe 的测试组织方式详见[这里**](http://link.zhihu.com/?target=http%3A//devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html)，[选择符支持**](http://link.zhihu.com/?target=https%3A//devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/)也非常强大，支持类似于 jQuery 的灵活异步的选择符，[断言风格**](http://link.zhihu.com/?target=https%3A//devexpress.github.io/testcafe/documentation/test-api/assertions/)非常类似 [Chai**](http://link.zhihu.com/?target=http%3A//chaijs.com/)，下面是测试代码：

```
import { Selector } from 'testcafe';

fixture `Github Search`
    .page `https://github.com`;

test('should github search work as expected', async t => {
    const searchInput = Selector('.js-site-search-focus');
    const searchList = Selector('.repo-list-item');
    const resultItem = Selector('.repo-list-item h3 a');
    const repoContent = Selector('.repository-content');

    await t.setTestSpeed(0.8);
    await t.expect(searchInput.exists).eql(true, 'should search input visible');
    await t.typeText(searchInput, 'testcafe');
    await t.pressKey('enter');

    await t.expect(searchList.count).eql(10, 'should show 10 results');
    await t.click(resultItem);

    await t.expect(repoContent.exists).eql(true, 'should repo detail visible');

    const location = await t.eval(() => window.location);
    await t.expect(location.pathname).eql('/DevExpress/testcafe', 'should testcafe repo found');
});

```

#### 运行测试

```
testcafe chrome testcafe/test.js

```

#### 查看报告

测试通过

测试失败

### CodeceptJs

[CodeceptJs**](http://link.zhihu.com/?target=http%3A//codecept.io/) 可能并不算是严格意义的 E2E 测试框架，它对各种测试运行工具做了一层封装，旨在提供更简洁的 API，你可以自由选择下面这些测试运行工具：

- WebDriverIO
- Protractor
- Selenium WebDriver JS
- NightmareJS

CodeceptJs 让笔者比较欣赏的地方在于测试用例的组织，基于 Feature 和 Scenario 两个粒度来组织测试让它看起来更有 E2E 测试的样子，它支持最新的 ES6 语法，同时也屏蔽各种复杂的回调细节，所有的测试用例都是以第一人称来做，让测试代码阅读起来更像是自然语言，而让笔者担忧的地方在于，过多的封装可能导致出问题时排查比较困难。

#### 安装步骤

- 安装 CodeceptJs npm install -g codeceptjs
- 用命令行工具初始化配置 codecept.json：codeceptjs init
- 使用命令行工具生成测试：codeceptjs gt
- 此外，你需要安装你所选择的底层测试工具，比如 WebDriver、Protractor

#### 编写测试

```
Feature('Github Search');

Scenario('search codecept repo', (I) => {
    I.amOnPage('https://github.com');
    I.seeElement('.js-site-search-focus');
    I.fillField('.js-site-search-focus', 'codeceptjs');
    I.pressKey('Enter');

    I.seeElement('.repo-list-item');
    I.click('.repo-list-item h3 a');
    I.seeElement('.repository-content');
    I.seeInCurrentUrl('/Codeception/CodeceptJS');
});

```

#### 运行测试

codeceptjs run

#### 查看报告

测试通过

测试失败

## 总结对比

本文中的所有代码可以在 GitHub [仓库**](http://link.zhihu.com/?target=https%3A//github.com/wangshijun/top-5-e2e-framework)上看到。任何开发工具的演化都是朝着更快捷、高效的目标。本文介绍的几个 E2E 测试框架可以说各有所长，在做框架选型的时候该考虑哪些因子呢？这些因子的优先级如何？下面是笔者的考虑：

- 上手简单：P0，环境搭建步骤？出错的概率？是否需要繁琐的配置？TestCafe 非常简单；
- 文档支持：P0，是否包含入门文档？API 参考？开发者文档？本文中的五款都还不错；
- 过程透明：P0，测试运行过程是否是透明的，能否观察到页面行为？CasperJS 就像个黑盒；
- 运行速度：P0，测试运行速度能决定你 CI 流程的好坏；
- 测试报告：P0，是否支持多种报告？是否方便与 CI 流程集成？比如要支持 XML、JUnit 等格式输出；
- 调试功能：P0，出错时提供的信息是否清晰？是否支持截图？TestCafe 做的很好；
- 测试组织：P1，是否能与现有的技术栈很好的组合起来？不能结合独创的方式是否直观？如果是大型项目可以提高优先级，Protractor 和 CodeCeptJs 占优；
- 代码风格：P1，简洁的代码意味的更高的可读性、更低的维护成本；TestCafe、CodeCeptJs 不错；
- 社区支持：P2，围绕这个工具是否有成熟的社区？可以用来提问、贡献代码；
- 可扩展性：P3，是否支持 API 扩展？扩展成本如何？

如果你的项目中需要添加 E2E 测试，做决定的时候没有标准答案，因为还需要结合项目自身的特点，比如规模大小、对上面各因子的要求。
