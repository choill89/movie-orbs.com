// ==========================================
// Movie Orbs - 핵심 비즈니스 로직 및 렌더링
// ==========================================

// --- 1. 영화 데이터베이스 (Mock DB) ---
const MOVIES = [
  {
    id: "parasite",
    title: "기생충",
    director: "봉준호",
    year: "2019",
    genre: ["드라마", "블랙코미디", "사회물"],
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=400", // 영화관 톤 이미지
    plot: "전원 백수로 살 길 막막하지만 금슬은 좋은 기택 가족. 장남 기우가 고액 과외 면접을 위해 박사장 가저택에 발을 들이며, 걷잡을 수 없는 두 가족의 충돌이 시작된다.",
    questions: [
      "기택의 아들 기우가 박사장네 면접을 갈 때 위조한 대학 재학증명서를 쥐고 '아버지, 저는 이게 범죄라고 생각하지 않아요'라고 말합니다. 생존을 위한 기만행위는 어디까지 용인될 수 있을까요?",
      "영화 중반부, 폭우로 기택네 반지하 집은 완전히 침수되는 와중에 박사장 집은 미세먼지가 씻겨나갔다며 파티를 엽니다. 이 대비를 보며 두 가족 중 어느 쪽에 더 마음이 움직이셨나요?",
      "마지막 기택이 박사장을 충동적으로 찌른 행동의 근원적 원인은 무엇일까요? 개인의 인성 결함일까요, 아니면 무의식적인 계급적 모멸감 때문일까요?"
    ]
  },
  {
    id: "joker",
    title: "조커",
    director: "토드 필립스",
    year: "2019",
    genre: ["스릴러", "드라마", "심리물"],
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=400",
    plot: "고담시에서 광대로 일하며 코미디언을 꿈꾸는 아서 플렉. 하지만 복지 예산 삭감으로 치료약을 끊고 사회적 냉대와 폭력 속에 고립되며, 서서히 광기의 화신 '조커'로 각성해 나간다.",
    questions: [
      "아서 플렉이 조커로 타락해가는 과정에서 그에게 가장 큰 파동을 준 사회적 시스템이나 타인의 냉대 중 기억에 남는 것은 무엇인가요?",
      "아서의 살인과 폭동 유발 행위는 명백한 악행입니다. 그러나 영화는 그를 가해자이자 동시에 '피해자'로 그리는데, 그의 폭력성은 개인의 책임일까요, 고담시라는 구조의 문제일까요?",
      "영화 결말에서 조커 마스크를 쓴 군중들이 고담시를 불태우며 그를 영웅시하는 광경을 보며 어떤 심정적 불편함이나 쾌감을 느끼셨나요?"
    ]
  },
  {
    id: "interstellar",
    title: "인터스텔라",
    director: "크리스토퍼 놀란",
    year: "2014",
    genre: ["SF", "어드벤처", "인문학"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
    plot: "황폐화된 지구의 종말을 막기 위해 시공간의 틈새를 찾아 우주로 떠나는 탐험가들. 시공을 초월해 딸 머피를 구하려는 아버지 쿠퍼의 사투와 위대한 인류의 생존 의지가 그려진다.",
    questions: [
      "쿠퍼가 어린 머피를 남겨두고 인류 구원이라는 명목 하에 우주선에 탑승할 때, 당신은 대의(인류 생존)와 소의(가족에 대한 책임) 중 무엇이 더 높은 가치라고 생각하나요?",
      "브랜드 박사가 플랜 A가 불가능하다는 진실을 숨겨 탐험대를 속인 행위는 인류 보존을 위한 불가피한 거짓말이었을까요, 아니면 기만적인 지배력 행사였을까요?",
      "시공간이 붕괴된 5차원의 테서랙트 속에서 결국 답을 제시한 매개체가 과학적 공식이 아닌 '사랑'의 중력파였다는 연출에 대해 어떻게 느끼셨나요?"
    ]
  },
  {
    id: "truman",
    title: "트루먼 쇼",
    director: "피터 위어",
    year: "1998",
    genre: ["코미디", "드라마", "철학"],
    poster: "https://images.unsplash.com/photo-1542204172-e7052809f852?auto=format&fit=crop&q=80&w=400",
    plot: "하루 24시간 생방송되는 가상 스튜디오 '씨헤이븐'에서 완벽하게 설계된 인생을 살아온 트루먼 버뱅크. 뒤늦게 자신의 삶이 거대한 연극임을 깨닫고 진짜 자유를 향해 목숨을 건 탈출을 감행한다.",
    questions: [
      "통제되고 각본이 짜여 있지만 안전하고 평온한 '씨헤이븐' 내부의 삶과, 고난이 가득하지만 스스로 결정하는 진짜 바깥세상 중 당신은 어디에 더 끌리시나요?",
      "트루먼 쇼의 기획자 크리스토프 감독은 트루먼을 통제하지만 동시에 아끼는 어버이 같은 태도를 보입니다. 그의 역할을 '보호'로 이해할 수 있을까요, '착취'로 규정해야 할까요?",
      "트루먼이 감동적인 탈출을 마친 직후, TV로 시청하던 대중들이 채널을 돌리며 '다른 채널은 뭐 하지?'라고 묻는 모습에서 대중 매체와 관찰에 대해 어떤 생각이 드셨나요?"
    ]
  },
  {
    id: "snowpiercer",
    title: "설국열차",
    director: "봉준호",
    year: "2013",
    genre: ["액션", "SF", "정치"],
    poster: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=400",
    plot: "기상 이변으로 얼어붙은 지구, 생존자들을 싣고 끝없이 달리는 설국열차. 꼬리칸의 억압받는 빈민들이 지배 계급이 있는 앞쪽 엔진 칸을 향해 목숨을 건 혁명을 일으킨다.",
    questions: [
      "열차의 설계자 윌포드는 생태계의 평형과 전체 생존을 위해 강제적인 인구 조절(학살)이 필연적이라고 주장합니다. 이 극단적인 공리주의에 동의하시나요?",
      "앞칸을 장악하여 지배권을 교체하려는 커티스의 혁명과, 열차의 문을 부수고 통제 시스템 밖의 혹한의 대지로 나가려던 남궁민수의 저항 중 어떤 관점이 더 미래 지향적일까요?",
      "영화 속 꼬리칸과 머리칸의 갈등을 보며, 현대 우리 사회의 자본주의 구조적 시스템과 가장 닮아있다고 느낀 요소는 무엇인가요?"
    ]
  }
];

// --- 2. 기본 로컬 스토리지 데이터 초기화 ---
let USER_DATA = {
  nickname: "성찰자 A",
  preferredGenres: ["드라마", "사회물", "철학"],
  draft: null, // { movieId: '', questionIndex: 0, answers: ['', ''], step: 1 }
  history: []  // [{ movieId, date, answers: [], scores: {}, framework: {} }]
};

function loadUserData() {
  const stored = localStorage.getItem("movie_orbs_user_data");
  if (stored) {
    USER_DATA = JSON.parse(stored);
  } else {
    // 체험을 위해 2개의 초기 아카이브 예시 데이터 주입
    USER_DATA.history = [
      {
        id: "orb_mock_1",
        movieId: "joker",
        date: "2026-05-15",
        answers: [
          "아서 플렉이 예산 삭감으로 상담도 못 받고 약도 끊기는 장면이 사회가 그를 벼랑 끝으로 몬 결정적 순간이었다고 봅니다.",
          "사회의 완전한 방치가 아서라는 괴물을 만든 것이지, 본인의 인성 탓이라고 하는 것은 책임을 전가하는 비겁한 시선입니다."
        ],
        scores: { human: 42, society: 85, relation: 25, responsibility: 80, power: 75 },
        framework: {
          title: "구조주의 & 소외 이론",
          explanation: "사회의 구조와 제도가 개인을 어떻게 고립시키고 일탈을 유도하는지에 주목하며, 구조적 요인 속에서 사회를 관찰합니다."
        }
      },
      {
        id: "orb_mock_2",
        movieId: "interstellar",
        date: "2026-05-28",
        answers: [
          "쿠퍼가 인류라는 대의를 위해 아이들과의 이별을 고하는 장면이 가슴 아팠습니다. 하지만 결국은 돌아오겠다는 약속과 사랑이 핵심이었습니다.",
          "브랜드 박사의 거짓말은 악의는 없었지만 결과적으로 인간의 주체적인 선택권을 앗아갔다는 면에서 도덕적으로 정당화될 수 없다고 봅니다."
        ],
        scores: { human: 78, society: 35, relation: 85, responsibility: 40, power: 45 },
        framework: {
          title: "인간 중심주의 & 공동체주의",
          explanation: "거대한 우주적 법칙과 전체 인류 생존이라는 가치 속에서도 개별 인간의 관계, 사랑, 유대를 가치 변화의 중심 동력으로 바라봅니다."
        }
      }
    ];
    saveUserData();
  }
}

function saveUserData() {
  localStorage.setItem("movie_orbs_user_data", JSON.stringify(USER_DATA));
}

// --- 3. 라우팅 및 상태 관리 ---
const state = {
  currentView: "home",
  activeMovieId: null,
  activeQuestionIndex: 0,
  interviewStep: 1, // 1: 기본 질문, 2: 꼬리 질문
  interviewAnswers: ["", ""], // [0]은 1단계 답변, [1]은 2단계 답변
  speechRecognition: null,
  isRecording: false
};

// --- 4. 초기 로드 시 이벤트 바인딩 ---
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  initApp();
  setupSpeechRecognition();
  renderHomeView();
});

