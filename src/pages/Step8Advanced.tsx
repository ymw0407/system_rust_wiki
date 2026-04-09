import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step8Advanced() {
  return (
    <Layout
      kicker="Step 8 · 4월 30일"
      title="Modules · Smart Pointers · Concurrency · Async"
      subtitle="모듈 시스템부터 비동기 프로그래밍까지, Rust의 고급 기능을 학습합니다"
    >
      <Lede>
        이 회차를 마치면 코드를 모듈로 조직하고, 스마트 포인터를 활용하고,
        스레드와 async/await로 동시성 프로그램을 작성할 수 있게 됩니다.
      </Lede>

      {/* ===== M1 ===== */}
      <Module badge="M1" title="모듈(Module) 시스템과 Cargo">
        <Lede>코드를 논리적 단위로 나누고, 외부 크레이트를 가져다 쓰는 방법입니다.</Lede>

        <p>
          프로젝트가 커지면 모든 코드를 <code>main.rs</code> 하나에 넣을 수 없습니다.
          Rust의 <strong>모듈(Module)</strong> 시스템은 코드를 논리적으로 분리하고,
          <code>pub</code> 키워드로 어떤 것을 외부에 공개할지 결정합니다.
          <strong>크레이트(Crate)</strong>는 Rust의 컴파일 단위이자 패키지입니다.
        </p>

        <h3>따라하기 — 모듈 분리</h3>
        <p>아래와 같은 구조로 코드를 분리할 수 있습니다.</p>

        <CodeBlock lang="bash">{`src/
├── main.rs
└── math.rs`}</CodeBlock>

        <p><code>src/math.rs</code> 파일을 만들고 다음 내용을 저장합니다.</p>

        <CodeBlock>{`// src/math.rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}`}</CodeBlock>

        <p><code>src/main.rs</code>에서 이 모듈을 사용합니다.</p>

        <CodeBlock>{`// src/main.rs
mod math;

fn main() {
    let sum = math::add(3, 5);
    let product = math::multiply(4, 6);
    println!("합: {}, 곱: {}", sum, product);
}`}</CodeBlock>

        <h3>외부 크레이트 사용</h3>
        <p><code>Cargo.toml</code>의 <code>[dependencies]</code>에 크레이트를 추가하면 됩니다.</p>

        <CodeBlock lang="toml">{`[dependencies]
rand = "0.8"`}</CodeBlock>

        <p>
          <code>cargo build</code>를 실행하면{" "}
          <a href="https://crates.io/" target="_blank" rel="noreferrer">crates.io</a>에서
          자동으로 다운로드합니다.
        </p>

        <CodeBlock>{`use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    let n: u32 = rng.gen_range(1..=100);
    println!("랜덤 숫자: {}", n);
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>mod</code>, <code>pub</code>, <code>use</code> 키워드를 사용해 모듈을 분리할 수 있습니다.</>,
            <><code>Cargo.toml</code>에 외부 크레이트를 추가하고 사용할 수 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html",
              text: "Rust Book 한국어판 — 7장 패키지, 크레이트, 모듈",
            },
            {
              href: "https://doc.rust-lang.org/cargo/guide/dependencies.html",
              text: "Cargo Book — 의존성 관리",
            },
          ]}
        />
      </Module>

      {/* ===== M2 ===== */}
      <Module badge="M2" title="스마트 포인터(Smart Pointers)">
        <Lede>힙 할당, 참조 카운팅, 내부 가변성 — 소유권만으로 부족할 때 쓰는 도구들입니다.</Lede>

        <p>
          일반적인 참조(<code>&amp;T</code>)는 데이터를 빌리기만 합니다.
          <strong>스마트 포인터(Smart Pointer)</strong>는 데이터를 소유하면서 추가 기능(참조 카운팅, 내부 가변성 등)을 제공합니다.
        </p>

        <h3>Box&lt;T&gt; — 힙 할당</h3>
        <p>
          <code>Box&lt;T&gt;</code>는 값을 힙에 할당합니다.
          크기를 컴파일 타임에 알 수 없는 재귀 타입이나, 큰 데이터를 스택에 복사하지 않고 이동할 때 유용합니다.
        </p>

        <CodeBlock>{`// 재귀 타입 — Box 없이는 크기를 알 수 없습니다
enum List {
    Cons(i32, Box<List>),
    Nil,
}

fn main() {
    let list = List::Cons(1,
        Box::new(List::Cons(2,
            Box::new(List::Cons(3,
                Box::new(List::Nil))))));
    println!("리스트 생성 완료!");
}`}</CodeBlock>

        <h3>Rc&lt;T&gt; — 참조 카운팅 (단일 스레드)</h3>
        <p>
          <code>Rc&lt;T&gt;</code>는 하나의 값을 여러 소유자가 공유할 수 있게 합니다.
          마지막 소유자가 사라지면 값이 해제됩니다. 단일 스레드에서만 사용 가능합니다.
        </p>

        <h3>Arc&lt;T&gt; — 원자적 참조 카운팅 (멀티 스레드)</h3>
        <p>
          <code>Arc&lt;T&gt;</code>는 <code>Rc&lt;T&gt;</code>의 스레드 안전 버전입니다.
          여러 스레드에서 데이터를 공유해야 할 때 사용합니다. M3에서 다시 다룹니다.
        </p>

        <h3>RefCell&lt;T&gt; — 내부 가변성(Interior Mutability)</h3>
        <p>
          <code>RefCell&lt;T&gt;</code>는 불변 참조를 통해서도 값을 수정할 수 있게 합니다.
          빌림 규칙을 컴파일 타임이 아니라 런타임에 검사합니다.
          규칙 위반 시 <strong>패닉(Panic)</strong>이 발생합니다.
        </p>

        <CodeBlock>{`use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);

    // 불변 참조인데도 내부 값을 수정할 수 있습니다
    data.borrow_mut().push(4);

    println!("{:?}", data.borrow()); // [1, 2, 3, 4]
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>Box&lt;T&gt;</code>가 언제 필요한지(재귀 타입, 힙 할당) 이해합니다.</>,
            <><code>Rc&lt;T&gt;</code>와 <code>Arc&lt;T&gt;</code>의 차이를 알고 있습니다.</>,
            <><code>RefCell&lt;T&gt;</code>의 내부 가변성 개념을 이해합니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch15-00-smart-pointers.html",
              text: "Rust Book 한국어판 — 15장 스마트 포인터",
            },
            {
              href: "https://doc.rust-kr.org/ch15-01-box.html",
              text: "Rust Book 한국어판 — 15.1 Box<T>",
            },
            {
              href: "https://doc.rust-kr.org/ch15-04-rc.html",
              text: "Rust Book 한국어판 — 15.4 Rc<T>",
            },
            {
              href: "https://doc.rust-kr.org/ch15-05-interior-mutability.html",
              text: "Rust Book 한국어판 — 15.5 RefCell<T>와 내부 가변성",
            },
          ]}
        />
      </Module>

      {/* ===== M3 ===== */}
      <Module badge="M3" title="Fearless Concurrency">
        <Lede>Rust의 소유권 시스템 덕분에, 동시성 코드에서 데이터 레이스가 컴파일 타임에 차단됩니다.</Lede>

        <p>
          다른 언어에서 멀티스레드 프로그래밍은 데이터 레이스, 데드락 같은 버그로 악명 높습니다.
          Rust는 <strong>Send</strong>와 <strong>Sync</strong> 트레이트로 스레드 간 데이터 공유 규칙을 컴파일러가 검사합니다.
          이를 <strong>Fearless Concurrency</strong>라고 부릅니다.
        </p>

        <h3>따라하기 — 스레드와 채널</h3>
        <p>다음 코드를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>을 실행하세요.</p>

        <CodeBlock>{`use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    // 채널(Channel) 생성 — 메시지를 보내는 쪽(tx)과 받는 쪽(rx)
    let (tx, rx) = mpsc::channel();

    // 새 스레드에서 메시지를 보냅니다
    thread::spawn(move || {
        let messages = vec!["안녕", "Rust에서", "보냅니다"];
        for msg in messages {
            tx.send(msg).unwrap();
            thread::sleep(Duration::from_millis(300));
        }
    });

    // 메인 스레드에서 메시지를 받습니다
    for received in rx {
        println!("수신: {}", received);
    }
}`}</CodeBlock>

        <h3>Mutex&lt;T&gt; — 공유 상태 보호</h3>
        <p>
          여러 스레드가 같은 데이터를 수정해야 할 때 <code>Mutex&lt;T&gt;</code>를 사용합니다.
          <code>lock()</code>을 호출해야만 내부 데이터에 접근할 수 있습니다.
        </p>

        <CodeBlock>{`use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Arc: 여러 스레드에서 소유권 공유
    // Mutex: 동시 접근 방지
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("최종 카운트: {}", *counter.lock().unwrap()); // 10
}`}</CodeBlock>

        <Checklist
          items={[
            <><code>thread::spawn</code>으로 스레드를 생성할 수 있습니다.</>,
            <>채널(<code>mpsc::channel</code>)로 스레드 간 메시지를 주고받을 수 있습니다.</>,
            <><code>Arc&lt;Mutex&lt;T&gt;&gt;</code> 패턴으로 공유 상태를 보호할 수 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-kr.org/ch16-00-concurrency.html",
              text: "Rust Book 한국어판 — 16장 겁 없는 동시성",
            },
            {
              href: "https://doc.rust-kr.org/ch16-01-threads.html",
              text: "Rust Book 한국어판 — 16.1 스레드",
            },
            {
              href: "https://doc.rust-kr.org/ch16-02-message-passing.html",
              text: "Rust Book 한국어판 — 16.2 메시지 패싱",
            },
            {
              href: "https://doc.rust-kr.org/ch16-03-shared-state.html",
              text: "Rust Book 한국어판 — 16.3 공유 상태 동시성",
            },
          ]}
        />
      </Module>

      {/* ===== M4 ===== */}
      <Module badge="M4" title="async/await와 tokio">
        <Lede>스레드를 직접 만들지 않고도 수천 개의 작업을 동시에 처리하는 비동기 프로그래밍입니다.</Lede>

        <p>
          스레드는 OS 자원을 소비합니다. 수천 개의 네트워크 연결을 동시에 처리해야 하는 웹 서버라면 스레드만으로는 부족합니다.
          <strong>async/await</strong>는 하나의 스레드 위에서 여러 작업을 번갈아 실행하는 방법입니다.
          Rust에서 비동기 런타임으로 가장 많이 쓰이는 것이 <strong>tokio</strong>입니다.
        </p>

        <h3>따라하기 — tokio 설정</h3>
        <p><code>Cargo.toml</code>에 tokio를 추가합니다.</p>

        <CodeBlock lang="toml">{`[dependencies]
tokio = { version = "1", features = ["full"] }`}</CodeBlock>

        <p>다음 코드를 <code>src/main.rs</code>에 저장하고 <code>cargo run</code>을 실행하세요.</p>

        <CodeBlock>{`use tokio::time::{sleep, Duration};

async fn task(name: &str, seconds: u64) {
    println!("{} 시작", name);
    sleep(Duration::from_secs(seconds)).await;
    println!("{} 완료 ({}초 후)", name, seconds);
}

#[tokio::main]
async fn main() {
    println!("비동기 작업을 동시에 실행합니다:");

    // tokio::join!으로 여러 작업을 동시에 실행
    tokio::join!(
        task("작업 A", 2),
        task("작업 B", 1),
        task("작업 C", 3),
    );

    println!("모든 작업 완료!");
}`}</CodeBlock>

        <p>
          세 작업이 동시에 시작되어, 가장 오래 걸리는 작업(3초) 기준으로 전체가 약 3초 만에 끝납니다.
          순차 실행이었다면 2+1+3=6초가 걸렸을 것입니다.
        </p>

        <h3>async fn과 Future</h3>
        <p>
          <code>async fn</code>은 <strong>Future</strong> 트레이트를 구현하는 값을 반환합니다.
          <code>.await</code>를 호출해야 실제로 실행됩니다.
          <code>#[tokio::main]</code> 매크로는 <code>main</code> 함수를 비동기 런타임 위에서 실행하도록 변환합니다.
        </p>

        <Checklist
          items={[
            <>tokio를 <code>Cargo.toml</code>에 추가하고 <code>cargo run</code>으로 비동기 코드를 실행할 수 있습니다.</>,
            <><code>async fn</code>과 <code>.await</code>의 의미를 이해합니다.</>,
            <><code>tokio::join!</code>으로 여러 비동기 작업을 동시에 실행할 수 있습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://doc.rust-lang.org/book/ch17-00-async-await.html",
              text: "Rust Book (영문) — 17장 Async and Await",
            },
            {
              href: "https://tokio.rs/tokio/tutorial",
              text: "tokio 공식 튜토리얼",
            },
          ]}
        />
      </Module>

      <Callout title="💡 다음 단계로 가기 전에">
        이 회차에서 배운 모듈 시스템, 스마트 포인터, 동시성, async는 팀 프로젝트의 구조를 잡는 데 핵심적인 도구입니다.
        다음 회차(Step 9)는 개발 주간입니다 — 배운 내용을 프로젝트에 적용하세요!
      </Callout>

      <PageNav prev={{ to: "/step/7" }} next={{ to: "/step/9" }} />
    </Layout>
  );
}
