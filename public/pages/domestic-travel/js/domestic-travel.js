'use strict';

/* =====================================================
   카카오 REST API 키
   ===================================================== */
const KAKAO_REST_KEY = '8c7c498db86403ba673ecdce2316c007';

/* =====================================================
   교통수단 설정
   - car   : 카카오 Directions 자동차 API
   ===================================================== */
const TRANSPORT_CONFIG = {
  car:     { icon: '🚗', label: '자동차',   color: '#2196f3', apiMode: 'car'     },
};

/* =====================================================
   관광지 데이터
   ===================================================== */
const mockData = [
  // ===== 부산 =====
  { location: '부산', categories: ['자연','커플','관광','힐링'],     title: '미포철길',            desc: '푸른 바다를 바로 곁에 두고 걸을 수 있는 낭만적인 해안 산책로.',                                                                                              img: 'images/busan/미포철길.jpg',           coords: [35.1731, 129.1993] },
  { location: '부산', categories: ['자연','커플','체험','관광'],     title: '광안리 해수욕장',      desc: '광안리의 바다를 보며 시원하게 즐길 수 있는 곳.',                                                                                                             img: 'images/busan/광안리.jpg',             coords: [35.1531, 129.1185] },
  { location: '부산', categories: ['가족','문화'],                  title: '감천문화마을',          desc: '설치 미술 작품들이 독특한 경관을 이루는 곳.',                                                                                                                img: 'images/busan/gan.jpg',                coords: [35.0975, 129.0100] },
  { location: '부산', categories: ['가족','문화','관광','힐링'],     title: '흰여울문화마을',        desc: '바로 옆으로 푸른 부산 바다가 펼쳐지는 바다 전망의 문화 공간.',                                                                                              img: 'images/busan/흰여울.jpg',             coords: [35.0760, 129.0197] },
  { location: '부산', categories: ['가족','문화','힐링'],            title: '보수동 책방골목',       desc: '한국전쟁 시절 피난민들이 생계를 위해 책을 사고팔기 시작하면서 형성된 역사적인 골목.',                                                                       img: 'images/busan/책방골목.jpg',           coords: [35.1040, 129.0274] },
  { location: '부산', categories: ['자연','문화','체험'],            title: '범어사',               desc: '호젓한 대나무 숲길을 걸으며 고즈넉한 한국의 전통 불교문화를 체험하기에 좋은 곳.',                                                                           img: 'images/busan/범어사.jpg',             coords: [35.2960, 129.0820] },
  { location: '부산', categories: ['자연','커플','가족','힐링'],     title: '오륙도 스카이워크',     desc: '투명한 유리 바닥 아래로 아찔한 바다와 부산의 상징인 오륙도를 가장 가까이서 감상.',                                                                           img: 'images/busan/스카이워크.jpg',         coords: [35.0698, 129.1136] },
  { location: '부산', categories: ['문화','커플','가족'],            title: '영화의 전당',          desc: '세계적인 영화제인 부산국제영화제(BIFF)의 전용관이자 복합영상문화공간.',                                                                                       img: 'images/busan/영화의 전당.jpg',        coords: [35.1689, 129.1305] },
  { location: '부산', categories: ['문화','가족'],                  title: '임시수도기념관',        desc: '부산의 뼈아픈 역사와 피란민들의 삶을 보존하고 있는 공간.',                                                                                                   img: 'images/busan/임시수도기념관.jpg',     coords: [35.1010, 129.0178] },
  { location: '부산', categories: ['문화'],                        title: '청자빌딩',              desc: '1918년에 지어진 옛 한성은행 부산지점 건물을 리모델링하여 탄생한 복합문화공간.',                                                                                img: 'images/busan/청자빌딩.jpg',           coords: [35.1019, 129.0325] },
  { location: '부산', categories: ['문화','체험'],                  title: '국립해양박물관',        desc: '바다와 관련된 모든 문화적 자산을 한눈에 볼 수 있는 곳.',                                                                                                     img: 'images/busan/국립해양박물관.jpg',     coords: [35.0841, 129.0850] },
  { location: '부산', categories: ['관광','가족','힐링'],            title: '해운대 블루라인파크',   desc: '바다를 바로 옆에 두고 달리는 해변열차와 공중 레일에서 경치를 즐기는 곳.',                                                                                    img: 'images/busan/블루라인파크.jpg',       coords: [35.1589, 129.1603] },
  { location: '부산', categories: ['관광','가족','자연'],            title: '태종대유원지',          desc: '영도 남단에 위치한 부산의 대표적인 자연 명승지.',                                                                                                             img: 'images/busan/태종대유원지.jpg',       coords: [35.0490, 129.0820] },
  { location: '부산', categories: ['관광'],                        title: '해동용궁사',            desc: '거친 해안 바위 위에 지어진 독특하고 아름다운 수상 법당.',                                                                                                     img: 'images/busan/해동용궁사.jpg',         coords: [35.1891, 129.2249] },
  { location: '부산', categories: ['관광','체험','힐링','커플'],     title: '송도해상케이블카',      desc: '동쪽 송림공원에서부터 서쪽 암남공원까지 바다 위를 가로지르는 짜릿한 해상 케이블카.',                                                                           img: 'images/busan/송도해상케이블카.jpg',   coords: [35.0867, 129.0102] },
  { location: '부산', categories: ['힐링','관광','자연'],            title: '아홉산숲',             desc: '한 가문이 400년 동안 가꾸어 온 비밀스러운 숲.',                                                                                                               img: 'images/busan/아홉산숲.jpg',           coords: [35.2630, 129.2060] },
  { location: '부산', categories: ['힐링','관광','체험','커플'],     title: '화명수목원',           desc: '대천천 계곡을 따라 조성된 숲에서 다양한 식물들을 만나는 도심 속 자연 휴식 공간.',                                                                              img: 'images/busan/화명수목원.jpg',         coords: [35.2419, 128.9981] },
  { location: '부산', categories: ['힐링','체험','커플'],            title: '스파랜드 센텀시티',     desc: '천연 온천수로 채워진 다채로운 테마의 찜질방과 노천탕에서 여행의 피로를 푸는 곳.',                                                                              img: 'images/busan/스파랜드.jpg',           coords: [35.1686, 129.1316] },
  { location: '부산', categories: ['힐링','관광'],                  title: '청사포 다릿돌전망대',   desc: '동해안의 수려한 해안 경관과 일출, 일몰을 감상하며 바다 한가운데 서 있는 듯한 전망대.',                                                                        img: 'images/busan/다릿돌전망대.jpg',       coords: [35.1725, 129.2050] },
  { location: '부산', categories: ['쇼핑','관광'],                  title: '신세계백화점 센텀시티점', desc: '세계 최대 규모로 기네스북에 등재된 복합 쇼핑몰.',                                                                                                           img: 'images/busan/신세계백화점.jpg',       coords: [35.1693, 129.1302] },
  { location: '부산', categories: ['쇼핑','관광'],                  title: '국제시장',             desc: '영화 배경으로도 유명한 부산의 대표 전통시장.',                                                                                                                 img: 'images/busan/국제시장.jpg',           coords: [35.0990, 129.0276] },
  { location: '부산', categories: ['쇼핑','관광','힐링'],            title: '롯데프리미엄아울렛 동부산점', desc: '그리스 산토리니를 모티브로 한 이국적인 건축물 안에서 다양한 브랜드를 합리적인 가격에 쇼핑.',                                                               img: 'images/busan/롯데프리미엄아울렛.jpg', coords: [35.1878, 129.2183] },
  { location: '부산', categories: ['쇼핑','관광'],                  title: 'BIFF광장 및 남포동 거리', desc: '부산 극장가의 역사이자 최신 패션 브랜드 로드숍과 길거리 먹거리가 가득한 곳.',                                                                               img: 'images/busan/BIFF광장.jpg',           coords: [35.0975, 129.0270] },

  // ===== 광주 =====
  { location: '광주', categories: ['관광','힐링','가족'],            title: '무등산 양떼목장',       desc: '푸른 초원에서 귀여운 양들과 교감하며 도심 속 힐링을 즐길 수 있는 곳.',                                                                                        img: 'images/gwangju/양떼목장.jpg',         coords: [35.1220, 126.9990] },
  { location: '광주', categories: ['문화','관광'],                  title: '국립아시아문화전당 (ACC)', desc: '아시아 문화 교류와 예술 창작의 중심지로, 옛 전남도청 부지에 지어진 독창적인 건축미의 공간.',                                                                  img: 'images/gwangju/국립아시아문화전당.jpg', coords: [35.1468, 126.9154] },
  { location: '광주', categories: ['문화','관광'],                  title: '광주 시립미술관',       desc: '중외공원의 아름다운 자연 속에 자리 잡은 호남 현대 미술의 중심지.',                                                                                              img: 'images/gwangju/광주시립미술관.jpg',   coords: [35.1665, 126.9025] },
  { location: '광주', categories: ['문화','관광'],                  title: '광주극장',             desc: '1935년에 문을 열어 국내에서 가장 오래된 단관 극장.',                                                                                                           img: 'images/gwangju/광주극장.jpg',         coords: [35.1505, 126.9185] },
  { location: '광주', categories: ['문화','힐링','가족'],            title: '양림동 펭귄마을 및 역사문화마을', desc: '100년 전 선교사들의 근대 건축물과 주민들이 버려진 물건으로 만든 정크아트가 공존하는 예술 마을.', img: 'images/gwangju/양림동펭귄마을.jpg',   coords: [35.1383, 126.9050] },
  { location: '광주', categories: ['힐링','자연'],                  title: '무등산 국립공원 및 서석대', desc: '광주의 어머니 산으로 불리며 해발 1,000m대 고지에 펼쳐진 거대한 주상절리대의 장엄한 풍경.',                                                                  img: 'images/gwangju/무등산.jpg',           coords: [35.1220, 126.9990] },
  { location: '광주', categories: ['관광','체험','커플','가족'],     title: '지산유원지 모노레일',   desc: '레트로한 감성의 리프트를 타고 올라가 무등산 절벽 위를 아슬아슬하게 달리는 모노레일.',                                                                           img: 'images/gwangju/지산유원지.jpg',       coords: [35.1412, 126.9562] },
  { location: '광주', categories: ['관광','힐링','자연'],            title: '광주호 호수생태원',     desc: '잔잔한 호숫가를 따라 끝없이 이어진 나무 데크길을 걸으며 수려한 습지 경관을 만나는 자연 휴식처.',                                                                img: 'images/gwangju/호수생태원.jpg',       coords: [35.1875, 126.9400] },
  { location: '광주', categories: ['관광','문화','자연','커플'],     title: '사직전망타워',         desc: '양림동 사직공원 높은 곳에 위치하여 광주 시내와 무등산의 파노라마 뷰를 감상하기 좋은 곳.',                                                                       img: 'images/gwangju/사직전망타워.JPG',     coords: [35.1380, 126.9022] },
  { location: '광주', categories: ['관광','체험','쇼핑'],            title: '1913송정역시장',       desc: '100년이 넘는 역사를 지닌 전통시장을 현대적인 감각으로 재해석한 핫플레이스.',                                                                                    img: 'images/gwangju/송정역시장.jpg',       coords: [35.1390, 126.7954] },
  { location: '광주', categories: ['힐링','문화'],                  title: '우제길미술관',         desc: '무등산 자락에 위치한 프라이빗한 예술 공간으로, 자연과 조화를 이루는 모던한 건축물.',                                                                             img: 'images/gwangju/우제길미술관.jpg',     coords: [35.1521, 126.9612] },
  { location: '광주', categories: ['힐링','관광','자연','커플'],     title: '풍암저수지 및 풍암호수공원', desc: '도심 속 잔잔한 호수를 따라 잘 조성된 장미원과 산책로를 걸으며 여유를 즐기는 쉼터.',                                                                        img: 'images/gwangju/풍암저수지.jpg',       coords: [35.1225, 126.8700] },
  { location: '광주', categories: ['힐링','자연'],                  title: '광주 시민의 숲',       desc: '첨단지구 영산강 변에 위치하여 울창한 야외 수목들과 잘 가꾸어진 잔디밭이 어우러진 곳.',                                                                           img: 'images/gwangju/시민의숲.jpg',         coords: [35.1920, 126.8380] },
  { location: '광주', categories: ['체험','관광','가족'],            title: '광주기아챔피언스필드',  desc: '국내 최고 수준의 야구장 시설을 갖춘 곳.',                                                                                                                     img: 'images/gwangju/기아챔피언스필드.jpg', coords: [35.1680, 126.8892] },
  { location: '광주', categories: ['체험','문화','가족'],            title: '빛고을공예창작촌',      desc: '전문 공예인들과 함께 전통 공예품을 직접 손으로 빚고 만들어볼 수 있는 문화 체험 공간.',                                                                           img: 'images/gwangju/빛고을공예창작촌.jpg', coords: [35.0710, 126.8900] },
  { location: '광주', categories: ['체험','문화'],                  title: '국립광주과학관',        desc: '빛, 예술, 과학을 아우르는 독창적인 전시물과 함께 실험·실습 프로그램을 제공하는 곳.',                                                                             img: 'images/gwangju/국립광주과학관.jpg',   coords: [35.1700, 126.8890] },
  { location: '광주', categories: ['체험','힐링','자연'],            title: '무등산 국립공원 평촌명품마을', desc: '무등산 자락의 청정 자연 속에서 전통 두부 만들기, 도예 체험, 생태 숲 탐방 등을 경험하는 마을.', img: 'images/gwangju/평촌마을.jpg',         coords: [35.1050, 127.0110] },
  { location: '광주', categories: ['쇼핑','관광'],                  title: '롯데아울렛 수완점',     desc: '호수공원 주변에 위치하여 수려한 경관을 바라보며 쇼핑을 즐길 수 있는 대규모 아울렛.',                                                                             img: 'images/gwangju/롯데아울렛수완.jpg',   coords: [35.1870, 126.8341] },
  { location: '광주', categories: ['쇼핑','관광'],                  title: '양동시장',             desc: '호남 지역에서 가장 큰 규모를 자랑하는 백년 전통의 종합 시장.',                                                                                                   img: 'images/gwangju/양동시장.jpg',         coords: [35.1458, 126.9021] },
  { location: '광주', categories: ['쇼핑','문화'],                  title: '대인예술시장',         desc: '전통시장의 활기찬 분위기 속에 지역 예술가들의 작업실과 갤러리가 스며들어 있는 이색 마켓.',                                                                       img: 'images/gwangju/대인시장.jpg',         coords: [35.1528, 126.9203] },
  { location: '광주', categories: ['쇼핑','관광'],                  title: '광주신세계 및 유스퀘어', desc: '호남 지역의 대표적인 쇼핑 랜드마크로, 명품 브랜드와 팝업스토어, 대형 서점, 영화관이 모인 곳.',                                                                 img: 'images/gwangju/광주신세계.jpg',       coords: [35.1517, 126.9175] },
  { location: '광주', categories: ['쇼핑','관광','커플'],            title: '충장로 및 예술의 거리', desc: '광주의 오랜 역사를 자랑하는 대표적인 패션 거리이자 고미술품과 서화를 구경하는 쇼핑 코스.',                                                                    img: 'images/gwangju/충장로.jpg',           coords: [35.1495, 126.9190] },
  { location: '광주', categories: ['문화','관광'],                  title: '포충사',               desc: '한옥의 고풍스러운 멋과 배롱나무 꽃이 어우러지는 고즈넉한 공간.',                                                                                                 img: 'images/gwangju/포충사.jpg',           coords: [35.1360, 126.8980] },

  // ===== 서울 =====
  { location: '서울', categories: ['문화','관광'],                  title: '국립중앙박물관',        desc: '대한민국을 대표하는 박물관으로 구석기 시대 유물부터 세계 문화재까지 아우르는 문화의 중심지.',                                                                    img: 'images/seoul/국립중앙박물관.jpg',     coords: [37.5239, 126.9804] },
  { location: '서울', categories: ['문화','관광','가족'],            title: '경복궁',               desc: '조선 왕조의 법궁으로, 웅장한 근정전과 아름다운 경회루를 거닐며 역사의 숨결을 느끼는 곳.',                                                                       img: 'images/seoul/경복궁.jpg',             coords: [37.5796, 126.9770] },
  { location: '서울', categories: ['문화','관광','가족'],            title: '동대문디자인플라자 (DDP)', desc: '자하 하디드가 설계한 우주선 모양의 비정형 건축물로 패션쇼와 현대 미술 전시가 열리는 공간.',                                                                   img: 'images/seoul/ddp.jpg',               coords: [37.5665, 127.0092] },
  { location: '서울', categories: ['문화','힐링','체험','커플','가족'], title: '예술의전당',          desc: '오페라하우스, 음악당, 미술관 등이 한데 모인 아시아 최고 수준의 복합아트센터.',                                                                                   img: 'images/seoul/예술의전당.webp',        coords: [37.4834, 127.0142] },
  { location: '서울', categories: ['문화','관광','커플'],            title: '대학로 연극거리',       desc: '한국 소극장 문화의 메카로, 수많은 소극장에서 연극과 뮤지컬이 상연되는 거리.',                                                                                    img: 'images/seoul/대학로.jpg',             coords: [37.5819, 127.0022] },
  { location: '서울', categories: ['힐링','문화','가족','커플'],     title: '서울대공원 산림욕장',   desc: '청계산 막계골의 수려한 자연림을 따라 조성된 산림욕장 길.',                                                                                                       img: 'images/seoul/서울대공원.jpg',         coords: [37.4275, 127.0169] },
  { location: '서울', categories: ['힐링','관광','자연'],            title: '서울숲',               desc: '울창한 숲과 넓은 잔디밭, 거울연못이 어우러진 도심 속 오아시스.',                                                                                                 img: 'images/seoul/서울숲.jpg',             coords: [37.5443, 127.0374] },
  { location: '서울', categories: ['힐링','관광','자연'],            title: '푸른수목원',           desc: '구로구 끝자락에 위치하여 항동저수지를 둘러싼 데크길과 옛 항동철길의 아날로그 감성이 어우러진 곳.',                                                                img: 'images/seoul/푸른수목원.jpg',         coords: [37.4832, 126.8242] },
  { location: '서울', categories: ['힐링','문화'],                  title: '길상사',               desc: '성북동 자락의 고즈넉한 사찰로, 소박하고 단정한 전각들과 맑은 바람 소리가 가득한 곳.',                                                                            img: 'images/seoul/길상사.jpg',             coords: [37.5947, 126.9964] },
  { location: '서울', categories: ['힐링','관광','자연'],            title: '선유도공원',           desc: '과거 정수장 시설을 친환경적인 생태공원으로 재탄생시킨 곳.',                                                                                                       img: 'images/seoul/선유도공원.webp',        coords: [37.5434, 126.8990] },
  { location: '서울', categories: ['힐링','관광'],                  title: '서촌 백인제가옥 및 한옥 골목', desc: '경복궁 서쪽 골목을 따라 이어진 근대 한옥의 정취를 느끼며 느리게 걷기 좋은 감성 산책로.',                                                                 img: 'images/seoul/백인제가옥.jpg',         coords: [37.5810, 126.9830] },
  { location: '서울', categories: ['자연','체험'],                  title: '불암산 나비생태공원',   desc: '불암산 자락에 위치한 생태 학습 공간으로, 무장애 산책로가 조성되어 접근성이 뛰어남.',                                                                             img: 'images/seoul/불암산생태공원.jpg',     coords: [37.6600, 127.0850] },
  { location: '서울', categories: ['자연','힐링'],                  title: '남산 둘레길',          desc: '남산의 생태계를 보존하며 고도 등고선을 따라 조성된 완만한 보행로.',                                                                                               img: 'images/seoul/남산둘레길.jpg',         coords: [37.5500, 126.9900] },
  { location: '서울', categories: ['자연','관광'],                  title: '북한산 국립공원',       desc: '거대한 화강암봉과 수려한 계곡으로 이루어진 세계적으로 드문 도심 속 국립공원.',                                                                                   img: 'images/seoul/북한산.jpg',             coords: [37.6584, 126.9782] },
  { location: '서울', categories: ['자연','커플'],                  title: '월드컵공원 하늘공원',   desc: '과거 난지도 쓰레기 매립지를 생태 공원으로 복원한 환경 재생의 대표적 사례.',                                                                                     img: 'images/seoul/하늘공원.jpg',           coords: [37.5678, 126.8854] },
  { location: '서울', categories: ['자연','관광','커플'],            title: '청계천 생태 산책로',    desc: '고가도로를 필거하고 도심 한가운데를 가로지르도록 복원된 인공 하천.',                                                                                             img: 'images/seoul/청계천.jpg',             coords: [37.5691, 126.9787] },
  { location: '서울', categories: ['체험','문화'],                  title: '국립항공박물관',        desc: '항공 산업의 역사와 기술을 전시하는 국립 시설로, 조종 시뮬레이터 체험이 가능한 곳.',                                                                              img: 'images/seoul/국립항공박물관.jpg',     coords: [37.5510, 126.8010] },
  { location: '서울', categories: ['체험','가족'],                  title: '코엑스 아쿠아리움',     desc: '수백 종의 해양 생물을 테마별 구역으로 나누어 전시한 대형 실내 수족관.',                                                                                           img: 'images/seoul/코엑스아쿠아리움.jpg',   coords: [37.5131, 127.0588] },
  { location: '서울', categories: ['체험','문화'],                  title: '북촌전통공방',         desc: '전통 한옥 구역 내 조성된 공예 체험 시설로 매듭, 천연 염색 등 전통 기술 실습 프로그램을 운영.',                                                                   img: 'images/seoul/북촌공방.jpg',           coords: [37.5820, 126.9850] },
  { location: '서울', categories: ['체험','커플'],                  title: '롯데월드 어드벤처',     desc: '도심 중심부에 위치한 대규모 실내외 복합 테마파크.',                                                                                                               img: 'images/seoul/롯데월드.jpg',           coords: [37.5111, 127.0982] },
  { location: '서울', categories: ['가족','관광','힐링'],            title: '남산서울타워 및 케이블카', desc: '레트로한 케이블카를 타고 올라가 서울의 탁 트인 파노라마 뷰를 감상하는 서울의 랜드마크.',                                                                     img: 'images/seoul/남산타워.jpg',           coords: [37.5512, 126.9882] },
  { location: '서울', categories: ['가족','문화','체험'],            title: '한성백제박물관 및 올림픽공원', desc: '넓은 나홀로나무 잔디밭에서 가족들과 뛰어놀거나 서울의 고대 역사를 체험하는 복합 휴식 공간.',                                                              img: 'images/seoul/한성백제박물관.jpg',     coords: [37.5206, 127.1214] },
  { location: '서울', categories: ['쇼핑','관광'],                  title: '동대문 패션타운 (두타몰)', desc: '대한민국 패션의 중심지이자 최신 트렌드의 의류와 잡화를 저렴하게 구매할 수 있는 곳.',                                                                          img: 'images/seoul/동대문패션타운.jpg',     coords: [37.5689, 127.0088] },
  { location: '서울', categories: ['쇼핑','관광'],                  title: '더현대 서울',          desc: '파격적인 실내 녹지 공간과 인공 폭포를 조성하여 자연 속에서 쇼핑하는 듯한 느낌의 쇼핑 명소.',                                                                    img: 'images/seoul/더현대서울.jpg',         coords: [37.5259, 126.9284] },
  { location: '서울', categories: ['쇼핑','관광'],                  title: '스타필드 코엑스몰',     desc: '거대한 별마당 도서관을 중심으로 패션, 뷰티, 라이프스타일 브랜드 매장이 펼쳐진 초대형 지하 복합 쇼핑몰.',                                                        img: 'images/seoul/코엑스몰.jpg',           coords: [37.5120, 127.0590] },
  { location: '서울', categories: ['쇼핑','문화'],                  title: '성수동 연무장길',       desc: '붉은 벽돌 공장들을 리모델링한 이색적인 공간 속 명품 및 디자이너 브랜드의 플래그십 스토어가 모인 거리.',                                                         img: 'images/seoul/성수동연무장길.jpg',     coords: [37.5440, 127.0540] },

  // ===== 전주 =====
  { location: '전주', categories: ['문화','관광','커플','가족'],     title: '전주한옥마을',         desc: '도심 한가운데 700여 채의 전통 한옥이 군락을 이루고 있는 국내 최대 규모의 한옥 주거지.',                                                                          img: 'images/jeonju/전주한옥마을.jpg',      coords: [35.8147, 127.1526] },
  { location: '전주', categories: ['문화','관광'],                  title: '경기전',               desc: '조선 태조 이성계의 어진을 모신 유서 깊은 공간으로, 울창한 대나무 숲길과 고풍스러운 전각들이 어우러지는 곳.',                                                    img: 'images/jeonju/경기전.jpg',            coords: [35.8153, 127.1495] },
  { location: '전주', categories: ['문화','관광'],                  title: '전동성당',             desc: '호남 지역 서양식 근대 건축물 중 가장 규모가 크고 오래된 성당으로, 붉은 벽돌의 로마네스크 양식이 아름다운 문화재.',                                               img: 'images/jeonju/전동성당.jpg',          coords: [35.8133, 127.1493] },
  { location: '전주', categories: ['문화','힐링','커플'],            title: '전주향교',             desc: '조선시대 지방 양반들의 교육기관으로, 수백 년 된 거대한 은행나무들이 고즈넉한 한옥 마당을 채우고 있는 곳.',                                                      img: 'images/jeonju/전주향교.jpg',          coords: [35.8122, 127.1565] },
  { location: '전주', categories: ['문화','체험'],                  title: '국립무형유산원',        desc: '무형문화재를 체계적으로 보존하고 전승하는 복합문화공간으로, 전통 공예품 전시와 수준 높은 판소리 공연을 무료로 관람하는 곳.',                                     img: 'images/jeonju/국립무형유산원.jpg',    coords: [35.8100, 127.1550] },
  { location: '전주', categories: ['문화','관광'],                  title: '국립전주박물관',        desc: '조선 전주이씨의 발상지이자 호남 문화의 중심이었던 전북 지역의 역사 유물을 한눈에 살펴볼 수 있는 곳.',                                                            img: 'images/jeonju/국립전주박물관.jpg',    coords: [35.8140, 127.0980] },
  { location: '전주', categories: ['문화','관광','가족'],            title: '자만벽화마을',         desc: '한옥마을이 내려다보이는 가파른 산동네 골목마다 아기자기하고 화려한 벽화들이 그려진 감성 마을.',                                                                 img: 'images/jeonju/자만벽화마을.jpg',      coords: [35.8140, 127.1580] },
  { location: '전주', categories: ['힐링','관광','자연','커플'],     title: '덕진공원',             desc: '전주의 허파 역할을 하는 곳으로, 여름이 되면 거대한 호수를 가득 채우는 붉은 연꽃의 향연을 감상할 수 있는 명소.',                                                 img: 'images/jeonju/덕진공원.jpg',          coords: [35.8475, 127.1215] },
  { location: '전주', categories: ['힐링','관광','자연'],            title: '전주수목원',           desc: '사계절 다채로운 야생화와 울창한 유리온실, 인스타 포토존으로 유명한 습지원 장미원 풍경 속에서 산림욕을 즐기는 곳.',                                               img: 'images/jeonju/전주수목원.jpg',        coords: [35.8710, 127.0600] },
  { location: '전주', categories: ['힐링','관광','자연','가족'],     title: '완산칠봉 꽃동산',       desc: '봄이 되면 온 산이 겹벚꽃과 철쭉으로 뒤덮여 붉은 꽃 파도를 이루는 힐링 코스.',                                                                                  img: 'images/jeonju/완산칠봉.jpg',          coords: [35.8080, 127.1400] },
  { location: '전주', categories: ['힐링','문화','커플'],            title: '아중호수 (아중저수지)', desc: '산으로 둘러싸인 아늑한 저수지를 따라 수상 데크길이 이어진 산책로로, 야간 조명과 물 위에 비친 별빛을 보며 산책하기 좋은 곳.',                                    img: 'images/jeonju/아중호수.jpg',          coords: [35.8270, 127.1850] },
  { location: '전주', categories: ['힐링','문화'],                  title: '한옥마을 오목대',       desc: '한옥마을 나지막한 언덕 끝자락에 위치한 정자로, 발아래로 펼쳐진 수백 채 한옥 지붕들의 고즈넉한 곡선미를 감상하는 휴식 공간.',                                    img: 'images/jeonju/오목대.jpg',            coords: [35.8145, 127.1545] },
  { location: '전주', categories: ['힐링','관광','자연'],            title: '건지산 편백나무숲',     desc: '전북대학교 인근에 위치하여 빽빽하게 우거진 편백나무 군락에서 진한 피톤치드 향을 마시며 쉴 수 있는 쉼터.',                                                        img: 'images/jeonju/건지산.jpg',            coords: [35.8500, 127.1350] },
  { location: '전주', categories: ['힐링','관광'],                  title: '전주천 생태한울길',     desc: '한옥마을 옆을 흐르는 1급수 청정 하천을 따라 조성된 생태 산책로.',                                                                                                 img: 'images/jeonju/전주천.jpg',            coords: [35.8150, 127.1450] },
  { location: '전주', categories: ['자연','힐링'],                  title: '전주 삼경사 및 기린봉 숲길', desc: '전주의 동쪽을 지키는 기린봉 자락에 위치하여 소나무 숲길을 따라 맑은 공기를 듬뿍 마실 수 있는 청정 자연 산책로.',                                           img: 'images/jeonju/기린봉.jpg',            coords: [35.8200, 127.1650] },
  { location: '전주', categories: ['자연','관광'],                  title: '색장정원 주변 원당천변', desc: '전주 외곽의 한적한 시골 정취를 간직한 곳으로, 원당천을 따라 야생화와 들풀을 보며 자연 고유의 흙냄새를 맡을 수 있는 숨은 생태 명소.',                           img: 'images/jeonju/원당천.jpg',            coords: [35.7831, 127.1552] },
  { location: '전주', categories: ['자연','힐링','가족'],            title: '상림동 맹종죽 대나무숲', desc: '영화 촬영지로도 알려진 전주 외곽의 비밀스러운 대나무 군락지로, 거대한 맹종죽 사이로 불어오는 대바람 소리를 들으며 산림욕을 즐기는 숲.',                         img: 'images/jeonju/맹종죽숲.jpg',          coords: [35.8242, 127.0494] },
  { location: '전주', categories: ['체험','문화'],                  title: '전주전통술박물관',      desc: '전통 가양주 문화의 맥을 잇는 곳으로, 막걸리 거르기, 모주 끓이기 등 직접 전통주를 빚어보는 이색 체험장.',                                                          img: 'images/jeonju/전통술박물관.jpg',      coords: [35.8155, 127.1540] },
  { location: '전주', categories: ['체험','관광','커플'],            title: '전주난장',             desc: '근현대사 80년의 손때 묻은 실제 소품들을 모아 만든 체험형 레트로 테마파크.',                                                                                         img: 'images/jeonju/전주난장.jpg',          coords: [35.8170, 127.1520] },
  { location: '전주', categories: ['체험','문화','가족'],            title: '전주비빔밥 체험관 (한벽문화관)', desc: '전주의 대표 음식인 비빔밥의 역사와 유래를 배우고 직접 가마솥이나 놋그릇에 비빔밥을 요리하고 시식하는 체험.',                                              img: 'images/jeonju/비빔밥체험.jpg',        coords: [35.8130, 127.1570] },
  { location: '전주', categories: ['체험','문화','가족','커플'],     title: '전주부채문화관',        desc: '조선시대 선자청의 맥을 이어 전통 부채인 합죽선과 태극선의 아름다움을 조명하고, 나만의 부채를 만드는 곳.',                                                          img: 'images/jeonju/부채문화관.jpg',        coords: [35.8140, 127.1530] },
  { location: '전주', categories: ['쇼핑','문화'],                  title: '전주남부시장 청년몰',   desc: '전통시장 2층 유휴 공간을 젊은 사장들의 아이디어로 채운 핸드메이드 소품, 독특한 액세서리, 레트로 굿즈 문화 마켓.',                                                  img: 'images/jeonju/청년몰.jpg',            coords: [35.8125, 127.1485] },
  { location: '전주', categories: ['쇼핑','관광'],                  title: '한옥마을 공방 및 기념품 거리', desc: '태조로와 은행로를 따라 길게 이어진 쇼핑 거리로, 전주 한지 공예품, 전통 부채, 수제 도장 등 로컬 색이 짙은 기념품을 구매할 수 있는 곳.',                     img: 'images/jeonju/한옥마을쇼핑.jpg',      coords: [35.8140, 127.1520] },
  { location: '전주', categories: ['쇼핑','문화'],                  title: '객리단길 소품숍 골목',  desc: '트렌디한 카페와 맛집들이 모여 있는 다가동 객사길 구석구석에 위치한 개성 있는 인테리어 소품, 빈티지 의류 편집숍들이 밀집한 거리.',                                  img: 'images/jeonju/객리단길소품숍.jpg',    coords: [35.8180, 127.1430] },
  { location: '전주', categories: ['쇼핑','관광'],                  title: '롯데백화점 전주점',     desc: '전주 서신동에 위치한 전북 지역 최대 규모의 백화점으로, 국내외 유명 패션 브랜드와 뷰티 매장, 대형 식품관과 영화관이 한데 모인 곳.',                            img: 'images/jeonju/롯데백화점전주.jpg',    coords: [35.8360, 127.1260] },
  { location: '전주', categories: ['쇼핑','관광'],                  title: '전주 모래내시장',       desc: '전주 시내 중심에 위치한 전통 종합 시장으로, 신선한 로컬 농수산물과 옛날 방식 그대로 구워내는 과자류 등 정겨운 시골 장터의 매력이 가득한 곳.',                     img: 'images/jeonju/모래내시장.jpg',        coords: [35.8330, 127.1450] },
  { location: '전주', categories: ['커플','관광'],                  title: '전주남부시장 야시장',   desc: '금요일과 토요일 밤이 되면 화려한 조명 아래 맛있는 길거리 음식들과 청년몰 소품들이 가득해지는 마켓.',                                                               img: 'images/jeonju/남부야시장.jpg',        coords: [35.8125, 127.1485] },
];