// --- 5. 앱 초기화 및 네비게이션 설정 ---
function initApp() {
  // 탭 클릭 이벤트
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const tab = item.getAttribute("data-tab");
      switchView(tab);
    });
  });

  // 로고 클릭 시 홈으로
  document.getElementById("logo-click").addEventListener("click", () => {
    switchView("home");
  });

  // 뒤로가기 버튼
  document.getElementById("btn-back").addEventListener("click", () => {
    handleBackNavigation();
  });

  // 데이터 리셋 버튼
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("정말로 모든 성찰 기록과 대화 내용을 초기화하시겠습니까? (초기 샘플 데이터로 복원됩니다)")) {
      localStorage.removeItem("movie_orbs_user_data");
      loadUserData();
      switchView("home");
      renderHomeView();
      alert("데이터가 초기화되었습니다.");
    }
  });

  // 대시보드 바로가기 버튼들
  document.getElementById("btn-go-search-tab").addEventListener("click", () => switchView("search"));
  document.getElementById("btn-resume-draft").addEventListener("click", () => resumeDraft());

  // 영화 검색 인풋 이벤트
  document.getElementById("search-input-field").addEventListener("input", (e) => {
    renderMovieList(e.target.value);
  });

  // 프로필 설정
  document.getElementById("btn-update-name").addEventListener("click", () => {
    const name = document.getElementById("profile-name-input").value.trim();
    if (name) {
      USER_DATA.nickname = name;
      saveUserData();
      alert("닉네임이 수정되었습니다!");
      renderProfileView();
    }
  });

  // 인터뷰 화면 조작 버튼
  document.getElementById("btn-save-draft").addEventListener("click", () => saveDraft(true));
  document.getElementById("btn-next-step").addEventListener("click", () => handleInterviewNext());
  
  // 모달 닫기
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    document.getElementById("orb-detail-modal").style.display = "none";
  });
}

// 뷰 전환
function switchView(viewName) {
  state.currentView = viewName;
  
  // 탭 네비게이션 활성화 상태 변경
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-tab") === viewName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // 모든 뷰 패널 숨기기
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  // 상세 뷰 특수 노출 처리
  if (viewName === "movie-detail") {
    document.getElementById("view-movie-detail").classList.add("active");
  } else if (viewName === "debate-room") {
    document.getElementById("view-debate-room").classList.add("active");
  } else {
    const activePanel = document.getElementById(`view-${viewName}`);
    if (activePanel) activePanel.classList.add("active");
  }

  // 뒤로가기 버튼 노출 조건 (특정 서브뷰에 있을 때만 노출)
  const backBtn = document.getElementById("btn-back");
  if (["movie-detail", "interview", "report", "debate-room"].includes(viewName)) {
    backBtn.style.display = "flex";
  } else {
    backBtn.style.display = "none";
  }

  // 각 뷰 진입 시 동적 렌더링 호출
  if (viewName === "home") renderHomeView();
  if (viewName === "search") renderMovieList();
  if (viewName === "archive") renderArchiveView();
  if (viewName === "debate") renderDebateRoomList();
  if (viewName === "profile") renderProfileView();

  // 스크롤 맨 위로
  document.getElementById("main-content").scrollTop = 0;
}

// 뒤로가기 동작 정의
function handleBackNavigation() {
  if (state.currentView === "movie-detail") {
    switchView("search");
  } else if (state.currentView === "interview") {
    if (confirm("작성 중인 내용을 임시 저장하고 상세 화면으로 나가시겠습니까?")) {
      saveDraft(false);
      switchView("movie-detail");
    }
  } else if (state.currentView === "report") {
    switchView("archive");
  } else if (state.currentView === "debate-room") {
    switchView("debate");
  }
}

// --- 6. 음성 인식 (STT) 구현 ---
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    state.speechRecognition = new SpeechRecognition();
    state.speechRecognition.continuous = false; // 한 문장씩 완료
    state.speechRecognition.interimResults = false;
    state.speechRecognition.lang = "ko-KR";

    const micBtn = document.getElementById("btn-speech-dictation");
    const textarea = document.getElementById("interview-answer-input");

    micBtn.addEventListener("click", () => {
      if (state.isRecording) {
        state.speechRecognition.stop();
      } else {
        try {
          state.speechRecognition.start();
        } catch (e) {
          console.error("Speech recognition error:", e);
        }
      }
    });

    state.speechRecognition.onstart = () => {
      state.isRecording = true;
      micBtn.classList.add("recording");
    };

    state.speechRecognition.onend = () => {
      state.isRecording = false;
      micBtn.classList.remove("recording");
    };

    state.speechRecognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      textarea.value = (textarea.value + " " + speechToText).trim();
      // 글자수 강제 트리거
      const countSpan = document.getElementById("char-count-val");
      countSpan.innerText = textarea.value.length;
    };

    state.speechRecognition.onerror = (e) => {
      console.error("Speech Recognition Error occurred:", e.error);
      state.isRecording = false;
      micBtn.classList.remove("recording");
    };
  } else {
    // 지원하지 않는 브라우저 대응 (마이크 버튼 비활성화)
    const micBtn = document.getElementById("btn-speech-dictation");
    if (micBtn) {
      micBtn.style.opacity = "0.4";
      micBtn.title = "이 브라우저는 음성 인식을 지원하지 않습니다.";
      micBtn.addEventListener("click", () => {
        alert("이 브라우저에서는 음성 인식을 지원하지 않습니다. 키보드로 입력해 주세요!");
      });
    }
  }

  // 일반 글자수 카운터 연동
  const textarea = document.getElementById("interview-answer-input");
  if (textarea) {
    textarea.addEventListener("input", (e) => {
      document.getElementById("char-count-val").innerText = e.target.value.length;
    });
  }
}

