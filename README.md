# 🔮 Movie Orbs (movie-orbs.com)

`Movie Orbs`는 영화 메타데이터의 다차원적 관계를 3D 입체 공간(Orb) 상에 매핑하고, 사용자에게 인터랙티브한 시각적 탐색 경험을 제공하는 고성능 프론트엔드 데이터 시각화 웹 애플리케이션입니다. 
영화 정보를 시각적이고 탐색하기 쉬운 '오브(Orbs)' 형태로 제공합니다. 프로젝트에 대한 상세 정보는 아래의 드롭다운 메뉴를 클릭하여 확인하실 수 있습니다.
---

<details>
<summary>📖 1. 프로젝트 개요 및 아키텍처 (Overview & Architecture)</summary>
<div id="overview" markdown="1">

### **1.1 배경 및 목적**
전형적인 그리드(Grid)나 리스트(List) 형태의 UI는 수많은 영화 데이터 간의 상관관계(장르적 유사성, 발매 시기, 평점 가중치 등)를 직관적으로 전달하는 데 한계가 있습니다. `Movie Orbs`는 영화 데이터를 개별적인 '오브(Sphere)'로 표현하고, 이들 간의 거리를 장르적 유사성 및 추천 가중치 알고리즘을 기반으로 공간 상에 배치하여, 사용자가 데이터의 군집(Cluster)을 직관적으로 인지할 수 있도록 설계되었습니다.

### **1.2 시스템 아키텍처**
본 프로젝트는 데이터 페칭, 클라이언트 상태 동기화, 3D 그래픽스 렌더링 파이프라인이 유기적으로 연결된 단일 페이지 애플리케이션(SPA)입니다.

```text
[ TMDB API / Backend ]
         │ (Axios / 비동기 랩퍼)
         ▼
[ Data Normalizer & Weight Calculator ] ── (정규화 및 3D 좌표 변환 연산)
         │
         ▼
[ Zustand Global State Store ] ────────── (필터링, 검색, 북마크 상태 관리)
         │
         ├──► [ React Next.js DOM Layer ] (상세 모달, UI 레이아웃, SEO)
         │
         └──► [ React Three Fiber (R3F) ]  (WebGL 렌더링 파이프라인)
                   │
                   └──► [ Canvas Shader Material ] (오브 발광 및 물리 쉐이더)


---

### **Movie Orbs란?**
`movie-orbs.com`은 사용자가 영화 데이터를 직관적이고 몰입감 있게 탐색할 수 있도록 돕는 웹 서비스입니다. 기존의 지루한 리스트 형태에서 벗어나, 트렌디한 시각적 요소(Orbs/Spheres)와 인터랙티브한 UI를 통해 새로운 방식의 영화 검색 및 추천 경험을 제공합니다.

* **배포 주소:** [https://movie-orbs.com](https://movie-orbs.com) (예시)
* **주요 타겟:** 독창적인 UI로 영화 트렌드를 파악하고, 개인화된 영화 추천을 받고 싶은 모든 영화 마니아.

</div>
</details>

<details>
<summary>🛠️ 2. 기술 스택 (Tech Stack)</summary>
<div id="tech-stack" markdown="1">

본 프로젝트는 최신 웹 표준 기술과 강력한 프레임워크를 기반으로 구축되었습니다.

| 분류 | 기술 기술 (Tech) | 용도 |
| :--- | :--- | :--- |
| **Frontend** | React.js / Next.js | 컴포넌트 기반 UI 개발 및 SSR/SEO 최적화 |
| **Styling** | Tailwind CSS / Styled-components | 반응형 디자인 및 인터랙티브 스타일링 |
| **Visuals** | Three.js / React Three Fiber (R3F) | 3D Orb 및 시각적 애니메이션 구현 |
| **State** | Zustand / Redux Toolkit | 전역 상태 관리 및 데이터 흐름 제어 |
| **API/Data** | TMDB API / Axios | 영화 메타데이터 인터페이싱 |
| **Deployment**| Vercel / AWS | 프로덕션 환경 배포 및 호스팅 |

</div>
</details>

<details>
<summary>🌟 3. 핵심 기능 (Key Features)</summary>
<div id="features" markdown="1">

* **🔮 인터랙티브 Orb UI:** 최신 인기 영화, 장르별 영화를 회전하고 움직이는 3D 입체 오브 형태로 시각화합니다.
* **🔍 실시간 스마트 검색:** 초성 검색 및 영/한 키워드 매칭을 통해 원하는 영화를 실시간으로 찾아냅니다.
* **🎞️ 상세 정보 모달:** 영화의 예고편, 줄거리, 출연진, 평점 및 리뷰를 한눈에 확인할 수 있는 몰입형 모달을 제공합니다.
* **📌 나만의 컬렉션 (북마크):** 관심 있는 영화 오브를 개인 보관함에 담아두고 언제든 꺼내볼 수 있습니다.
* **🌓 다크/라이트 모드:** 사용자의 시각적 편안함을 위한 반응형 테마 스위칭을 지원합니다.

</div>
</details>

<details>
<summary>🚀 4. 시작 가이드 (Getting Started)</summary>
<div id="getting-started" markdown="1">

로컬 환경에서 프로젝트를 실행하려면 아래 단계를 따르세요.

### **사전 준비 사항 (Prerequisites)**
* Node.js (v18 이상 권장)
* npm 또는 yarn / pnpm
* [TMDB API Key](https://www.themoviedb.org/documentation/api)

### **설치 및 실행 (Installation)**

1. **저장소 클론**
   ```bash
   git clone [https://github.com/choill89/movie-orbs.com.git](https://github.com/choill89/movie-orbs.com.git)
   cd movie-orbs.com
