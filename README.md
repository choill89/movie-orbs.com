# 🔮 Movie Orbs (movie-orbs.com)

`Movie Orbs`는 영화 메타데이터의 다차원적 관계를 3D 입체 공간(Orb) 상에 매핑하고, 사용자에게 인터랙티브한 시각적 탐색 경험을 제공하는 고성능 프론트엔드 데이터 시각화 웹 애플리케이션입니다. 

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

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MovieOrbContainer } from './components/3d/MovieOrbContainer';

export default function MovieStage() {
  const sampleData = [
    { id: 1, title: "Inception", genres: ["Sci-Fi", "Action"], popularity: 85.4 },
    { id: 2, title: "Interstellar", genres: ["Sci-Fi", "Drama"], popularity: 92.1 }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* 영화 데이터 어레이 전송 및 공간 자동 매핑 */}
        <MovieOrbContainer movies={sampleData} speedFactor={1.2}/>
      </Canvas>
    </div>
  );
}

import { create } from 'zustand';

interface MovieStore {
  selectedOrbId: number | null;
  currentGenreFilter: string;
  selectOrb: (id: number) => void;
  setGenreFilter: (genre: string) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  selectedOrbId: null,
  currentGenreFilter: 'All',
  selectOrb: (id) => set({ selectedOrbId: id }),
  setGenreFilter: (genre) => set({ currentGenreFilter: genre }),
}));

# 1. 저장소 복제 및 디렉토리 이동
$git clone [https://github.com/choill89/movie-orbs.com.git$](https://github.com/choill89/movie-orbs.com.git$) cd movie-orbs.com

# 2. 프로덕션 환경 수준의 의존성 라이브러리 검증 및 설치
$ npm ci

# 3. 환경 변수 구성 예시 (.env.local)
$ cat <<EOF > .env.local
NEXT_PUBLIC_TMDB_API_KEY=your_secured_tmdb_api_key_here
NEXT_PUBLIC_APP_ENV=development
EOF

# 4. 개발 서버 구동 (포트 : 3000)
$ npm run dev
# 빌드 스크립트 실행 (Next.js 빌드 및 Three.js 최적화 포함)
$ npm run build

# 최적화된 프로덕션 서버 미리보기 실행


{
  "movie_id": "string (UUID v4 형식)",
  "vector_coordinates": {
    "x": "float32 (범위: -50.0 ~ 50.0)",
    "y": "float32 (범위: -50.0 ~ 50.0)",
    "z": "float32 (범위: -50.0 ~ 50.0)"
  },
  "render_properties": {
    "orb_color": "hex_string",
    "glow_intensity": "float (0.0 ~ 1.0)",
    "scale_factor": "float"
  }
}$ npm run start
