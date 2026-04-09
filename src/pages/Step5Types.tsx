import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step5Types() {
  return (
    <Layout
      kicker="Step 5 · 4월 21일"
      title="Structs · Enums · Pattern Matching · Traits"
      subtitle="Rust의 데이터 모델링과 인터페이스 추상화를 4개 모듈로 익힙니다"
    >
      <Lede>
        이 회차를 마치면 구조체와 열거형으로 데이터를 모델링하고,
        패턴 매칭으로 분기하고, 트레이트로 공통 행동을 추상화할 수 있게 됩니다.
      </Lede>

      {/* ===== M1: 구조체(Struct) ===== */}
      <Module badge="M1" title="구조체(Struct)">
        <Lede>여러 값을 하나의 이름 아래 묶어 의미 있는 데이터 단위를 만드는 방법을 배웁니다.</Lede>

        <p>
          프로그램이 커지면 관련 있는 값들을 하나로 묶어야 할 때가 옵니다.
          예를 들어 사용자 정보를 다룰 때 이름, 이메일, 활성 상태를 따로따로 변수로 관리하면 실수가 잦아집니다.
          <strong>구조체(Struct)</strong>는 이런 값들을 하나의 타입으로 묶어주는 Rust의 기본 데이터 구조입니다.
        </p>

        <h3>구조체 정의와 필드</h3>
        <p>
          <code>struct</code> 키워드 뒤에 이름을 쓰고, 중괄호 안에 필드 이름과 타입을 나열합니다.
        </p>
        <CodeBlock>{`struct User {
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}`}</CodeBlock>

        <h3>impl 블록: 메서드와 연관 함수</h3>
        <p>
          <strong>메서드(Method)</strong>는 구조체 인스턴스에 점(<code>.</code>)을 찍어 호출하는 함수입니다.
          첫 번째 매개변수가 <code>&self</code>(또는 <code>&mut self</code>, <code>self</code>)입니다.
          <strong>연관 함수(Associated Function)</strong>는 <code>self</code>를 받지 않고{" "}
          <code>타입이름::함수이름()</code> 형태로 호출합니다. 대표적인 예가 <code>Self::new</code> 패턴입니다.
        </p>

        <h3>구조체 갱신 문법</h3>
        <p>
          기존 인스턴스의 값을 대부분 유지하면서 일부만 바꿀 때 <code>..other</code> 문법을 사용합니다.
        </p>

        <h3>따라하기</h3>
        <p>
          아래 코드 전체를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>을 실행하세요.
          이 예제는 <code>cargo run</code>만으로 바로 실행할 수 있는 완전한 프로그램입니다.
        </p>
        <CodeBlock>{`struct User {
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}

impl User {
    // 연관 함수 — Self::new 패턴
    fn new(username: &str, email: &str) -> Self {
        Self {
            username: username.to_string(),
            email: email.to_string(),
            active: true,
            sign_in_count: 0,
        }
    }

    // 메서드 — &self를 받으므로 인스턴스에 점(.)을 찍어 호출
    fn summary(&self) -> String {
        format!("{} <{}> (로그인 {}회)", self.username, self.email, self.sign_in_count)
    }

    // &mut self를 받아 내부 상태를 변경하는 메서드
    fn login(&mut self) {
        self.sign_in_count += 1;
    }
}

fn main() {
    let mut user1 = User::new("ferris", "ferris@example.com");
    user1.login();
    user1.login();
    println!("user1: {}", user1.summary());

    // 구조체 갱신 문법 — user1의 나머지 필드를 재사용
    let user2 = User {
        username: String::from("crab"),
        ..user1
    };
    println!("user2: {}", user2.summary());
}`}</CodeBlock>
        <CodeBlock lang="bash">{`cargo run`}</CodeBlock>

        <Checklist
          items={[
            <><code>struct</code>로 필드를 가진 타입을 정의할 수 있다</>,
            <><code>impl</code> 블록 안에서 메서드(<code>&self</code>)와 연관 함수(<code>Self::new</code>)를 구분할 수 있다</>,
            <><code>..other</code> 갱신 문법으로 기존 인스턴스를 재활용할 수 있다</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch05-00-structs.html", text: "Rust Book 한국어판 — 5장 구조체" },
            { href: "https://doc.rust-kr.org/ch05-03-method-syntax.html", text: "Rust Book 한국어판 — 5.3 메서드 문법" },
          ]}
        />
      </Module>

      {/* ===== M2: 열거형(Enum)과 Option<T> ===== */}
      <Module badge="M2" title="열거형(Enum)과 Option<T>">
        <Lede>하나의 타입이 여러 가지 형태를 가질 수 있도록 열거형을 정의하고, null 없는 안전한 설계를 배웁니다.</Lede>

        <p>
          구조체가 "여러 필드를 하나로 묶는" 것이라면,{" "}
          <strong>열거형(Enum)</strong>은 "여러 가능한 형태 중 하나를 선택하는" 타입입니다.
          각 <strong>배리언트(Variant)</strong>에는 데이터를 첨부할 수 있어서,
          C 스타일의 단순 열거형보다 훨씬 표현력이 뛰어납니다.
        </p>

        <h3>열거형 정의</h3>
        <CodeBlock>{`enum Shape {
    Circle(f64),           // 반지름
    Rectangle(f64, f64),   // 가로, 세로
    Triangle { base: f64, height: f64 },  // 이름 있는 필드도 가능
}`}</CodeBlock>

        <h3>Option&lt;T&gt; — null 없는 설계 철학</h3>
        <p>
          Rust에는 <code>null</code>이 없습니다.
          대신 표준 라이브러리의 <strong>Option&lt;T&gt;</strong> 열거형이 "값이 있을 수도 없을 수도 있음"을 표현합니다.
        </p>
        <CodeBlock>{`enum Option<T> {
    Some(T),
    None,
}`}</CodeBlock>
        <p>
          <code>Some(T)</code>는 값이 있는 경우, <code>None</code>은 값이 없는 경우입니다.
          컴파일러가 <code>None</code> 케이스를 반드시 처리하도록 강제하기 때문에,
          다른 언어에서 흔한 "null 참조 에러"가 원천적으로 차단됩니다.
        </p>

        <h3>따라하기</h3>
        <CodeBlock>{`fn find_user(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("ferris"))
    } else {
        None
    }
}

fn main() {
    let result = find_user(1);
    match result {
        Some(name) => println!("찾았습니다: {}", name),
        None       => println!("사용자를 찾을 수 없습니다"),
    }

    let missing = find_user(99);
    // unwrap_or: None이면 기본값을 사용
    let name = missing.unwrap_or(String::from("익명"));
    println!("결과: {}", name);
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>enum</code>의 각 배리언트에 서로 다른 데이터를 첨부할 수 있다</>,
            <><code>Option&lt;T&gt;</code>가 <code>Some(T)</code>과 <code>None</code>으로 구성된다는 것을 이해했다</>,
            <>Rust에 <code>null</code>이 없는 이유를 설명할 수 있다</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch06-01-defining-an-enum.html", text: "Rust Book 한국어판 — 6.1 열거형 정의하기" },
          ]}
        />
      </Module>

      {/* ===== M3: 패턴 매칭(Pattern Matching) ===== */}
      <Module badge="M3" title="패턴 매칭(Pattern Matching)">
        <Lede>match 표현식으로 열거형의 모든 경우를 빠짐없이 처리하고, if let으로 간결하게 분기합니다.</Lede>

        <p>
          열거형을 정의했으면 각 배리언트별로 다른 동작을 수행해야 합니다.{" "}
          <strong>패턴 매칭(Pattern Matching)</strong>은 값의 구조를 분해하면서 동시에 분기하는 Rust의 핵심 제어 흐름입니다.
        </p>

        <h3>match — 완전 검사(Exhaustiveness)</h3>
        <p>
          <code>match</code> 표현식은 가능한 모든 경우를 처리해야 합니다.
          하나라도 빠뜨리면 컴파일러가 에러를 발생시킵니다.
          이 성질을 <strong>완전 검사(Exhaustiveness)</strong>라고 합니다.
        </p>

        <h3>if let / while let — 간단한 분기</h3>
        <p>
          하나의 패턴만 검사하고 나머지는 무시할 때는 <code>if let</code>이 편리합니다.{" "}
          <code>while let</code>은 패턴이 매칭되는 동안 반복합니다.
        </p>

        <h3>구조 분해(Destructuring)</h3>
        <p>
          <strong>구조 분해(Destructuring)</strong>는 구조체, 열거형, 튜플 등의 내부 값을 꺼내어 변수에 바인딩하는 기법입니다.{" "}
          <code>match</code> 팔(arm) 안에서 자연스럽게 사용됩니다.
        </p>

        <h3>따라하기</h3>
        <CodeBlock>{`enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}

fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(r)          => std::f64::consts::PI * r * r,
        Shape::Rectangle(w, h)    => w * h,
    }
}

