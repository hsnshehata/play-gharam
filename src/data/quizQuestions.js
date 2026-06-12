const questions = [
  {
    id: 1,
    question: 'أي مناسبة تحضرينها؟',
    options: [
      { text: 'حفل زفاف', value: 'classic' },
      { text: 'سهرة مع صحباتي', value: 'modern' },
      { text: 'مقابلة عمل', value: 'bold' },
      { text: 'يوم عادي', value: 'natural' },
    ],
  },
  {
    id: 2,
    question: 'ما هو لون روجك المفضل؟',
    options: [
      { text: 'أحمر كلاسيك', value: 'classic' },
      { text: 'وردي ناعم', value: 'modern' },
      { text: 'أحمر قوي', value: 'bold' },
      { text: 'بيج طبيعي', value: 'natural' },
    ],
  },
  {
    id: 3,
    question: 'كيف تلبسين غالباً؟',
    options: [
      { text: 'فستان كلاسيك أنيق', value: 'classic' },
      { text: 'جينز و تيشيرت', value: 'modern' },
      { text: 'ليذر و جريء', value: 'bold' },
      { text: 'مريح وسبورت', value: 'natural' },
    ],
  },
  {
    id: 4,
    question: 'ما هو مجوهراتك المفضلة؟',
    options: [
      { text: 'ذهب كلاسيك', value: 'classic' },
      { text: 'فضة ناعمة', value: 'modern' },
      { text: 'ألماس كبير', value: 'bold' },
      { text: 'لا أفضل المجوهرات', value: 'natural' },
    ],
  },
  {
    id: 5,
    question: 'أي نوع عطور تفضلين؟',
    options: [
      { text: 'عطور الزهور', value: 'classic' },
      { text: 'عطر فاكهي منعش', value: 'modern' },
      { text: 'عطر خشبي قوي', value: 'bold' },
      { text: 'عطر ناعم خفيف', value: 'natural' },
    ],
  },
  {
    id: 6,
    question: 'تصفيفة الشعر المفضلة؟',
    options: [
      { text: 'كشخة وسعر', value: 'classic' },
      { text: 'طويل منسدل', value: 'modern' },
      { text: 'ستايل جريء', value: 'bold' },
      { text: 'كعكة بسيطة', value: 'natural' },
    ],
  },
  {
    id: 7,
    question: 'اختاري ستايل مشهورة:',
    options: [
      { text: 'أنغام', value: 'classic' },
      { text: 'منى زكي', value: 'modern' },
      { text: 'هنا الزاهد', value: 'bold' },
      { text: 'يسرا', value: 'natural' },
    ],
  },
  {
    id: 8,
    question: 'ما هي بشرتك؟',
    options: [
      { text: 'بيضاء', value: 'classic' },
      { text: 'حنطية', value: 'natural' },
      { text: 'سمراء', value: 'bold' },
      { text: 'قمحية', value: 'modern' },
    ],
  },
];

const types = {
  classic: {
    name: 'كلاسيك أنيق',
    desc: 'تحبين الإطلالة الملكية الكلاسيكية',
    makeup: 'ميك أب زفاف سبيشيال 5000 جنيه',
    image: '👑',
  },
  modern: {
    name: 'موديرن كاجوال',
    desc: 'تحبين الإطلالة العصرية البسيطة',
    makeup: 'ميك أب خطوبة 3500 جنيه',
    image: '💄',
  },
  bold: {
    name: 'جريء وجذاب',
    desc: 'تحبين التميز والإطلالات القوية',
    makeup: 'ميك أب سبيشيال بلس 6000 جنيه',
    image: '🔥',
  },
  natural: {
    name: 'طبيعي ناعم',
    desc: 'تحبين الإطلالة الطبيعية الهادئة',
    makeup: 'ميك أب ناعم مع فرد بروتين',
    image: '🌸',
  },
};

export default { questions, types };