// ==========================================
// 7. 각 화면별 동적 렌더링 함수
// ==========================================

// --- [홈 / 대시보드 화면] ---
function renderHomeView() {
  // 임시 저장 여부 체크
  const banner = document.getElementById("draft-banner");
  if (USER_DATA.draft) {
    const draftMovie = MOVIES.find(m => m.id === USER_DATA.draft.movieId);
    if (draftMovie) {
      document.getElementById("draft-movie-title").innerText = `『${draftMovie.title}』 성찰 인터뷰 이어 쓰기`;
      const stepTxt = USER_DATA.draft.step === 1 ? "1단계: 기본 질문" : "2단계: AI 심화 질문";
      document.getElementById("draft-movie-desc").innerText = `${stepTxt}을 작성하다 중단한 성찰이 존재합니다. 마저 끝마치고 기억구슬을 발행해보세요!`;
      
      const progressPct = USER_DATA.draft.step === 1 ? 40 : 80;
      document.getElementById("draft-progress-bar").style.width = `${progressPct}%`;
      document.getElementById("draft-progress-text").innerText = `${progressPct}%`;
      banner.style.display = "block";
    } else {
      banner.style.display = "none";
    }
  } else {
    banner.style.display = "none";
  }

  // 구슬 보유 현황 요약
  const summaryBox = document.getElementById("home-orbs-summary");
  summaryBox.innerHTML = "";
  
  if (USER_DATA.history.length === 0) {
    summaryBox.innerHTML = `<span class="badge">아직 수집된 구슬이 없습니다. 성찰을 시작해보세요!</span>`;
  } else {
    const countBadge = document.createElement("span");
    countBadge.className = "badge purple";
    countBadge.innerText = `총 구슬 ${USER_DATA.history.length}개 축적`;
    summaryBox.appendChild(countBadge);

    // 가장 최근 구슬 가져오기
    const latest = USER_DATA.history[USER_DATA.history.length - 1];
    const latestMovie = MOVIES.find(m => m.id === latest.movieId);
    if (latestMovie) {
      const latestBadge = document.createElement("span");
      latestBadge.className = "badge cyan";
      latestBadge.innerText = `최근 성찰: ${latestMovie.title}`;
      summaryBox.appendChild(latestBadge);

      const typeBadge = document.createElement("span");
      typeBadge.className = "badge rose";
      typeBadge.innerText = `${latest.framework.title.split(" & ")[0]}`;
      summaryBox.appendChild(typeBadge);
    }
  }
}

