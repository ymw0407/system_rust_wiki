import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { ErrorExplain } from "../components/ErrorExplain";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step4Ownership() {
  return (
    <Layout
      kicker="Step 4 · 4월 16일"
      title="Ownership · Borrowing · Lifetime"
      subtitle="Rust의 핵심 — 소유권, 빌림, 라이프타임을 단계적으로 익힙니다"
    >
      <Lede>
        이 회차를 마치면 Rust의 소유권 규칙 3가지를 자기 말로 설명할 수 있고,
        빌림과 라이프타임이 왜 필요한지 이해하게 됩니다.
        소유권은 Rust를 Rust답게 만드는 핵심 개념입니다.
      </Lede>

      {/* ===== M1 ===== */}
      <Module badge="M1" title="소유권(Ownership)">
        <Lede>모든 값에는 소유자가 하나뿐이고, 소유자가 스코프를 벗어나면 값이 자동으로 해제됩니다.</Lede>

        <p>
          C/C++에서는 프로그래머가 직접 <code>malloc</code>/<code>free</code>를 호출해 메모리를 관리합니다.
          실수로 해제를 빠뜨리면 메모리 누수가 생기고, 이미 해제한 메모리에 접근하면 프로그램이 비정상 종료됩니다.
          Rust는 <strong>소유권(Ownership)</strong> 규칙으로 이 문제를 컴파일 타임에 해결합니다.
          가비지 컬렉터 없이도 메모리 안전을 보장하는 것이 Rust의 가장 큰 특징입니다.
        </p>

        <h3>소유권 규칙 3가지</h3>
        <ol>
          <li>Rust에서 각 값은 <strong>소유자(Owner)</strong>라고 불리는 변수를 가집니다.</li>
          <li>한 번에 하나의 소유자만 존재합니다.</li>
          <li>소유자가 <strong>스코프(Scope)</strong>를 벗어나면 값은 자동으로 버려집니다(<code>drop</code>).</li>
        </ol>

        <h3>스택(Stack) vs 힙(Heap)</h3>
        <p>
          <code>i32</code>, <code>bool</code> 같은 크기가 고정된 타입은 <strong>스택(Stack)</strong>에 저장됩니다.
          스택 데이터는 빠르게 복사할 수 있어서 값을 대입하면 자동으로 복사됩니다.
          반면 <code>String</code>처럼 크기가 가변인 타입은 <strong>힙(Heap)</strong>에 저장됩니다.
          힙 데이터를 대입하면 복사가 아니라 <strong>이동(Move)</strong>이 일어납니다.
        </p>

        <h3>따라하기</h3>
        <p>다음 코드를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>을 실행하세요.</p>
        <CodeBlock>{`fn main() {
    // 스택 타입(i32) — 복사(Copy)
    let x = 5;
    let y = x;  // x의 값이 복사됩니다
    println!("x = {}, y = {}", x, y); // 둘 다 사용 가능

    // 힙 타입(String) — 이동(Move)
    let s1 = String::from("hello");
    let s2 = s1;  // s1의 소유권이 s2로 이동합니다
    // println!("{}", s1); // ← 컴파일 에러! s1은 이미 이동됨
    println!("s2 = {}", s2);

    // 깊은 복사가 필요하면 clone()을 사용합니다
    let s3 = String::from("world");
    let s4 = s3.clone();
    println!("s3 = {}, s4 = {}", s3, s4); // 둘 다 사용 가능
}`}</CodeBlock>

        <p>위 코드에서 <code>let s2 = s1;</code> 이후 <code>s1</code>을 사용하려고 하면 컴파일 에러가 발생합니다. 실제로 주석을 풀어서 확인해 보세요.</p>

        <ErrorExplain
          header="error[E0382]: borrow of moved value"
          code={`error[E0382]: borrow of moved value: \`s1\`
 --> src/main.rs:9:20
  |
7 |     let s1 = String::from("hello");
  |         -- move occurs because \`s1\` has type \`String\`, which does not implement the \`Copy\` trait
8 |     let s2 = s1;
  |              -- value moved here
9 |     println!("{}", s1);
  |                    ^^ value borrowed here after move`}
        >
          <p>
            <strong>해석:</strong> <code>s1</code>의 소유권이 <code>s2</code>로 이동(move)했기 때문에,
            이후 <code>s1</code>을 다시 사용할 수 없습니다. <code>String</code>은 <code>Copy</code> 트레이트를
            구현하지 않으므로 대입은 복사가 아니라 이동입니다. <code>s1.clone()</code>으로 값을 복제하거나,
            참조(<code>&s1</code>)를 빌려주는 식으로 해결합니다.
          </p>
          <p>
            <strong>에러 메시지가 길어 보여도 무서워하지 마세요.</strong> rustc는 거의 항상 문제의 원인과 해결 방법까지 알려줍니다.
          </p>
        </ErrorExplain>

        <h3>함수와 소유권</h3>
        <p>함수에 값을 넘기면 소유권도 함께 이동합니다.</p>
        <CodeBlock>{`fn takes_ownership(s: String) {
    println!("{}", s);
} // 여기서 s가 drop됩니다

fn makes_copy(n: i32) {
    println!("{}", n);
} // i32는 Copy이므로 원래 값에 영향 없음

fn main() {
    let msg = String::from("hello");
    takes_ownership(msg);
    // println!("{}", msg); // 에러! msg의 소유권은 함수로 이동됨

    let num = 42;
    makes_copy(num);
    println!("{}", num); // OK — i32는 Copy 타입
}`}</CodeBlock>

        <Checklist
          items={[
            <>소유권 규칙 3가지를 자기 말로 설명할 수 있습니다.</>,
            <>이동(Move)과 복사(Copy)의 차이를 이해합니다.</>,
            <><code>clone()</code>이 언제 필요한지 알고 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch04-01-what-is-ownership.html", text: "Rust Book 한국어판 — 4.1 소유권이 뭔가요?" },
          ]}
        />
      </Module>

      {/* ===== M2 ===== */}
      <Module badge="M2" title="빌림(Borrowing)과 참조(Reference)">
        <Lede>소유권을 넘기지 않고 값을 사용하는 방법 — 참조로 빌려 쓰기.</Lede>

        <p>
          함수에 값을 넘길 때마다 소유권이 이동하면 불편합니다.
          <strong>참조(Reference)</strong>를 사용하면 소유권을 넘기지 않고 값을 <strong>빌림(Borrowing)</strong>할 수 있습니다.
          <code>&</code> 기호가 참조를 만듭니다.
        </p>

        <h3>불변 참조와 가변 참조</h3>
        <p>참조에는 두 종류가 있습니다.</p>
        <ul>
          <li><strong>불변 참조</strong> <code>&T</code> — 읽기만 가능. 동시에 여러 개 존재할 수 있습니다.</li>
          <li><strong>가변 참조</strong> <code>&mut T</code> — 읽기와 쓰기 모두 가능. 한 번에 하나만 존재할 수 있습니다.</li>
        </ul>

        <h3>배타성 규칙</h3>
        <p>Rust의 <strong>빌림 규칙</strong>은 데이터 레이스를 컴파일 타임에 방지합니다.</p>
        <ul>
          <li>불변 참조 여러 개 — OK</li>
          <li>가변 참조 하나 — OK</li>
          <li>불변 참조 + 가변 참조 동시 — 컴파일 에러</li>
        </ul>

        <h3>따라하기</h3>
        <p>다음 코드로 참조와 빌림의 동작을 확인하세요.</p>
        <CodeBlock>{`fn calculate_length(s: &String) -> usize {
    s.len()
} // s는 참조이므로 drop되지 않습니다

fn add_world(s: &mut String) {
    s.push_str(", world!");
}

fn main() {
    let mut greeting = String::from("hello");

    // 불변 참조로 빌림
    let len = calculate_length(&greeting);
    println!("'{}'의 길이: {}", greeting, len);

    // 가변 참조로 빌림
    add_world(&mut greeting);
    println!("{}", greeting); // "hello, world!"
}`}</CodeBlock>

        <h3>댕글링 참조(Dangling Reference)</h3>
        <p>
          <strong>댕글링 참조</strong>란 이미 해제된 메모리를 가리키는 참조입니다.
          C/C++에서는 이런 참조가 허용되어 심각한 버그를 만들지만,
          Rust 컴파일러는 댕글링 참조를 만들 수 없도록 차단합니다.
        </p>

        <h3>슬라이스(Slice)</h3>
        <p>
          <strong>슬라이스(Slice)</strong>는 컬렉션의 일부를 참조하는 방법입니다.
          <code>&str</code>은 문자열 슬라이스, <code>&[i32]</code>는 정수 배열의 슬라이스입니다.
        </p>
        <CodeBlock>{`fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &byte) in bytes.iter().enumerate() {
        if byte == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let sentence = String::from("hello world");
    let word = first_word(&sentence);
    println!("첫 단어: {}", word); // "hello"
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>&</code>(불변 참조)와 <code>&mut</code>(가변 참조)의 차이를 설명할 수 있습니다.</>,
            <>배타성 규칙(불변 참조 여러 개 OR 가변 참조 하나)을 이해합니다.</>,
            <>슬라이스(<code>&str</code>, <code>&[T]</code>)의 개념을 이해합니다.</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch04-02-references-and-borrowing.html", text: "Rust Book 한국어판 — 4.2 참조와 빌림" },
            { href: "https://doc.rust-kr.org/ch04-03-slices.html", text: "Rust Book 한국어판 — 4.3 슬라이스" },
          ]}
        />
      </Module>

      {/* ===== M3 ===== */}
      <Module badge="M3" title="라이프타임(Lifetime)">
        <Lede>참조가 얼마나 오래 유효한지를 명시하는 방법 — 라이프타임 애노테이션.</Lede>

        <p>
          대부분의 경우 Rust 컴파일러가 참조의 유효 기간을 자동으로 추론합니다.
          하지만 함수가 여러 참조를 받아서 참조를 반환할 때, 컴파일러가 어떤 참조의 유효 기간을 따라야 하는지 모호해질 수 있습니다.
          이때 <strong>라이프타임(Lifetime)</strong> 애노테이션 <code>'a</code>를 사용해 관계를 명시합니다.
        </p>

        <p>
          "라이프타임"은 참조가 유효한 범위를 뜻합니다. "생명주기"라고 번역하기도 하지만,
          Rust 한국어 공식 문서에서는 <strong>라이프타임</strong>으로 표기합니다.
        </p>

        <h3>따라하기</h3>
        <p>다음 함수는 두 문자열 슬라이스 중 더 긴 것을 반환합니다. 라이프타임 애노테이션이 필요합니다.</p>
        <CodeBlock>{`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("더 긴 문자열: {}", result);
    }
    // 주의: string2가 스코프를 벗어났으므로
    // 여기서 result를 사용하면 에러가 날 수 있습니다.
}`}</CodeBlock>

        <p>
          <code>'a</code>는 "x와 y의 라이프타임 중 더 짧은 것"을 의미합니다.
          반환되는 참조는 이 더 짧은 라이프타임 동안만 유효합니다.
        </p>

        <h3>라이프타임 생략(Elision) 규칙</h3>
        <p>자주 나오는 패턴에서는 라이프타임을 생략할 수 있습니다. 컴파일러가 적용하는 규칙 3가지:</p>
        <ol>
          <li>각 참조 매개변수는 고유한 라이프타임을 받습니다.</li>
          <li>입력 라이프타임이 하나뿐이면, 출력 라이프타임도 그것과 같습니다.</li>
          <li>메서드에서 <code>&self</code> 또는 <code>&mut self</code>가 있으면, 출력 라이프타임은 <code>self</code>의 라이프타임과 같습니다.</li>
        </ol>
        <p>대부분의 함수에서 라이프타임을 직접 쓸 일은 드뭅니다. 컴파일러가 요구할 때만 추가하면 됩니다.</p>

        <h3>구조체에서의 라이프타임</h3>
        <p>구조체가 참조를 필드로 가질 때도 라이프타임을 명시해야 합니다.</p>
        <CodeBlock>{`struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = ImportantExcerpt {
        part: first_sentence,
    };
    println!("발췌: {}", excerpt.part);
}`}</CodeBlock>

        <Checklist
          items={[
            <>라이프타임 애노테이션 <code>'a</code>가 왜 필요한지 설명할 수 있습니다.</>,
            <><code>longest</code> 함수의 라이프타임 의미를 이해합니다.</>,
            <>라이프타임 생략 규칙 3가지를 알고 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch10-03-lifetime-syntax.html", text: "Rust Book 한국어판 — 10.3 라이프타임으로 참조 유효성 검증하기" },
          ]}
        />
      </Module>

      {/* ===== 프로젝트 안내 ===== */}
      <Module title="프로젝트 안내">
        <p>
          이번 회차부터 팀 프로젝트를 준비합니다.
          6회차(4월 23일)까지 프로젝트 계획서를 <code>README.md</code> 형태로 작성해야 합니다.
        </p>

        <ul>
          <li><strong>팀 구성</strong>: 3~4명으로 팀을 이룹니다.</li>
          <li><strong>주제 선정</strong>: Rust로 만들 수 있는 CLI 도구, 웹 서버, 파일 처리 유틸리티 등을 고민해 보세요.</li>
          <li><strong>일정</strong>: 6회차 — 계획 발표 / 9회차 — 개발 완료 / 10회차 — 최종 발표 및 회고</li>
        </ul>
      </Module>

      <Callout title="💡 다음 단계로 가기 전에">
        소유권 규칙 3가지를 종이에 직접 써보세요. "모든 값은 소유자가 하나, 동시에 하나, 스코프 끝에서 drop."
        이 세 줄이 Rust 메모리 관리의 전부입니다.
      </Callout>

      <PageNav prev={{ to: "/step/3" }} next={{ to: "/step/5" }} />
    </Layout>
  );
}
