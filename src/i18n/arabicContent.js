// Arabic translations for the structured content arrays in data/content.js.
// Keyed by the same `id` (or `num`/`title`) used there, so components can
// look up the Arabic version alongside the English source of truth.

export const systemsAr = {
  "sys-fire": {
    title: "أنظمة مكافحة الحريق",
    desc: "منظومة كاملة لمكافحة الحريق مصمّمة ومورّدة ومركّبة وفق أعلى المعايير — مضخات حريق معتمدة من UL وFM، بكرات خراطيم، صنابير رطبة، أنظمة رشاشات ورغوة وإغراق مائي، وحنفيات حريق وطفايات محمولة.",
  },
  "sys-alarm": {
    title: "أنظمة إنذار الحريق",
    desc: "كشف وتحكّم متعدد الحلقات وقابل للعنونة، مصمّم حول منصّتَي Morley وFarenhyt من Honeywell ومُشغَّل بواسطة فريقنا الهندسي المؤهّل لإعطاء أقصى إنذار مبكر لشاغلي المبنى.",
  },
  "sys-voice": {
    title: "أنظمة الإخلاء الصوتي",
    desc: "شبكات اتصال طارئ ونظام مخاطبة عامة متكاملة، مصمّمة لتقديم تعليمات إخلاء واضحة وذات أولوية في أي مبنى مهما كان حجمه.",
  },
  "sys-light": {
    title: "الإضاءة الطارئة",
    desc: "أنظمة بطارية مركزية وإنارة خروج وطوارئ قابلة للعنونة عبر DALI من طراز Teknoware ESCALUX، تُراقَب بالكامل عبر بوابات IntelliPanel وESC-GATE لتغطية متسقة ومطابقة للكود.",
  },
  "sys-elv": {
    title: "أنظمة الجهد المنخفض ELV",
    desc: "كابلات هيكلية، كاميرات مراقبة، تحكّم بالدخول وتكامل نظام إدارة المباني، تُقدَّم كبنية تحتية واحدة منخفضة الجهد بحيث يرتبط كل نظام في المبنى بشبكة واحدة قابلة للإدارة.",
  },
  "sys-smoke": {
    title: "إدارة الدخان",
    desc: "مخامد حريق ودخان، مراوح شفط ووحدات تحكّم إلكترونية، محدّدة ومركّبة للحفاظ على سلامة أدراج الطوارئ ومسارات الإخلاء طوال مدة الحادث.",
  },
};

export const brandsAr = {
  honeywell: {
    name: "هانيويل",
    tag: "إنذار الحريق والإخلاء الصوتي",
    desc: "شريك فضي في برنامج Catalyst META Fire System Integrator لعام 2024. موزّع فرعي معتمد لمنتجات Morley وFarenhyt وSystem Sensor وX-618/RK2.",
  },
  teknoware: {
    name: "تكنوير",
    tag: "إضاءة الطوارئ ESCALUX",
    desc: "موزّع معتمد لأنظمة البطارية المركزية من Teknoware وإضاءة الطوارئ والخروج ESCALUX بتقنية DALI، تقوم الأنوار بتوريدها وتركيبها واختبارها وتشغيلها.",
  },
  waterfall: {
    name: "ووترفول",
    tag: "مضخات حريق معتمدة UL/FM",
  },
  "kd-industries": {
    name: "كيه دي إندستريز",
    tag: "الأنابيب والتوصيلات",
  },
  uranus: {
    name: "يورانوس",
    tag: "كابلات مقاومة للحريق وELV",
  },
  h3c: {
    name: "إتش٣سي",
    tag: "الشبكات والبنية التحتية لتقنية المعلومات",
  },
};

export const industriesAr = {
  "ind-hotels": "الفنادق والضيافة",
  "ind-government": "المباني الحكومية",
  "ind-offices": "المكاتب والأبراج",
  "ind-manufacturing": "منشآت التصنيع",
  "ind-healthcare": "المرافق الصحية",
  "ind-residential": "الأبراج السكنية",
};

export const certificationsAr = {
  "01": {
    title: "ISO 9001:2015",
    desc: "نظام إدارة الجودة — توريد وتركيب وتصميم وصيانة أنظمة إنذار ومكافحة الحريق.",
  },
  "02": {
    title: "الدفاع المدني بالشارقة",
    desc: "مقاول ومُشغّل مرخّص من الفئة A لأنظمة الكشف والإنذار ومكافحة الحريق.",
  },
  "03": {
    title: "الدفاع المدني بدبي",
    desc: "ترخيص فئة A وD يغطي أنظمة كشف الحريق/الدخان والتهوية والتحكم بالدخان.",
  },
  "04": {
    title: "الدفاع المدني بأبوظبي",
    desc: "موزّع مرخّص لمعدات مكافحة الحريق والسلامة في جميع أنحاء الإمارة.",
  },
  "05": {
    title: "شريك هانيويل الفضي",
    desc: "شريك فضي في برنامج Catalyst META Fire System Integrator لعام 2024.",
  },
  "06": {
    title: "موزّع معتمد",
    desc: "Honeywell وTeknoware وWaterfall وKD Industries وUranus (Rewire International) وH3C.",
  },
};

// The 6 project cards shown on the Home page teaser (full /projects catalog
// stays in English for now — see the handoff note).
export const projectsHomeAr = {
  "Opalz by Danube": {
    tag: "سكني · دبي",
    title: "أوبالز باي دانوب",
    meta: "العميل: دانوب العقارية · برج من 23 طابقًا، مدينة دبي للعلوم",
    systems: "إنذار حريق قابل للعنونة، إخلاء صوتي وبطارية مركزية",
  },
  "Al Merkadh Residential Twin Towers": {
    tag: "برجان توأمان · دبي",
    title: "برجا المرقاض السكنيان التوأمان",
    meta: "العميل: إلينغتون العقارية للتطوير ذ.م.م",
    systems: "مضخة حريق 750 غالون/دقيقة، رشاشات، أنظمة رغوة وإغراق مائي",
  },
  "Danube Waves": {
    tag: "متعدد الاستخدامات · دبي",
    title: "دانوب ويفز",
    meta: "العميل: السيد سجن رضوان عسكر علي · وادي الصفا 2",
    systems: "مضخة حريق 1000 غالون/دقيقة، شبكة HDPE، أنظمة رغوة ورشاشات",
  },
  "Saudi German Hospital": {
    tag: "قطاع صحي · دبي",
    title: "مستشفى السعودي الألماني",
    meta: "العميل: مؤسسة الإمارات للرعاية الصحية",
    systems: "نظام إضاءة طوارئ ببطارية مركزية",
  },
  "Hor Al Anz Hotel Building": {
    tag: "قطاع ضيافة · دبي",
    title: "مبنى فندق حور العنز",
    meta: "العميل: السيد سالم سعيد محمد الجابري، أبو هيل",
    systems: "أنظمة الجهد المنخفض (ELV)",
  },
  "Dawn Development Tower": {
    tag: "تجاري · الخليج التجاري",
    title: "برج داون للتطوير",
    meta: "العميل: المهندسون الاستشاريون المتميزون",
    systems: "منظومة كاملة للحريق والسلامة",
  },
};
