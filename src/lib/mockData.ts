import type { Subject, StudyTask, ExamSchedule, WrongAnswer, Career, HighSchool } from "./types";

export const SUBJECTS: Subject[] = [
  { id: "math", name: "수학", color: "#8b5cf6", icon: "∑" },
  { id: "physics", name: "물리학", color: "#06b6d4", icon: "⚡" },
  { id: "chem", name: "화학", color: "#10b981", icon: "⚗" },
  { id: "bio", name: "생명과학", color: "#f59e0b", icon: "🧬" },
  { id: "earth", name: "지구과학", color: "#f97316", icon: "🌍" },
  { id: "korean", name: "국어", color: "#ef4444", icon: "가" },
  { id: "english", name: "영어", color: "#3b82f6", icon: "A" },
  { id: "history", name: "한국사", color: "#84cc16", icon: "📜" },
];

export const STUDY_TASKS: StudyTask[] = [
  { id: "1", subject: "수학", subjectColor: "#8b5cf6", title: "수열과 극한 개념 정리", startTime: "09:00", endTime: "10:30", completed: true, date: "2026-06-19" },
  { id: "2", subject: "물리학", subjectColor: "#06b6d4", title: "운동량과 충격량 문제풀이", startTime: "11:00", endTime: "12:30", completed: false, date: "2026-06-19" },
  { id: "3", subject: "수학", subjectColor: "#8b5cf6", title: "미적분 기출 5개", startTime: "14:00", endTime: "16:00", completed: false, date: "2026-06-19" },
  { id: "4", subject: "영어", subjectColor: "#3b82f6", title: "독해 지문 3개 분석", startTime: "16:30", endTime: "17:30", completed: false, date: "2026-06-19" },
  { id: "5", subject: "물리학", subjectColor: "#06b6d4", title: "파동과 광학 개념", startTime: "18:00", endTime: "19:30", completed: false, date: "2026-06-19" },
];

export const EXAM_SCHEDULES: ExamSchedule[] = [
  { id: "e1", subject: "수학", date: "2026-06-25", time: "09:00", range: "수열, 극한, 미적분 전체", difficulty: 5, daysLeft: 6 },
  { id: "e2", subject: "물리학", date: "2026-06-26", time: "11:00", range: "역학 전체, 전자기학 Ch1-3", difficulty: 4, daysLeft: 7 },
  { id: "e3", subject: "화학", date: "2026-06-27", time: "09:00", range: "원자구조, 화학결합", difficulty: 3, daysLeft: 8 },
  { id: "e4", subject: "국어", date: "2026-06-24", time: "09:00", range: "문학 전체, 독서 비문학", difficulty: 4, daysLeft: 5 },
  { id: "e5", subject: "영어", date: "2026-06-28", time: "13:00", range: "독해, 어법, 어휘", difficulty: 3, daysLeft: 9 },
];

export const WRONG_ANSWERS: WrongAnswer[] = [
  {
    id: "w1", subject: "수학", subjectColor: "#8b5cf6", date: "2026-06-18",
    problem: "등비수열의 합 공식 적용 오류 - 공비가 1인 경우 처리",
    memo: "r=1일 때 별도 공식 사용해야 함. an=a, 합=na",
    tags: ["수열", "등비수열", "반드시 재풀이"], solved: false, difficulty: 3,
  },
  {
    id: "w2", subject: "물리학", subjectColor: "#06b6d4", date: "2026-06-17",
    problem: "운동량 보존법칙 - 충돌 후 속도 계산에서 부호 실수",
    memo: "충돌 전후 운동량 보존. 방향 벡터 주의. 오른쪽 + 왼쪽 -",
    tags: ["역학", "충돌", "벡터"], solved: true, difficulty: 2,
  },
  {
    id: "w3", subject: "수학", subjectColor: "#8b5cf6", date: "2026-06-16",
    problem: "극한의 성질 - 0/0 형태 처리",
    memo: "로피탈 정리 또는 인수분해 활용. 테일러 급수로도 풀 수 있음",
    tags: ["극한", "미적분"], solved: false, difficulty: 3,
  },
  {
    id: "w4", subject: "화학", subjectColor: "#10b981", date: "2026-06-15",
    problem: "루이스 구조식 그리기 - 형식전하 계산 오류",
    memo: "형식전하 = 원자가전자 - 비공유전자 - 공유전자/2",
    tags: ["화학결합", "루이스구조"], solved: false, difficulty: 2,
  },
];

