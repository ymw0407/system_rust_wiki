import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step3Basics() {
  return (
    <Layout
      kicker="Step 3 · 4월 14일"
      title="변수 · 타입 · 제어흐름 · 함수"
      subtitle="Rust 기초 문법 4개 모듈 — 불변성부터 cargo test까지"
    >
      <Lede>
        이 회차를 마치면 Rust의 변수 선언, 데이터 타입, 조건·반복문, 함수를 직접 작성할 수 있게 됩니다.
        모든 예제는 <code>cargo run</code>으로 바로 실행할 수 있습니다.
      </Lede>

      {/* ===== M1 ===== */}
      <Module badge="M1" title="🔒 불변성 · mut · const · 섀도잉">
        <Lede>Rust 변수는 기본적으로 값을 바꿀 수 없습니다. 이 규칙 덕분에 버그가 줄어듭니다.</Lede>

        <p>
          대부분의 프로그래밍 언어에서 변수는 자유롭게 값을 바꿀 수 있습니다.
          Rust는 반대입니다. <code>let</code>으로 선언한 변수는 기본적으로 <strong>불변(immutable)</strong>이며,
          값을 바꾸려면 <code>let mut</code>으로 명시해야 합니다.
          이 덕분에 "이 변수는 어디선가 바뀔 수 있나?" 하는 걱정을 하지 않아도 됩니다.
        </p>
        <p>
          <strong>상수(const)</strong>는 <code>let</code>과 비슷해 보이지만, 반드시 타입을 명시해야 하고 컴파일 타임에 값이 확정됩니다.
          프로그램 전체에서 절대 변하지 않는 값(예: 최대 점수, PI 값)에 사용합니다.
          <strong>섀도잉(Shadowing)</strong>은 같은 이름으로 <code>let</code>을 다시 선언하는 것입니다.
          <code>mut</code>와 달리 타입까지 바꿀 수 있다는 점이 다릅니다.
        </p>

        <h3>따라하기</h3>
        <p>아래 코드를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>으로 실행해 보세요.</p>
        <CodeBlock>{`fn main() {
    // 1) 불변 변수 — 값을 바꾸면 컴파일 에러
    let x = 5;
    println!("x = {x}");
    // x = 10;  // ← 주석을 풀면 컴파일 에러!

    // 2) mut — 가변 변수
    let mut y = 10;
    println!("y 변경 전 = {y}");
    y = 20;
    println!("y 변경 후 = {y}");

    // 3) const — 컴파일 타임 상수 (타입 필수, SCREAMING_SNAKE_CASE)
    const MAX_SCORE: u32 = 100;
    println!("최대 점수 = {MAX_SCORE}");

    // 4) 섀도잉 — 같은 이름으로 let을 다시 선언 (타입도 변경 가능)
    let spaces = "   ";           // &str 타입
    let spaces = spaces.len();    // usize 타입으로 변경!
    println!("공백 수 = {spaces}");
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>cargo run</code> 실행 시 <code>x = 5</code>, <code>y 변경 후 = 20</code> 등이 출력되는지 확인</>,
            <><code>x = 10;</code> 주석을 풀었을 때 컴파일 에러가 나는지 확인</>,
            <><code>const</code>에서 타입을 생략하면 에러가 나는지 확인</>,
            <>섀도잉으로 타입이 바뀌는 것과 <code>mut</code>의 차이를 설명할 수 있는지 확인</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch03-01-variables-and-mutability.html", text: "Rust Book 한국어판 — 3.1 변수와 가변성" },
          ]}
        />
      </Module>

      {/* ===== M2 ===== */}
      <Module badge="M2" title="📦 데이터 타입 · 타입 추론 · 튜플 · 배열 · &str vs String">
        <Lede>Rust는 정적 타입 언어이지만, 대부분의 경우 타입을 직접 쓰지 않아도 됩니다.</Lede>

        <p>
          Rust의 타입은 크게 <strong>스칼라(Scalar)</strong> 타입과 <strong>복합(Compound)</strong> 타입으로 나뉩니다.
          스칼라 타입에는 정수(<code>i32</code>, <code>u64</code> 등), 부동소수점(<code>f64</code>),
          불리언(<code>bool</code>), 문자(<code>char</code>)가 있습니다.
        </p>
        <p>
          복합 타입에는 <strong>튜플(Tuple)</strong>과 <strong>배열(Array)</strong>이 있습니다.
          튜플은 서로 다른 타입의 값을 묶을 수 있고, 배열은 같은 타입의 값을 고정 길이로 묶습니다.
          <strong>타입 추론(Type Inference)</strong> 덕분에 대부분 타입을 명시하지 않아도 컴파일러가 알아서 추론합니다.
          다만 여러 타입이 가능해서 모호한 경우에는 직접 타입을 적어 줘야 합니다.
        </p>
        <p>
          문자열에는 <code>&str</code>(문자열 슬라이스)과 <code>String</code>(힙에 할당된 가변 문자열) 두 종류가 있습니다.
          지금은 "리터럴 문자열은 <code>&str</code>, 동적으로 만들면 <code>String</code>"이라고만 기억하세요.
          소유권과 함께 Step 4에서 자세히 다룹니다.
        </p>

        <h3>따라하기</h3>
        <p>튜플과 배열을 사용하는 예제입니다. <code>src/main.rs</code>에 저장하고 실행해 보세요.</p>
        <CodeBlock>{`fn main() {
    // 스칼라 타입
    let age: i32 = 25;
    let pi: f64 = 3.14159;
    let is_rust_fun: bool = true;
    let heart: char = '❤';
    println!("{age}세, pi={pi}, fun={is_rust_fun}, {heart}");

    // 튜플 — 서로 다른 타입을 묶음
    let person: (&str, i32) = ("Alice", 30);
    println!("이름={}, 나이={}", person.0, person.1);

    // 구조 분해(destructuring)
    let (name, score) = ("Bob", 95);
    println!("{name}의 점수는 {score}점");

    // 배열 — 같은 타입, 고정 길이
    let nums: [i32; 5] = [1, 2, 3, 4, 5];
    println!("첫 번째 = {}, 길이 = {}", nums[0], nums.len());

    // 같은 값으로 초기화
    let zeros = [0; 3]; // [0, 0, 0]
    println!("zeros = {:?}", zeros);

    // &str vs String
    let greeting: &str = "안녕하세요";           // 문자열 슬라이스
    let owned: String = String::from("Hello");   // 힙에 할당
    println!("{greeting}, {owned}");
}`}</CodeBlock>

        <Checklist
          items={[
            <>튜플에서 <code>.0</code>, <code>.1</code>로 요소에 접근할 수 있는지 확인</>,
            <>배열의 인덱스가 범위를 벗어나면 어떤 에러가 나는지 직접 테스트</>,
            <><code>&str</code>과 <code>String</code>의 차이를 한 문장으로 말할 수 있는지 확인</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch03-02-data-types.html", text: "Rust Book 한국어판 — 3.2 데이터 타입" },
            { href: "https://doc.rust-kr.org/ch08-02-strings.html", text: "Rust Book 한국어판 — 8.2 스트링" },
          ]}
        />
      </Module>

      {/* ===== M3 ===== */}
      <Module badge="M3" title="🔀 제어흐름 — if · loop · while · for, 표현식 vs 구문">
        <Lede>Rust에서 <code>if</code>는 표현식이므로 값을 반환할 수 있습니다.</Lede>

        <p>
          대부분의 언어에서 <code>if</code>는 문(statement)입니다.
          Rust에서는 <code>if</code>가 <strong>표현식(Expression)</strong>이기 때문에
          {` `}<code>let x = if cond {"{"} 1 {"}"} else {"{"} 2 {"}"};</code>처럼 값을 바로 변수에 담을 수 있습니다.
          이 개념을 이해하면 Rust 코드가 왜 그렇게 생겼는지 자연스럽게 알게 됩니다.
        </p>
        <p>
          <strong>표현식(Expression)</strong>은 값을 만들어 내는 코드이고,
          <strong>구문(Statement)</strong>은 값을 만들지 않는 코드입니다.
          Rust에서 세미콜론(<code>;</code>)을 붙이면 표현식이 구문으로 바뀝니다.
          이것은 함수 반환값에서도 중요한 역할을 합니다(M4에서 다룹니다).
        </p>

        <h3>따라하기</h3>
        <p>조건문과 반복문을 모두 포함한 예제입니다.</p>
        <CodeBlock>{`fn main() {
    // if 표현식 — 값을 반환
    let score = 85;
    let grade = if score >= 90 {
        "A"
    } else if score >= 80 {
        "B"
    } else {
        "C"
    };
    println!("점수={score}, 학점={grade}");

    // loop — break로 값을 반환할 수도 있음
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 5 {
            break counter * 10; // 50을 반환
        }
    };
    println!("loop 결과 = {result}");

    // while
    let mut n = 3;
    while n > 0 {
        println!("카운트다운: {n}");
        n -= 1;
    }
    println!("발사!");

    // for — 가장 자주 사용하는 반복문
    let fruits = ["사과", "바나나", "포도"];
    for fruit in fruits {
        println!("과일: {fruit}");
    }

    // 범위(Range)를 사용한 for
    for i in 1..=3 {
        println!("i = {i}");
    }

    // 표현식 vs 구문
    let a = {
        let x = 3;
        x + 1       // 세미콜론 없음 → 표현식 → 값 4를 반환
    };
    println!("블록 표현식 결과 = {a}");
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>if</code> 표현식의 각 분기가 같은 타입을 반환해야 한다는 것을 이해</>,
            <><code>loop</code>에서 <code>break 값</code>으로 값을 반환하는 패턴을 확인</>,
            <><code>1..5</code>(5 미포함)와 <code>1..=5</code>(5 포함)의 차이를 구분</>,
            <>블록 <code>{"{ }"}</code>의 마지막 표현식(세미콜론 없음)이 값이 되는 규칙을 이해</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch03-05-control-flow.html", text: "Rust Book 한국어판 — 3.5 제어 흐름" },
            { href: "https://doc.rust-kr.org/ch03-03-how-functions-work.html", text: "Rust Book 한국어판 — 3.3 함수" },
          ]}
        />
      </Module>

      {/* ===== M4 ===== */}
      <Module badge="M4" title="🛠 함수 · 반환값 · cargo test 기초">
        <Lede>Rust 함수는 매개변수 타입이 필수이고, 마지막 표현식이 반환값이 됩니다.</Lede>

        <p>
          함수는 <code>fn</code> 키워드로 선언합니다. 매개변수에는 반드시 타입을 명시해야 합니다.
          반환 타입은 <code>-&gt;</code> 뒤에 적으며, 함수 본문의 마지막 표현식이 반환값이 됩니다.
          세미콜론을 붙이면 구문이 되어 <code>()</code>(빈 튜플)을 반환하게 되므로 주의하세요.
        </p>
        <p>
          코드가 의도대로 동작하는지 검증하려면 테스트를 작성합니다.
          Rust는 <code>cargo test</code> 명령 하나로 테스트를 실행할 수 있는 내장 테스트 프레임워크를 제공합니다.
          <code>#[test]</code> 속성을 붙인 함수가 테스트 함수이며,
          <code>assert_eq!</code> 매크로로 기대값과 실제값을 비교합니다.
        </p>

        <h3>따라하기</h3>
        <p>함수와 테스트를 모두 포함한 완전한 예제입니다. <code>src/main.rs</code>에 저장하세요.</p>
        <CodeBlock>{`/// 두 수를 더합니다.
fn add(a: i32, b: i32) -> i32 {
    a + b   // 세미콜론 없음 → 이 값이 반환됨
}

/// 짝수 여부를 판별합니다.
fn is_even(n: i32) -> bool {
    n % 2 == 0
}

/// 1부터 n까지의 합을 구합니다.
fn sum_up_to(n: i32) -> i32 {
    let mut total = 0;
    for i in 1..=n {
        total += i;
    }
    total   // return total; 과 같지만, Rust에서는 이 방식을 선호
}

fn main() {
    println!("3 + 7 = {}", add(3, 7));
    println!("4는 짝수? {}", is_even(4));
    println!("5는 짝수? {}", is_even(5));
    println!("1~100 합 = {}", sum_up_to(100));
}

// ===== 테스트 =====
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
        assert_eq!(add(-1, 1), 0);
    }

    #[test]
    fn test_is_even() {
        assert!(is_even(4));
        assert!(!is_even(7));
    }

    #[test]
    fn test_sum_up_to() {
        assert_eq!(sum_up_to(10), 55);
        assert_eq!(sum_up_to(100), 5050);
    }
}`}</CodeBlock>

        <p>프로그램을 실행합니다.</p>
        <CodeBlock lang="bash">{`cargo run`}</CodeBlock>

        <p>테스트를 실행합니다.</p>
        <CodeBlock lang="bash">{`cargo test`}</CodeBlock>

        <Checklist
          items={[
            <><code>cargo run</code>으로 <code>3 + 7 = 10</code>, <code>1~100 합 = 5050</code>이 출력되는지 확인</>,
            <><code>cargo test</code>로 3개 테스트가 모두 통과하는지 확인</>,
            <><code>add</code> 함수에서 <code>a + b</code> 뒤에 세미콜론을 붙이면 어떤 에러가 나는지 확인</>,
            <><code>#[test]</code>와 <code>assert_eq!</code>의 역할을 설명할 수 있는지 확인</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch03-03-how-functions-work.html", text: "Rust Book 한국어판 — 3.3 함수" },
            { href: "https://doc.rust-kr.org/ch11-01-writing-tests.html", text: "Rust Book 한국어판 — 11.1 테스트 작성하기" },
          ]}
        />
      </Module>

      <Callout title="💡 다음 단계로 가기 전에">
        위 체크리스트가 모두 완료인지 확인하세요. 특히 M4의 <code>cargo test</code>가 통과하는지 꼭 확인하세요.
        막히는 부분이 있으면 같은 모듈을 한 번 더 따라가도 좋습니다.
        다음 Step 4에서는 Rust의 핵심 개념인 소유권(Ownership)을 다룹니다.
      </Callout>

      <PageNav prev={{ to: "/step/2" }} next={{ to: "/step/4" }} />
    </Layout>
  );
}
