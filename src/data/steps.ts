export interface StepMeta {
  step: number;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  date: string;
}

export const steps: StepMeta[] = [
  {
    step: 1,
    slug: "intro",
    title: "강의 개요 및 Rust를 배워야 하는 이유",
    desc: "Rust의 탄생 배경, 다른 언어와의 비교, 학습 로드맵을 살펴봅니다.",
    tags: ["개념"],
    date: "4월 7일",
  },
  {
    step: 2,
    slug: "setup",
    title: "개발환경 구축 — Cargo · Toolchain · Debugger",
    desc: "rustup·cargo 설치부터 rust-analyzer, CodeLLDB 디버거까지. 호스트 OS별 가이드 제공.",
    tags: ["macOS", "Linux", "Windows"],
    date: "4월 9일",
  },
  {
    step: 3,
    slug: "basics",
    title: "변수 · 타입 · 제어흐름 · 함수",
    desc: "불변성, 타입 추론, 표현식 vs 구문, cargo test 기초까지 4개 모듈로 학습합니다.",
    tags: ["기초 문법"],
    date: "4월 14일",
  },
  {
    step: 4,
    slug: "ownership",
    title: "Ownership · Borrowing · Lifetime",
    desc: "Rust의 핵심인 소유권·빌림·라이프타임 규칙을 단계적으로 익힙니다.",
    tags: ["핵심 개념"],
    date: "4월 16일",
  },
  {
    step: 5,
    slug: "types",
    title: "Structs · Enums · Pattern Matching · Traits",
    desc: "Rust식 데이터 모델링과 인터페이스 추상화를 4개 모듈로 다룹니다.",
    tags: ["타입 시스템"],
    date: "4월 21일",
  },
  {
    step: 6,
    slug: "project-plan",
    title: "프로젝트 계획 마감",
    desc: "팀 프로젝트 주제·범위·역할 분담을 README.md 형태로 정리합니다.",
    tags: ["팀 프로젝트"],
    date: "4월 23일",
  },
  {
    step: 7,
    slug: "generics",
    title: "Generics · Error Handling · Closures · Iterators",
    desc: "제네릭, Result/?, 클로저, 이터레이터까지 함수형 Rust의 핵심을 다룹니다.",
    tags: ["함수형"],
    date: "4월 28일",
  },
  {
    step: 8,
    slug: "advanced",
    title: "Modules · Smart Pointers · Concurrency · Async",
    desc: "모듈/Crates.io, 스마트 포인터, Fearless Concurrency, async/tokio를 학습합니다.",
    tags: ["고급", "tokio"],
    date: "4월 30일",
  },
  {
    step: 9,
    slug: "project",
    title: "팀별 프로젝트 진행",
    desc: "개발 주간 — 트러블슈팅 가이드와 자주 막히는 지점을 정리했습니다.",
    tags: ["개발 주간"],
    date: "5월 5일",
  },
  {
    step: 10,
    slug: "wrapup",
    title: "발표 · 회고 및 강의 마무리",
    desc: "결과 시연, 회고 보고서 작성, 동료 평가 가이드.",
    tags: ["마무리"],
    date: "5월 7일",
  },
];
