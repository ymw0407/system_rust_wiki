import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";
import { CodeTabs } from "../components/CodeTabs";

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

        <h3>🆚 Java/C++은 "기본 가변", Rust는 "기본 불변" — 왜 뒤집었을까?</h3>
        <p>
          Java·C++·Python·JavaScript는 모두 변수를 만들면 기본적으로 값을 바꿀 수 있습니다.
          불변으로 만들고 싶으면 따로 키워드(<code>final</code>, <code>const</code>)를 붙여야 합니다.
          아래 탭을 눌러 세 언어의 차이를 비교해 보세요.
        </p>
        <CodeTabs
          caption="같은 일을 세 언어로: 가변 vs 불변"
          tabs={[
            {
              label: "Java",
              lang: "java",
              code: `// Java — 기본이 가변
int count = 0;
count = 10;             // OK (기본 동작)

final int MAX = 100;    // 불변으로 만들려면 final을 명시
// MAX = 200;           // 컴파일 에러`,
            },
            {
              label: "C++",
              lang: "cpp",
              code: `// C++ — 기본이 가변, const는 '옵트인'
int count = 0;
count = 10;             // OK (기본 동작)

const int MAX = 100;    // 불변으로 만들려면 const를 명시
// MAX = 200;           // 컴파일 에러`,
            },
            {
              label: "Rust",
              lang: "rust",
              code: `// Rust — 기본이 불변, 가변은 '옵트인'
let count = 0;
// count = 10;          // ← 컴파일 에러! cannot assign twice to immutable variable

let mut counter = 0;    // mut를 붙여야 바꿀 수 있음
counter = 10;           // OK`,
            },
          ]}
        />
        <p>
          이 차이가 사소해 보여도 실무 코드에 쌓이면 꽤 큰 효과를 냅니다.
          Java에서 "final로 만들 걸 깜빡한" 변수가 나중에 어딘가에서 수정되는 버그는 흔합니다.
          Rust에서는 거꾸로 "mut를 붙인 변수만" 의심하면 되므로, <strong>코드를 읽을 때 "이 변수는 어디서 바뀔까?" 라는 질문 자체가 필요 없어집니다.</strong>
          기본값을 안전한 쪽으로 뒤집어 놓은, 아주 작지만 중요한 설계 결정입니다.
        </p>

        <h3>let · let mut · const — 셋은 서로 다르다</h3>
        <ul>
          <li><code>let x = 5;</code> — 런타임에 결정되는 값, 이후 변경 불가. 스코프 단위로 관리.</li>
          <li><code>let mut x = 5;</code> — 런타임에 결정되는 값, 이후 변경 가능.</li>
          <li><code>const MAX: u32 = 100;</code> — 컴파일 타임 상수. 타입 필수, 표현식만 허용, 프로그램 전역.
            Java의 <code>static final</code>, C++의 <code>constexpr</code>에 가깝습니다.</li>
        </ul>

        <h3>🧱 const는 언제 쓰는가 — "컴파일 타임에 값이 필요한 자리"</h3>
        <p>
          <code>const</code>를 단순히 "전역 상수"로만 이해하면 반쪽입니다.
          Rust에서 <code>const</code>의 진짜 역할은 <strong>타입 시스템이 컴파일 타임에 숫자를 요구하는 자리</strong>에 값을 공급하는 것입니다.
          아래 네 가지가 가장 자주 만나는 맥락입니다.
        </p>

        <p><strong>① 배열 크기 — <code>[T; N]</code>의 <code>N</code>은 반드시 const</strong></p>
        <CodeBlock>{`const BUFFER_SIZE: usize = 1024;

// 배열의 길이는 컴파일 타임에 확정되어야 한다.
let buffer: [u8; BUFFER_SIZE] = [0; BUFFER_SIZE];

// let n = 1024;
// let buffer: [u8; n] = [0; n];
// ← 에러! "attempt to use a non-constant value in a constant"
//    일반 let 변수(런타임 값)는 배열 크기로 쓸 수 없다.`}</CodeBlock>

        <p>
          이 부분은 처음엔 좀 낯설게 느껴집니다. "왜 배열 길이 하나 정하는 데 const까지 써야 하지?"
          핵심은 Rust에서 <strong>배열의 길이가 <em>값</em>이 아니라 <em>타입의 일부</em></strong>라는 점입니다.
          천천히 세 단계로 풀어봅시다.
        </p>

        <p><strong>1단계 — 길이가 다른 배열은 "서로 다른 타입"이다</strong></p>
        <CodeBlock>{`let a: [i32; 3] = [1, 2, 3];
let b: [i32; 5] = [1, 2, 3, 4, 5];

// a와 b는 '둘 다 i32 배열'이지만 '서로 다른 타입'이다.
// 아래 코드는 컴파일 에러가 난다:
let mut x: [i32; 3] = a;
// x = b;
// ^^^^ expected an array with a fixed size of 3 elements,
//      found one with 5 elements

fn print_three(arr: [i32; 3]) { println!("{:?}", arr); }

print_three(a);   // OK
// print_three(b); // 에러! 3짜리 배열을 요구하는데 5짜리를 넘김`}</CodeBlock>
        <p>
          정리하면 <code>[i32; 3]</code>과 <code>[i32; 5]</code>는 <code>i32</code>와 <code>f64</code>만큼이나 다른 타입입니다.
          "숫자 3"이 타입 이름 안에 박혀 있는 셈이에요.
        </p>

        <p><strong>2단계 — 컴파일러는 변수마다 "필요한 공간의 크기"를 미리 계산해 둬야 한다</strong></p>
        <p>
          Rust 컴파일러가 함수 하나를 기계어로 번역할 때, 각 변수가 차지할 자리를 <em>미리</em> 예약해 둡니다.
          <code>i32</code>는 4바이트, <code>bool</code>은 1바이트, <code>[i32; 3]</code>은 12바이트(4×3), <code>[i32; 5]</code>는 20바이트(4×5) 같은 식입니다.
          이 계산이 끝나야 "이 함수가 실행될 때 얼마만큼의 공간이 필요한지"가 확정되고, 기계어가 만들어질 수 있어요.
        </p>
        <CodeBlock>{`fn main() {
    let x: [i32; 3] = [1, 2, 3];   // 컴파일러: "아, x는 12바이트짜리 칸이 필요하네"
    let y: [i32; 5] = [1; 5];      // "y는 20바이트짜리 칸이 필요하고"
    // ...
}
// 컴파일러가 기계어를 만들 때 이미 "x는 12바이트, y는 20바이트"를 알고 있다.
// 그래서 실행 시작 직후 필요한 공간을 한 번에 확보할 수 있다.`}</CodeBlock>
        <p>
          자 이제 문제를 봅시다. 만약 <code>[u8; n]</code>에서 <code>n</code>이 <em>런타임에 결정되는 값</em>이라면,
          컴파일러는 기계어를 만드는 시점에 이 변수가 몇 바이트짜리인지 <strong>알 방법이 없습니다</strong>.
          "실행해 봐야 아는 크기"는 정의상 컴파일 시점에 결정할 수 없기 때문입니다.
          그래서 Rust는 아예 "배열 길이는 반드시 컴파일 타임에 알 수 있는 값이어야 한다"고 못 박았습니다.
          <code>const</code>, 리터럴 숫자, <code>const fn</code>의 결과 — 모두 컴파일러가 "지금" 계산할 수 있는 값들입니다.
          일반 <code>let</code> 변수는 안 됩니다. 실행되기 전까지는 값을 모르니까요.
        </p>

        <p><strong>3단계 — "런타임에 크기가 정해지는 배열이 필요할 때는?" → <code>Vec&lt;T&gt;</code></strong></p>
        <CodeBlock>{`fn main() {
    // 사용자 입력처럼 실행 중에 결정되는 크기
    let n: usize = read_size_from_user();

    // let buf: [u8; n] = [0; n];   // ← 불가능
    // 대신 Vec을 쓴다 — 길이가 타입에 박혀 있지 않다
    let buf: Vec<u8> = vec![0; n];  // OK — 힙에 n개의 u8을 할당
    println!("크기: {}", buf.len());
}

fn read_size_from_user() -> usize { 1024 }`}</CodeBlock>
        <p>
          <code>Vec&lt;T&gt;</code>에는 길이가 타입에 없습니다. <code>Vec&lt;u8&gt;</code>는 "u8을 몇 개 담든 똑같은 타입"이에요.
          대신 길이 정보를 값 안쪽(힙에 있는 버퍼의 길이 필드)에 담아 두고, 런타임에 검사합니다.
          즉 <strong>"컴파일 타임에 확정된 크기가 필요한가? → 배열 <code>[T; N]</code>. 그렇지 않은가? → <code>Vec&lt;T&gt;</code>."</strong> 가 기본 규칙입니다.
          (<code>Vec</code>의 내부 구조는 Step 4에서 소유권·힙과 함께 더 자세히 다룹니다 — 지금은 "런타임 크기 배열의 대안"이라는 역할만 알아 두면 충분해요.)
        </p>

        <Callout title="💡 Java와의 가장 큰 차이는 여기서 나온다">
          Java에서 <code>new int[n]</code>이 자유롭게 되는 이유는, Java 배열이 <em>항상 힙 객체</em>이고 크기가 객체 헤더의 필드로 들어가 있기 때문입니다.
          즉 Java의 배열은 Rust의 <code>Vec</code>에 훨씬 가까워요.
          Rust의 <code>[T; N]</code>은 오히려 C의 <code>int arr[3];</code> 스타일 — "이 변수 자체가 12바이트짜리 연속 공간"이라는 저수준 개념입니다.
          그래서 Rust는 두 가지를 선명하게 나눠 두었습니다: 고정 크기가 필요하면 배열, 런타임 크기가 필요하면 <code>Vec</code>.
        </Callout>

        <p><strong>② const 제네릭 — 숫자를 타입 매개변수로</strong></p>
        <CodeBlock>{`// 길이가 타입의 일부인 행렬 — N은 컴파일 타임 상수
struct Matrix<const ROWS: usize, const COLS: usize> {
    data: [[f64; COLS]; ROWS],
}

impl<const R: usize, const C: usize> Matrix<R, C> {
    fn new() -> Self {
        Self { data: [[0.0; C]; R] }
    }
    fn shape(&self) -> (usize, usize) { (R, C) }
}

fn main() {
    let m: Matrix<3, 4> = Matrix::new();      // 3x4 — 크기가 타입에 박혀 있다
    let n: Matrix<2, 2> = Matrix::new();      // 2x2 — 다른 타입!

    // 이 덕분에 컴파일러가 잘못된 곱셈을 '타입 에러'로 잡을 수 있다:
    // fn mul<const A: usize, const B: usize, const D: usize>(
    //     x: Matrix<A, B>, y: Matrix<B, D>
    // ) -> Matrix<A, D> { ... }
    // Matrix<3, 4> * Matrix<5, 2> ← 컴파일 에러: B가 안 맞음
}`}</CodeBlock>
        <p>
          <strong>const 제네릭(const generics)</strong>은 Rust 1.51(2021년) 이후 안정화된 기능으로,
          타입 매개변수처럼 <em>숫자를 제네릭 인자로</em> 받을 수 있게 해 줍니다.
          배열 크기, 비트 폭, SIMD 레인 수 같은 것을 타입에 박아서 <strong>"3x4와 5x2는 곱할 수 없다"를 컴파일 타임에 증명</strong>하는 데 쓰입니다.
          C++의 <code>template&lt;std::size_t N&gt;</code>와 거의 같은 역할입니다.
        </p>

        <p><strong>③ <code>const fn</code> — 컴파일 타임에 평가되는 함수</strong></p>
        <CodeBlock>{`// const fn은 const 컨텍스트에서 호출 가능한 함수
const fn square(x: usize) -> usize {
    x * x
}

// const와 배열 크기 양쪽에 쓸 수 있다
const AREA: usize = square(16);         // 컴파일 타임에 256으로 평가
let grid: [u8; square(8)] = [0; square(8)]; // [u8; 64]

// 일반 런타임 값으로도 당연히 호출 가능
fn main() {
    let side = 5;
    println!("{}", square(side));       // 런타임 호출도 OK — 25
}`}</CodeBlock>
        <p>
          핵심은 "<code>const fn</code>으로 선언된 함수만 <code>const</code> 컨텍스트에서 호출할 수 있다"는 점입니다.
          <code>const BUFFER_SIZE: usize = ...</code> 오른쪽, <code>[T; N]</code>의 N 자리, const 제네릭 실인자 자리 등이 const 컨텍스트입니다.
          표준 라이브러리도 <code>u32::from_be_bytes</code>, <code>usize::pow</code>, <code>Option::is_some</code> 같은 상당수 메서드를 <code>const fn</code>으로 제공해서,
          "매직 넘버를 손으로 계산하지 말고 코드로 계산해서 상수로 만들어 두라"는 관용을 장려합니다.
        </p>
        <Callout title="🧠 const fn의 제약 — 순수해야 한다">
          <code>const fn</code> 본문은 결정론적이어야 합니다 — 힙 할당, I/O, 난수, 스레드, 가변 정적 변수 접근 등 "외부 세계를 건드리는 것"은 모두 금지입니다.
          컴파일러가 코드를 직접 평가해야 하기 때문입니다. Rust가 버전이 올라갈 때마다 const fn에서 허용되는 연산이 점점 늘어나고 있어서, 한때 불가능했던 연산이 지금은 되기도 합니다.
        </Callout>

        <p><strong>④ match 패턴, 속성 인자, 배열 반복 등</strong></p>
        <CodeBlock>{`const OK: u32 = 200;
const NOT_FOUND: u32 = 404;

fn classify(status: u32) {
    match status {
        OK        => println!("정상"),   // const를 패턴으로 사용 — 리터럴처럼 동작
        NOT_FOUND => println!("없음"),
        _         => println!("기타 {status}"),
    }
}

// #[repr(align(N))], #[repr(C)] 등 속성의 숫자 인자,
// [0u8; const 수식], 정적 배열 초기화 — 모두 const 컨텍스트다.`}</CodeBlock>

        <h3>🆚 C/C++/Java의 같은 자리에는 무엇이 있는가</h3>
        <CodeTabs
          caption="배열 크기와 컴파일 타임 함수"
          tabs={[
            {
              label: "Java",
              lang: "java",
              code: `// Java — '컴파일 타임 상수'라는 개념이 매우 제한적이다
public static final int BUFFER_SIZE = 1024; // 타입이 primitive/String일 때만 진짜 컴파일 상수

// 배열 크기는 런타임 값도 허용된다 — JVM 힙에 동적으로 할당되므로
byte[] buffer = new byte[BUFFER_SIZE];
int n = readFromConfig();
byte[] dyn = new byte[n];                   // OK — 컴파일 타임 상수가 아니어도 된다

// '컴파일 타임 함수'는 없다. 복잡한 상수가 필요하면
// static 블록에서 초기화하거나, 외부 빌드 스크립트로 생성한다.
static final int AREA;
static { AREA = computeAtClassLoad(); }     // 실행은 클래스 로딩 시점 (런타임)`,
            },
            {
              label: "C++",
              lang: "cpp",
              code: `// C++ — Rust의 const와 가장 가까운 것은 constexpr
constexpr std::size_t BUFFER_SIZE = 1024;

// 스택 배열(C-style)의 크기는 반드시 상수 표현식
std::uint8_t buffer[BUFFER_SIZE] = {};
// int n = read();
// std::uint8_t dyn[n];  // 비표준(VLA). 표준 C++에서는 에러.
// → 런타임 크기는 std::vector<uint8_t>(n)을 쓴다. (Rust의 Vec과 같은 역할)

// 비형식 템플릿 인자(non-type template parameter)
template <std::size_t R, std::size_t C>
struct Matrix { std::array<std::array<double, C>, R> data{}; };
// ↑ Rust const 제네릭과 사실상 같은 기능

// constexpr 함수 — C++11에서 도입, 이후 버전마다 능력이 확장됨
constexpr std::size_t square(std::size_t x) { return x * x; }
constexpr auto AREA = square(16);      // 256 — 컴파일 타임에 계산`,
            },
            {
              label: "Rust",
              lang: "rust",
              code: `// Rust — const가 이 모든 자리에 깔끔하게 맞아떨어진다
const BUFFER_SIZE: usize = 1024;

let buffer: [u8; BUFFER_SIZE] = [0; BUFFER_SIZE];  // 스택 배열
// let n = read();
// let dyn: [u8; n] = ...;  // 에러: 런타임 값은 못 씀
// → Vec::with_capacity(n)을 쓴다

// const 제네릭
struct Matrix<const R: usize, const C: usize> {
    data: [[f64; C]; R],
}

// const fn — C++의 constexpr와 역할이 같다
const fn square(x: usize) -> usize { x * x }
const AREA: usize = square(16);        // 256

// Java와 근본적 차이: Rust/C++은 "컴파일 타임 = 타입 자원"이라는 관점을 공유.
//                    Java는 그냥 런타임에 다 한다.`,
            },
          ]}
        />
        <p>
          요약하면, Java에서 "상수"는 대체로 <em>프로그램이 실행된 후에도 변하지 않는 값</em>이라는 의미이고, JVM은 모든 것을 런타임에 처리합니다.
          Rust와 C++에서 <code>const</code>/<code>constexpr</code>는 한 단계 위의 의미입니다 —
          <strong>컴파일러가 그 자리에 이미 값을 새겨 넣을 수 있는 값</strong>이고, 그래서 배열 크기·타입 매개변수·패턴 같은 <em>타입 시스템의 일부</em>로 쓸 수 있습니다.
          이 구분이 처음엔 번거롭지만, const 제네릭처럼 "타입에 숫자를 박아 놓을 수 있는" 세계가 열리면 런타임 검증이 필요 없는 코드가 많이 나옵니다.
        </p>

        <h3>잠깐 — <code>const</code> vs <code>static</code></h3>
        <p>
          Rust에는 비슷하게 생긴 <code>static</code> 키워드도 있어서 혼동하기 쉽습니다.
          세부는 다루지 않더라도 한 가지만 기억해 두면 됩니다.
        </p>
        <ul>
          <li>
            <code>const</code> — <em>값</em>입니다. 사용하는 모든 자리에 컴파일러가 값을 <em>복사해서 박아 넣습니다</em>.
            메모리 주소가 없고, 따라서 <code>&amp;CONST</code>는 상황에 따라 새 임시값을 가리킵니다.
          </li>
          <li>
            <code>static</code> — 고정된 <em>메모리 위치</em>입니다. 프로그램 전체에서 하나의 주소를 가지며,
            전역적으로 공유해야 하는 데이터(로그 레벨, 캐시, lazy-init되는 싱글턴 등)에 사용합니다.
            수정이 필요하면 <code>static mut</code> (unsafe) 또는 <code>OnceLock</code>/<code>Mutex</code>를 감쌉니다.
          </li>
        </ul>
        <p>
          이름 있는 숫자 하나가 필요하면 <code>const</code>, 주소가 있어야 하거나 초기화 비용이 큰 값이면 <code>static</code>입니다.
          일반적인 강의 예제에서 거의 모든 경우는 <code>const</code>로 충분합니다.
        </p>

        <h3>🔄 섀도잉(Shadowing) — 이름 재활용을 제도화한 기능</h3>
        <p>
          섀도잉은 <em>같은 이름으로 <code>let</code>을 다시 선언</em>하는 것입니다.
          처음 보면 "이거 그냥 <code>mut</code>랑 같은 거 아닌가?" 싶지만, 세 가지 결정적인 차이가 있습니다.
        </p>

        <p><strong>① 타입을 바꿀 수 있다</strong></p>
        <CodeBlock>{`// 가장 흔한 패턴 — 파싱: &str → 숫자
let input = "42";              // &str
let input: u32 = input.parse().unwrap(); // u32 — 같은 이름으로 재선언
println!("{}", input + 1);     // 43

// mut로는 불가능 — 타입이 고정된다
// let mut input = "42";
// input = input.parse().unwrap(); // ← 타입 불일치 에러`}</CodeBlock>
        <p>
          Java에서는 같은 일을 하려면 <code>inputStr</code>과 <code>inputNum</code>처럼 이름을 다르게 지어야 합니다.
          그러면 코드 아래쪽에서 "원본 문자열을 다시 쓸 수 있는 것처럼" 보이는 함정이 생깁니다.
          Rust의 섀도잉은 "<em>이전 이름은 더 이상 이 이름이 아니다</em>"를 컴파일러가 강제하므로 이 함정이 없습니다.
        </p>

        <p><strong>② 결과는 여전히 불변이다</strong></p>
        <CodeBlock>{`let spaces = "   ";              // &str, 불변
let spaces = spaces.len();       // usize, 여전히 불변 — 섀도잉
// spaces = 10;                  // ← 에러! mut가 아니므로 재할당 불가`}</CodeBlock>
        <p>
          <code>mut</code>를 쓰면 "앞으로 계속 바뀔 수 있는 변수"가 되지만, 섀도잉은 "이 지점에서 딱 한 번 새 값으로 교체하고 다시 불변"이라는 의미를 유지합니다.
          즉, 섀도잉은 <strong>가변성을 도입하지 않고도 변환 파이프라인을 표현하는 수단</strong>입니다.
        </p>

        <p><strong>③ 스코프를 벗어나면 원래 값으로 돌아온다</strong></p>
        <CodeBlock>{`fn main() {
    let x = 5;
    println!("바깥 x = {x}");   // 5

    {
        let x = x * 2;            // 내부 스코프에서 섀도잉
        println!("안쪽 x = {x}"); // 10
    }

    println!("다시 바깥 x = {x}"); // 5 — 원본은 그대로
}`}</CodeBlock>
        <p>
          이 동작은 <code>mut</code>로는 흉내낼 수 없습니다. <code>mut x</code>로 수정하면 바깥 스코프에서도 영원히 바뀐 값이 보입니다.
          섀도잉은 "이 블록 안에서만 x를 다른 의미로 쓰고 싶다"는 의도를 타입 시스템에 새길 수 있게 해 줍니다 — 마치 수학에서 "이 증명 블록 안에서만 x를 이렇게 정의한다"고 쓰는 것과 같습니다.
        </p>

        <h3>🆚 Java/C++에서 왜 섀도잉이 불편한가</h3>
        <CodeTabs
          caption="파싱 후 재사용 — 세 언어 비교"
          tabs={[
            {
              label: "Java",
              lang: "java",
              code: `// Java — 같은 이름 재선언 불가. 이름을 다르게 지어야 한다.
String inputStr = "42";
int input = Integer.parseInt(inputStr);
// 이 아래에서 inputStr(문자열)과 input(숫자) 둘 다 보인다.
// inputStr을 실수로 다시 쓰는 버그가 생길 수 있다.
System.out.println(input + 1);`,
            },
            {
              label: "C++",
              lang: "cpp",
              code: `// C++ — 같은 이름 재선언은 블록 스코프에서만 가능하고,
// 같은 스코프 내에서는 에러.
std::string input_str = "42";
int input = std::stoi(input_str);
// 역시 원본 문자열이 살아 있어서 헷갈림의 원천.
std::cout << input + 1;`,
            },
            {
              label: "Rust",
              lang: "rust",
              code: `// Rust — 같은 이름으로 덮어쓰되, 원본은 접근 불가 상태가 된다.
let input = "42";
let input: i32 = input.parse().unwrap();
// 이 아래에서 'input'은 오직 i32. 문자열 버전은 더 이상 존재하지 않는 것처럼 가려진다.
println!("{}", input + 1);`,
            },
          ]}
        />
        <Callout title="💡 mut vs shadowing — 언제 무엇을?">
          <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
            <li><strong>같은 타입을 여러 번 업데이트</strong>(카운터, 누적 합): <code>let mut</code>.</li>
            <li><strong>한 번의 변환 후 다시 불변으로</strong>(파싱, 정규화, 집계 결과): 섀도잉.</li>
            <li><strong>타입이 변환 과정에서 바뀔 때</strong>(<code>String → usize</code>): 섀도잉이 유일한 관용법.</li>
            <li><strong>특정 블록 안에서만 다른 의미로 쓰고 싶을 때</strong>: 내부 스코프 섀도잉.</li>
          </ul>
        </Callout>

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

        <h3>🆚 왜 Rust에는 정수형이 이렇게 많을까?</h3>
        <p>
          Java에서 정수라면 보통 <code>int</code>(32비트 부호 있음), 크면 <code>long</code>(64비트)을 쓰면 끝입니다.
          Rust는 <code>i8, i16, i32, i64, i128, isize</code>와 <code>u8, u16, u32, u64, u128, usize</code>까지 12가지가 있습니다. 왜일까요?
        </p>
        <ul>
          <li>
            <strong>부호 없는 정수(u로 시작)가 일급</strong> — "배열 길이는 음수일 수 없다"는 사실을 타입으로 표현할 수 있습니다.
            Java는 <code>int length</code>를 쓰고 "0 이상이어야 한다"는 제약을 주석과 런타임 체크로 관리합니다.
          </li>
          <li>
            <strong><code>usize</code>/<code>isize</code>는 포인터 폭</strong> — 32비트 시스템에선 32비트, 64비트 시스템에선 64비트가 됩니다.
            인덱스·크기를 다룰 때 사용합니다. C의 <code>size_t</code>와 같은 역할입니다.
          </li>
          <li>
            <strong>오버플로 정책이 명확</strong> — 디버그 빌드에서는 정수 오버플로가 패닉을 일으키고, 릴리즈 빌드에서는 "정의된 래핑(two's complement)"이 됩니다.
            C/C++의 부호 있는 정수 오버플로는 <em>정의되지 않은 동작(UB)</em>으로, 옵티마이저가 "이 코드는 오버플로가 없다고 가정"하고 엉뚱한 최적화를 하기도 합니다. Rust는 이 함정을 제거했습니다.
          </li>
        </ul>

        <h3>🆚 <code>&str</code>과 <code>String</code>: Java의 <code>String</code> 하나로는 왜 부족한가</h3>
        <p>
          Java의 <code>String</code>은 불변이고 항상 힙에 있으며, "뷰(view)"라는 개념이 없습니다.
          부분 문자열을 얻으려면 <code>substring()</code>으로 <em>새 객체</em>를 만들어야 합니다(Java 7u6 이후).
          문자열 리터럴("hello")도 컴파일러가 <code>String</code> 풀에 넣은 전체 객체입니다.
        </p>
        <p>
          Rust는 이 하나의 개념을 두 개로 쪼갭니다 — <em>데이터를 가진 자(<code>String</code>)</em>와 <em>데이터를 빌려본 자(<code>&str</code>)</em>입니다.
        </p>
        <ul>
          <li><code>String</code>: 힙에 데이터를 소유. 수정 가능. Java의 <code>StringBuilder</code>에 가깝습니다.</li>
          <li><code>&str</code>: 기존 버퍼의 일부 구간을 가리키는 뷰(포인터+길이). 할당 없음.
            <code>&s[0..5]</code>처럼 쪼개도 복사가 일어나지 않습니다.</li>
        </ul>
        <p>
          덕분에 함수가 <code>fn greet(name: &str)</code>을 받으면 <code>String</code>, 문자열 리터럴, 다른 <code>&str</code> 모두에서 호출할 수 있고, <strong>복사 없이</strong> 동작합니다.
          Java에서 이 유연성을 얻으려면 <code>CharSequence</code>를 쓰거나 매번 <code>String</code>을 새로 만들어야 합니다.
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

        <h3>🆚 Java의 if와 Rust의 if는 왜 다른가</h3>
        <p>
          Java에서 <code>if</code>는 <em>문(statement)</em>입니다. 값을 만들어 내지 않으므로 <code>String grade = if (...) ...</code> 같은 코드는 컴파일되지 않습니다.
          복잡한 분기가 필요하면 변수를 먼저 선언하고 내부에서 <code>=</code>로 대입하거나, 단순 분기는 삼항 연산자 <code>?:</code>로 처리합니다.
          Rust는 <code>if</code>가 <strong>표현식</strong>이어서 이 제약이 없습니다.
        </p>
        <CodeTabs
          caption="점수로 학점 매기기"
          tabs={[
            {
              label: "Java",
              lang: "java",
              code: `// Java — if는 문이라 값을 반환하지 않는다
String grade;
if (score >= 90)      grade = "A";
else if (score >= 80) grade = "B";
else                  grade = "C";
// 또는 단순할 때만: String grade = (score >= 90) ? "A" : "B";
// 3분기 이상이면 삼항이 지저분해져서 결국 위 패턴으로 돌아간다.`,
            },
            {
              label: "C++",
              lang: "cpp",
              code: `// C++ — Java와 동일하게 if는 문이다
std::string grade;
if      (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else                  grade = "C";
// 또는 단순할 때만: auto grade = (score >= 90) ? "A" : "B";`,
            },
            {
              label: "Rust",
              lang: "rust",
              code: `// Rust — if가 값을 반환하므로 let에 바로 바인딩
let grade = if score >= 90 {
    "A"
} else if score >= 80 {
    let bonus = if extra_credit { "+" } else { "" };
    "B"  // 복잡한 분기 안에서도 마지막 표현식이 값이 됨
} else {
    "C"
};`,
            },
          ]}
        />
        <p>
          이 철학은 <code>match</code>, <code>loop</code>, 블록 <code>{"{}"}</code>까지 일관되게 적용됩니다.
          "거의 모든 것이 값을 가진다"는 방침 덕분에, 변수 선언 후 재할당 패턴이 현저히 줄어들고 자연스럽게 불변 기본값과 맞물립니다.
        </p>

        <h3>🆚 for 루프의 철학 — C/Java의 "인덱스 기반"을 버린 이유</h3>
        <p>
          Rust의 <code>for</code>는 C/Java/C++ 스타일의 <code>for(int i=0; i&lt;n; i++)</code>를 <strong>지원하지 않습니다</strong>.
          대신 이터레이터(<code>1..n</code>, 컬렉션의 <code>.iter()</code>)만 받습니다. 왜 이렇게 했을까요?
        </p>
        <ul>
          <li>
            <strong>버퍼 오버런 제거</strong> — C의 <code>for(int i=0; i&lt;=n; i++)</code>처럼 "off-by-one"으로 배열 범위를 넘는 버그가 원천 차단됩니다.
            이터레이터는 컬렉션의 실제 길이를 알고 있습니다.
          </li>
          <li>
            <strong>최적화 친화적</strong> — <code>1..=1000</code>처럼 범위를 주면 컴파일러가 경계 체크를 제거(bounds-check elimination)하고
            LLVM이 SIMD·루프 언롤링까지 적용합니다. 같은 코드가 C의 포인터 루프와 동일한 어셈블리로 생성됩니다.
          </li>
          <li>
            <strong>`break 값`으로 값 반환</strong> — <code>loop</code>가 값을 반환할 수 있어서,
            Java처럼 "플래그 변수를 만들고 <code>break</code>하고 밖에서 확인"하는 패턴이 필요 없습니다.
          </li>
        </ul>

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
