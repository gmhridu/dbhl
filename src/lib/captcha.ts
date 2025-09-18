interface CaptchaQuestion {
  question: string;
  answer: number;
  options: number[];
}

export function generateCaptcha(): CaptchaQuestion {
  const operations = [
    {
      type: 'addition',
      generate: () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        return {
          question: `What is ${a} + ${b}?`,
          answer: a + b,
        };
      },
    },
    {
      type: 'subtraction',
      generate: () => {
        const a = Math.floor(Math.random() * 15) + 5;
        const b = Math.floor(Math.random() * a) + 1;
        return {
          question: `What is ${a} - ${b}?`,
          answer: a - b,
        };
      },
    },
    {
      type: 'multiplication',
      generate: () => {
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 5) + 2;
        return {
          question: `What is ${a} × ${b}?`,
          answer: a * b,
        };
      },
    },
    {
      type: 'word_number',
      generate: () => {
        const numbers = [
          { word: 'one', value: 1 },
          { word: 'two', value: 2 },
          { word: 'three', value: 3 },
          { word: 'four', value: 4 },
          { word: 'five', value: 5 },
          { word: 'six', value: 6 },
          { word: 'seven', value: 7 },
          { word: 'eight', value: 8 },
          { word: 'nine', value: 9 },
          { word: 'ten', value: 10 },
        ];
        const selected = numbers[Math.floor(Math.random() * numbers.length)];
        return {
          question: `What is the number for "${selected.word}"?`,
          answer: selected.value,
        };
      },
    },
    {
      type: 'counting',
      generate: () => {
        const items = ['🔵', '⭐', '🟢', '🔶', '❤️', '🌟'];
        const selectedItem = items[Math.floor(Math.random() * items.length)];
        const count = Math.floor(Math.random() * 5) + 3;
        const display = selectedItem.repeat(count);
        return {
          question: `How many ${selectedItem} are there? ${display}`,
          answer: count,
        };
      },
    },
  ];

  const selectedOperation = operations[Math.floor(Math.random() * operations.length)];
  const { question, answer } = selectedOperation.generate();

  // Generate 3 wrong options
  const wrongOptions: number[] = [];
  while (wrongOptions.length < 3) {
    let wrongAnswer: number;
    if (answer <= 5) {
      wrongAnswer = Math.floor(Math.random() * 10) + 1;
    } else if (answer <= 20) {
      wrongAnswer = Math.floor(Math.random() * 25) + 1;
    } else {
      wrongAnswer = Math.floor(Math.random() * 50) + 1;
    }

    if (wrongAnswer !== answer && !wrongOptions.includes(wrongAnswer)) {
      wrongOptions.push(wrongAnswer);
    }
  }

  // Shuffle options
  const options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    question,
    answer,
    options,
  };
}

export function verifyCaptcha(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

// Generate a hash for server-side verification
export function generateCaptchaHash(answer: number, timestamp: number): string {
  // Simple hash function - in production, use a more secure method
  const secret = process.env.CAPTCHA_SECRET || 'dbhl-captcha-secret';
  const data = `${answer}-${timestamp}-${secret}`;

  // Simple hash implementation
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
}

export function verifyCaptchaHash(
  userAnswer: number,
  timestamp: number,
  providedHash: string
): boolean {
  const expectedHash = generateCaptchaHash(userAnswer, timestamp);
  const timeLimit = 10 * 60 * 1000; // 10 minutes
  const now = Date.now();

  // Check if captcha is expired
  if (now - timestamp > timeLimit) {
    return false;
  }

  return expectedHash === providedHash;
}
