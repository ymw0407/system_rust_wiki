import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step9Project() {
  return (
    <Layout
      kicker="Step 9 · 5월 5일"
      title="팀별 프로젝트 진행"
      subtitle="개발 주간 — 트러블슈팅 가이드와 자주 막히는 지점을 정리했습니다"
    >
      <Lede>
        이번 회차에는 정규 수업 없이 팀별로 프로젝트를 진행합니다. 개발 중 자주
        만나는 문제와 해결 방법을 정리했으니 참고하세요.
      </Lede>

      {/* ===== 개발 체크리스트 ===== */}
      <Module title="개발 체크리스트">
        <p>
          프로젝트를 본격적으로 시작하기 전에 아래 항목을 먼저 확인합니다.
          사소해 보이지만, 환경이 맞지 않으면 개발 시간보다 디버깅 시간이 더
          길어집니다.
        </p>

        <Checklist
          items={[
            <>
              <code>cargo build</code>가 에러 없이 되는지 확인합니다
            </>,
            <>
              <code>.gitignore</code>에 <code>target/</code> 디렉터리가
              포함되어 있는지 확인합니다
            </>,
            <>
              팀원 모두 같은 Rust 버전인지 <code>rustup show</code>로
              확인합니다
            </>,
            <>
              <code>Cargo.toml</code>의 <code>[dependencies]</code>가 올바른지
              확인합니다
            </>,
          ]}
        />
      </Module>

      {/* ===== 자주 막히는 지점 ===== */}
      <Module title="자주 막히는 지점">
        <p>
          팀 프로젝트를 진행하다 보면 반복적으로 만나는 문제들이 있습니다.
          아래는 가장 흔한 질문과 해결 방법입니다.
        </p>

        <h3>"소유권 때문에 컴파일이 안 돼요"</h3>
        <p>
          값을 여러 곳에서 사용해야 할 때 소유권이 이동되어 컴파일이 실패하는
          경우입니다. 가장 간단한 해결책은 <code>clone()</code>으로 값을
          복사하거나, 참조(<code>&</code>)를 사용하여 빌림으로 전달하는
          것입니다.
        </p>
        <CodeBlock>{`// clone()으로 소유권 문제 해결
let name = String::from("ferris");
let name_copy = name.clone();
println!("{}, {}", name, name_copy);

// 참조(&)로 빌림 사용
fn greet(name: &str) {
    println!("Hello, {}", name);
}`}</CodeBlock>

        <h3>"외부 크레이트가 안 불러와져요"</h3>
        <p>
          <code>Cargo.toml</code>의 <code>[dependencies]</code>에 크레이트를
          추가한 뒤 <code>cargo build</code>를 다시 실행해야 합니다. 크레이트
          이름과 버전이 정확한지{" "}
          <a href="https://crates.io" target="_blank" rel="noreferrer">
            crates.io
          </a>
          에서 확인하세요.
        </p>

        <h3>"borrow checker가 너무 엄격해요"</h3>
        <p>
          하나의 값을 여러 곳에서 가변으로 접근해야 할 때 borrow checker가 막는
          경우가 있습니다. 이럴 때는 <code>Rc&lt;RefCell&lt;T&gt;&gt;</code>{" "}
          패턴을 고려합니다. 이 패턴은 런타임에 빌림 규칙을 검사하므로, 꼭
          필요한 경우에만 사용하세요.
        </p>
        <CodeBlock>{`use std::cell::RefCell;
use std::rc::Rc;

let shared = Rc::new(RefCell::new(vec![1, 2, 3]));
let clone1 = Rc::clone(&shared);
clone1.borrow_mut().push(4);`}</CodeBlock>

        <h3>"async 함수에서 에러가 나요"</h3>
        <p>
          비동기 함수를 사용하려면 비동기 런타임이 필요합니다.{" "}
          <code>tokio</code>를 사용하는 경우 <code>main</code> 함수에{" "}
          <code>#[tokio::main]</code> 매크로를 붙여야 합니다.
        </p>
        <CodeBlock>{`#[tokio::main]
async fn main() {
    // 비동기 코드 작성
}`}</CodeBlock>
      </Module>

      {/* ===== Git 협업 가이드 ===== */}
      <Module title="Git 협업 가이드">
        <p>
          팀 프로젝트에서 Git을 효과적으로 사용하는 방법을 정리합니다. 코드
          충돌을 줄이고, 작업 이력을 깔끔하게 관리하는 것이 목표입니다.
        </p>

        <h3>브랜치 전략</h3>
        <p>
          각 기능은 <strong>feature branch</strong>에서 개발하고, 완성되면{" "}
          <code>main</code> 브랜치에 병합(merge)합니다. 브랜치 이름은{" "}
          <code>feature/기능이름</code> 형태로 짓는 것이 일반적입니다.
        </p>
        <CodeBlock lang="bash">{`# 새 브랜치 생성 및 이동
git checkout -b feature/user-auth

# 작업 완료 후 main에 병합
git checkout main
git merge feature/user-auth`}</CodeBlock>

        <h3>충돌 해결</h3>
        <p>
          같은 파일의 같은 부분을 여러 사람이 수정하면 충돌이 발생합니다. 충돌이
          나면 해당 파일을 열어 <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>와{" "}
          <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> 사이의 내용을 직접 수정한 뒤{" "}
          <code>git add</code>와 <code>git commit</code>으로 해결합니다.
        </p>

        <h3>커밋 메시지 컨벤션</h3>
        <p>
          커밋 메시지는 "무엇을 왜 했는지" 명확하게 적습니다. 팀 내에서 일관된
          형식을 정하면 이력 추적이 훨씬 수월합니다.
        </p>
        <CodeBlock lang="bash">{`feat: 사용자 인증 기능 추가
fix: 로그인 시 패닉 발생 수정
docs: README에 실행 방법 추가
refactor: DB 모듈 구조 개선`}</CodeBlock>
      </Module>

      {/* ===== Cargo 워크스페이스 ===== */}
      <Module title="Cargo 워크스페이스">
        <p>
          프로젝트가 커지면 하나의 크레이트로 모든 코드를 관리하기 어려워집니다.{" "}
          <strong>Cargo 워크스페이스(Workspace)</strong>를 사용하면 여러
          크레이트를 하나의 프로젝트 안에서 함께 관리할 수 있습니다.
        </p>

        <h3>워크스페이스 구조 예시</h3>
        <CodeBlock lang="bash">{`my-project/
├── Cargo.toml          # 워크스페이스 루트
├── app/
│   ├── Cargo.toml
│   └── src/
│       └── main.rs
└── core-lib/
    ├── Cargo.toml
    └── src/
        └── lib.rs`}</CodeBlock>

        <h3>워크스페이스 루트 Cargo.toml</h3>
        <CodeBlock lang="toml">{`[workspace]
members = [
    "app",
    "core-lib",
]`}</CodeBlock>
        <p>
          워크스페이스 안의 크레이트들은 <code>cargo build</code> 한 번으로 모두
          빌드되고, <code>target/</code> 디렉터리도 공유하므로 빌드 시간이
          절약됩니다.
        </p>

        <DocsRef
          links={[
            {
              href: "https://doc.rust-lang.org/cargo/reference/workspaces.html",
              text: "Cargo Book — 워크스페이스",
            },
            {
              href: "https://rustlings.cool/",
              text: "Rustlings — 실습으로 Rust 배우기",
            },
          ]}
        />
      </Module>

      <Callout title="💡 다음 회차 안내">
        다음 회차(10회차)에서 발표가 있습니다. 발표 준비도 병행하세요!
      </Callout>

      <PageNav prev={{ to: "/step/8" }} next={{ to: "/step/10" }} />
    </Layout>
  );
}
