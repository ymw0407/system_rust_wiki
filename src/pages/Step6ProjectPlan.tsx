import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step6ProjectPlan() {
  return (
    <Layout
      kicker="Step 6 · 4월 23일"
      title="프로젝트 계획 마감"
      subtitle="팀 프로젝트 주제·범위·역할 분담을 README.md로 정리합니다"
    >
      <Lede>
        이 회차에서는 팀 프로젝트의 계획서를 작성합니다.
        주제 선정, 구현 범위, 역할 분담, 기술 스택을 정리해 GitHub 저장소의 README.md에 커밋하는 것이 목표입니다.
      </Lede>

      {/* ===== 섹션 1: 프로젝트 주제 선정 ===== */}
      <Module title="🎯 프로젝트 주제 선정">
        <p>
          Rust로 만들 수 있는 프로젝트는 다양합니다.
          강의에서 배운 내용을 활용할 수 있는 주제를 선택하세요.
          너무 크지도, 너무 작지도 않은 범위가 좋습니다 — 2주 안에 동작하는 결과물을 만들 수 있어야 합니다.
        </p>

        <h3>추천 주제 예시</h3>
        <ul>
          <li><strong>CLI 도구</strong> — 파일 검색, 텍스트 변환, JSON 파서, 할 일 관리 등</li>
          <li><strong>웹 서버</strong> — actix-web 또는 axum을 사용한 간단한 REST API</li>
          <li><strong>파일 처리</strong> — CSV/로그 분석기, 이미지 리사이저</li>
          <li><strong>시스템 유틸리티</strong> — 디스크 사용량 시각화, 프로세스 모니터</li>
          <li><strong>게임/시뮬레이션</strong> — 터미널 기반 게임, 간단한 시뮬레이션</li>
        </ul>

        <Callout title="💡 주제 선정 팁">
          "내가 평소에 불편했던 것"에서 출발하면 좋습니다.
          외부 크레이트를 적극 활용하되, 핵심 로직은 직접 작성하는 것을 목표로 하세요.
        </Callout>

        <Checklist
          items={[
            <>팀원 전원이 합의한 주제가 정해졌습니다.</>,
            <>2주 안에 동작하는 결과물을 만들 수 있는 범위입니다.</>,
          ]}
        />
      </Module>

      {/* ===== 섹션 2: README.md 작성 가이드 ===== */}
      <Module title="📝 README.md 작성 가이드">
        <p>
          프로젝트 계획서는 GitHub 저장소의 <code>README.md</code> 파일로 작성합니다.
          아래 템플릿을 그대로 복사해서 팀의 내용으로 채우세요.
        </p>

        <h3>README.md 템플릿</h3>
        <p>아래 내용을 프로젝트 루트의 <code>README.md</code>에 저장합니다.</p>

        <CodeBlock lang="markdown">{`# 프로젝트 이름

한 줄로 프로젝트를 설명합니다.

## 개요

프로젝트의 목적과 해결하려는 문제를 2~3문장으로 작성합니다.

## 주요 기능

- [ ] 기능 1: 설명
- [ ] 기능 2: 설명
- [ ] 기능 3: 설명

## 기술 스택

- Rust (edition 2021)
- 외부 크레이트: serde, clap, tokio 등 (사용할 것만 기재)

## 팀원 및 역할

| 이름 | 역할 | 담당 |
|------|------|------|
| 홍길동 | 팀장 | 핵심 로직, 코드 리뷰 |
| 김철수 | 개발 | API 구현 |
| 이영희 | 개발 | CLI 인터페이스 |

## 일정

| 주차 | 목표 |
|------|------|
| 6회차 (4/23) | 계획서 제출 |
| 7~8회차 | 핵심 기능 개발 |
| 9회차 (5/5) | 개발 완료, 테스트 |
| 10회차 (5/7) | 발표 및 회고 |

## 빌드 및 실행

\`\`\`bash
cargo build
cargo run
cargo test
\`\`\``}</CodeBlock>

        <Checklist
          items={[
            <>README.md에 프로젝트 개요, 주요 기능, 기술 스택, 팀원, 일정이 포함되어 있습니다.</>,
            <>GitHub 저장소에 커밋되었습니다.</>,
          ]}
        />
      </Module>

      {/* ===== 섹션 3: cargo new로 프로젝트 시작하기 ===== */}
      <Module title="📦 cargo new로 프로젝트 시작하기">
        <p>
          계획이 정해졌으면 프로젝트 뼈대를 만듭니다.{" "}
          <code>cargo new</code> 명령으로 새 프로젝트를 생성하세요.
        </p>

        <h3>따라하기</h3>
        <p>터미널에서 아래 명령을 실행합니다. <code>my-project</code>를 팀의 프로젝트 이름으로 바꾸세요.</p>

        <CodeBlock lang="bash">{`cargo new my-project
cd my-project`}</CodeBlock>

        <p>외부 크레이트를 사용하려면 <code>Cargo.toml</code>의 <code>[dependencies]</code> 섹션에 추가합니다.</p>

        <CodeBlock lang="toml">{`[dependencies]
serde = { version = "1", features = ["derive"] }
clap = { version = "4", features = ["derive"] }`}</CodeBlock>

        <p>의존성을 추가한 뒤 <code>cargo build</code>를 실행하면 자동으로 다운로드됩니다.</p>

        <p>
          필요한 크레이트를 찾으려면{" "}
          <a href="https://crates.io/" target="_blank" rel="noreferrer">crates.io</a>에서 검색하세요.
          각 크레이트의 API 문서는{" "}
          <a href="https://docs.rs/" target="_blank" rel="noreferrer">docs.rs</a>에서 확인할 수 있습니다.
        </p>

        <Checklist
          items={[
            <><code>cargo new</code>로 프로젝트가 생성되었습니다.</>,
            <><code>cargo build</code>가 에러 없이 완료됩니다.</>,
            <>필요한 외부 크레이트가 <code>Cargo.toml</code>에 추가되었습니다.</>,
          ]}
        />

        <DocsRef
          links={[
            { href: "https://doc.rust-lang.org/cargo/guide/creating-a-new-project.html", text: "Cargo Book — 새 프로젝트 생성" },
            { href: "https://doc.rust-lang.org/cargo/guide/dependencies.html", text: "Cargo Book — 의존성 관리" },
          ]}
        />
      </Module>

      {/* ===== 섹션 4: 일정 및 마일스톤 ===== */}
      <Module title="📅 일정 및 마일스톤">
        <p>남은 강의 일정과 프로젝트 마일스톤을 정리합니다.</p>

        <table>
          <tbody>
            <tr><td><strong>6회차 (4/23)</strong></td><td>프로젝트 계획서 제출 — README.md 완성</td></tr>
            <tr><td><strong>7회차 (4/28)</strong></td><td>Generics, Error Handling 등 고급 문법 학습 — 프로젝트에 적용</td></tr>
            <tr><td><strong>8회차 (4/30)</strong></td><td>Module, Concurrency, Async 학습 — 프로젝트 핵심 기능 개발</td></tr>
            <tr><td><strong>9회차 (5/5)</strong></td><td>개발 완료 — 테스트, 문서화</td></tr>
            <tr><td><strong>10회차 (5/7)</strong></td><td>최종 발표 — 결과 시연, 회고 보고서</td></tr>
          </tbody>
        </table>

        <Callout title="💡 조기에 동작하는 코드를 만드세요">
          완벽한 설계보다 빠르게 동작하는 최소 기능(MVP)을 먼저 만드는 것이 중요합니다.{" "}
          <code>cargo run</code>으로 실행되는 상태를 가능한 빨리 만들고, 그 위에 기능을 추가해 나가세요.
        </Callout>

        <Checklist
          items={[
            <>팀 프로젝트 GitHub 저장소가 생성되었습니다.</>,
            <>README.md에 계획서가 작성되어 커밋되었습니다.</>,
            <>팀원 전원이 저장소를 clone하고 <code>cargo build</code>를 실행할 수 있습니다.</>,
          ]}
        />
      </Module>

      <Callout title="💡 다음 단계로 가기 전에">
        README.md가 GitHub에 커밋되어 있는지, 팀원 모두가 프로젝트를 빌드할 수 있는지 확인하세요.
        다음 회차(Step 7)부터는 프로젝트에 바로 활용할 수 있는 고급 문법을 배웁니다.
      </Callout>

      <PageNav prev={{ to: "/step/5" }} next={{ to: "/step/7" }} />
    </Layout>
  );
}
