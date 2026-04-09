import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { ErrorExplain } from "../components/ErrorExplain";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step7Generics() {
  return (
    <Layout
      kicker="Step 7 · 4월 28일"
      title="Generics · Error Handling · Closures · Iterators"
      subtitle="제네릭, 에러 처리, 클로저, 반복자 — 함수형 Rust의 핵심"
    >
      <Lede>
        이 회차를 마치면 제네릭으로 타입을 추상화하고, Result와 ?로 에러를 우아하게 처리하고,
        클로저와 반복자로 데이터를 변환할 수 있게 됩니다.
      </Lede>

      {/* ===== M1 ===== */}
      <Module badge="M1" title="제네릭(Generics)">
        <Lede>타입을 매개변수로 받아 코드 중복을 없애는 방법입니다.</Lede>

        <p>
          같은 로직인데 <code>i32</code>용, <code>f64</code>용으로 함수를 따로 만드는 것은 비효율적입니다.
          <strong>제네릭(Generics)</strong>을 사용하면 타입을 매개변수로 받아 하나의 함수로 여러 타입에 대응할 수 있습니다.
          Rust의 제네릭은 <strong>단형화(Monomorphization)</strong> 덕분에 런타임 비용이 전혀 없습니다 —
          컴파일러가 사용되는 구체 타입마다 전용 코드를 생성합니다.
        </p>

        <h3>따라하기</h3>
        <p>다음 코드를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>을 실행하세요.</p>

        <CodeBlock>{`use std::fmt::Display;

// 제네릭 함수 — T는 PartialOrd(비교 가능)와 Display(출력 가능)를 만족해야 합니다
fn largest<T: PartialOrd + Display>(list: &[T]) -> &T {
    let mut max = &list[0];
    for item in &list[1..] {
        if item > max {
            max = item;
        }
    }
    max
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    println!("가장 큰 수: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("가장 큰 문자: {}", largest(&chars));
}`}</CodeBlock>

        <h3>트레이트 바운드(Trait Bounds)</h3>
        <p>
          <code>T: PartialOrd + Display</code>는 <strong>트레이트 바운드</strong>입니다.
          "T는 비교 가능하고 출력 가능한 타입이어야 한다"는 제약 조건입니다.
        </p>
        <p><code>impl Trait</code> 문법으로 더 간결하게 쓸 수도 있습니다.</p>

        <CodeBlock>{`// 매개변수에서 impl Trait
fn print_item(item: &impl Display) {
    println!("{}", item);
}

// 반환값에서 impl Trait
fn make_greeting() -> impl Display {
    String::from("안녕하세요!")
}`}</CodeBlock>

        <Checklist
          items={[
            <>제네릭 함수를 작성하고 호출할 수 있습니다.</>,
            <>트레이트 바운드의 역할을 이해합니다.</>,
            <>단형화가 런타임 비용 없음을 의미하는 것을 알고 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch10-01-syntax.html",
              text: "Rust Book 한국어판 — 10.1 제네릭 데이터 타입",
            },
          ]}
        />
      </Module>

      {/* ===== M2 ===== */}
      <Module badge="M2" title="에러 처리(Error Handling)">
        <Lede>panic!으로 멈추거나, Result와 ?로 에러를 우아하게 전파하는 방법을 배웁니다.</Lede>

        <p>
          프로그램을 작성하다 보면 파일이 없거나, 네트워크가 끊기거나, 입력이 잘못되는 상황을 만납니다.
          Rust는 이런 에러를 두 가지로 구분합니다.
        </p>
        <ul>
          <li><strong>복구 불가능한 에러</strong> — <code>panic!</code> 매크로로 프로그램을 즉시 중단합니다. 논리적 버그에 사용합니다.</li>
          <li><strong>복구 가능한 에러</strong> — <code>Result&lt;T, E&gt;</code> 타입으로 표현하고, 호출자가 처리 방법을 결정합니다.</li>
        </ul>

        <h3>Result&lt;T, E&gt;와 ? 연산자</h3>
        <p><code>Result</code>는 성공(<code>Ok(T)</code>) 또는 실패(<code>Err(E)</code>)를 담는 열거형입니다.</p>

        <CodeBlock>{`use std::fs;
use std::io;

fn read_username() -> Result<String, io::Error> {
    // ? 연산자: Err이면 바로 반환, Ok이면 값을 꺼냅니다
    let content = fs::read_to_string("username.txt")?;
    Ok(content.trim().to_string())
}

fn main() {
    match read_username() {
        Ok(name) => println!("사용자: {}", name),
        Err(e) => println!("파일을 읽을 수 없습니다: {}", e),
    }
}`}</CodeBlock>

        <p>
          <strong><code>?</code> 연산자</strong>는 <code>Result</code>가 <code>Err</code>이면 현재 함수에서 즉시 반환하고,
          <code>Ok</code>이면 안의 값을 꺼내줍니다. <code>match</code>를 중첩하는 것보다 훨씬 깔끔합니다.
        </p>

        <ErrorExplain
          header={`error[E0277]: the \`?\` operator can only be used in a function that returns \`Result\` or \`Option\``}
          code={`error[E0277]: the \`?\` operator can only be used in a function
              that returns \`Result\` or \`Option\`
 --> src/main.rs:4:48
  |
1 | fn main() {
  | --------- this function should return \`Result\` or \`Option\`
  |            to accept \`?\`
...
4 |     let content = fs::read_to_string("hello.txt")?;
  |                                                    ^ cannot use the \`?\`
  |                                                      operator in a
  |                                                      function that
  |                                                      returns \`()\``}
        >
          <p>
            <strong>해석:</strong> <code>?</code> 연산자는 <code>Result</code>나 <code>Option</code>을 반환하는 함수 안에서만 사용할 수 있습니다.
            <code>main()</code>에서 <code>?</code>를 쓰려면 반환 타입을 <code>Result&lt;(), Box&lt;dyn std::error::Error&gt;&gt;</code>로 바꾸거나,
            <code>match</code>로 직접 처리해야 합니다.
          </p>
          <p>
            에러 메시지가 길어 보여도 무서워하지 마세요. rustc는 거의 항상 해결 방법까지 알려줍니다.
          </p>
        </ErrorExplain>

        <h3>panic! — 복구 불가능한 에러</h3>
        <p><code>panic!</code>은 프로그램을 즉시 중단합니다. 정상적인 에러 처리에는 사용하지 않습니다.</p>

        <CodeBlock>{`fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        panic!("0으로 나눌 수 없습니다!");
    }
    a / b
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>Result&lt;T, E&gt;</code>와 <code>?</code> 연산자를 사용해 에러를 처리할 수 있습니다.</>,
            <><code>panic!</code>은 논리적 버그에만 사용해야 한다는 것을 이해합니다.</>,
            <><code>match</code>로 <code>Ok</code>와 <code>Err</code>를 분기할 수 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch09-00-error-handling.html",
              text: "Rust Book 한국어판 — 9장 에러 처리",
            },
            {
              href: "https://doc.rust-kr.org/ch09-01-unrecoverable-errors-with-panic.html",
              text: "Rust Book 한국어판 — 9.1 panic!과 복구 불가능한 에러",
            },
            {
              href: "https://doc.rust-kr.org/ch09-02-recoverable-errors-with-result.html",
              text: "Rust Book 한국어판 — 9.2 Result와 복구 가능한 에러",
            },
          ]}
        />
      </Module>

      {/* ===== M3 ===== */}
      <Module badge="M3" title="클로저(Closure)">
        <Lede>환경을 캡처하는 익명 함수 — 데이터 변환과 콜백의 핵심 도구입니다.</Lede>

        <p>
          <strong>클로저(Closure)</strong>는 주변 환경의 변수를 캡처할 수 있는 익명 함수입니다.
          <code>|매개변수| 본문</code> 형태로 작성합니다.
          일반 함수와 달리, 클로저는 자신이 정의된 스코프의 변수에 접근할 수 있습니다.
        </p>

        <h3>따라하기</h3>
        <p>클로저의 기본 문법과 환경 캡처를 확인합니다.</p>

        <CodeBlock>{`fn main() {
    // 기본 클로저 문법
    let add = |a: i32, b: i32| -> i32 { a + b };
    println!("3 + 5 = {}", add(3, 5));

    // 타입 추론 — 대부분 타입을 생략할 수 있습니다
    let double = |x| x * 2;
    println!("4의 두 배: {}", double(4));

    // 환경 캡처 — 클로저 바깥의 변수를 사용합니다
    let greeting = String::from("안녕하세요");
    let say_hello = || println!("{}", greeting);
    say_hello();
    // greeting은 불변 빌림으로 캡처되어 이후에도 사용 가능
    println!("원래 값: {}", greeting);
}`}</CodeBlock>

        <h3>캡처 방식 — Fn, FnMut, FnOnce</h3>
        <p>클로저는 환경을 캡처하는 방식에 따라 세 가지 트레이트 중 하나를 구현합니다.</p>
        <ul>
          <li><code>Fn</code> — 불변 참조로 캡처. 여러 번 호출 가능.</li>
          <li><code>FnMut</code> — 가변 참조로 캡처. 캡처한 변수를 수정할 수 있음.</li>
          <li><code>FnOnce</code> — 소유권을 가져감. 한 번만 호출 가능.</li>
        </ul>

        <h3>고차 함수(Higher-order Functions)</h3>
        <p>함수의 매개변수로 클로저를 받을 수 있습니다.</p>

        <CodeBlock>{`fn apply_twice<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {
    f(f(x))
}

fn main() {
    let result = apply_twice(|x| x + 3, 7);
    println!("결과: {}", result); // (7+3)+3 = 13
}`}</CodeBlock>

        <Checklist
          items={[
            <>클로저를 <code>|매개변수| 본문</code> 형태로 작성할 수 있습니다.</>,
            <>Fn, FnMut, FnOnce의 차이를 이해합니다.</>,
            <>함수의 매개변수로 클로저를 전달할 수 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch13-01-closures.html",
              text: "Rust Book 한국어판 — 13.1 클로저: 환경을 캡처하는 익명 함수",
            },
          ]}
        />
      </Module>

      {/* ===== M4 ===== */}
      <Module badge="M4" title="반복자(Iterator)">
        <Lede>지연 평가와 체이닝으로 데이터를 효율적으로 변환하는 방법입니다.</Lede>

        <p>
          <strong>반복자(Iterator)</strong>는 연속된 요소를 하나씩 처리하는 패턴입니다.
          Rust의 반복자는 <strong>지연 평가(Lazy Evaluation)</strong>를 사용합니다 —
          <code>collect()</code> 같은 소비 메서드를 호출하기 전까지는 실제로 아무 계산도 하지 않습니다.
          <code>map</code>, <code>filter</code>, <code>fold</code>를 체인처럼 연결해서 선언적으로 데이터를 변환할 수 있습니다.
        </p>

        <h3>따라하기</h3>
        <p>다음 코드를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>을 실행하세요.</p>

        <CodeBlock>{`fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // map: 각 요소를 변환, filter: 조건에 맞는 것만 남김
    let even_squares: Vec<i32> = numbers
        .iter()               // 반복자 생성
        .filter(|&&x| x % 2 == 0) // 짝수만
        .map(|&x| x * x)     // 제곱
        .collect();           // Vec으로 수집

    println!("짝수의 제곱: {:?}", even_squares);
    // [4, 16, 36, 64, 100]

    // fold: 누적 계산 (다른 언어의 reduce와 유사)
    let sum: i32 = numbers.iter().fold(0, |acc, &x| acc + x);
    println!("합계: {}", sum); // 55

    // 문자열 처리에도 유용합니다
    let words = vec!["hello", "world", "rust"];
    let sentence: String = words
        .iter()
        .map(|w| w.to_uppercase())
        .collect::<Vec<String>>()
        .join(" ");
    println!("{}", sentence); // "HELLO WORLD RUST"
}`}</CodeBlock>

        <h3>Iterator 트레이트</h3>
        <p>모든 반복자는 <code>Iterator</code> 트레이트를 구현하며, 핵심 메서드는 <code>next()</code> 하나입니다.</p>

        <CodeBlock>{`fn main() {
    let v = vec![10, 20, 30];
    let mut iter = v.iter();

    println!("{:?}", iter.next()); // Some(10)
    println!("{:?}", iter.next()); // Some(20)
    println!("{:?}", iter.next()); // Some(30)
    println!("{:?}", iter.next()); // None
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>iter()</code>, <code>map()</code>, <code>filter()</code>, <code>collect()</code>를 체인으로 연결할 수 있습니다.</>,
            <>지연 평가의 의미를 이해합니다.</>,
            <><code>fold()</code>로 누적 계산을 수행할 수 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch13-02-iterators.html",
              text: "Rust Book 한국어판 — 13.2 반복자로 일련의 항목 처리하기",
            },
          ]}
        />
      </Module>

      <Callout title="💡 다음 단계로 가기 전에">
        제네릭, Result/?. 클로저, 반복자는 실제 Rust 프로젝트에서 가장 자주 쓰이는 도구들입니다.
        팀 프로젝트 코드에서 이 패턴들을 바로 활용해 보세요.
      </Callout>

      <PageNav prev={{ to: "/step/6" }} next={{ to: "/step/8" }} />
    </Layout>
  );
}
