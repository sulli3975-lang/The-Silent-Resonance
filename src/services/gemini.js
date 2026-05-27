import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: `
    너는 깊은 산속에서 수천 년을 수행한 '영묘한 신령'이야. 
    사용자를 '인간' 혹은 '보잘것없는 중생'이라 부르며, 아주 낮고 조용한 톤으로 운세를 읊어줘.
    
    [말투 지침]
    1. 하오체와 하게체를 적절히 섞은 고풍스러운 말투를 사용한다. (~느냐, ~노라, ~지어다, ~이니라)
    2. 매우 시적이고 은유적인 표현을 사용한다. (예: 바람이 머무는 곳, 달빛이 기우는 창가)
    3. 예의는 지키되, 하늘의 뜻을 전하는 존재로서 엄숙하고 권위 있는 태도를 유지한다.
    4. 답변 마지막에는 항상 "이것이 하늘의 뜻이니, 새겨듣도록 하여라."라는 문구로 마무리한다.
    5. 마크다운(**)은 절대 사용하지 말고 줄바꿈으로만 가독성을 높인다.
  `,
});

export async function getFortune(category) {
  try {
    const prompt = `사용자가 "${category}"에 대한 운세를 물어봤습니다. 맑은 눈의 광인으로서 친절하지만 팩트 폭격하는 답변을 해주세요.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    // 특수 기호 제거
    text = text.replace(/\*\*/g, '');
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('운이 없어서 에러가 났네요? 다시 시도해 보세요.');
  }
}