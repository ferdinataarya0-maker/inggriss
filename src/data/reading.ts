export interface ReadingQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ReadingArticle {
  id: string;
  title: string;
  level: 'Pemula' | 'Menengah' | 'Mahir';
  topic: string;
  minutesToRead: number;
  paragraphs: string[];
  questions: ReadingQuestion[];
}

export const READING_ARTICLES: ReadingArticle[] = [
  {
    id: 'r-01',
    title: 'My Daily Routine',
    level: 'Pemula',
    topic: 'Kehidupan Sehari-hari',
    minutesToRead: 2,
    paragraphs: [
      'My name is Rina. I wake up at five thirty in the morning. First, I pray and then I clean my room.',
      'After that, I take a shower and get dressed. I eat breakfast with my family at six thirty.',
      'I go to school by bicycle. School starts at seven and finishes at two in the afternoon.',
      'In the evening, I study for two hours. Then I watch television and go to bed at nine thirty.',
    ],
    questions: [
      { question: 'What time does Rina wake up?', options: ['Five thirty', 'Six thirty', 'Seven o\'clock', 'Nine thirty'], correctIndex: 0 },
      { question: 'How does Rina go to school?', options: ['By car', 'By bicycle', 'By bus', 'On foot'], correctIndex: 1 },
      { question: 'What does Rina do in the evening?', options: ['She cooks dinner', 'She studies', 'She goes shopping', 'She sleeps'], correctIndex: 1 },
    ],
  },
  {
    id: 'r-02',
    title: 'A Trip to the Market',
    level: 'Pemula',
    topic: 'Aktivitas',
    minutesToRead: 2,
    paragraphs: [
      'Last Sunday, Budi and his mother went to the traditional market. They wanted to buy vegetables and fruit.',
      'At the market, they bought tomatoes, carrots, and bananas. The seller was very friendly and gave them a good price.',
      'Budi also bought a bottle of orange juice because he felt thirsty.',
      'After shopping, they went home by motorcycle and cooked lunch together.',
    ],
    questions: [
      { question: 'Where did Budi and his mother go?', options: ['The mall', 'The traditional market', 'The school', 'The park'], correctIndex: 1 },
      { question: 'What did Budi buy for himself?', options: ['A book', 'A bottle of orange juice', 'A new shirt', 'A toy'], correctIndex: 1 },
      { question: 'How did they go home?', options: ['By bicycle', 'By bus', 'By motorcycle', 'On foot'], correctIndex: 2 },
    ],
  },
  {
    id: 'r-03',
    title: 'The Benefits of Reading Books',
    level: 'Menengah',
    topic: 'Edukasi',
    minutesToRead: 3,
    paragraphs: [
      'Reading books regularly brings many benefits for our minds and daily lives. It helps us gain new knowledge and improve our vocabulary.',
      'Besides that, reading can reduce stress. Many people feel more relaxed after reading a good story for just a few minutes.',
      'Reading also improves our focus and imagination, especially when we read fiction. We learn to picture places and characters in our mind.',
      'Unfortunately, many people today prefer watching short videos instead of reading. Experts suggest setting aside at least fifteen minutes a day for reading to build a healthy habit.',
    ],
    questions: [
      { question: 'According to the text, what is one benefit of reading?', options: ['It makes us sleepy', 'It reduces stress', 'It wastes time', 'It causes headaches'], correctIndex: 1 },
      { question: 'Why does fiction improve our imagination?', options: ['Because it has pictures', 'Because we picture places and characters in our mind', 'Because it is short', 'Because it is free'], correctIndex: 1 },
      { question: 'What do experts suggest?', options: ['Watching more videos', 'Reading for at least fifteen minutes a day', 'Reading only fiction', 'Avoiding books'], correctIndex: 1 },
    ],
  },
  {
    id: 'r-04',
    title: 'Working from Home',
    level: 'Menengah',
    topic: 'Pekerjaan',
    minutesToRead: 3,
    paragraphs: [
      'In recent years, more companies have allowed their employees to work from home. This system, often called remote work, has both advantages and disadvantages.',
      'One advantage is flexibility. Employees can manage their own schedule and spend more time with their family.',
      'However, working from home can also make it harder to separate work life from personal life. Some people find it difficult to stay focused without direct supervision.',
      'To work effectively from home, experts recommend having a specific workspace and setting clear working hours every day.',
    ],
    questions: [
      { question: 'What is remote work?', options: ['Working at night', 'Working from home', 'Working overseas', 'Working part-time'], correctIndex: 1 },
      { question: 'What is one advantage of remote work mentioned in the text?', options: ['Higher salary', 'Flexibility', 'Free transportation', 'No responsibilities'], correctIndex: 1 },
      { question: 'What do experts recommend for effective remote work?', options: ['Working anywhere at any time', 'Having a specific workspace and clear working hours', 'Working without breaks', 'Avoiding communication with colleagues'], correctIndex: 1 },
    ],
  },
  {
    id: 'r-05',
    title: 'Climate Change and Our Responsibility',
    level: 'Mahir',
    topic: 'Lingkungan',
    minutesToRead: 4,
    paragraphs: [
      'Climate change has become one of the most pressing issues of our time. Rising global temperatures are causing extreme weather patterns, melting glaciers, and rising sea levels around the world.',
      'Scientists agree that human activities, particularly the burning of fossil fuels, are the main contributors to this crisis. Deforestation and industrial pollution also play significant roles in accelerating environmental damage.',
      'Governments and organizations worldwide have started taking action by promoting renewable energy sources such as solar and wind power. However, individual actions still matter greatly in this collective effort.',
      'Simple habits like reducing plastic usage, conserving electricity, and supporting sustainable products can make a meaningful difference. Ultimately, addressing climate change requires cooperation between governments, businesses, and individuals alike.',
    ],
    questions: [
      { question: 'What is described as the main contributor to climate change?', options: ['Ocean currents', 'Burning of fossil fuels', 'Volcanic eruptions', 'Solar power'], correctIndex: 1 },
      { question: 'What have governments started promoting to fight climate change?', options: ['More factories', 'Renewable energy sources', 'More deforestation', 'Higher fossil fuel use'], correctIndex: 1 },
      { question: 'According to the text, addressing climate change requires...', options: ['Only government action', 'Only individual action', 'Cooperation between governments, businesses, and individuals', 'No action at all'], correctIndex: 2 },
    ],
  },
  {
    id: 'r-06',
    title: 'The Rise of Artificial Intelligence',
    level: 'Mahir',
    topic: 'Teknologi',
    minutesToRead: 4,
    paragraphs: [
      'Artificial intelligence, or AI, has rapidly transformed many aspects of modern life, from how we communicate to how businesses operate. AI systems can now analyze massive amounts of data far faster than humans ever could.',
      'One of the most notable applications of AI is in healthcare, where it helps doctors diagnose diseases more accurately and speeds up drug discovery. In education, AI-powered tools personalize learning experiences for students of different abilities.',
      'Despite these benefits, AI also raises important concerns, particularly regarding job displacement and data privacy. Many routine jobs are at risk of being automated, forcing workers to adapt by learning new skills.',
      'Experts argue that the key to a successful AI-driven future lies in responsible development and regulation, ensuring that technology benefits society as a whole rather than just a few.',
    ],
    questions: [
      { question: 'What is one application of AI mentioned in healthcare?', options: ['Cooking meals', 'Diagnosing diseases more accurately', 'Building houses', 'Growing crops'], correctIndex: 1 },
      { question: 'What concern does the text raise about AI?', options: ['It is too slow', 'Job displacement and data privacy', 'It cannot analyze data', 'It has no use in education'], correctIndex: 1 },
      { question: 'According to experts, what is key to a successful AI-driven future?', options: ['Banning all AI research', 'Responsible development and regulation', 'Ignoring privacy concerns', 'Automating every job'], correctIndex: 1 },
    ],
  },
];

export const TOTAL_READING_ARTICLES = READING_ARTICLES.length;