/* =====================================================
   DOM READY
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ----- 1. 여행지 단일 선택 ----- */
  const placeCards = document.querySelectorAll('.place-card');
  placeCards.forEach(card => {
    card.addEventListener('click', () => {
      placeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  /* ----- 2. 카테고리 복수 선택 (토글) ----- */
  const categoryBtns = document.querySelectorAll('.cat-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('selected'));
  });

  /* ----- 3. 완료 버튼 → 추천 카드 렌더링 ----- */
  document.getElementById('submitBtn').addEventListener('click', () => {
    const place = document.querySelector('.place-card.selected .place-name')?.innerText;
    const cats  = [...document.querySelectorAll('.cat-btn.selected')].map(b => b.innerText);

    if (!place || cats.length === 0) {
      alert('여행지와 카테고리를 모두 선택해주세요!');
      return;
    }

    const locationMap = { 부산: 'busan', 광주: 'gwangju', 서울: 'seoul', 전주: 'jeonju' };
    const filtered    = mockData.filter(
      item => item.location === place && cats.some(c => item.categories.includes(c))
    );

    const grid = document.getElementById('recommendGrid');
    grid.innerHTML = '';

    if (filtered.length === 0) {
      alert(`[${place}] 지역에서 선택하신 카테고리에 맞는 여행지가 아직 등록되어 있지 않습니다.`);
      document.getElementById('recommend-result').style.display = 'none';
      return;
    }

    filtered.forEach(item => {
      const fallback = `images/${locationMap[item.location] || 'busan'}/default.jpg`;
      const tagsHtml = item.categories
        .map(c => `<span class="tag" data-title="${item.title}">#${c}</span>`)
        .join('');

      grid.insertAdjacentHTML('beforeend', `
        <div class="recommend-card">
          <img src="${item.img}" alt="${item.title}" onerror="this.src='${fallback}'">
          <div class="recommend-info">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="recommend-tags">
              <span class="tag" data-title="${item.title}">#${item.location}</span>
              ${tagsHtml}
            </div>
          </div>
        </div>
      `);
    });

    const resultSection = document.getElementById('recommend-result');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    bindTagEvents(filtered);
  });

  /* =====================================================
     교통수단 상태
     ===================================================== */
  let currentTransport = 'car';

  /* =====================================================
     선택된 코스 목록
     ===================================================== */
  let selectedCoursePlaces = [];

  /* ----- 4. 태그 클릭 → 장소 코스 추가/제거 ----- */
  function bindTagEvents(allData) {
    document.querySelectorAll('.recommend-tags .tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const cardTitle  = tag.dataset.title;
        const targetPlace = allData.find(d => d.title === cardTitle);
        if (!targetPlace) return;

        const existIdx = selectedCoursePlaces.findIndex(p => p.title === targetPlace.title);
        if (existIdx !== -1) {
          selectedCoursePlaces.splice(existIdx, 1);
          document.querySelectorAll(`.tag[data-title="${cardTitle}"]`).forEach(t => t.classList.remove('tag-active'));
        } else {
          selectedCoursePlaces.push(targetPlace);
          document.querySelectorAll(`.tag[data-title="${cardTitle}"]`).forEach(t => t.classList.add('tag-active'));
        }

        if (selectedCoursePlaces.length === 0) {
          closeCoursePanel();
        } else {
          openCoursePanel(selectedCoursePlaces);
        }
      });
    });
  }

  /* =====================================================
     카카오맵 관련 변수
     ===================================================== */
  let kakaoMap     = null;
  let mapPolylines = [];
  let mapOverlays  = [];

  /* =====================================================
     패널 열기 / 닫기
     ===================================================== */
  function openCoursePanel(places) {
    if (places.length === 0) return;
    const panel = document.getElementById('course-panel');
    panel.style.display = 'flex';
    requestAnimationFrame(() => panel.classList.add('open'));
    renderCourseList(places);
    renderMap(places);
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeCoursePanel() {
    const panel = document.getElementById('course-panel');
    panel.classList.remove('open');
    setTimeout(() => { panel.style.display = 'none'; }, 400);
  }

  /* =====================================================
     Haversine 직선 거리 (km)
     ===================================================== */
  function getDistanceKm([lat1, lng1], [lat2, lng2]) {
    const R    = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a    = Math.sin(dLat / 2) ** 2
               + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
               * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /* =====================================================
     카카오 Directions API 호출
     - mode: 'CAR'
     - 반환: { distanceM, durationSec, path: [[lat,lng], ...] }
     ===================================================== */
  async function fetchRoute(origin, destination, mode) {
    /* 카카오 모빌리티 API: origin/destination은 lng,lat 순서 */
    const ox = origin[1],      oy = origin[0];
    const dx = destination[1], dy = destination[0];

    return await callDirectionsAPI(ox, oy, dx, dy, mode);
  }

  async function callDirectionsAPI(ox, oy, dx, dy, mode) {
    try {
      const endpoint = `https://apis-navi.kakaomobility.com/v1/directions?origin=${ox},${oy}&destination=${dx},${dy}&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

      const res  = await fetch(endpoint, {
        headers: { Authorization: `KakaoAK ${KAKAO_REST_KEY}` },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const route = data.routes?.[0];
      if (!route || route.result_code !== 0) throw new Error('경로 없음');

      const summary = route.summary;
      /* 경로 좌표 수집 */
      const path = [];
      route.sections.forEach(section => {
        section.roads.forEach(road => {
          for (let i = 0; i < road.vertexes.length; i += 2) {
            path.push([road.vertexes[i + 1], road.vertexes[i]]); // [lat, lng]
          }
        });
      });

      return {
        distanceM:   summary.distance,          // 미터
        durationSec: summary.duration,           // 초
        path,
      };
    } catch (e) {
      console.warn('Directions API 실패, 직선 fallback:', e.message);
      return null; // null이면 caller가 직선으로 폴백
    }
  }

  /* =====================================================
     시간 문자열 포맷
     ===================================================== */
  function formatDuration(seconds) {
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins}분`;
    return `${Math.floor(mins / 60)}시간 ${mins % 60 ? mins % 60 + '분' : ''}`;
  }

  function formatDistance(meters) {
    if (meters < 1000) return `${meters}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  }

  /* =====================================================
     코스 사이드바 렌더링
     ===================================================== */
  function renderCourseList(places) {
    const sidebar       = document.getElementById('course-sidebar');
    const courseTitleEl = document.getElementById('course-title');
    const cfg           = TRANSPORT_CONFIG[currentTransport];

    /* 총 직선거리 */
    let totalKm = 0;
    for (let i = 0; i < places.length - 1; i++) {
      totalKm += getDistanceKm(places[i].coords, places[i + 1].coords);
    }

    courseTitleEl.innerText = places.length === 1
      ? `📍 ${places[0].title}`
      : `총 ${places.length}곳 · 약 ${totalKm.toFixed(1)}km`;

    /* 교통수단 선택 버튼 (자동차만 표시) */
    const transportHtml = `
      <div class="transport-selector">
        ${Object.entries(TRANSPORT_CONFIG).map(([key, c]) => `
          <button class="transport-btn ${currentTransport === key ? 'active' : ''}" data-transport="${key}">
            <span>${c.icon}</span><span>${c.label}</span>
          </button>
        `).join('')}
      </div>
    `;

    /* 코스 아이템 (로딩 플레이스홀더 포함) */
    const itemsHtml = places.map((place, idx) => {
      const routeSlot = idx < places.length - 1
        ? `<div class="route-loading" id="route-slot-${idx}">
             <div class="spinner"></div>
             <span>경로 계산 중...</span>
           </div>`
        : '';

      return `
        <div class="course-item" data-idx="${idx}" draggable="true">
          <div class="drag-handle" title="드래그하여 순서 변경">⠿</div>
          <div class="course-step">
            <div class="course-num" style="background:${cfg.color}">${idx + 1}</div>
            <div class="course-line" ${idx === places.length - 1 ? 'style="visibility:hidden"' : ''}></div>
          </div>
          <div class="course-detail">
            <div class="course-place-name">${place.title}</div>
            <div class="course-place-cat">${place.categories.map(c => '#' + c).join(' ')}</div>
            <button class="course-remove-btn" data-idx="${idx}" title="코스에서 제거">✕</button>
            ${routeSlot}
          </div>
        </div>
      `;
    }).join('');

    sidebar.innerHTML = transportHtml + itemsHtml;

    bindTransportBtns();
    bindDragSort(sidebar, places);
    bindRemoveBtns(places);

    /* 비동기로 각 구간 실제 경로 정보 채우기 */
    for (let i = 0; i < places.length - 1; i++) {
      fillRouteSlot(i, places[i], places[i + 1]);
    }
  }

  /* 구간별 실제 경로 정보 비동기 채우기 */
  async function fillRouteSlot(idx, from, to) {
    const slot = document.getElementById(`route-slot-${idx}`);
    if (!slot) return;

    const cfg          = TRANSPORT_CONFIG[currentTransport];
    const straightDist = getDistanceKm(from.coords, to.coords);

    const apiMode = 'CAR';
    const result = await fetchRoute(from.coords, to.coords, apiMode);

    if (!slot.isConnected) return; // 사용자가 다른 선택을 한 경우 무시

    let distStr, timeStr;

    if (result) {
      distStr = formatDistance(result.distanceM);
      timeStr = formatDuration(result.durationSec);
    } else {
      /* API 실패 시 직선거리 기반 예측 (자동차 평균 40km/h) */
      const speed  = 40;
      distStr = `약 ${straightDist.toFixed(1)}km`;
      timeStr = formatDuration(straightDist / speed * 3600);
    }

    slot.outerHTML = `
      <div class="course-route-info" style="border-left-color:${cfg.color}">
        <span class="route-icon">${cfg.icon}</span>
        <span class="route-dist">${distStr}</span>
        <span class="route-sep">·</span>
        <span class="route-time">${timeStr}</span>
      </div>
    `;

    /* 이 구간의 실제 경로 지도에 반영 */
    if (result?.path?.length > 1) {
      updatePolylineSegment(idx, result.path, cfg.color, 'car');
    }
  }

  /* =====================================================
     교통수단 버튼 이벤트
     ===================================================== */
  function bindTransportBtns() {
    document.querySelectorAll('.transport-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTransport = btn.dataset.transport;
        document.querySelectorAll('.transport-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (selectedCoursePlaces.length > 0) {
          renderCourseList(selectedCoursePlaces);
          renderMap(selectedCoursePlaces);
        }
      });
    });
  }

  /* =====================================================
     카카오맵 렌더링
     - 초기에는 마커만 찍고, 구간 경로는 비동기로 채움
     ===================================================== */
  function renderMap(places) {
    const mapEl = document.getElementById('course-map');

    /* 기존 오버레이·폴리라인 제거 */
    mapPolylines.forEach(p => p?.setMap(null));
    mapOverlays.forEach(o => o?.setMap(null));
    mapPolylines = new Array(places.length - 1).fill(null);
    mapOverlays  = [];

    const center = new kakao.maps.LatLng(places[0].coords[0], places[0].coords[1]);
    if (!kakaoMap) {
      kakaoMap = new kakao.maps.Map(mapEl, { center, level: 8 });
    }

    const latlngs = [];

    /* 마커(번호 핀) */
    places.forEach((place, idx) => {
      const pos = new kakao.maps.LatLng(place.coords[0], place.coords[1]);
      latlngs.push(pos);

      const cfg = TRANSPORT_CONFIG[currentTransport];
      const overlay = new kakao.maps.CustomOverlay({
        position: pos,
        content: `
          <div class="map-pin">
            <div class="map-pin-num" style="background:${cfg.color}">
              <span>${idx + 1}</span>
            </div>
            <div class="map-pin-label">${place.title}</div>
          </div>`,
        yAnchor: 1.1,
        zIndex: 3,
      });
      overlay.setMap(kakaoMap);
      mapOverlays.push(overlay);
    });

    /* 지도 범위 자동 조정 */
    const bounds = new kakao.maps.LatLngBounds();
    latlngs.forEach(ll => bounds.extend(ll));
    kakaoMap.setBounds(bounds);

    /* 구간별 실제 경로는 비동기로 그림 */
    for (let i = 0; i < places.length - 1; i++) {
      drawRouteSegment(i, places[i], places[i + 1]);
    }
  }

  /* 구간별 실제 도로 경로 폴리라인 그리기 */
  async function drawRouteSegment(idx, from, to) {
    const apiMode = 'CAR';

    const result = await fetchRoute(from.coords, to.coords, apiMode);
    if (!result || !kakaoMap) return;

    const cfg = TRANSPORT_CONFIG[currentTransport];
    updatePolylineSegment(idx, result.path, cfg.color, 'car');
  }

  /* 폴리라인 업데이트 (기존 해당 구간 제거 후 신규 추가) */
  function updatePolylineSegment(idx, path, color, mode) {
    if (!kakaoMap) return;

    /* 이전 해당 구간 폴리라인 제거 */
    if (mapPolylines[idx]) {
      mapPolylines[idx].setMap(null);
    }

    const kakaoPath  = path.map(([lat, lng]) => new kakao.maps.LatLng(lat, lng));

    const polyline = new kakao.maps.Polyline({
      path:         kakaoPath,
      strokeWeight: 5,
      strokeColor:  color,
      strokeOpacity: 0.9,
      strokeStyle: 'solid',
    });
    polyline.setMap(kakaoMap);
    mapPolylines[idx] = polyline;
  }

  /* =====================================================
     드래그 & 드롭 순서 변경
     ===================================================== */
  let dragSrcIdx = null;

  function bindDragSort(sidebar, places) {
    const items = sidebar.querySelectorAll('.course-item');

    items.forEach(item => {
      item.addEventListener('dragstart', e => {
        dragSrcIdx = parseInt(item.dataset.idx);
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        sidebar.querySelectorAll('.course-item').forEach(i => i.classList.remove('drag-over'));
      });
      item.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        sidebar.querySelectorAll('.course-item').forEach(i => i.classList.remove('drag-over'));
        item.classList.add('drag-over');
      });
      item.addEventListener('drop', e => {
        e.preventDefault();
        const dropIdx = parseInt(item.dataset.idx);
        if (dragSrcIdx === null || dragSrcIdx === dropIdx) return;
        const moved = selectedCoursePlaces.splice(dragSrcIdx, 1)[0];
        selectedCoursePlaces.splice(dropIdx, 0, moved);
        dragSrcIdx = null;
        renderCourseList(selectedCoursePlaces);
        renderMap(selectedCoursePlaces);
      });
    });

    /* 터치 지원 */
    let touchStartY = 0;
    let touchIdx    = null;

    items.forEach(item => {
      item.addEventListener('touchstart', e => {
        touchIdx   = parseInt(item.dataset.idx);
        touchStartY = e.touches[0].clientY;
        item.classList.add('dragging');
      }, { passive: true });

      item.addEventListener('touchmove', e => {
        e.preventDefault();
        const delta   = e.touches[0].clientY - touchStartY;
        const allItems = [...sidebar.querySelectorAll('.course-item')];
        const newIdx   = Math.max(0, Math.min(allItems.length - 1, touchIdx + Math.round(delta / (item.offsetHeight + 8))));
        allItems.forEach(i => i.classList.remove('drag-over'));
        if (allItems[newIdx]) allItems[newIdx].classList.add('drag-over');
      }, { passive: false });

      item.addEventListener('touchend', e => {
        const delta   = e.changedTouches[0].clientY - touchStartY;
        const allItems = [...sidebar.querySelectorAll('.course-item')];
        const newIdx   = Math.max(0, Math.min(allItems.length - 1, touchIdx + Math.round(delta / (item.offsetHeight + 8))));
        if (newIdx !== touchIdx) {
          const moved = selectedCoursePlaces.splice(touchIdx, 1)[0];
          selectedCoursePlaces.splice(newIdx, 0, moved);
          renderCourseList(selectedCoursePlaces);
          renderMap(selectedCoursePlaces);
        } else {
          item.classList.remove('dragging');
          allItems.forEach(i => i.classList.remove('drag-over'));
        }
        touchIdx = null;
      });
    });
  }

  /* =====================================================
     코스에서 장소 제거
     ===================================================== */
  function bindRemoveBtns() {
    document.querySelectorAll('.course-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx     = parseInt(btn.dataset.idx);
        const removed = selectedCoursePlaces.splice(idx, 1)[0];

        document.querySelectorAll(`.tag[data-title="${removed.title}"]`)
          .forEach(t => t.classList.remove('tag-active'));

        if (selectedCoursePlaces.length === 0) {
          closeCoursePanel();
        } else {
          renderCourseList(selectedCoursePlaces);
          renderMap(selectedCoursePlaces);
        }
      });
    });
  }
});
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const mypageBtn = document.getElementById("mypage-btn");
const heroLoginBtn = document.getElementById("hero-login-btn");
const heroSignupBtn = document.getElementById("hero-signup-btn");

async function checkLoginStatus() {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();

    if (user) {
      if (loginBtn) {
        loginBtn.innerText = `${user.nickname}님`;
        loginBtn.onclick = () => { window.location.href = "/pages/mypage/mypage.html"; };
      }
      if (signupBtn) signupBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginUser", user.nickname);
    } else {
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("loginUser");

      const moveToLogin = () => {
        window.location.href = "/pages/login/login.html";
      };
      if (loginBtn) loginBtn.onclick = moveToLogin;
      if (heroLoginBtn) heroLoginBtn.onclick = moveToLogin;
    }
  } catch (err) {
    console.error("로그인 상태 확인 실패:", err);
  }
}

checkLoginStatus();

const moveSignup = () => {
  window.location.href = "/pages/login/signup.html";
};
signupBtn?.addEventListener("click", moveSignup);
heroSignupBtn?.addEventListener("click", moveSignup);

mypageBtn?.addEventListener("click", () => {
  if (localStorage.getItem("isLogin") !== "true") {
    alert("로그인이 필요합니다.");
    window.location.href = "/pages/login/login.html";
    return;
  }
  window.location.href = "/pages/mypage/mypage.html";
});

logoutBtn?.addEventListener("click", async () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다.");
  window.location.href = "/logout";
});