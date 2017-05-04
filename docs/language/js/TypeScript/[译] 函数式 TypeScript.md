# [译] 函数式 TypeScript

谈到函数式编程时，我们常提到机制、方法，而不是核心原则。函数式编程不是关于 Monad、Monoid 和 Zipper 这些概念的，虽然它们确实很有用。从根本上来说，函数式编程就是关于如使用通用的可复用函数进行组合编程。**本文是我在重构 TypeScript 代码时使用函数式的一些思考的结果。**

首先，我们需要用到以下几项技术：

- 尽可能使用函数代替简单值
- 数据转换过程管道化
- 提取通用函数

来，开始吧！

假设我们有两个类，Employee 和 Department。Employee 有 name 和 salary 属性，Department 只是 Employee 的简单集合。

```
class Employee {
  constructor(public name: string, public salary: number) {}
}

class Department {
  constructor(public employees: Employee[]) {}

  works(employee: Employee): boolean {
    return this.employees.indexOf(employee) > -1;
  }
}
```

我们要重构的是 averageSalary 函数。

```
function averageSalary(employees: Employee[], minSalary: number, department?: Department): number {
   let total = 0;
   let count = 0;

   employees.forEach((e) => {
     if(minSalary <= e.salary && (department === undefined || department.works(e))){
       total += e.salary;
       count += 1;
     }
   });

  return total === 0 ? 0 : total / count;
 }
```

averageSalary 函数接收 employee 数组、最低薪资 minSalary 以及可选的 department 作为参数。如果传了 department 参数，函数会计算该部门中所有员工的平均薪资；若不传，则对全部员工进行计算。

该函数的使用方式如下：

```
describe("average salary", () => {
  const empls = [
    new Employee("Jim", 100),
    new Employee("John", 200),
    new Employee("Liz", 120),
    new Employee("Penny", 30)
  ];

  const sales = new Department([empls[0], empls[1]]);

  it("calculates the average salary", () => {
    expect(averageSalary(empls, 50, sales)).toEqual(150);
    expect(averageSalary(empls, 50)).toEqual(140);
  });
});
```

需求虽简单粗暴，可就算不提代码难以拓展，其混乱是显而易见的。若新增条件，函数签名及接口就不得不发生变动，if 语句也会也越来越臃肿可怕。

我们一起用一些函数式编程的办法重构这个函数吧。

## 使用函数代替简单值

**使用函数代替简单值看起来似乎不太直观，但这却是整理归纳代码的强大办法。** 在我们的例子中，这样做，意味着要将 minSalary 和 department 参数替换成两个条件检验的函数。

```
type Predicate = (e: Employee) => boolean;

function averageSalary(employees: Employee[], salaryCondition: Predicate,
  departmentCondition?: Predicate): number {
  let total = 0;
  let count = 0;

  employees.forEach((e) => {
    if(salaryCondition(e) && (departmentCondition === undefined || departmentCondition(e))){
      total += e.salary;
      count += 1;
    }
  });

  return total === 0 ? 0 : total / count;
}

// ...

expect(averageSalary(empls, (e) => e.salary > 50, (e) => sales.works(e))).toEqual(150);
```

**我们所做的就是将 salary、department 两个条件接口统一起来。**而此前这两个条件是写死的，现在它们被明确定义了，并且遵循一致的接口。**这次整合允许我们将所有条件作为数组传递。**

```
function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  let total = 0;
  let count = 0;

  employees.forEach((e) => {
    if(conditions.every(c => c(e))){
      total += e.salary;
      count += 1;
    }
  });
  return (count === 0) ? 0 : total / count;
}

//...

expect(averageSalary(empls, [(e) => e.salary > 50, (e) => sales.works(e)])).toEqual(150);
```

条件数组只不过是组合的条件，可以用一个简单的组合器将它们放到一起，这样看起来更加明晰。