export const CAREERS: Career[] = [
  {
    id: "c1", title: "천문학자", category: "자연과학",
    description: "우주의 천체와 현상을 관측·분석하는 과학자. 망원경, 분광기, 위성 데이터를 활용해 별의 탄생과 죽음, 은하의 구조, 우주의 기원을 연구합니다.",
    relatedSubjects: ["물리학", "수학", "지구과학"],
    avgSalary: 5200, employmentRate: 72, growthRate: 8,
    workEnv: "대학교 연구소, NASA, ESA, 한국천문연구원(KASI)",
    universities: ["서울대(물리천문학부)", "연세대(천문우주학과)", "경북대(천문대기과학과)", "충북대(천문우주학과)"],
    skills: ["Python", "MATLAB", "천체관측", "데이터분석", "영어논문작성"],
    youtubeKeywords: ["천문학자 하루", "KASI 연구", "천체물리학 기초"],
  },
  {
    id: "c2", title: "물리학 연구원", category: "자연과학",
    description: "물질의 기본 성질과 자연 법칙을 탐구합니다. 입자물리학, 응집물질물리, 핵물리 등 다양한 분야에서 이론과 실험을 통해 새로운 과학 지식을 만들어냅니다.",
    relatedSubjects: ["물리학", "수학"],
    avgSalary: 5800, employmentRate: 68, growthRate: 6,
    workEnv: "대학교, 국립연구소, 기업 R&D (삼성, LG, POSTECH)",
    universities: ["서울대(물리천문학부)", "카이스트(물리학과)", "포스텍(물리학과)", "연세대(물리학과)"],
    skills: ["수식 모델링", "실험 설계", "논문 작성", "C++/Python", "통계분석"],
    youtubeKeywords: ["물리학 연구원 직업", "입자물리학 실험", "CERN 연구"],
  },
  {
    id: "c3", title: "항공우주공학자", category: "공학",
    description: "로켓, 위성, 항공기 등을 설계하고 개발합니다. 누리호 같은 발사체부터 드론, 전투기까지 다양한 비행체의 구조·추진·제어 시스템을 연구합니다.",
    relatedSubjects: ["물리학", "수학", "화학"],
    avgSalary: 6500, employmentRate: 85, growthRate: 15,
    workEnv: "한국항공우주연구원(KARI), 한화에어로스페이스, KAI, LIG넥스원",
    universities: ["서울대(항공우주공학과)", "카이스트", "한국항공대", "UNIST"],
    skills: ["CAD/CAE", "유체역학", "구조역학", "MATLAB", "C++"],
    youtubeKeywords: ["누리호 개발", "항공우주공학자 인터뷰", "로켓 설계"],
  },
  {
    id: "c4", title: "데이터 과학자", category: "IT/공학",
    description: "대용량 데이터를 분석해 의미 있는 인사이트를 도출합니다. 머신러닝과 통계학을 활용해 비즈니스 문제를 수치로 해결합니다.",
    relatedSubjects: ["수학", "통계학"],
    avgSalary: 7200, employmentRate: 92, growthRate: 28,
    workEnv: "IT 기업, 금융기관, 스타트업, 연구소",
    universities: ["서울대(통계학과/데이터사이언스)", "연세대(응용통계학과)", "카이스트(AI대학원)", "성균관대"],
    skills: ["Python", "R", "SQL", "머신러닝", "딥러닝", "데이터시각화"],
    youtubeKeywords: ["데이터 과학자 취업", "Python 데이터분석", "카카오 데이터팀"],
  },
  {
    id: "c5", title: "핵공학자", category: "공학",
    description: "핵에너지의 발생과 활용을 연구합니다. 원자력 발전소 설계, 방사선 의학 기기 개발, 핵융합 에너지 연구 등 다양한 분야에서 활동합니다.",
    relatedSubjects: ["물리학", "수학", "화학"],
    avgSalary: 6800, employmentRate: 78, growthRate: 12,
    workEnv: "한국수력원자력, 한국원자력연구원(KAERI), ITER(국제핵융합실험로)",
    universities: ["서울대(에너지시스템공학부)", "카이스트(원자력양자공학과)", "한양대", "경희대"],
    skills: ["방사선 계산", "열유체 해석", "ANSYS", "안전 시스템 설계"],
    youtubeKeywords: ["핵융합 연구", "원자력 공학자", "ITER 프로젝트"],
  },
  {
    id: "c6", title: "AI/로봇 공학자", category: "IT/공학",
    description: "인공지능과 로봇 기술을 융합해 자율주행, 우주 탐사 로봇, 의료 로봇 등을 개발합니다. 물리 시뮬레이션과 제어 이론이 핵심입니다.",
    relatedSubjects: ["수학", "물리학"],
    avgSalary: 7800, employmentRate: 94, growthRate: 35,
    workEnv: "삼성리서치, 현대로보틱스, 카카오, 네이버랩스, 미국 빅테크",
    universities: ["카이스트(로봇공학학제전공)", "서울대(전기정보공학부)", "POSTECH", "한양대(로봇공학과)"],
    skills: ["ROS", "Python", "C++", "강화학습", "컴퓨터비전", "제어이론"],
    youtubeKeywords: ["로봇 공학자 하루", "현대로보틱스", "AI 로봇 연구"],
  },
];

