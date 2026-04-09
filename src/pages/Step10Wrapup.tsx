import { Layout, Lede } from "../components/Layout";
import { Module } from "../components/Module";
import { DocsRef } from "../components/DocsRef";
import { Checklist } from "../components/Checklist";
import { Callout } from "../components/Callout";
import { PageNav } from "../components/PageNav";
import { CodeBlock } from "../components/CodeBlock";

export function Step10Wrapup() {
  return (
    <Layout
      kicker="Step 10 · 5월 7일"
      title="발표 · 회고 및 강의 마무리"
      subtitle="결과 시연, 회고 보고서 작성, 동료 평가 가이드"
    >
      <Lede>
        마지막 회차입니다. 팀별 프로젝트 결과를 시연하고, 강의 전체를 돌아보며
        회고합니다.
      </Lede>

      {/* ===== 발표 준비 ===== */}
      <Module title="발표 준비">
        <p>
          각 팀은 약 <strong>10분</strong> 동안 프로젝트 결과를 발표합니다.
          슬라이드와 실제 동작 데모를 함께 준비하면 효과적입니다.
        </p>

        <h3>슬라이드 구성 가이드</h3>
        <p>
          아래 순서를 참고하여 슬라이드를 구성합니다. 모든 항목을 포함할 필요는
          없지만, 흐름을 따르면 발표가 자연스러워집니다.
        </p>
        <Checklist
          items={[
            <>
              <strong>문제 정의</strong> — 어떤 문제를 해결하려 했는지
            </>,
            <>
              <strong>설계</strong> — 전체 구조와 주요 모듈 설명
            </>,
            <>
              <strong>주요 코드</strong> — 핵심 로직을 간단히 소개
            </>,
            <>
              <strong>데모</strong> — 실제 동작 시연
            </>,
            <>
              <strong>배운 점</strong> — Rust를 사용하며 느낀 점
            </>,
          ]}
        />

        <h3>데모 준비</h3>
        <p>
          발표 전에 <code>cargo run</code>으로 프로젝트가 정상 동작하는지 반드시
          확인합니다. 네트워크가 필요한 프로젝트라면, 오프라인 환경에서도 시연할
          수 있도록 대비합니다.
        </p>
        <CodeBlock lang="bash">{`# 발표 전 최종 확인
cargo build --release
cargo run --release`}</CodeBlock>
      </Module>

      {/* ===== 회고 보고서 작성 ===== */}
      <Module title="회고 보고서 작성">
        <p>
          프로젝트가 끝나면 팀별로 회고 보고서를 작성합니다. GitHub 저장소에{" "}
          <code>RETROSPECTIVE.md</code> 파일을 커밋합니다. 슬라이드는
          발표용이고, 결과 보고서와 회고는 GitHub에 마크다운 파일로 남깁니다.
        </p>

        <h3>포함할 내용</h3>
        <Checklist
          items={[
            <>
              <strong>잘한 점</strong> — 팀이 효과적으로 수행한 부분
            </>,
            <>
              <strong>아쉬운 점</strong> — 시간이 더 있었다면 개선했을 부분
            </>,
            <>
              <strong>배운 점</strong> — Rust와 팀 협업에서 얻은 교훈
            </>,
            <>
              <strong>개선할 점</strong> — 다음 프로젝트에 적용할 개선 사항
            </>,
          ]}
        />

        <h3>회고 보고서 템플릿</h3>
        <p>
          아래 템플릿을 복사하여 <code>RETROSPECTIVE.md</code>로 저장하세요.
        </p>
        <CodeBlock lang="markdown">{`# 프로젝트 회고

## 팀 정보
- **팀 이름**: (팀 이름)
- **팀원**: (이름 나열)
- **프로젝트 제목**: (프로젝트 제목)

## 잘한 점
- (내용 작성)

## 아쉬운 점
- (내용 작성)

## 배운 점
- (내용 작성)

## 개선할 점
- (내용 작성)

## 기술 스택
- Rust (버전)
- 사용한 크레이트: (나열)`}</CodeBlock>
      </Module>

      {/* ===== 동료 평가 ===== */}
      <Module title="동료 평가">
        <p>
          팀 프로젝트의 일환으로 동료 평가를 실시합니다. 본인을 제외한 팀원에
          대해 평가합니다.
        </p>

        <h3>평가 기준</h3>
        <Checklist
          items={[
            <>
              <strong>기여도</strong> — 코드 작성, 설계, 문서화 등 실질적 기여
            </>,
            <>
              <strong>협업</strong> — 의사소통, 일정 준수, 팀원 지원
            </>,
            <>
              <strong>기술 이해</strong> — Rust 개념의 이해와 적용
            </>,
          ]}
        />

        <h3>공정한 평가를 위한 팁</h3>
        <p>
          평가는 주관적일 수 있으므로, 구체적인 사례를 근거로 작성합니다.
          "열심히 했다"보다는 "소유권 관련 버그를 해결했다"처럼 구체적으로 적으면
          좋습니다. 감정이 아닌 사실에 기반하여 평가합니다.
        </p>
      </Module>

      {/* ===== 이후 학습 경로 ===== */}
      <Module title="이후 학습 경로">
        <p>
          이 강의는 10회차로 마무리되지만, Rust 학습은 여기서 끝이 아닙니다.
          아래 리소스를 활용하면 더 깊이 있는 학습을 이어갈 수 있습니다.
        </p>

        <h3>추천 학습 리소스</h3>
        <Checklist
          items={[
            <>
              <a href="https://rustlings.cool/" target="_blank" rel="noreferrer">
                Rustlings
              </a>{" "}
              — 작은 연습 문제를 풀며 Rust 문법을 익히는 도구입니다
            </>,
            <>
              <a
                href="https://doc.rust-lang.org/rust-by-example/"
                target="_blank"
                rel="noreferrer"
              >
                Rust by Example
              </a>{" "}
              — 예제 중심으로 Rust를 배울 수 있는 공식 자료입니다
            </>,
            <>
              <a href="https://rust-kr.org/" target="_blank" rel="noreferrer">
                한국 러스트 사용자 그룹
              </a>{" "}
              — 한국어로 질문하고 정보를 공유할 수 있는 커뮤니티입니다
            </>,
          ]}
        />

        <h3>추천 프로젝트 아이디어</h3>
        <p>
          강의에서 배운 내용을 바탕으로 개인 프로젝트를 시작해 보세요. 아래는
          난이도별 추천 아이디어입니다.
        </p>
        <Checklist
          items={[
            <>
              <strong>CLI 도구</strong> — 파일 검색, JSON 변환기 등 명령줄
              유틸리티
            </>,
            <>
              <strong>웹 서버</strong> — <code>axum</code> 또는{" "}
              <code>actix-web</code>으로 REST API 구현
            </>,
            <>
              <strong>시스템 모니터</strong> — CPU, 메모리 사용량을 수집하는 도구
            </>,
            <>
              <strong>Wasm 프로젝트</strong> — Rust 코드를 WebAssembly로
              컴파일하여 브라우저에서 실행
            </>,
          ]}
        />

        <DocsRef
          links={[
            {
              href: "https://rustlings.cool/",
              text: "Rustlings — 실습으로 Rust 배우기",
            },
            {
              href: "https://doc.rust-lang.org/rust-by-example/",
              text: "Rust by Example",
            },
            {
              href: "https://rust-kr.org/",
              text: "한국 러스트 사용자 그룹",
            },
          ]}
        />
      </Module>

      <Callout title="🦀 수고하셨습니다!">
        10회차 강의를 모두 마쳤습니다. 수고하셨습니다!
      </Callout>

      <PageNav prev={{ to: "/step/9" }} />
    </Layout>
  );
}