```
function and(predicates: Predicate[]): Predicate {
  return (e) => predicates.every(p => p(e));
}

function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  let total = 0;
  let count = 0;

  employees.forEach((e) => {
    if(and(conditions)(e)){
      total += e.salary;
      count += 1;
    }
  });
  return (count == 0) ? 0 : total / count;
}
```

值得注意的是，“and” 组合器是通用的，可以复用并且还可能拓展为库。

**提起结果**

现在，averageSalary 函数已健壮得多了。**我们可以加入新条件，无需破坏函数接口或改变函数实现。**

## 数据转换过程管道化

函数式编程的另外一个很有用的实践是将所有数据转换过程变成管道。在本例中，就是将 filter 过程提取到循环外面。

```
function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  const filtered = employees.filter(and(conditions));

  let total = 0
  let count = 0

  filtered.forEach((e) => {
    total += e.salary;
    count += 1;
  });

  return (count == 0) ? 0 : total / count;
}
```

这样一来计数的 count 就没什么用了。

```
function averageSalary(employees: Employee[], conditions: Predicate[]): number{
  const filtered = employees.filter(and(conditions));

  let total = 0
  filtered.forEach((e) => {
    total += e.salary;
  });

  return (filtered.length == 0) ? 0 : total / filtered.length;
}
```

接下来，如在叠加之前将 salary 摘取出来，求和过程就变成简单的 reduce 了。

```
function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  const filtered = employees.filter(and(conditions));
  const salaries = filtered.map(e => e.salary);

  const total = salaries.reduce((a,b) => a + b, 0);
  return (salaries.length == 0) ? 0 : total / salaries.length;
}
```

## 提取通用函数

接着我们发现，最后两行代码和当前域完全没什么关系。其中不包含任何与员工、部门相关的信息。仅仅只是一个计算平均数的函数。所以也将其提取出来。

```
function average(nums: number[]): number {
  const total = nums.reduce((a,b) => a + b, 0);
  return (nums.length == 0) ? 0 : total / nums.length;
}

function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  const filtered = employees.filter(and(conditions));
  const salaries = filtered.map(e => e.salary);
  return average(salaries);
}
```

又一次，提取出的函数是完全通用的。

最后，将所有 salary 部分提出来之后，我们得到终极方案。

```
function employeeSalaries(employees: Employee[], conditions: Predicate[]): number[] {
  const filtered = employees.filter(and(conditions));
  return filtered.map(e => e.salary);
}

function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  return average(employeeSalaries(employees, conditions));
}
```

对比原始方案和终极方案，我敢说，毫无疑问，后者更棒。首先，它更通用（我们可以不破坏函数接口的情况下添加新类型的判断条件）。其次，我们从可变状态（mutable state）和 if 语句中解脱出来，这使代码更容易阅读、理解。

## 何时收手

函数式风格的编程中，我们会编写许多小型函数，它们接收一个集合，返回新的集合。这些函数能够以不同方式组合、复用 —— 棒极了。不过，这种风格的一个缺点是代码可能会变得过度抽象，导致难以读懂，那些函数组合在一起到底要干嘛？

我喜欢使用乐高来类比：乐高积木能够以不同形式放在一起 —— 它们是可组合的。但注意，并不是所有积木都是一小块。所以，在使用本文所述技巧进行代码重构时，千万别妄图将一切都变成接收数组、返回数组的函数。诚然，这样一些函数组合使用极度容易，可它们也会显著降低我们对程序的理解能力。

## 小结

本文展示了如何使用函数式思维重构 TypeScript 代码。我所遵循的是以下几点规则：

- 尽可能使用函数代替简单值
- 数据转换过程管道化
- 提取通用函数

## 了解更多

强烈推荐以下两本书：

- [“JavaScript Allonge” by Reginald Braithwaite](https://leanpub.com/javascript-allonge)
- [“Functional JavaScript” by Michael Fogus](http://shop.oreilly.com/product/0636920028857.do)