export const HIGH_SCHOOLS: HighSchool[] = [
  {
    id: "hs1", name: "한국과학영재학교", type: "영재학교", region: "부산", district: "부산진구",
    address: "부산광역시 부산진구 새싹로 220", phone: "051-606-2000", website: "https://ksa.hs.kr",
    studentCount: 450, teacherCount: 82, classCount: 18,
    suneungAvg: 98.5, univAdmissionRate: 99, skyRate: 72,
    scienceSpecial: true, mathSpecial: true, dormitory: true, internationalExchange: true,
    clubCount: 45, rating: 5.0,
    features: ["물리올림피아드 강세", "천문학 클럽 유명", "자체 관측소 보유", "R&E 프로그램", "MIT 연계"],
  },
  {
    id: "hs2", name: "서울과학고등학교", type: "영재학교", region: "서울", district: "종로구",
    address: "서울특별시 종로구 혜화로 63", phone: "02-765-0500",
    studentCount: 330, teacherCount: 68, classCount: 12,
    suneungAvg: 99.0, univAdmissionRate: 99, skyRate: 80,
    scienceSpecial: true, mathSpecial: true, dormitory: true, internationalExchange: true,
    clubCount: 38, rating: 5.0,
    features: ["수학올림피아드 최다 수상", "물리·천문 특화", "서울대 진학 1위", "자체 연구소 운영", "MIT·스탠포드 입학 실적"],
  },
  {
    id: "hs3", name: "경기과학고등학교", type: "영재학교", region: "경기", district: "수원",
    address: "경기도 수원시 장안구 수성로 245", phone: "031-250-1800",
    studentCount: 384, teacherCount: 74, classCount: 16,
    suneungAvg: 98.2, univAdmissionRate: 99, skyRate: 68,
    scienceSpecial: true, mathSpecial: true, dormitory: true, internationalExchange: true,
    clubCount: 42, rating: 4.9,
    features: ["IOI·IPhO 수상 다수", "반도체·AI 특화", "포스텍 연계 프로그램", "국제 공동연구"],
  },
  {
    id: "hs4", name: "대전과학고등학교", type: "영재학교", region: "대전", district: "유성구",
    address: "대전광역시 유성구 과학로 123", phone: "042-860-8700",
    studentCount: 360, teacherCount: 65, classCount: 15,
    suneungAvg: 97.8, univAdmissionRate: 98, skyRate: 65,
    scienceSpecial: true, mathSpecial: true, dormitory: true, internationalExchange: false,
    clubCount: 35, rating: 4.8,
    features: ["KAIST 인접 연계 활발", "핵물리 프로그램", "화학올림피아드 강세", "R&D 인턴십"],
  },
  {
    id: "hs5", name: "민족사관고등학교", type: "자사고", region: "강원", district: "횡성군",
    address: "강원특별자치도 횡성군 안흥면 민사고길 333", phone: "033-340-4700",
    studentCount: 480, teacherCount: 95, classCount: 16,
    suneungAvg: 96.5, univAdmissionRate: 97, skyRate: 55,
    scienceSpecial: true, mathSpecial: true, dormitory: true, internationalExchange: true,
    clubCount: 50, rating: 4.7,
    features: ["영어 몰입 교육", "아이비리그 진학", "물리·수학 심화", "리더십 프로그램", "기숙사 생활"],
  },
  {
    id: "hs6", name: "하나고등학교", type: "자사고", region: "서울", district: "은평구",
    address: "서울특별시 은평구 연서로 535", phone: "02-350-5000",
    studentCount: 720, teacherCount: 120, classCount: 24,
    suneungAvg: 95.2, univAdmissionRate: 96, skyRate: 45,
    scienceSpecial: false, mathSpecial: true, dormitory: true, internationalExchange: true,
    clubCount: 55, rating: 4.6,
    features: ["하나금융그룹 지원", "글로벌 프로그램", "수학 특화 트랙", "미국 대학 진학 지원"],
  },
  {
    id: "hs7", name: "용인외국어고등학교", type: "외고", region: "경기", district: "용인시",
    address: "경기도 용인시 처인구 모현읍 왕산로 322", phone: "031-332-6100",
    studentCount: 960, teacherCount: 140, classCount: 32,
    suneungAvg: 93.5, univAdmissionRate: 94, skyRate: 38,
    scienceSpecial: false, mathSpecial: false, dormitory: true, internationalExchange: true,
    clubCount: 60, rating: 4.4,
    features: ["영어·제2외국어 특화", "아이비리그 진학", "국제 교류 활발", "외교관 배출"],
  },
  {
    id: "hs8", name: "서울고등학교", type: "일반고", region: "서울", district: "서초구",
    address: "서울특별시 서초구 효령로 197", phone: "02-3780-0700",
    studentCount: 1050, teacherCount: 105, classCount: 35,
    suneungAvg: 88.3, univAdmissionRate: 78, skyRate: 22,
    scienceSpecial: false, mathSpecial: false, dormitory: false, internationalExchange: false,
    clubCount: 30, rating: 4.1,
    features: ["서초구 명문 일반고", "수학·과학 내신 관리", "수능 중심 교육", "SKY 진학 실적"],
  },
];

export const CAREER_NEWS = [
  { id: "n1", title: "누리호 3차 발사 성공 - 국내 항공우주 인력 수요 급증", date: "2026-05-25", category: "항공우주", views: 12400 },
  { id: "n2", title: "CERN, 새 입자 발견 예비 보고... 물리학계 긴장", date: "2026-06-10", category: "물리학", views: 9800 },
  { id: "n3", title: "AI 천문학자가 블랙홀 3000개 새로 발견", date: "2026-06-15", category: "천문학", views: 15200 },
  { id: "n4", title: "2027년 데이터 과학자 연봉 평균 8500만원 전망", date: "2026-06-01", category: "데이터과학", views: 22000 },
  { id: "n5", title: "한국형 핵융합 장치(K-DEMO) 2035년 완공 목표", date: "2026-06-12", category: "핵공학", views: 8700 },
  { id: "n6", title: "NASA 아르테미스 한국 우주인 탑승 가능성 논의", date: "2026-06-18", category: "천문학", views: 18500 },
];
