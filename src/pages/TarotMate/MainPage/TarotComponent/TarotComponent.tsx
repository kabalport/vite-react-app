import { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { gptTarot } from "../../../../utils/gptTarot/getTarot";
import Snackbar from '@mui/material/Snackbar';


interface ResponseItem {
    message: {
        content: string;
    };
}

function TarotComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<ResponseItem[]>([]);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [selectedCardsText, setSelectedCardsText] = useState<string>(''); // 선택된 카드 텍스트 상태 추가
    const cardBackImage = "./backCard.png"; // 카드 뒷면 이미지 URL
    // 카드 선택 여부를 관리하는 상태 추가
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar 상태 추가

    const [showTarotCards, setShowTarotCards] = useState(false); // State to toggle visibility of tarot cards
    const [showResults, setShowResults] = useState(false); // 결과 표시 여부 관리


    const fortunes = [
        { label: "오늘의 운세", value: "오늘의 운세" },
        { label: "연애운", value: "연애운" },
        { label: "이번달 운세", value: "이번달 운세" },
    ];

    const [selectedFortune, setSelectedFortune] = useState(fortunes[0].value) || "";
    const [fortuneType, setFortuneType] = useState(fortunes[0].value);


    // 콤보박스 변경 핸들러
    const handleFortuneChange = (event) => {
        setSelectedFortune(event.target.value);
        setFortuneType(event.target.value);
    };

    // 타로 카드와 Unsplash 이미지 URL 매핑
    const tarotCards = [
        { number: 0, name: "광대", image: "../images/major_arcana_fool.png" },
        { number: 1, name: "마법사", image: "../images/major_arcana_magician.png" },
        { number: 2, name: "여사제", image: "../images/major_arcana_priestess.png" },
        { number: 3, name: "여황제", image: "../images/major_arcana_empress.png" },
        { number: 4, name: "황제", image: "../images/major_arcana_emperor.png" },
        { number: 5, name: "교황", image: "../images/major_arcana_hierophant.png" },
        { number: 6, name: "연인들", image: "../images/major_arcana_lovers.png" },
        { number: 7, name: "전차", image: "../images/major_arcana_chariot.png" },
        { number: 8, name: "힘", image: "../images/major_arcana_strength.png" },
        { number: 9, name: "은둔자", image: "../images/major_arcana_hermit.png" },
        { number: 10, name: "운명의 수레바퀴", image: "../images/major_arcana_fortune.png" },
        { number: 11, name: "정의", image: "../images/major_arcana_justice.png" },
        { number: 12, name: "매달린 사람", image: "../images/major_arcana_hanged.png" },
        { number: 13, name: "죽음", image: "../images/major_arcana_death.png" },
        { number: 14, name: "절제", image: "../images/major_arcana_temperance.png" },
        { number: 15, name: "악마", image: "../images/major_arcana_devil.png" },
        { number: 16, name: "탑", image: "../images/major_arcana_tower.png" },
        { number: 17, name: "별", image: "../images/major_arcana_star.png" },
        { number: 18, name: "달", image: "../images/major_arcana_moon.png" },
        { number: 19, name: "태양", image: "../images/major_arcana_sun.png" },
        { number: 20, name: "심판", image: "../images/major_arcana_judgement.png" },
        { number: 21, name: "세계", image: "../images/major_arcana_world.png" }
    ];


    const toggleCardSelection = (card: string) => {
        // 이미 뒤집힌 카드를 다시 선택하려고 하는 경우 아무런 동작을 하지 않습니다.
        if (flippedCards.has(card)) {
            alert("다시 뒤집을 수는 없습니다.")
            return;
        }

        // 이미 3장의 카드가 선택되었고, 새로운 카드를 선택하려고 하는 경우 아무런 동작을 하지 않습니다.
        if (selectedCards.length >= 3 && !selectedCards.includes(card)) {
            setOpenSnackbar(true); // 사용자가 3장의 카드를 모두 선택했을 때 Snackbar를 열어줍니다.
            return;
        }

        const newFlippedCards = new Set(flippedCards);
        newFlippedCards.add(card);

        setFlippedCards(newFlippedCards);

        // 선택된 카드 목록 업데이트
        if (!selectedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
    };


    const handleButtonClick = async () => {
        if (selectedCards.length < 3) {
            alert('3장의 카드를 선택해야 합니다.');
            return;
        }

        // 선택된 카드의 번호를 찾습니다
        const selectedCardNumbers = selectedCards.map(cardName => {
            const card = tarotCards.find(tarotCard => tarotCard.name === cardName);
            return card ? card.number : null;
        });

        // 선택된 카드의 이름과 번호를 포함하여 문자열 생성
        let tarotPrompt = `첫번째 카드는 ${selectedCardNumbers[0]}번 카드, 두번째 카드는 ${selectedCardNumbers[1]}번 카드, 세번째 카드는 ${selectedCardNumbers[2]}번 카드를 뽑았다.`;
        // 선택된 운세 유형에 따라 프롬프트를 조정
        if (fortuneType === '오늘의 운세') {
            tarotPrompt += " 오늘의 운세를 알려주세요.";
        } else if (fortuneType === '연애운') {
            tarotPrompt += " 연애운을 알려주세요.";
        } else if (fortuneType === '이번달 운세') {
            tarotPrompt += " 이번달 운세를 알려주세요.";
        }
        setSelectedCardsText(`${tarotPrompt}`);

        setIsLoading(true);
        try {
            const result: any = await gptTarot(tarotPrompt);
            setResponse(result.choices);
            setShowResults(true); // 결과를 표시하도록 설정
        } catch (error) {
            console.error('Error fetching GPT response:', error);
            setResponse([]);
        }
        setIsLoading(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    const renderResponse = (responseContent: any) => {
        // JSON 문자열을 객체로 변환
        const responseObj = JSON.parse(responseContent);

        return (
            <div style={{ margin: '10px' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>{responseObj.title}</Typography>
                <Typography variant="body1">{responseObj.summarize}</Typography>
                <Typography variant="body1">{responseObj.tarot}</Typography>
                <Typography variant="body1">{responseObj.action_list}</Typography>
            </div>
        );
    };


    const handleShowTarotCards = () => {
        setShowTarotCards(true);
    };


    return (
        <div style={{
            backgroundColor: '#000000', // 전체 배경색
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // 수직 중앙 정렬
            alignItems: 'center', // 수평 중앙 정렬
            minHeight: '100vh', // 전체 높이 차지
            width: '100%', // 너비를 100%로 설정
        }}>
            <div style={{
                padding: '20px',
                width: '400px', // 너비
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#000000',
                color: 'white'

            }}>
                {!showTarotCards && (
               <>
                   <Typography variant="body1" style={{ marginBottom: '20px', color: 'gold' }}>
                        보고싶은 점
                   </Typography>
                   {/* 콤보박스로 변경된 부분 */}
                   <FormControl fullWidth style={{ marginBottom: '20px', maxWidth: '360px' }}>
                       <InputLabel id="fortune-select-label" style={{ color: 'white' }}>운세 선택</InputLabel>
                       <Select
                           labelId="fortune-select-label"
                           id="fortune-select"
                           value={selectedFortune}
                           label="운세 선택"
                           onChange={handleFortuneChange}
                           style={{ color: 'white', borderBottom: '1px solid white' }}
                       >
                           {fortunes.map((fortune) => (
                               <MenuItem key={fortune.value} value={fortune.value}>
                                   {fortune.label}
                               </MenuItem>
                           ))}
                       </Select>
                   </FormControl>

                   <img src="../images/fortune-teller.png" alt="점성술사" width="360" height="360" />

                       <Card
                           style={{
                               width: '360px', // 너비
                               height: '180px', // 높이
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               backgroundColor: '#1a1a1a', // 회색 배경
                               margin: '20px 0' // 상하 여백
                           }}
                       >
                           <Typography variant="h5" style={{ padding: '20px', textAlign: 'center', color: 'gold', fontSize: '16px', fontWeight:600,  }}>
                               선택한 카드를 통해
                               운세를 점쳐드립니다.
                           </Typography>
                       </Card>
                {/* 선택된 운세 유형에 따른 텍스트 표시 */}
                   <Button
                       variant="contained"
                       onClick={handleShowTarotCards}
                       style={{
                           marginBottom: '20px',
                           width: '360px', // 버튼의 가로 길이 설정
                           height: '48px',
                           backgroundColor: '#7758af', // 버튼 색상 설정
                           color: 'white', // 텍스트 색상을 흰색으로 설정
                           fontSize: '18px',
                           fontWeight: 600,
                           borderRadius: '5px',
                           '&:hover': {
                               backgroundColor: '#664291' // 호버 시 버튼 색상 변경 (옵션)
                           }
                       }}
                   >
                       타로 카드 보기
                   </Button>
                   <Card
                       style={{
                           backgroundColor: '#424242', // 짙은 회색 배경
                           color: '#fff', // 텍스트 색상을 흰색으로 설정
                           margin: '20px 0', // 상하 여백
                           padding: '10px', // 내부 패딩
                           width: '360px', // 가로 길이 100%
                           boxSizing: 'border-box', // 박스 크기 설정
                           borderRadius: '4px', // 모서리 둥글게
                       }}
                   >
                       <Typography
                           variant="body2"
                           style={{
                               fontSize: '0.875rem', // 폰트 사이즈 설정
                               textAlign: 'center', // 중앙 정렬
                               fontWeight: 'lighter', // 글씨 무게
                           }}
                       >
                           입력하신 정보는 타로메이트 서비스 이용 외 별도 동의없이 공유되지 않으며,
                           개인정보보호정책에 의해 보호받고 있습니다
                       </Typography>
                   </Card>


               </>
                )}
                {showTarotCards && !showResults &&
                    (<>
                            <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                                message="3장의 카드를 모두 선택하셨습니다."
                            />

                            <Typography variant="body1" style={{ marginBottom: '20px', color: 'gold' }}>

                                {selectedCards.length === 3 ? "카드를 다시 고를 수 없습니다. " :
                                    `${3 - selectedCards.length}장의 카드를 신중하게 선택해 주세요.`
                                }
                            </Typography>
                            {fortuneType && (
                                <Typography variant="h6" style={{ marginBottom: '20px', color: 'gold' }}>
                                    {`"${fortuneType}"에 맞는 타로점을 보여드리겠습니다.`}
                                </Typography>
                            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '10px' }}>
                {tarotCards.map((card, index) => (
                    <Card
                        key={index}
                        style={{
                            cursor: 'pointer',
                            margin: '5px',
                            width: '90px',
                            height: '120px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.3s ease, border 0.3s ease',
                            border: selectedCards.includes(card.name) ? '3px solid gold' : '', // 선택된 카드에 두꺼운 금색 테두리 추가
                            transform: flippedCards.has(card.name) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                        onClick={() => toggleCardSelection(card.name)}
                    >
                        {/* 카드 전면 */}
                        <CardContent style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            backfaceVisibility: 'hidden',
                            border: selectedCards.includes(card.name) ? '2px solid #1976d2' : '1px solid #ddd',
                            transform: flippedCards.has(card.name) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            zIndex: flippedCards.has(card.name) ? 1 : 0 }}>
                        </CardContent>

                        {/* 카드 뒷면 */}
                        <CardContent style={{
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${flippedCards.has(card.name) ? card.image : cardBackImage})`,
                            transform: flippedCards.has(card.name) ? 'rotateY(180deg)' : 'rotateY(0deg)', // 뒤집힌 카드는 뒷면을 보여줌
                            zIndex: flippedCards.has(card.name) ? 1 : 0 // 뒤집힌 카드는 뒷면을 보여줌
                        }}>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Typography variant="h5" style={{ color: 'gold', marginBottom: '20px' }}>
                {`남은 카드 선택 가능 수: ${3 - selectedCards.length}`}
            </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleButtonClick}
                            disabled={selectedCards.length !== 3 || isLoading}
                            style={{
                                marginBottom: '20px',
                                padding: '15px 30px',
                                fontSize: '1rem',
                                borderRadius: '25px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                                backgroundColor: selectedCards.length !== 3 || isLoading ? '#bdbdbd' : '', // 비활성화 시 회색으로 변경
                                color: selectedCards.length !== 3 || isLoading ? '#757575' : '' // 비활성화 시 텍스트 색 변경
                            }}
                        >
                            타로하기
                        </Button>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
                {selectedCardsText} {/* 로딩 중 선택된 카드 텍스트 표시 */}
            </Typography>
                    </>
                )}

            {isLoading ? (
                <>
                <CircularProgress />
                </>
                ) : (
                // 결과 표시 영역
             <>
                {showResults && (
                    response && response.map((res, index) => (
                        <Card key={index} style={{ margin: '10px', maxWidth: 600 }}>
                        <CardContent>
                            {renderResponse(res.message.content)}
                        </CardContent>
                    </Card>
                ))
            )}
             </>
                )}
            </div>
        </div>
    );
}

export default TarotComponent;