fn main() {
    let shapes = vec![
        Shape::Circle(3.0),
        Shape::Rectangle(4.0, 5.0),
        Shape::Circle(1.5),
    ];

    for s in &shapes {
        println!("넓이: {:.2}", area(s));
    }

    // if let — Circle일 때만 반지름 출력
    let my_shape = Shape::Circle(2.5);
    if let Shape::Circle(radius) = &my_shape {
        println!("원의 반지름: {}", radius);
    }

    // 구조 분해 — 튜플
    let (x, y) = (10, 20);
    println!("x={}, y={}", x, y);
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>match</code>가 모든 경우를 처리해야 한다는 완전 검사를 이해했다</>,
            <><code>if let</code>으로 하나의 패턴만 간결하게 검사할 수 있다</>,
            <>구조 분해로 열거형이나 튜플의 내부 값을 꺼낼 수 있다</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch06-02-match.html", text: "Rust Book 한국어판 — 6.2 match 제어 흐름" },
            { href: "https://doc.rust-kr.org/ch06-03-if-let.html", text: "Rust Book 한국어판 — 6.3 if let을 사용한 간결한 제어 흐름" },
            { href: "https://doc.rust-kr.org/ch18-00-patterns.html", text: "Rust Book 한국어판 — 18장 패턴과 매칭" },
          ]}
        />
      </Module>

      {/* ===== M4: 트레이트(Trait) ===== */}
      <Module badge="M4" title="트레이트(Trait)">
        <Lede>트레이트로 공통 행동을 정의하고, 서로 다른 타입이 같은 인터페이스를 공유하도록 만듭니다.</Lede>

        <p>
          구조체와 열거형이 "데이터를 어떻게 구성할까"에 대한 답이라면,{" "}
          <strong>트레이트(Trait)</strong>는 "타입이 어떤 행동을 할 수 있는가"를 정의하는 도구입니다.
          다른 언어의 인터페이스(interface)와 비슷하지만,
          기본 구현을 제공할 수 있고, 기존 타입에도 트레이트를 구현할 수 있다는 점이 다릅니다.
        </p>

        <h3>트레이트 정의와 구현</h3>
        <p>
          <code>trait</code> 키워드로 메서드 시그니처를 선언합니다.
          각 타입은 <code>impl 트레이트 for 타입</code> 블록에서 메서드를 구현합니다.
        </p>

        <h3>기본 구현(Default Implementation)</h3>
        <p>
          <strong>기본 구현(Default Implementation)</strong>은 트레이트 정의 안에서 메서드 본문을 미리 작성하는 것입니다.
          구현 타입이 해당 메서드를 재정의하지 않으면 기본 구현이 사용됩니다.
        </p>

        <h3>트레이트 객체(dyn Trait) — 동적 디스패치</h3>
        <p>
          <strong>트레이트 객체(dyn Trait)</strong>를 사용하면
          서로 다른 타입의 값을 하나의 컬렉션에 담거나, 함수의 반환 타입을 추상화할 수 있습니다.
          이때 메서드 호출은 런타임에 결정되며, 이를 <strong>동적 디스패치(Dynamic Dispatch)</strong>라고 합니다.
        </p>

        <h3>따라하기</h3>
        <CodeBlock>{`trait Animal {
    fn name(&self) -> &str;
    fn sound(&self) -> &str;

    // 기본 구현 — 재정의하지 않으면 이 버전이 사용됨
    fn introduce(&self) -> String {
        format!("저는 {}이고, {}라고 울어요.", self.name(), self.sound())
    }
}

struct Dog {
    name: String,
}

impl Animal for Dog {
    fn name(&self) -> &str {
        &self.name
    }
    fn sound(&self) -> &str {
        "멍멍"
    }
}

struct Cat {
    name: String,
}

impl Animal for Cat {
    fn name(&self) -> &str {
        &self.name
    }
    fn sound(&self) -> &str {
        "야옹"
    }
    // introduce()는 기본 구현을 그대로 사용
}

// 트레이트 객체(dyn Trait)를 사용한 동적 디스패치
fn print_all(animals: &[&dyn Animal]) {
    for animal in animals {
        println!("{}", animal.introduce());
    }
}

fn main() {
    let dog = Dog { name: String::from("바둑이") };
    let cat = Cat { name: String::from("나비") };

    // 트레이트 객체로 서로 다른 타입을 하나의 슬라이스에 담기
    let animals: Vec<&dyn Animal> = vec![&dog, &cat];
    print_all(&animals);
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>trait</code>로 공통 메서드 시그니처를 정의할 수 있다</>,
            <>기본 구현이 무엇인지 이해하고, 필요할 때 재정의할 수 있다</>,
            <><code>dyn Trait</code>를 사용하여 서로 다른 타입을 하나의 컬렉션에 담을 수 있다</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-kr.org/ch10-02-traits.html", text: "Rust Book 한국어판 — 10.2 트레이트: 공유 행위를 정의하기" },
            { href: "https://doc.rust-kr.org/ch17-02-trait-objects.html", text: "Rust Book 한국어판 — 17.2 트레이트 객체를 사용하여 다른 타입의 값 허용하기" },
          ]}
        />
      </Module>

      <Callout title="💡 다음 단계로 가기 전에">
        구조체로 데이터를 묶고, 열거형으로 여러 형태를 표현하고, match로 빠짐없이 처리하고,
        트레이트로 공통 행동을 추상화하는 흐름이 자연스럽게 느껴진다면 충분합니다.
        다음 Step 6에서는 팀 프로젝트 계획서를 작성합니다.
      </Callout>

      <PageNav prev={{ to: "/step/4" }} next={{ to: "/step/6" }} />
    </Layout>
  );
}