// --- [영화 목록 검색 화면] ---
function renderMovieList(filterText = "") {
  const grid = document.getElementById("movie-list-grid");
  grid.innerHTML = "";

  const filtered = MOVIES.filter(m => 
    m.title.toLowerCase().includes(filterText.toLowerCase()) ||
    m.director.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); padding: 40px 0;">검색 결과가 없습니다.</div>`;
    return;
  }

  filtered.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <div class="movie-poster-wrapper">
        <img src="${movie.poster}" alt="${movie.title} 포스터" class="movie-poster" loading="lazy">
      </div>
      <div class="movie-card-info">
        <h4 class="movie-card-title">${movie.title}</h4>
        <span class="movie-card-meta">${movie.director} 감독 | ${movie.year}</span>
        <div class="badge-row" style="margin-top:6px; pointer-events:none;">
          ${movie.genre.map(g => `<span class="badge" style="font-size:0.65rem; padding: 2px 6px;">${g}</span>`).join("")}
        </div>
      </div>
    `;

    card.addEventListener("click", () => openMovieDetail(movie.id));
    grid.appendChild(card);
  });
}

// --- [영화 상세 정보 화면] ---
function openMovieDetail(movieId) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  state.activeMovieId = movieId;

  document.getElementById("detail-poster-img").src = movie.poster;
  document.getElementById("detail-poster-img").alt = `${movie.title} 포스터`;
  document.getElementById("detail-movie-title").innerText = movie.title;
  document.getElementById("detail-movie-info").innerText = `${movie.director} 감독 | ${movie.year}년`;
  
  const genresBox = document.getElementById("detail-movie-genres");
  genresBox.innerHTML = movie.genre.map(g => `<span class="badge">${g}</span>`).join("");
  document.getElementById("detail-movie-plot").innerText = movie.plot;

  // 인터뷰 시작 버튼 이벤트
  const startBtn = document.getElementById("btn-start-interview");
  startBtn.replaceWith(startBtn.cloneNode(true)); // 기존 리스너 클리어
  document.getElementById("btn-start-interview").addEventListener("click", () => {
    startNewInterview(movieId);
  });

  switchView("movie-detail");
}

// --- [인터뷰 시작 및 이어 쓰기 로직] ---
function startNewInterview(movieId) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  // 작성 중이던 꼬리 데이터나 동일 영화 임시 저장이 있으면 로드할지 질문
  if (USER_DATA.draft && USER_DATA.draft.movieId === movieId) {
    if (confirm("이 영화에 대해 임시 저장된 기존 성찰이 있습니다. 이어서 쓰시겠습니까?")) {
      resumeDraft();
      return;
    }
  }

  // 완전히 새로 세팅
  state.activeMovieId = movieId;
  state.interviewStep = 1;
  // 임의로 3개의 공통 질문 중 하나를 골라 1단계로 부여 (체험성 다양화를 위함)
  state.activeQuestionIndex = Math.floor(Math.random() * movie.questions.length);
  state.interviewAnswers = ["", ""];
  
  setupInterviewUI();
  switchView("interview");
}

function resumeDraft() {
  if (!USER_DATA.draft) return;

  state.activeMovieId = USER_DATA.draft.movieId;
  state.activeQuestionIndex = USER_DATA.draft.questionIndex;
  state.interviewStep = USER_DATA.draft.step;
  state.interviewAnswers = [...USER_DATA.draft.answers];

  setupInterviewUI();
  switchView("interview");
}

function setupInterviewUI() {
  const movie = MOVIES.find(m => m.id === state.activeMovieId);
  if (!movie) return;

  document.getElementById("interview-movie-title").innerText = movie.title;
  const textarea = document.getElementById("interview-answer-input");

  if (state.interviewStep === 1) {
    // 1단계 공통 질문
    document.getElementById("interview-step-lbl").innerText = "1단계: 기본 성찰 질문";
    document.getElementById("interview-progress-bar").style.width = "40%";
    document.getElementById("interview-progress-text").innerText = "1 / 2";
    document.getElementById("interview-question-text").innerText = `Q. ${movie.questions[state.activeQuestionIndex]}`;
    textarea.value = state.interviewAnswers[0];
    document.getElementById("btn-next-step").innerHTML = `심화 질문받기 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
  } else {
    // 2단계 맞춤형 꼬리 질문
    document.getElementById("interview-step-lbl").innerText = "2단계: AI 맞춤형 꼬리 질문";
    document.getElementById("interview-progress-bar").style.width = "80%";
    document.getElementById("interview-progress-text").innerText = "2 / 2";
    
    // 꼬리 질문 생성
    const followUpQuestion = generateFollowUpQuestion(movie.id, state.interviewAnswers[0]);
    document.getElementById("interview-question-text").innerText = `Q. (AI 꼬리 질문)\n${followUpQuestion}`;
    textarea.value = state.interviewAnswers[1];
    document.getElementById("btn-next-step").innerHTML = `가치관 종합 분석 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
  }

  textarea.placeholder = "내면에 떠오르는 생각을 천천히 자유롭게 적어 보세요...";
  document.getElementById("char-count-val").innerText = textarea.value.length;
}

// 임시 저장
function saveDraft(showAlert = true) {
  const ans = document.getElementById("interview-answer-input").value;
  if (state.interviewStep === 1) {
    state.interviewAnswers[0] = ans;
  } else {
    state.interviewAnswers[1] = ans;
  }

  USER_DATA.draft = {
    movieId: state.activeMovieId,
    questionIndex: state.activeQuestionIndex,
    step: state.interviewStep,
    answers: [...state.interviewAnswers]
  };
  saveUserData();

  if (showAlert) alert("답변이 임시 저장되었습니다. 홈 화면이나 마이페이지에서 언제든지 이어 작성할 수 있습니다!");
}

// 다음 단계 (1단계 -> 2단계, 혹은 2단계 -> 분석)
function handleInterviewNext() {
  const ans = document.getElementById("interview-answer-input").value.trim();
  if (ans.length < 10) {
    alert("자기 성찰을 위해 최소 10자 이상 성의 있게 답변해 주세요!");
    return;
  }

  if (state.interviewStep === 1) {
    state.interviewAnswers[0] = ans;
    
    // 로딩 효과 후 2단계 진입
    switchView("loading");
    document.getElementById("loading-status-title").innerText = "의견 맥락 분석 중...";
    document.getElementById("loading-status-desc").innerText = "작성하신 생각에서 주요 키워드와 가치관 프레임을 수집하여 AI 꼬리 질문을 빌드하고 있습니다.";

    setTimeout(() => {
      state.interviewStep = 2;
      setupInterviewUI();
      switchView("interview");
    }, 1500);

  } else {
    state.interviewAnswers[1] = ans;
    
    // 최종 가치관 분석 로딩 실행
    switchView("loading");
    document.getElementById("loading-status-title").innerText = "가치관 좌표 도출 중...";
    document.getElementById("loading-status-desc").innerText = "인간관·사회관·관계관·책임관·권력관 점수를 합산하고 가장 정합도가 높은 사회학 프레임워크와 매칭 중입니다.";

    setTimeout(() => {
      // 분석 리포트 화면 생성 및 렌더링
      const report = generateAnalysisReport(state.activeMovieId, state.interviewAnswers);
      renderReportView(report);
      switchView("report");
    }, 2000);
  }
}

// --- 8. AI Mock 꼬리 질문 생성 엔진 (Rule-based Keyword Generator) ---
function generateFollowUpQuestion(movieId, firstAnswer) {
  const text = firstAnswer.toLowerCase();
  
  // 영화별 맞춤형 분기 처리
  if (movieId === "parasite") {
    if (text.includes("구조") || text.includes("사회") || text.includes("빈부") || text.includes("가난") || text.includes("계급")) {
      return "사회가 기택의 가족에게 최소한의 기회를 주지 않는 구조적 비극을 언급해 주셨군요. 그렇다면 그 구조 속에서 살아남기 위해 기우가 재학증명서를 위조한 것과 같은 도덕적 일탈행위는 비난받아야 마땅할까요, 아니면 구조적 모순이 낳은 불가피한 생존전략으로 보시나요?";
    }
    if (text.includes("개인") || text.includes("노력") || text.includes("의지") || text.includes("범죄") || text.includes("거짓말")) {
      return "개인의 도덕적 의무와 거짓말을 한 개인의 성실성 한계를 중요하게 보셨습니다. 하지만 만약 박사장네 가족이 가진 위선(자신들의 룰 안에서만 친절한 태도)이 기택 가족에게 간접적 모멸감을 주었다면, 이것 역시 일종의 보이지 않는 사회적 폭력으로 볼 수 있을까요?";
    }
    return "기택과 박사장 가족의 씁쓸한 충돌이 영화의 긴장감을 만들었습니다. 두 가족 간에 서로를 배려하고 진정성 있게 소통했다면 비극을 피할 수 있었을까요, 아니면 두 신분 사이에는 절대 건널 수 없는 강이 존재하는 것일까요?";
  }

  if (movieId === "joker") {
    if (text.includes("구조") || text.includes("사회") || text.includes("냉대") || text.includes("예산") || text.includes("시스템")) {
      return "환경과 고담시의 사회적 복지 축소 등 시스템의 냉정함이 아서를 고립시켰다고 보시는군요. 그렇다면 아서가 후반부에 방송국 등에서 행한 극단적인 사적 제재와 살인까지도 시스템에 책임을 전가할 수 있을까요? 개인의 양심은 무기력한 것일까요?";
    }
    return "아서의 폭력 뒤에 도사린 고독과 상처를 보셨군요. 우리 사회에서도 수많은 소외된 사람들이 존재합니다. 이런 외로운 개인들의 비극을 해소하기 위해 가장 필요한 것은 개개인의 깊은 연대와 공감일까요, 국가적 차원의 제도적 그물망일까요?";
  }

  if (movieId === "interstellar") {
    if (text.includes("가족") || text.includes("사랑") || text.includes("딸") || text.includes("책임")) {
      return "가족 간의 사랑과 딸에 대한 개인적 책임의 중요성에 공감하셨습니다. 만약 쿠퍼가 우주로 떠나지 않고 끝까지 딸의 옆에 남았다면, 인류와 딸 머피 모두가 멸망했을 것입니다. 이런 피할 수 없는 극단적 한계 상황에서도 가족의 가치가 우위를 가질 수 있을까요?";
    }
    return "인류 보존을 향한 브랜드 박사의 거짓말에 대해 이성적인 관점과 윤리적 가치를 비교해 주셨습니다. 만약 전체를 구원한다는 보장만 있다면, 소수를 향한 기만과 통제는 통치자 입장에서 역사적으로 필요악인 부분일까요?";
  }

  // 기본 포괄적 꼬리 질문
  return "영화 속 인물들이 겪는 내적 갈등에 대해 진솔하게 짚어 주셨습니다. 그렇다면 이러한 가상의 딜레마가 현실에서 성찰자님 본인에게 똑같이 주어졌을 때, 성찰자님은 어떤 내면의 기준에 따라 행동을 선택하실 것 같나요? 이유와 함께 적어주세요.";
}

// --- 9. 가치관 정량/정성 분석 알고리즘 (Scoring & Matching) ---
function generateAnalysisReport(movieId, answers) {
  const combinedText = (answers[0] + " " + answers[1]).toLowerCase();

  // 기본 가치관 중립 점수 (50)
  let scores = {
    human: 50,          // 경쟁(0) vs 협력(100)
    society: 50,        // 개인책임론(0) vs 사회구조론(100)
    relation: 50,       // 독립/원자화(0) vs 연대/공동체(100)
    responsibility: 50, // 절대적 규범(0) vs 상황적 상대주의(100)
    power: 50           // 질서수용(0) vs 비판저항(100)
  };

  // 키워드 스캔 및 가중치 누적
  // 1) 사회구조론 vs 개인책임론
  const societyKeywords = ["구조", "사회", "제도", "시스템", "환경", "빈부", "격차", "계급", "정부", "복지", "자본", "돈", "부자", "불평등"];
  const individualKeywords = ["개인", "스스로", "의지", "선택", "노력", "책임", "정신", "도덕", "범죄", "나태", "욕심", "인성", "실수"];
  
  societyKeywords.forEach(kw => {
    if (combinedText.includes(kw)) {
      scores.society += 8;
      scores.power += 4;
      scores.responsibility += 3;
    }
  });
  individualKeywords.forEach(kw => {
    if (combinedText.includes(kw)) {
      scores.society -= 8;
      scores.responsibility -= 5;
    }
  });

  // 2) 경쟁 vs 협력 & 독립 vs 연대
  const cooperationKeywords = ["협력", "연대", "공동체", "함께", "도움", "같이", "동정", "나눔", "상생"];
  const relationKeywords = ["관계", "가족", "공감", "사랑", "소통", "대화", "외로움", "소외", "단절"];
  
  cooperationKeywords.forEach(kw => {
    if (combinedText.includes(kw)) scores.human += 10;
  });
  relationKeywords.forEach(kw => {
    if (combinedText.includes(kw)) {
      scores.relation += 12;
      scores.human += 4;
    }
  });

  // 3) 질서수용 vs 비판저항
  const resistanceKeywords = ["저항", "투쟁", "혁명", "탈출", "파괴", "싸움", "지배", "억압", "통제", "비판", "부당", "모순"];
  resistanceKeywords.forEach(kw => {
    if (combinedText.includes(kw)) {
      scores.power += 12;
      scores.responsibility += 4;
    }
  });

  // 스코어 바운딩 (10 ~ 95 사이로 한정하여 차트가 치우치지 않게 조율)
  for (let key in scores) {
    scores[key] = Math.max(15, Math.min(95, scores[key]));
  }

  // 가장 잘 매핑되는 사회학 프레임워크 선택
  let framework = { title: "", explanation: "" };
  let userType = "";

  if (scores.society >= 65 && scores.power >= 60) {
    framework.title = "갈등주의 & 구조적 결정론 (Conflict Theory)";
    framework.explanation = "영화 속 갈등을 단순한 개인 간의 충돌이 아니라, 자본과 권력 배분의 불평등이라는 거대한 사회 구조가 빚어낸 비극으로 해석합니다. 당신은 인물들의 행동 양식을 지배하는 사회적 규칙에 강한 문제의식을 지니고 있습니다.";
    userType = "비판적 구조 분석가";
  } else if (scores.society <= 40 && scores.responsibility <= 45) {
    framework.title = "구조 기능주의 & 자유주의 (Functionalism)";
    framework.explanation = "사회가 정한 질서와 제도 속에서 개인의 도덕적 양심과 주체적인 의사 결정을 중심축으로 놓습니다. 당신은 외부 시스템의 문제보다 개인이 행하는 행동의 도덕적 완결성과 합리적 책임의 규명을 중시합니다.";
    userType = "합리적 도덕 절대주의자";
  } else if (scores.relation >= 65 && scores.human >= 60) {
    framework.title = "상징적 상호작용론 & 인간주의 (Humanism)";
    framework.explanation = "거대 시스템보다 인물들 사이의 미시적인 감정 교류, 관계의 단절, 소통의 부재와 공감 능력의 상실이 가져오는 상처에 집중합니다. 당신은 인본주의적 관점에서 개별 인간이 나누는 온기와 주관적 의미를 탐구합니다.";
    userType = "공감형 인본 관찰자";
  } else if (scores.society <= 45 && scores.power >= 60) {
    framework.title = "실존주의 & 주체성 이론 (Existentialism)";
    framework.explanation = "인간은 처한 운명적 제약을 넘어서 스스로 선택을 내리고 고독한 책임을 져야 하는 주체적 존재로 파악합니다. 안전한 새장을 찢고 나가는 도전정신과 부조리에 맞서는 주체적 의지를 높게 평가합니다.";
    userType = "독립적 실존 성찰자";
  } else {
    framework.title = "현상학적 해석학 & 융합적 시선";
    framework.explanation = "개인의 도덕적 의지 및 사회 구조의 복합적 모순을 유기적으로 동시에 아우르는 시각을 가졌습니다. 어느 한 극단에 치우치지 않고 인물들의 다면적 내면과 사회적 압박을 균형 있게 통합해 나갑니다.";
    userType = "균형적 관점 관찰자";
  }

  return {
    movieId,
    date: new Date().toISOString().split("T")[0],
    answers,
    scores,
    framework,
    userType
  };
}

// --- 10. 리포트 화면 및 레이더 차트 SVG 렌더링 ---
let tempReportData = null; // 아카이브 저장 전 임시 보관용

function renderReportView(report) {
  tempReportData = report;

  const movie = MOVIES.find(m => m.id === report.movieId);
  document.getElementById("report-movie-meta").innerText = `영화 『${movie.title}』 성찰 결과`;
  document.getElementById("report-user-type").innerText = report.userType;
  document.getElementById("report-explanation-text").innerText = report.framework.explanation;
  document.getElementById("report-framework-title").innerText = report.framework.title;
  
  // 5대 관점 뱃지 세팅
  const badgeRow = document.getElementById("report-value-badges");
  badgeRow.innerHTML = `
    <span class="badge purple">인간관: ${report.scores.human >= 55 ? "협력형" : "경쟁형"}</span>
    <span class="badge cyan">사회관: ${report.scores.society >= 55 ? "구조론" : "개인책임"}</span>
    <span class="badge rose">관계관: ${report.scores.relation >= 55 ? "연대지향" : "독립지향"}</span>
  `;

  // 레이더 차트 SVG 드로잉
  drawRadarChart(report.scores);

  // 구슬 저장 버튼 이벤트 바인딩
  const saveBtn = document.getElementById("btn-save-orb-to-archive");
  saveBtn.replaceWith(saveBtn.cloneNode(true)); // 중복 리스너 클리어
  document.getElementById("btn-save-orb-to-archive").addEventListener("click", () => {
    saveOrbToArchive();
  });
}

function drawRadarChart(scores) {
  const svg = document.getElementById("radar-chart-area");
  svg.innerHTML = ""; // 기존 드로잉 비우기

  const axes = [
    { name: "인간관 (경쟁vs협력)", key: "human" },
    { name: "사회관 (개인vs구조)", key: "society" },
    { name: "관계관 (독립vs연대)", key: "relation" },
    { name: "책임관 (규범vs상황)", key: "responsibility" },
    { name: "권력관 (수용vs저항)", key: "power" }
  ];

  const maxRadius = 75;
  const numAxes = axes.length;

  // 1) 동심 오각형 그리드 그리기 (25%, 50%, 75%, 100%)
  const steps = [0.25, 0.5, 0.75, 1];
  steps.forEach(step => {
    let pts = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = (i * 2 * Math.PI / numAxes) - (Math.PI / 2);
      const r = maxRadius * step;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      pts.push(`${x},${y}`);
    }
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", pts.join(" "));
    polygon.className.baseVal = "radar-grid-line";
    svg.appendChild(polygon);
  });

  // 2) 방사형 축 선 및 텍스트 라벨 그리기
  let dataPoints = [];
  axes.forEach((axis, i) => {
    const angle = (i * 2 * Math.PI / numAxes) - (Math.PI / 2);
    
    // 축 선
    const xOuter = maxRadius * Math.cos(angle);
    const yOuter = maxRadius * Math.sin(angle);
    
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", xOuter);
    line.setAttribute("y2", yOuter);
    line.className.baseVal = "radar-axis";
    svg.appendChild(line);

    // 라벨 배치
    const labelDistance = maxRadius + 18;
    const xLabel = labelDistance * Math.cos(angle);
    const yLabel = labelDistance * Math.sin(angle) + 4; // 세로 오프셋 보정
    
    const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textNode.setAttribute("x", xLabel);
    textNode.setAttribute("y", yLabel);
    textNode.className.baseVal = "radar-label";
    textNode.textContent = axis.name.split(" ")[0]; // 축 단어만 노출
    
    // 정렬
    if (Math.abs(xLabel) < 10) {
      textNode.setAttribute("text-anchor", "middle");
    } else if (xLabel > 0) {
      textNode.setAttribute("text-anchor", "start");
    } else {
      textNode.setAttribute("text-anchor", "end");
    }

    svg.appendChild(textNode);

    // 3) 실제 사용자 스코어 좌표 계산
    const scoreVal = scores[axis.key];
    const userR = maxRadius * (scoreVal / 100);
    const xUser = userR * Math.cos(angle);
    const yUser = userR * Math.sin(angle);
    dataPoints.push(`${xUser},${yUser}`);
  });

  // 4) 사용자 점수 영역 그리기
  const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  poly.setAttribute("points", dataPoints.join(" "));
  poly.className.baseVal = "radar-polygon";
  svg.appendChild(poly);

  // 데이터 포인트 마커 원 그리기
  dataPoints.forEach(pt => {
    const coords = pt.split(",");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", coords[0]);
    circle.setAttribute("cy", coords[1]);
    circle.setAttribute("r", 4);
    circle.setAttribute("fill", "#ffffff");
    circle.setAttribute("stroke", "var(--color-purple)");
    circle.setAttribute("stroke-width", "2");
    svg.appendChild(circle);
  });
}

// 기억구슬 저장 완료 및 아카이빙
function saveOrbToArchive() {
  if (!tempReportData) return;

  const newOrb = {
    id: "orb_" + Date.now(),
    movieId: tempReportData.movieId,
    date: tempReportData.date,
    answers: [...tempReportData.answers],
    scores: { ...tempReportData.scores },
    framework: { ...tempReportData.framework }
  };

  USER_DATA.history.push(newOrb);
  USER_DATA.draft = null; // 임시 저장 클리어
  saveUserData();

  alert("나만의 성찰 기억구슬이 보관함(아카이브)에 성공적으로 수집되었습니다!");
  tempReportData = null;
  switchView("archive");
}

// --- 11. 보관함(아카이브) 렌더링 ---
function renderArchiveView() {
  // 1) 스태츠 보드 업데이트
  document.getElementById("stat-count").innerText = USER_DATA.history.length;
  
  if (USER_DATA.history.length === 0) {
    document.getElementById("stat-main-framework").innerText = "-";
    document.getElementById("stat-primary-value").innerText = "-";
    document.getElementById("archive-orbs-grid").innerHTML = `
      <div style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 30px 0; font-size:0.85rem;">
        보관된 기억구슬이 없습니다.<br>영화를 보고 인터뷰를 시작해보세요.
      </div>
    `;
    document.getElementById("archive-timeline-list").innerHTML = `
      <div style="color: var(--text-muted); text-align: center; font-size:0.85rem; padding:10px 0;">성찰 궤적이 비어 있습니다.</div>
    `;
    return;
  }

  // 최다 매핑 프레임워크 계산
  const frameworkCounts = {};
  let dominantValName = "사회구조론";
  let maxSocietyScore = 0;
  
  USER_DATA.history.forEach(h => {
    const title = h.framework.title.split(" & ")[0];
    frameworkCounts[title] = (frameworkCounts[title] || 0) + 1;
    maxSocietyScore += h.scores.society;
  });

  const sortedFrameworks = Object.entries(frameworkCounts).sort((a,b) => b[1] - a[1]);
  document.getElementById("stat-main-framework").innerText = sortedFrameworks[0][0];
  
  const avgSociety = maxSocietyScore / USER_DATA.history.length;
  dominantValName = avgSociety >= 55 ? "사회구조론" : "개인책임론";
  document.getElementById("stat-primary-value").innerText = dominantValName;

  // 2) 구슬 인벤토리 렌더링
  const grid = document.getElementById("archive-orbs-grid");
  grid.innerHTML = "";

  USER_DATA.history.forEach(orb => {
    const movie = MOVIES.find(m => m.id === orb.movieId);
    if (!movie) return;

    const item = document.createElement("div");
    item.className = "orb-item-container";
    
    // 가치관 분석 스코어 기반으로 구슬 고유 그라디언트 결정
    const gradientStyle = getOrbGradientStyle(orb.scores);
    const shadowColor = getOrbShadowColor(orb.scores);

    item.innerHTML = `
      <div class="orb-visual" style="background: ${gradientStyle}; box-shadow: inset -6px -6px 16px rgba(0,0,0,0.65), inset 6px 6px 12px rgba(255,255,255,0.4), 0 0 16px ${shadowColor};"></div>
      <div class="orb-title">${movie.title}</div>
    `;

    item.addEventListener("click", () => openOrbModal(orb));
    grid.appendChild(item);
  });

  // 3) 시계열 타임라인 렌더링
  const timelineBox = document.getElementById("archive-timeline-list");
  timelineBox.innerHTML = "";

  // 날짜 역순 정렬
  const timelineSorted = [...USER_DATA.history].sort((a,b) => b.date.localeCompare(a.date));

  timelineSorted.forEach(orb => {
    const movie = MOVIES.find(m => m.id === orb.movieId);
    if (!movie) return;

    const timeItem = document.createElement("div");
    timeItem.className = "timeline-item";
    
    const primaryLabel = orb.scores.society >= 55 ? "구조 중심" : "개인 책임";
    const dotColor = orb.scores.society >= 55 ? "var(--color-cyan)" : "var(--color-amber)";

    timeItem.innerHTML = `
      <div class="timeline-dot" style="background: ${dotColor}; box-shadow: 0 0 8px ${dotColor};"></div>
      <div class="timeline-date">${orb.date}</div>
      <div class="timeline-card">
        <span class="timeline-movie">${movie.title}</span>
        <span class="timeline-tag badge" style="background:rgba(255,255,255,0.03);">${primaryLabel}</span>
      </div>
    `;

    timelineBox.appendChild(timeItem);
  });
}

// 구슬의 스코어 벡터에 따른 그라디언트 색 매핑
function getOrbGradientStyle(scores) {
  // 가장 극단적인 성향을 찾아 대표 그라디언트 리턴
  // 1) 사회구조론(Teal)
  if (scores.society >= 65) return "linear-gradient(135deg, #02aab0, #00cdac)";
  // 2) 연대(Purple)
  if (scores.relation >= 65) return "linear-gradient(135deg, #da22ff, #9733ee)";
  // 3) 저항(Blue-lime)
  if (scores.power >= 60) return "linear-gradient(135deg, #1fa2ff, #12d8fa, #a6ffcb)";
  // 4) 인간주의(Coral)
  if (scores.human >= 65) return "linear-gradient(135deg, #ff6b8b, #7012a6)";
  // default (Orange-red)
  return "linear-gradient(135deg, #ff9966, #ff5e62)";
}

function getOrbShadowColor(scores) {
  if (scores.society >= 65) return "rgba(2, 170, 176, 0.4)";
  if (scores.relation >= 65) return "rgba(218, 34, 255, 0.4)";
  if (scores.power >= 60) return "rgba(18, 216, 250, 0.4)";
  if (scores.human >= 65) return "rgba(255, 107, 139, 0.4)";
  return "rgba(255, 94, 98, 0.4)";
}

// 아카이브 구슬 클릭 시 모달창 상세 조회
function openOrbModal(orb) {
  const movie = MOVIES.find(m => m.id === orb.movieId);
  if (!movie) return;

  const modal = document.getElementById("orb-detail-modal");
  
  document.getElementById("modal-orb-title").innerText = `『${movie.title}』의 구슬`;
  document.getElementById("modal-orb-date").innerText = `${orb.date} 성찰 완료`;
  document.getElementById("modal-orb-description").innerText = orb.framework.explanation;
  
  const visual = document.getElementById("modal-orb-visual");
  visual.style.background = getOrbGradientStyle(orb.scores);
  visual.style.boxShadow = `inset -6px -6px 16px rgba(0,0,0,0.65), inset 6px 6px 12px rgba(255,255,255,0.4), 0 0 20px ${getOrbShadowColor(orb.scores)}`;

  const badges = document.getElementById("modal-orb-badges");
  badges.innerHTML = `
    <span class="badge purple">${orb.scores.society >= 55 ? "구조주의" : "개인자유주의"}</span>
    <span class="badge cyan">${orb.scores.relation >= 55 ? "연대주의" : "독립주의"}</span>
  `;

  // 토론방 연동 이동 버튼
  const debateBtn = document.getElementById("btn-modal-go-debate");
  debateBtn.replaceWith(debateBtn.cloneNode(true)); // 리스너 초기화
  document.getElementById("btn-modal-go-debate").addEventListener("click", () => {
    modal.style.display = "none";
    openDebateRoom(orb.movieId);
  });

  modal.style.display = "flex";
}

// --- 12. 관점 토론 네트워크 렌더링 ---
function renderDebateRoomList() {
  const container = document.getElementById("debate-rooms-grid");
  container.innerHTML = "";

  MOVIES.forEach(movie => {
    const card = document.createElement("div");
    card.className = "debate-room-card";
    
    // 방 참여자 수 시뮬레이션
    const pCount = Math.floor(Math.random() * 20) + 12;

    card.innerHTML = `
      <div class="room-meta">
        <span>${movie.genre[2] || "인문학"} 토론방</span>
        <span>참여자 ${pCount}명</span>
      </div>
      <div class="room-title">『${movie.title}』 : 관점의 충돌과 융합</div>
      <div class="room-participants">
        <div class="participant-dots">
          <span class="participant-dot" style="background:#ff6b8b"></span>
          <span class="participant-dot" style="background:#02aab0"></span>
          <span class="participant-dot" style="background:#da22ff"></span>
        </div>
        <span style="font-size:0.7rem; color:var(--text-muted);">다양한 가치관 유저 매칭 중</span>
      </div>
    `;

    card.addEventListener("click", () => {
      openDebateRoom(movie.id);
    });

    container.appendChild(card);
  });
}

// 특정 영화의 토론방 입장
const MOCK_CHAT_DATA = {
  parasite: [
    { sender: "김도덕", label: "개인책임", alignment: "left", msg: "아무리 살기 막막해도 박사장네 가정을 철저하게 속이고 서류를 조작해 기생하는 것 자체는 범죄입니다. 영화 후반부의 비극 역시 그 불법에서 시작된 파멸이라 봅니다." },
    { sender: "구조비판", label: "사회구조", alignment: "right", msg: "하지만 비극의 뿌리는 사기 자체가 아니라, 기택네 반지하 침수와 박사장네 미세 파티의 간격에 드러난 구조적 단절입니다. 생존 위협 앞의 위조는 사회의 무기력을 반증할 뿐입니다." },
    { sender: "AI 중재자", label: "MODERATOR", alignment: "center", msg: "두 성찰자님께서 각각 '개인의 도덕적 한계'와 '생존을 위협하는 양극화 구조'를 깊이 있게 언급하셨습니다. 과연 우리 사회에서 생존을 위한 개인의 일탈은 비난의 우선 대상이 되어야 할까요, 아니면 사회 안전망의 부재가 먼저 다뤄져야 할까요?" }
  ],
  joker: [
    { sender: "자유주의", label: "개인책임", alignment: "left", msg: "조커의 잔혹한 범죄는 어떤 이유로도 실드 칠 수 없어요. 고담시의 냉대 역시 아서 플렉 스스로의 이성적 자제로 이겨내야 하는 외적 도전에 불과했습니다." },
    { sender: "시스템아웃", label: "사회구조", alignment: "right", msg: "상담 지원마저 끊어 복지 사각지대로 아서를 고립시킨 것은 고담 사회의 미필적 고의였습니다. 범죄자를 두둔하는 게 아니라, 구조가 방조했다는 겁니다." },
    { sender: "AI 중재자", label: "MODERATOR", alignment: "center", msg: "개인의 도덕적 의무와 이를 한계선까지 몰고 가는 극한의 소외 구도를 양측 모두 날카롭게 지목하셨습니다. 사회의 비인격화가 한 인간의 도덕적 결정을 무너뜨릴 때, 우리는 이에 대한 책임을 누구에게 물어야 할까요?" }
  ],
  interstellar: [
    { sender: "머피러버", label: "공동체연대", alignment: "left", msg: "가족을 두고 우주로 떠나는 건 인류 구원이란 미명 하에 아버지의 소중한 의무를 방기한 거라 봐요. 곁에 있어 주는 것이 최고이자 유일한 가족애 아닐까요?" },
    { sender: "코스모스", label: "대의명분", alignment: "right", msg: "가족만 지키려 했다면 결국 머피를 포함한 인류 전체가 지구 먼지 속에서 호흡 곤란으로 다 죽었을 겁니다. 때론 대의를 위해 개인의 소중한 감정을 유예하는 희생도 필수적입니다." },
    { sender: "AI 중재자", label: "MODERATOR", alignment: "center", msg: "인류 전체의 생존이라는 대의명분과 개별 관계 속에서의 직접적인 책임이라는 가치가 부딪히고 있습니다. 미래 세대의 존속을 보장하기 위한 선택 앞에서, 현재 내 곁에 있는 사람을 지키는 책임은 양보될 수 있는 것일까요?" }
  ],
  truman: [
    { sender: "안전지향", label: "현실수용", alignment: "left", msg: "트루먼이 비바람 부는 현실에 와 봐야 당장 경제적 생존이나 인간관계로 괴로워할 뿐입니다. 스튜디오 세트장 안의 가상 안전이 때로는 더 행복한 삶의 포맷일 수도 있습니다." },
    { sender: "리얼라이프", label: "자유저항", alignment: "right", msg: "아무리 평온해도 그것이 조작된 거짓 위에 세워졌다면 인간의 존엄성은 훼손된 것입니다. 불안정하더라도 온전히 자율적으로 내딛는 현실의 발걸음만이 진정한 주체의 삶입니다." }
  ],
  snowpiercer: [
    { sender: "질서주의", label: "시스템질서", alignment: "left", msg: "기차의 물리적 구조를 지탱하기 위한 인구 조절은 극한 상황에서의 고육지책입니다. 질서마저 무너지면 기차 자체가 탈선해 전원이 몰살당하니까요." },
    { sender: "밖으로", label: "혁명저항", alignment: "right", msg: "안정이라는 핑계로 아이들까지 엔진 부품으로 갈아 넣는 통제 시스템은 이미 존재 가치를 상실했습니다. 그 통제 기차 자체를 파괴하고 혹독하더라도 밖으로 나가는 것이 진정한 구원입니다." }
  ]
};

function openDebateRoom(movieId) {
  state.activeMovieId = movieId;
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  document.getElementById("debate-room-topic").innerText = `『${movie.title}』: 관점의 충돌과 융합`;
  document.getElementById("debate-room-movie").innerText = `영화 '${movie.title}' 토론방`;

  const historyDiv = document.getElementById("debate-chat-history");
  historyDiv.innerHTML = "";

  const roomChats = MOCK_CHAT_DATA[movieId] || [
    { sender: "성찰인 A", label: "가치관 탐구", alignment: "left", msg: "이 영화의 딜레마에 대해 어떻게 생각하시나요? 먼저 화두를 던져 주세요." },
    { sender: "AI 중재자", label: "MODERATOR", alignment: "center", msg: "이 영화의 해석적 화두는 무엇일까요? 토론방에 성찰자님의 소중한 한 줄을 올려주시면 다른 성향의 의견과 매칭을 조율해 드리겠습니다." }
  ];

  // 챗 히스토리 그리기
  roomChats.forEach(chat => {
    appendChatBubble(chat);
  });

  // 전송 버튼 이벤트 바인딩
  const sendBtn = document.getElementById("btn-send-debate");
  sendBtn.replaceWith(sendBtn.cloneNode(true)); // 리스너 초기화
  
  document.getElementById("btn-send-debate").addEventListener("click", () => {
    sendDebateMessage();
  });

  // 엔터키 전송 연동
  const inputField = document.getElementById("debate-message-input");
  inputField.replaceWith(inputField.cloneNode(true));
  
  const freshInput = document.getElementById("debate-message-input");
  freshInput.value = "";
  freshInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendDebateMessage();
    }
  });

  switchView("debate-room");
  
  // 스크롤 맨 아래로 내리기
  setTimeout(() => {
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }, 100);
}

function appendChatBubble(chat) {
  const historyDiv = document.getElementById("debate-chat-history");
  
  if (chat.alignment === "center") {
    // AI 중재 메시지 디자인
    const card = document.createElement("div");
    card.className = "ai-mediator-card";
    card.innerHTML = `
      <div class="ai-mediator-badge">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <span>AI 중재 오르브</span>
      </div>
      <div>${chat.msg}</div>
    `;
    historyDiv.appendChild(card);
  } else {
    // 유저 메시지 디자인
    const wrap = document.createElement("div");
    wrap.className = `chat-bubble-wrapper ${chat.alignment === "left" ? "left" : "right"}`;
    
    // 뱃지 성격
    const tagClass = chat.label.includes("구조") || chat.label.includes("연대") || chat.label.includes("저항") ? "badge cyan" : "badge amber";

    wrap.innerHTML = `
      <div class="chat-user-info">
        <span>${chat.sender}</span>
        <span class="chat-tag-pill ${tagClass}">${chat.label}</span>
      </div>
      <div class="chat-bubble">
        ${chat.msg}
      </div>
    `;
    historyDiv.appendChild(wrap);
  }
}

// 토론 메시지 보내기 & AI 연동 리액션
function sendDebateMessage() {
  const input = document.getElementById("debate-message-input");
  const msg = input.value.trim();
  if (!msg) return;

  // 1) 내 대화 버블 추가
  appendChatBubble({
    sender: USER_DATA.nickname,
    label: "나의 성향",
    alignment: "right",
    msg: msg
  });

  input.value = "";
  
  const historyDiv = document.getElementById("debate-chat-history");
  historyDiv.scrollTop = historyDiv.scrollHeight;

  // 2) AI 중재자가 1.5초 뒤 입력 내용에 맞춤 대화 중재
  setTimeout(() => {
    let aiResponse = "";
    const lowerMsg = msg.toLowerCase();

    if (lowerMsg.includes("구조") || lowerMsg.includes("환경") || lowerMsg.includes("사회")) {
      aiResponse = `성찰자 ${USER_DATA.nickname}님께서 구조주의적 측면에 힘을 실어 주셨습니다. 이에 대해 개인의 자유 의지와 실존적 결정을 강조하시는 성찰자님들은 어떤 의견을 주실 수 있을까요?`;
    } else if (lowerMsg.includes("개인") || lowerMsg.includes("노력") || lowerMsg.includes("도덕")) {
      aiResponse = `성찰자 ${USER_DATA.nickname}님께서 개인의 윤리적 주체성과 실천 의무를 짚어 주셨습니다. 인간을 한계 상황으로 몰고 가는 사회 구조적 강제력을 우선으로 삼는 반대 관점에서는 어떤 보완 의견을 낼 수 있을까요?`;
    } else {
      aiResponse = `성찰자 ${USER_DATA.nickname}님의 신선한 감상과 의견 잘 들었습니다. 다양한 관점을 지닌 참여자분들의 유기적 대화가 한층 더 깊어지는 소통이 되고 있습니다. 이 딜레마를 평화롭게 극복할 절충안은 무엇일까요?`;
    }

    appendChatBubble({
      sender: "AI 중재자",
      label: "MODERATOR",
      alignment: "center",
      msg: aiResponse
    });

    historyDiv.scrollTop = historyDiv.scrollHeight;
  }, 1500);
}

// --- 13. 내 정보 (프로필) 화면 렌더링 ---
function renderProfileView() {
  document.getElementById("user-display-name").innerText = USER_DATA.nickname;
  document.getElementById("user-avatar-initial").innerText = USER_DATA.nickname.substring(0, 1);
  document.getElementById("profile-name-input").value = USER_DATA.nickname;

  // 장르 태그 토글식 리스트 생성
  const genreBox = document.getElementById("profile-genre-tags");
  genreBox.innerHTML = "";

  const allGenres = ["드라마", "SF", "블랙코미디", "사회물", "스릴러", "철학", "정치물", "인문학"];
  allGenres.forEach(genre => {
    const isPreferred = USER_DATA.preferredGenres.includes(genre);
    const chip = document.createElement("span");
    chip.className = `badge ${isPreferred ? "purple" : ""}`;
    chip.style.cursor = "pointer";
    chip.innerText = genre;

    chip.addEventListener("click", () => {
      if (USER_DATA.preferredGenres.includes(genre)) {
        USER_DATA.preferredGenres = USER_DATA.preferredGenres.filter(g => g !== genre);
      } else {
        USER_DATA.preferredGenres.push(genre);
      }
      saveUserData();
      renderProfileView(); // 다시 그리기
    });

    genreBox.appendChild(chip);
  });
}
